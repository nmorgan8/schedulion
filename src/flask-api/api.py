import time
from flask import Flask
import os
import firebase_admin
from firebase_admin import firestore

# create Flask server
app = Flask(__name__)

# initialize connection to firebase db
cwd = os.getcwd()
private_key = os.path.join(cwd, 'schedulion-9001-firebase-adminsdk-f5ntk-862c5e8e75.json')
cred = firebase_admin.credentials.Certificate(private_key)
firebase_admin.initialize_app(cred)
db = firestore.client()

# routes 
@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/record')
def get_LMU_record():
    doc_ref_lmu = db.collection(u'test_orgs').document(u'LMU')
    retrieve_doc = doc_ref_lmu.get()
    return {'record': retrieve_doc.to_dict()}