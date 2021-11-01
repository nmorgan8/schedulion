import time
from flask import Flask
import os
import firebase_admin
from firebase_admin import firestore

# create Flask server
app = Flask(__name__)
app.debug = True

# initialize connection to firebase db
cwd = os.getcwd()
private_key = os.path.join(cwd, 'firebase_creds.json')
cred = firebase_admin.credentials.Certificate(private_key)
firebase_admin.initialize_app(cred)
db = firestore.client()

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

if __name__ == '__main__':
    app.run(host='0.0.0.0')