import time
from flask import Flask, request, jsonify
import pyrebase
import os
import firebase_admin
from firebase_admin import firestore, auth
import net_predictor.NET_linear_regression as net
import kenpompy.summary as kp
from kenpompy.utils import login
from net_predictor.kenpom_creds import email, password # A file (named "kenpom_creds.py") with proper credentials must be made in the "netpredictor" folder 
import kenpompy.misc as kpmisc

# create Flask server
app = Flask(__name__)
app.debug = True

# initialize connection to firebase db
cwd = os.getcwd()
private_key = os.path.join(cwd, 'firebase_creds.json')
cred = firebase_admin.credentials.Certificate(private_key)
firebase_admin.initialize_app(cred)
db = firestore.client()

# Firestore Collection References
SCHEDULE_REF = db.collection('schedules')


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

@app.route('/api/get_testuser')
def get_testuser():
    user = auth.get_user('xmu3kmWaNqXqpzEw1Em0P1U6vSA3')
    email = auth.get_user_by_email('testuser@gmail.com')
    all_users = auth.get_users()
    return {'get user by user id': user.uid, 'get user by email': email.uid}, 200

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

    try:
        schedule_id = request.json['id']
        SCHEDULE_REF.document(schedule_id).set(request.json)
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
    try:
        # Check if ID was passed to URL query
        schedule_id = request.args.get('id')
        if schedule_id:
            schedule = SCHEDULE_REF.document(schedule_id).get()
            return jsonify(schedule.to_dict()), 200
        else:
            all_schedules = [doc.to_dict() for doc in SCHEDULE_REF.stream()]
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
        SCHEDULE_REF.document(schedule_id).update(request.json)
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
        SCHEDULE_REF.document(schedule_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"




if __name__ == '__main__':
    app.run(host='0.0.0.0')