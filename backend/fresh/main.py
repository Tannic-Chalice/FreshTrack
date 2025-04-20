from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  # To handle CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import os
from datetime import datetime, timedelta
from supabase import create_client
import traceback

# Initialize the Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set the environment variable to disable oneDNN optimizations (if needed)
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

# Load the trained model
MODEL_PATH = "freshness_model.h5"  # Replace with your model's path
model = load_model(MODEL_PATH)

# Define labels (update with the correct class names for your model)
labels = [
    "Fresh Apples", "Fresh Banana", "Fresh Cucumber", 
    "Fresh Okra", "Fresh Orange", "Fresh Potato", 
    "Fresh Tomato", "Rotten Apples", "Rotten Banana", 
    "Rotten Cucumber", "Rotten Okra", "Rotten Orange", 
    "Rotten Potato", "Rotten Tomato"
]

# Supabase configuration
url = "https://yizctugzbflqqeindzuq.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpemN0dWd6YmZscXFlaW5kenVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NDE2MDAsImV4cCI6MjA1MjAxNzYwMH0.utKzBv3DFk0ObbV2MaR0mqs5yqDU4iz2m8K3NVX8is0"
supabase = create_client(url, key)

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
        print(f"Model output shape: {predictions.shape}")  # Debug: Log predictions shape
        predicted_class = labels[predictions.argmax()]  # Get the predicted class label
        
        # Determine the category based on the predicted class
        category = "Fruits" if "Fresh" in predicted_class or "Rotten" in predicted_class else "Vegetables"
        
        # Prepare data to insert/update into Supabase
        price = 20  # Default price
        supplier = "Farm"  # Default supplier
        expiry_date = (datetime.now() + timedelta(days=5)).strftime('%Y-%m-%d')  # Expiry date after 5 days
        
        # Check if the item already exists in the grocery table
        response = supabase.table('grocery').select("*").eq("Item_name", predicted_class).execute()
        data = response.data
        
        if data:
            # Item exists, update the quantity
            existing_item = data[0]
            new_quantity = existing_item['Quantity'] + 1  # Increment quantity by 1
            update_response = supabase.table('grocery').update({
                "Quantity": new_quantity,
                "Category": category,
                "price": price,
                "Supplier": supplier,
                "Expiry_date": expiry_date
            }).eq("id", existing_item['id']).execute()
            
            if update_response.data:
                return jsonify({
                    "prediction": predicted_class,
                    "message": "Quantity updated successfully!",
                    "status": "updated"
                })
            else:
                return jsonify({
                    "prediction": predicted_class,
                    "error": "Failed to update quantity in Supabase",
                    "status": "error"
                }), 500
        else:
            # Item does not exist, insert a new record with quantity 1
            insert_data = {
                "Item_name": predicted_class,
                "Category": category,
                "Quantity": 1,  # Start with quantity 1
                "price": price,
                "Supplier": supplier,
                "Expiry_date": expiry_date
            }
            insert_response = supabase.table('grocery').insert(insert_data).execute()
            
            if insert_response.data:
                return jsonify({
                    "prediction": predicted_class,
                    "message": "Data inserted successfully!",
                    "status": "inserted"
                })
            else:
                return jsonify({
                    "prediction": predicted_class,
                    "error": "Failed to insert data into Supabase",
                    "status": "error"
                }), 500
    except Exception as e:
        print(f"Error: {e}")
        traceback.print_exc()  # Print the full traceback for debugging
        return jsonify({
            "error": str(e),
            "status": "error"
        }), 500

if __name__ == '__main__':
    # Create 'uploads' folder if it doesn't exist
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True)