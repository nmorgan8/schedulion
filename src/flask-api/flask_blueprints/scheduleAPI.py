import json
import os
from datetime import datetime

from firebase_admin import firestore, credentials, auth
import firebase_admin
from flask import Blueprint, request, jsonify

schedule_api = Blueprint('schedule_api', __name__)

# initialize connection to firebase db
cwd = os.getcwd()
private_key = os.path.join(cwd, 'firebase_creds.json')
cred = credentials.Certificate(private_key)
firebase = firebase_admin.initialize_app(cred)
db = firestore.client()

# Firestore Collection References
SCHEDULE_REF = db.collection('schedules')


#Schedule CRUD
@schedule_api.route('/add_schedule', methods=['POST'], strict_slashes=False)
def create_schedule():
    """
        create() : Add document to Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """
    # TODO(andrewseaman): Ensure that all schedules contain all necessary fields

    try:
        # TODO(andrewseaman): Ensure that a schedule with the same name does not already exist
        scheduleName = request.json['scheduleName']
        gameNumber = request.json['gameNumber']
        uID = request.json['user']
        currentTime = datetime.now()

        scheduleRef = db.collection('all_schedules').document(uID).collection('schedules').document(scheduleName)
        scheduleData = {
            u'gameTotal' : gameNumber,
            u'gamesLeft' : u'0',
            u'modified' : currentTime,
            u'name' : scheduleName
        }
        scheduleRef.set(scheduleData, merge=True)

        return {"message": f"Successfully created new schedule {scheduleName} with {gameNumber} games"}, 200
    except Exception as e:
        return {'message': f'Error {e} occured making schedule'}, 400


@schedule_api.route('/list_schedules', methods=['GET'])
def read_schedule():
    """
        read() : Fetches documents from Firestore collection as JSON.
        all_todos : Return all documents.
    """
    try:
        uID = request.args.get('uID')
        user_schedules = db.collection('all_schedules').document(uID).collection('schedules')
        all_schedules = [doc.to_dict() for doc in user_schedules.stream()]
        return jsonify(all_schedules), 200
    except Exception as e:
        return f"An Error Occured: {e}"

@schedule_api.route('/update_schedule', methods=['POST', 'PUT'])
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

@schedule_api.route('/delete_schedule', methods=['GET', 'DELETE'])
def delete():
    """
        delete() : Delete a document from Firestore collection.
    """
    try:
        uID = request.args.get('uID')
        schedule_id = request.args.get('scheduleID')
        db.collection('all_schedules').document(uID).collection('schedules').document(schedule_id).delete()
        return jsonify({"message": f"Successfully deleted schedule {schedule_id}"}), 200
    except Exception as e:
        return f"An Error Occured: {e}"
