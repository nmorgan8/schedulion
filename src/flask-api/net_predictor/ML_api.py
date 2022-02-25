import NET_linear_regression as net
import WP_neural_net as WP
import pandas as pd

def possible_games():
    predicted_rankings = net.run_regression()
    predicted_WP = WP.run_WP_nn()
    LMU_WP = predicted_WP.loc[predicted_WP['Team Name'] == "Loyola Marymount"]
    return pd.merge(LMU_WP, predicted_rankings, on="Opponent Name")
