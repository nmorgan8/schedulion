from flask import Blueprint, request

import json
import pyrebase
import os

private_key = os.environ['config']

login_api = Blueprint('login_api', __name__)

# pb = pyrebase.initialize_app(json.loads(private_key))
pb = pyrebase.initialize_app(json.load(open('firebase_config.json')))

#Api route to sign up a new user
@login_api.route('/api/signup', methods=['POST'], strict_slashes=False)
def signup():
    email = request.json['email']
    password = request.json['password']
    if email is None or password is None:
        return {'message': 'Error missing email or password'}, 401
    try:
        user = pb.auth().create_user_with_email_and_password(email, password)
        userID = user['localId']
        return {"message": f"Successfully created user {userID}", "userID": userID}, 200
    except Exception as e:
        return {"message": f"Error {e} creating user"}, 402


@login_api.route('/api/token', methods=['POST'], strict_slashes=False)
def login():
    email = request.json['email']
    password = request.json['password']
    if email is None or password is None:
        return {'message': 'Error missing email or password'}, 401
    try:
        user = pb.auth().sign_in_with_email_and_password(email, password)
        userID = user['localId']
        return {"message": f"Successfully created user {userID}", "userID": userID}, 200
    except Exception as e:
        return {"message": f"Error {e} creating user"}, 402