from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import os
from datetime import datetime, timedelta
import psycopg2
import traceback
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize the Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set the environment variable to disable oneDNN optimizations (if needed)
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

# Load the trained model
MODEL_PATH = "freshness_model.h5"
model = load_model(MODEL_PATH)

# Define labels (update with the correct class names for your model)
labels = [
    "Fresh Apples", "Fresh Banana", "Fresh Cucumber", 
    "Fresh Okra", "Fresh Orange", "Fresh Potato", 
    "Fresh Tomato", "Rotten Apples", "Rotten Banana", 
    "Rotten Cucumber", "Rotten Okra", "Rotten Orange", 
    "Rotten Potato", "Rotten Tomato"
]

# PostgreSQL database connection parameters loaded from the .env file
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

# Establish connection to the PostgreSQL database
def get_db_connection():
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        return conn
    except Exception as e:
        print(f"Error connecting to PostgreSQL: {e}")
        raise

# Define a route for the home page
@app.route('/')
def index():
    return render_template('index.html')

# Define a route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded!"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected!"}), 400
    
    # Create 'uploads' directory if it doesn't exist
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    
    # Save the uploaded file
    filepath = os.path.join('uploads', file.filename)
    file.save(filepath)

    try:
        # Preprocess the image
        image = load_img(filepath, target_size=(150, 150))  # Resize to match model's expected input size
        image = img_to_array(image)  # Convert to array
        image = image / 255.0  # Normalize pixel values
        image = image.reshape(1, 150, 150, 3)  # Add batch dimension (1, height, width, channels)
        
        # Predict the class
        predictions = model.predict(image)
        predicted_class = labels[predictions.argmax()]
        
        # Determine the category based on the predicted class
        category = "Fruits" if "Fresh" in predicted_class or "Rotten" in predicted_class else "Vegetables"
        
        # Prepare data for the database insert/update
        price = 20  # Default price
        supplier = "Farm"  # Default supplier
        expiry_date = (datetime.now() + timedelta(days=5)).strftime('%Y-%m-%d')  # Expiry date after 5 days
        
        # Connect to the database
        conn = get_db_connection()
        cur = conn.cursor()
        
        # Check if the item already exists in the grocery table
        cur.execute("SELECT * FROM grocery WHERE Item_name = %s", (predicted_class,))
        existing_item = cur.fetchone()

        if existing_item:
            # Item exists, update the quantity
            new_quantity = existing_item[3] + 1  # Increment quantity by 1 (assuming Quantity is at index 2)
            cur.execute("""
                UPDATE grocery 
                SET Quantity = %s, Category = %s, price = %s, Supplier = %s, Expiry_date = %s 
                WHERE id = %s
            """, (new_quantity, category, price, supplier, expiry_date, existing_item[0]))  # Assuming `id` is at index 0
            
            conn.commit()
            return jsonify({
                "prediction": predicted_class,
                "message": "Quantity updated successfully!",
                "status": "updated"
            })
        else:
            # Item does not exist, insert a new record with quantity 1
            cur.execute("""
                INSERT INTO grocery (Item_name, Category, Quantity, price, Supplier, Expiry_date) 
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (predicted_class, category, 1, price, supplier, expiry_date))
            
            conn.commit()
            return jsonify({
                "prediction": predicted_class,
                "message": "Data inserted successfully!",
                "status": "inserted"
            })
        
    except Exception as e:
        print(f"Error: {e}")
        traceback.print_exc()
        return jsonify({
            "error": str(e),
            "status": "error"
        }), 500

    finally:
        # Close the database connection and cursor safely
        if cur:
            cur.close()
        if conn:
            conn.close()

# Define the route to fetch items
@app.route('/api/items', methods=['GET'])
def get_items():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM grocery')
    rows = cur.fetchall()
    items = []

    # Convert the query result to a list of dictionaries
    for row in rows:
        item = {
            'id': row[0],
            'Item_name': row[1],
            'Category': row[2],
            'Quantity': row[3],
            'price': row[4],
            'Supplier': row[5],
            'Expiry_date': row[6]
        }
        items.append(item)

    cur.close()
    conn.close()

    return jsonify(items)


@app.route('/api/items', methods=['POST'])
def create_item():
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO grocery (Item_name, Category, Quantity, price, Supplier, Expiry_date)
        VALUES (%s, %s, %s, %s, %s, %s)
    ''', (data['Item_name'], data['Category'], data['Quantity'], data['price'], data['Supplier'], data['Expiry_date']))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Item created successfully!"}), 201

# Update an existing item
@app.route('/api/items/<int:id>', methods=['PUT'])
def update_item(id):
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE grocery
        SET Item_name = %s, Category = %s, Quantity = %s, price = %s, Supplier = %s, Expiry_date = %s
        WHERE id = %s
    ''', (data['Item_name'], data['Category'], data['Quantity'], data['price'], data['Supplier'], data['Expiry_date'], id))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Item updated successfully!"})

# Delete an item
@app.route('/api/items/<int:id>', methods=['DELETE'])
def delete_item(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM grocery WHERE id = %s', (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Item deleted successfully!"})

if __name__ == '__main__':
    # Ensure 'uploads' directory exists
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True)