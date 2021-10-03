import os
import firebase_admin
from firebase_admin import firestore

cwd = os.getcwd()
private_key = os.path.join(cwd, 'schedulion-9001-firebase-adminsdk-f5ntk-862c5e8e75.json')
print(private_key)
cred = firebase_admin.credentials.Certificate(private_key)
firebase_admin.initialize_app(cred)

db = firestore.client()
print('connected!')
doc_ref_lmu = db.collection(u'test_orgs').document(u'LMU')

retrieve_doc = doc_ref_lmu.get()
print(retrieve_doc.to_dict())


