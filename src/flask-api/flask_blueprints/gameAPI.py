import json
from datetime import datetime
from firebase_admin import firestore
from flask import Blueprint, request, jsonify

game_api = Blueprint('game_api', __name__)

db = firestore.client()

#Schedule CRUD
@game_api.route('/add_game', methods=['POST'], strict_slashes=False)
def create_schedule():
    # TODO(andrewseaman): Ensure that all games contain all necessary fields

    try:
        # TODO(andrewseaman): Ensure that a game with the same name does not already exist
        gameOpponent = request.json['opponentName']
        advantage = request.json['advantage']
        date = request.json['gameDate']

        uID = request.json['user']
        scheduleName = request.json['selectedSchedule']

        scheduleRef = db.collection('all_schedules').document(uID).collection('schedules').document(scheduleName).collection('games').document()
        gameData = {
            u'gameOpponent' : gameOpponent,
            u'advantage' : advantage,
            u'scheduledTime': date
        }
        scheduleRef.set(gameData, merge=True)
        existsYet = scheduleRef.get()
        return {"message": f"Successfully added the game against {gameOpponent} to {scheduleName} which {existsYet}"}, 200
    except Exception as e:
        return {'message': f'Error {e} occured making schedule'}, 400

@game_api.route('/list_scheduled_games')
def read_scheduled_games():
    """
        read() : Fetches documents from Firestore collection as JSON.
        all_todos : Return all documents.
    """
    try:
        uID = request.args.get('user')
        scheduleName = request.args.get('selectedSchedule')
        scheduled_games = db.collection('all_schedules').document(uID).collection('schedules').document(scheduleName).collection('games')
        all_scheduled_games = [doc.to_dict() for doc in scheduled_games.stream()]
        return jsonify(all_scheduled_games), 200
    except Exception as e:
        return f"An Error Occured: {e}"

# @game_api.route('/schedule_has_game')
# def accept_game():
#     try:
#         uID = request.args.get('user')
#         scheduleName = request.args.get('selectedSchedule')
#         game_ID = request.args.get('gameID')
#         game_ref = db.collection('all_schedules').document(uID).collection('schedules').document(scheduleName).collection('games').document(game_ID)
#         game = game_ref.get()
#         if game.exists:
#             return {'message': f'The game has been successfully loaded'}, 200
#         else:
#             return {'message': f'The game is still loading'}, 102
#     except:
#         return {'message': f'There was an error processing {game_ID}'}