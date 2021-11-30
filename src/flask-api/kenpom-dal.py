import os
import sys
from kenpompy.utils import login
import kenpompy.summary as kp
import kenpompy.misc as kpmisc
import pandas as pd
import firebase_admin
from firebase_admin import firestore
import kenpom_creds as kp_cred

cwd = os.getcwd()
private_key = os.path.join(cwd, 'firebase_creds.json')
fb_cred = firebase_admin.credentials.Certificate(private_key)
firebase_admin.initialize_app(fb_cred)

db = firestore.client()
print('connected!')

browser = login(kp_cred.login_email, kp_cred.login_password)

stats = kpmisc.get_pomeroy_ratings(browser)
for kp_index, stat_line in stats.iterrows():
  name = stat_line['Team']
  if type(name) != str:
    continue
  data = {
    'rank': stat_line['Rk'],
    'conf': stat_line['Conf'],
    'win_loss': stat_line['W-L'],
    'adj_EM': stat_line[4],
    'tempo': stat_line[9],
    'sched_str': stat_line[13]
  }
  db.collection('organizations').document(name).set(data)
  print(f'{name} just inserted!')

print('Inserted Teams!')
