import os
import firebase_admin
from firebase_admin import firestore

cwd = os.getcwd()
private_key = os.path.join(cwd, 'firebase_creds.json')
print(private_key)
cred = firebase_admin.credentials.Certificate(private_key)
firebase_admin.initialize_app(cred)

db = firestore.client()
print('connected!')
doc_ref_lmu = db.collection(u'organizations').document(u'LMU')

retrieve_doc = doc_ref_lmu.get()
print(retrieve_doc.to_dict())


