from flask import Flask, render_template, request
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import os

# Initialize the Flask app
app = Flask(__name__)

# Load the trained model
MODEL_PATH = "freshness_model.h5"  # Replace with your model's path
model = load_model(MODEL_PATH)

# Define labels (from Code 1)
labels = [
    "Class 1 - fresh apples", "Class 2 - fresh banana", "Class 3 - fresh cucumber", 
    "Class 4 - fresh okra", "Class 5 - fresh orange", "Class 6 - fresh potato", 
    "Class 7 - fresh tomato", "Class 8 - rotten apples", "Class 9 - rotten banana", 
    "Class 10 - rotten cucumber", "Class 11 - rotten okra", "Class 12 - rotten orange", 
    "Class 13 - rotten potato", "Class 14 - rotten tomato"
]

# Define a route for the home page
@app.route('/')
def index():
    return render_template('index.html')

# Define a route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return "No file uploaded!", 400

    file = request.files['file']

    if file.filename == '':
        return "No file selected!", 400

    # Create 'uploads' directory if it doesn't exist
    if not os.path.exists('uploads'):
        os.makedirs('uploads')

    # Save the uploaded file
    filepath = os.path.join('uploads', file.filename)
    file.save(filepath)

    try:
        # Preprocess the image
        image = load_img(filepath, target_size=(150, 150))  # Adjust size as per your model
        image = img_to_array(image)
        image = image / 255.0  # Normalize pixel values
        image = image.reshape(1, 150, 150, 3)  # Ensure shape matches model input

        # Predict the class
        predictions = model.predict(image)

        # Check if model output matches the number of labels
        if len(predictions[0]) != len(labels):
            raise ValueError(f"Model output length ({len(predictions[0])}) does not match number of labels ({len(labels)}).")

        # Get the predicted class
        predicted_class = labels[predictions.argmax()]  # Get the predicted class label

        return render_template('result.html', label=predicted_class)

    except Exception as e:
        return f"An error occurred: {e}", 500

if __name__ == '__main__':
    # Create 'uploads' folder if it doesn't exist
    if not os.path.exists('uploads'):
        os.makedirs('uploads')

    app.run(debug=True)