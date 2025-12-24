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

# Set the environment variable to disable oneDNN optimizations
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

# Load the trained model
MODEL_PATH = "freshness_model.h5"
model = load_model(MODEL_PATH)

# Define labels
labels = [
    "Fresh Apples", "Fresh Banana", "Fresh Cucumber", 
    "Fresh Okra", "Fresh Orange", "Fresh Potato", 
    "Fresh Tomato", "Rotten Apples", "Rotten Banana", 
    "Rotten Cucumber", "Rotten Okra", "Rotten Orange", 
    "Rotten Potato", "Rotten Tomato"
]

# Database parameters
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

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

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    conn = None
    cur = None
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded!"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected!"}), 400
    
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    
    filepath = os.path.join('uploads', file.filename)
    file.save(filepath)

    try:
        # Preprocess and Predict
        image = load_img(filepath, target_size=(150, 150))
        image = img_to_array(image)
        image = image / 255.0
        image = image.reshape(1, 150, 150, 3)
        
        predictions = model.predict(image)
        predicted_class = labels[predictions.argmax()]
        
        category = "Fruits" if "Fresh" in predicted_class or "Rotten" in predicted_class else "Vegetables"
        price = 20
        supplier = "Farm"
        expiry_date = (datetime.now() + timedelta(days=5)).strftime('%Y-%m-%d')
        
        conn = get_db_connection()
        cur = conn.cursor()
        
        # Use double quotes for CamelCase column names
        cur.execute('SELECT id, "Item_name", "Category", "Quantity" FROM grocery WHERE "Item_name" = %s', (predicted_class,))
        existing_item = cur.fetchone()

        if existing_item:
            new_quantity = (existing_item[3] or 0) + 1
            cur.execute('''
                UPDATE grocery 
                SET "Quantity" = %s, "Category" = %s, price = %s, "Supplier" = %s, "Expiry_date" = %s 
                WHERE id = %s
            ''', (new_quantity, category, price, supplier, expiry_date, existing_item[0]))
            
            conn.commit()
            return jsonify({"prediction": predicted_class, "message": "Quantity updated!", "status": "updated"})
        else:
            cur.execute('''
                INSERT INTO grocery ("Item_name", "Category", "Quantity", price, "Supplier", "Expiry_date") 
                VALUES (%s, %s, %s, %s, %s, %s)
            ''', (predicted_class, category, 1, price, supplier, expiry_date))
            
            conn.commit()
            return jsonify({"prediction": predicted_class, "message": "Inserted!", "status": "inserted"})
        
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    finally:
        if cur: cur.close()
        if conn: conn.close()

@app.route('/api/items', methods=['GET'])
def get_items():
    conn = None
    cur = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM grocery')
        rows = cur.fetchall()
        items = []
        for row in rows:
            items.append({
                'id': row[0],
                'Item_name': row[1],
                'Category': row[2],
                'Quantity': row[3],
                'price': row[4],
                'Supplier': row[5],
                'Expiry_date': row[6]
            })
        return jsonify(items)
    finally:
        if cur: cur.close()
        if conn: conn.close()

@app.route('/api/items', methods=['POST'])
def create_item():
    data = request.get_json()
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute('''
            INSERT INTO grocery ("Item_name", "Category", "Quantity", price, "Supplier", "Expiry_date")
            VALUES (%s, %s, %s, %s, %s, %s)
        ''', (data.get('Item_name'), data.get('Category'), data.get('Quantity'), 
              data.get('price'), data.get('Supplier'), data.get('Expiry_date')))
        conn.commit()
        return jsonify({"message": "Created!"}), 201
    finally:
        cur.close()
        conn.close()

@app.route('/api/items/<int:id>', methods=['PUT'])
def update_item(id):
    data = request.get_json()
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        # data.get() prevents KeyError if the frontend sends a slightly different key
        cur.execute('''
            UPDATE grocery
            SET "Item_name" = %s, "Category" = %s, "Quantity" = %s, price = %s, "Supplier" = %s, "Expiry_date" = %s
            WHERE id = %s
        ''', (data.get('Item_name'), data.get('Category'), data.get('Quantity'), 
              data.get('price'), data.get('Supplier'), data.get('Expiry_date'), id))
        conn.commit()
        return jsonify({"message": "Updated!"})
    finally:
        cur.close()
        conn.close()

@app.route('/api/items/<int:id>', methods=['DELETE'])
def delete_item(id):
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute('DELETE FROM grocery WHERE id = %s', (id,))
        conn.commit()
        return jsonify({"message": "Deleted!"})
    finally:
        cur.close()
        conn.close()

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)