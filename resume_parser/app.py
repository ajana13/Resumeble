from flask import Flask, jsonify, request, redirect
from flask_pymongo import PyMongo
from pathlib import Path
from dotenv import load_dotenv
# from ResumeParser import resume_parser
import os

load_dotenv()
env_path = Path('config')/'.env'
load_dotenv(dotenv_path=env_path)
app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv('MONGO_URI')
mongo = PyMongo(app)

# app.register_blueprint(resume_parser)

@app.route('/')
def hello_world():
    return 'Flask dockerized'

if  __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')