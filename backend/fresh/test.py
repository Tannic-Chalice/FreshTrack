from dotenv import load_dotenv
import os
import psycopg2

# Load environment variables from the .env file
load_dotenv()

# Fetch variables from the environment
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_NAME = os.getenv('DB_NAME')

print(f"Connecting as user: {DB_USER}")  # For debugging

# Attempt to connect to PostgreSQL
try:
    conn = psycopg2.connect(
        host=DB_HOST,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )
    print("Connection successful!")
except psycopg2.OperationalError as e:
    print(f"Error connecting to the database: {e}")
