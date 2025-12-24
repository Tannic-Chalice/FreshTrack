# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file first to leverage Docker cache
COPY requirements.txt .

# Install dependencies
# We use --no-cache-dir to keep the image size small
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code
# This includes main.py and your .h5 model file
COPY . .

# Expose the port your app runs on (e.g., 8000 for FastAPI/Flask)
EXPOSE 8000

# Command to run your application
CMD ["python", "main.py"]