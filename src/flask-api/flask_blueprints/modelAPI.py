from flask import Blueprint, request, jsonify
from firebase_admin import firestore, credentials
import firebase_admin
import kenpompy.summary as kpsum
# import net_predictor.kenpom_creds as cred # A file (named "kenpom_creds.py") with proper credentials must be made in this folder 
from kenpompy import utils
import kenpompy.summary as kpsum
import json

import net_predictor.get_matchup_WP as wp_nn
import net_predictor.NET_linear_regression as net_reg

import os

email, password = os.environ['email'], os.environ['password']

def init_firebase():
    # initialize connection to firebase db
    cwd = os.getcwd()
    private_key = os.path.join(cwd, 'firebase_creds.json')
    # cred = credentials.Certificate(json.loads(private_key))
    cred = credentials.Certificate(private_key)
    firebase_admin.initialize_app(cred)

init_firebase()

model_api = Blueprint('model_api', __name__)

browser = utils.login(email, password)
current_year = 2022 #Change this every year

db = firestore.client()

@model_api.route('/get_valid_teams')
def getTeams():
  stats = kpsum.get_efficiency(browser, season=current_year)
  team_dict = {}
  team_dict['teams'] = list(stats["Team"].values)
  return team_dict

@model_api.route('/get_cards')
def getMatchups():
    """
        read() : Fetches documents from Firestore collection as JSON.
        all_todos : Return all documents.
    """
    try:
        possible_schedules = db.collection('LMU_WP')
        team_cards = {}
        for doc in possible_schedules.stream():
          team_cards[doc.id] = doc.to_dict()
        return jsonify(team_cards), 200
    except Exception as e:
        return f"An Error Occured: {e}"

@model_api.route('/get_NET_rankings')
def get_NET():
  net_values = net_reg.run_regression()
  net_values = net_values.to_dict(orient='records')
  return jsonify(net_values)