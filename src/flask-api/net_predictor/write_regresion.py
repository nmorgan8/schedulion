from unittest import result
import firebase_admin
from firebase_admin import firestore, credentials, auth
import NET_linear_regression as net
import pandas as pd
import os

def get_model_results():
    data = net.run_regression()
    res_list = []
    for i, (rank, team) in data.iterrows():
        temp_dict = {
            "True_Ranking": rank,
            "team": team
        }
        res_list.append(temp_dict)
    return {'data':res_list}

def write_results_to_fb(results):
    cwd = os.getcwd()
    private_key = os.path.join(cwd, 'firebase_creds.json')
    cred = credentials.Certificate(private_key)
    firebase = firebase_admin.initialize_app(cred)
    db = firestore.client()
    db.collection(u'NET').document(u'rankings').set(results)

def get_res_from_fb():
    cwd = os.getcwd()
    private_key = os.path.join(cwd, 'firebase_creds.json')
    cred = credentials.Certificate(private_key)
    firebase = firebase_admin.initialize_app(cred)
    db = firestore.client()
    data = db.collection(u'NET').document(u'rankings').get()
    print(data.to_dict()['data'])

# results = get_model_results()
# write_results_to_fb(results)
get_res_from_fb()
