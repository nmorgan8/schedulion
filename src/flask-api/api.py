import time
import json
from flask import Flask, request, jsonify, session
from flask.ext.session import Session
from flask_cors import CORS
import pyrebase
import os
import firebase_admin
from firebase_admin import firestore, credentials
import net_predictor.NET_linear_regression as net
import kenpompy.summary as kp
from kenpompy.utils import login
from net_predictor.kenpom_creds import email, password # A file (named "kenpom_creds.py") with proper credentials must be made in the "netpredictor" folder 
import kenpompy.misc as kpmisc

# create Flask server
app = Flask(__name__)
sess = Session()
CORS(app)
app.debug = True

# initialize connection to firebase db
cwd = os.getcwd()
private_key = os.path.join(cwd, 'firebase_creds.json')
cred = credentials.Certificate(private_key)
firebase = firebase_admin.initialize_app(cred)
pb = pyrebase.initialize_app(json.load(open('firebase_config.json')))
db = firestore.client()

# Firestore Collection References
schedule_ref = pb.database().child('schedules')

# routes 

@app.route('/')
def main():
    return 'starting server with python!'

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/record')
def get_LMU_record():
    doc_ref_lmu = db.collection(u'organizations').document(u'LMU')
    retrieve_doc = doc_ref_lmu.get()
    return {'record': retrieve_doc.to_dict()}

@app.route('/api/get_netrankings')
def get_NET_rankings():
    regression = net.run_regression()
    return regression.to_dict('split')

@app.route('/api/get_teamstats')
def get_team_stats():
    browser = login(email, password)
    table = kpmisc.get_pomeroy_ratings(browser)
    table = table.dropna()
    return table.to_dict('split')

#Schedule CRUD

@app.route('/add_schedule', methods=['POST'])
def create_schedule():
    """
        create() : Add document to Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """
    # TODO(andrewseaman): Ensure that all schedules contain all necessary fields
    if not session['user']:
        return "Error: No user logged in"
    try:
        schedule_id = request.json['id']
        schedule_ref.document(schedule_id).set(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/api/list_schedules', methods=['GET'])
def read_schedule():
    """
        read() : Fetches documents from Firestore collection as JSON.
        todo : Return document that matches query ID.
        all_todos : Return all documents.
    """
    user = pb.auth().sign_in_with_email_and_password(email, password)
    if not session['user']:
        return "Error: No user logged in"
    try:
        # Check if ID was passed to URL query
        schedule_id = request.args.get('id')
        if schedule_id:
            schedule = schedule_ref.document(schedule_id).get()
            return jsonify(schedule.to_dict()), 200
        else:
            all_schedules = [doc.to_dict() for doc in schedule_ref.stream()]
            return jsonify(all_schedules), 200
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/update_schedule', methods=['POST', 'PUT'])
def update_schedule():
    """
        update() : Update document in Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    try:
        schedule_id = request.json['id']
        schedule_ref.document(schedule_id).update(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/delete_schedule', methods=['GET', 'DELETE'])
def delete():
    """
        delete() : Delete a document from Firestore collection.
    """
    try:
        # Check for ID in URL query
        schedule_id = request.args.get('id')
        schedule_ref.document(schedule_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

#Api route to sign up a new user
@app.route('/api/signup', methods=['POST'], strict_slashes=False)
def signup():
    email = request.json['email']
    password = request.json['password']
    if email is None or password is None:
        return {'message': 'Error missing email or password'}, 401
    try:
        user = pb.auth().create_user_with_email_and_password(email, password)
        userID = user['localId']
        session['user'] = user['idToken']
        return {"message": f"Successfully created user {userID}", "userID": userID}, 200
    except Exception as e:
        return {"message": f"Error {e} creating user"}, 402

#Api route to geta new token for a valid user
@app.route('/api/token', methods=['POST'], strict_slashes=False)
def token():
    email = request.json['email']
    password = request.json['password']
    try:
        user = pb.auth().sign_in_with_email_and_password(email, password)
        session['user'] = user['idToken']
        return {'token': jwt, 'uid': uid}, 200
    except:
        return {'message': 'There was an error logging in'}, 400


if __name__ == '__main__':
    app.secret_key = "schedulion_super_secret_key"
    sess.init_app(app)
    app.run(host='0.0.0.0')