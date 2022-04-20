import sys
import pandas as pd
# import net_predictor.kenpom_creds as cred # A file (named "kenpom_creds.py") with proper credentials must be made in this folder 
from kenpompy import utils
import kenpompy.summary as kpsum
import os

import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
from sklearn.metrics import precision_recall_fscore_support
from net_predictor.WP_neural_net import Net

email, password = os.environ['email'], os.environ['password']

def get_matchup_WP(home_team, away_team):
  browser = utils.login(cred.email, cred.password)
  current_year = 2022 #Change this every year
  PATH = 'trained_model.pth'

  columns_to_drop = ['Team', 'Conference']

  stats = kpsum.get_efficiency(browser, season=current_year)
  combined_stats = pd.DataFrame([[0,0,1]], columns=['Location-Away', 'Location-Home', 'Location-Neutral'])

  home_team_stats = stats[stats["Team"] == home_team].drop(columns_to_drop, axis=1)
  away_team_stats = stats[stats["Team"] == away_team].drop(columns_to_drop, axis=1)

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

  # print(y_pred.item())
  return y_pred.item()

def main():
  stats = kpsum.get_efficiency(browser, season=current_year)
  school_names = stats["Team"].values
  print(type(school_names))
  USAGE_MESSAGE = ('ERROR:\n'
                  '-----------------------------\n'
                  'Usage: python get_matchup_WP.py "home_team" "away_team"\n'
                  '-----------------------------')
  def arg_error():
    print(USAGE_MESSAGE)
  list_of_arguments = sys.argv
  if len(list_of_arguments) < 3:
    arg_error()
    print("Not enough arguments")
    sys.exit()
  home_team = list_of_arguments[1]
  away_team = list_of_arguments[2]
  if home_team not in school_names:
    arg_error()
    print("\"%s\" is not an applicable \"home_team\". Ensure you are using the correct spelling as provided by KenPom" % home_team)
    print("For example, Loyola Marymount University is \"Loyola Marymount\" on KenPom.")
    sys.exit()
  if away_team not in school_names:
    arg_error()
    print("\"%s\" is not an applicable \"away_team\". Ensure you are using the correct spelling as provided by KenPom" % away_team)
    print("For example, Loyola Marymount University is \"Loyola Marymount\" on KenPom.")
    sys.exit()
  get_matchup_WP(home_team, away_team)
  
if __name__ == "__main__":
  main()
