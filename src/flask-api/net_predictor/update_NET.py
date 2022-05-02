import firebase_admin
from firebase_admin import firestore, credentials, auth
import pandas as pd
import os

def get_model_results():
    data = pd.read_csv('rank_update_05_02_22.csv')
    print(data)
    res_list = []
    for i, (rank, team, conf, AdjEM,OffRank,OffRtg,DefRank,DefRtg,TempoRank,Tempo,confWinPct,rankConfWP,Chg) in data.iterrows():
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


results = get_model_results()
write_results_to_fb(results)
