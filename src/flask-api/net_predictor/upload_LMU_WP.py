import os
import pandas as pd
import kenpom_creds as cred # A file (named "kenpom_creds.py") with proper credentials must be made in this folder 
from kenpompy import utils
import kenpompy.summary as kpsum
import kenpompy.team as kpteam
import firebase_admin 
from firebase_admin import firestore, credentials, auth

import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
from sklearn.metrics import precision_recall_fscore_support
from WP_neural_net import Net

browser = utils.login(cred.email, cred.password)
current_year = 2022 #Change this every year
PATH = 'trained_model.pth'

columns_to_drop = ['Team', 'Conference']
stats = kpsum.get_efficiency(browser, season=current_year)
combined_stats = pd.DataFrame([[0,0,1]], columns=['Location-Away', 'Location-Home', 'Location-Neutral'])
school_names = stats["Team"].values

LMU = 'Loyola Marymount'

data = {}
# Home
for matchup in school_names:
    if matchup == LMU:
        continue

    home_team_stats = stats[stats["Team"] == LMU].drop(columns_to_drop, axis=1)
    away_team_stats = stats[stats["Team"] == matchup].drop(columns_to_drop, axis=1)

    home_team_stats.columns = 'home_' + home_team_stats.columns[0:]
    away_team_stats.columns = 'away_' + away_team_stats.columns[0:]

    combined_stats[away_team_stats.columns] = away_team_stats.iloc[0]
    combined_stats[home_team_stats.columns] = home_team_stats.iloc[0]

    x = combined_stats.values.astype(float)

    model = Net(len(x[0]), 1)

    x_tensor = torch.Tensor(x)

    # Load the model from the saved path
    model.load_state_dict(torch.load(PATH))

    with torch.no_grad():
        y_pred = model(x_tensor)

    data[matchup] = {
        'home': y_pred.item(),
        'away': 0
    }

# Away
for matchup in school_names:
    if matchup == LMU:
        continue

    home_team_stats = stats[stats["Team"] == matchup].drop(columns_to_drop, axis=1)
    away_team_stats = stats[stats["Team"] == LMU].drop(columns_to_drop, axis=1)

    home_team_stats.columns = 'home_' + home_team_stats.columns[0:]
    away_team_stats.columns = 'away_' + away_team_stats.columns[0:]

    combined_stats[away_team_stats.columns] = away_team_stats.iloc[0]
    combined_stats[home_team_stats.columns] = home_team_stats.iloc[0]

    x = combined_stats.values.astype(float)

    model = Net(len(x[0]), 1)

    x_tensor = torch.Tensor(x)

    # Load the model from the saved path
    model.load_state_dict(torch.load(PATH))

    with torch.no_grad():
        y_pred = model(x_tensor)

    data[matchup]['away'] = 1 - y_pred.item()

cwd = os.getcwd()
private_key = os.path.join(cwd, 'firebase_creds.json')
cred = credentials.Certificate(private_key)
firebase_admin.initialize_app(cred)
db = firestore.client()
for matchup, wp in data.items():
    db.collection(u'LMU_WP').document(matchup).set(wp)
