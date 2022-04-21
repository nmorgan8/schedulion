import os
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
import pyrebase
import firebase_admin
from firebase_admin import firestore, credentials, auth
# import net_predictor.NET_linear_regression as net_reg
# import net_predictor.WP_neural_net as WP
import pandas as pd
import kenpompy.summary as kp
from kenpompy.utils import login
# from net_predictor.kenpom_creds import email, password # A file (named "kenpom_creds.py") with proper credentials must be made in the "netpredictor" folder 
import kenpompy.misc as kpmisc
from flask_blueprints.modelAPI import model_api
from flask_blueprints.gameAPI import game_api
from flask_blueprints.scheduleAPI import schedule_api
from flask_blueprints.loginAPI import login_api


email, password = os.environ['email'], os.environ['password']

# create Flask server
app = Flask(__name__)    

# Add blueprints
app.register_blueprint(login_api)
app.register_blueprint(schedule_api)
app.register_blueprint(model_api)
app.register_blueprint(game_api)


CORS(app)
# app.debug = True


# routes 
@app.route('/')
def index():
    return 'Welcome to the ScheduLion API'

@app.route('/api/record')
def get_LMU_record():
    doc_ref_lmu = db.collection(u'organizations').document(u'LMU')
    retrieve_doc = doc_ref_lmu.get()
    return {'record': retrieve_doc.to_dict()}

@app.route('/api/get_netrankings')
def get_NET_rankings():
    regression = net.run_regression()
    return regression.to_dict('split')

@app.route('/get_possible_games')
def get_possible_matchups():
    try:
        teamID = request.args.get('teamID')
        possible_game_ref = db.collection(u'wp_results').document(teamID)
        possible_games = possible_game_ref.get()
        if possible_games.exists:
            return jsonify(possible_games.to_dict())
        else:
            raise Exception("{teamID} does not exist.  Try a different spelling of the name.")
    except Exception as e:
        return {'message': f'Error: {e} occured'}

@app.route('/api/get_teamstats')
def get_team_stats():
    browser = login(email, password)
    table = kpmisc.get_pomeroy_ratings(browser)
    table = table.dropna()
    return table.to_dict('split')

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=False)