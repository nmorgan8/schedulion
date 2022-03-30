from flask import Blueprint

model_api = Blueprint('model_api', __name__)

@model_api.route('/get_matchups')
def getMatchups():
    return "Matchups"