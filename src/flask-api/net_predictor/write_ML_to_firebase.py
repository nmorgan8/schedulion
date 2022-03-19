from firebase_admin import firestore, credentials, auth
import net_predictor.NET_linear_regression as net
import net_predictor.WP_neural_net as WP
import pandas as pd
import os

def get_model_results():
    '''
    Gets the results from both the regression which returns predicted NET scores
    and the neural network which predicts winning percentage and then merges them
    into one pd dataframe.

    Return:
    (pandas dataframe): dataframe containing predicted net position and winning percentage
    '''
    predicted_rankings = net.run_regression()
    predicted_WP = WP.run_WP_nn()
    LMU_WP = predicted_WP.loc[predicted_WP['Team Name'] == "Loyola Marymount"]
    return pd.merge(LMU_WP, predicted_rankings, on="Opponent Name")

def write_results_to_fb(results):
    '''
    Writes model results to firebase

    Parameters:
    results (pandas dataframe): dataframe containing all potential opponents,
    their winning percentages, home or away game, and predicted net ranking
    '''
    cwd = os.getcwd()
    private_key = os.path.join(cwd, 'firebase_creds.json')
    cred = credentials.Certificate(private_key)
    firebase = firebase_admin.initialize_app(cred)
    db = firestore.client()
    db.colleciton(u'Potential Matchups').document(u'Games').set(results)


results = get_model_results()
write_results_to_fb(results)

