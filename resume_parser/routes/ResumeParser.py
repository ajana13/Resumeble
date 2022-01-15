from flask import Blueprint

resume_parser = Blueprint('resume_parser', __name__)

@resume_parser.route("/resume", methods=["POST"])
def accountList():
    return "got back a message"
