from flask import Flask, jsonify, request, redirect
from flask_pymongo import PyMongo
from pathlib import Path
import os
from dotenv import load_dotenv

# dotenv_path = os.path.join(os.path.dirname('./config'), '.env')
load_dotenv()
env_path = Path('config')/'.env'
load_dotenv(dotenv_path=env_path)
app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv('MONGO_URI')
mongo = PyMongo(app)

@app.route('/')
def hello_world():
    return 'Flask dockerized'

if  __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')