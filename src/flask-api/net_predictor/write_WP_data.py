import kenpom_creds as cred # A file (named "kenpom_creds.py") with proper credentials must be made in this folder 
from kenpompy import utils
import kenpompy.summary as kpsum
import kenpompy.team as kpteam
import pandas as pd

browser = utils.login(cred.email, cred.password)
training_season = 2020  # Choose which year's data the model is trained on
testing_season = 2021   # Choose which year's data the model is tested on

valid_teams_train = kpteam.get_valid_teams(browser, season=training_season)
valid_teams_test = kpteam.get_valid_teams(browser, season=testing_season)

stats_train = kpsum.get_efficiency(browser, season=training_season)
stats_test = kpsum.get_efficiency(browser, season=testing_season)

complete_data_train = pd.DataFrame()
complete_data_test = pd.DataFrame()

valid_teams_train = [team for team in valid_teams_train if team[-1] != '*' and '&' not in team]
valid_teams_test = [team for team in valid_teams_test if team[-1] != '*' and '&' not in team]

for team_name in valid_teams_train:
  team_win_loss_train = kpteam.get_schedule(browser, team=team_name, season=training_season)

  # Get a teams schedule by getting a dataframe with whether or not they won or lost, and the name of their opponent
  team_win_loss_train = team_win_loss_train[team_win_loss_train['Opponent Name'].isin(valid_teams_train)][['Result', 'Opponent Name', 'Location']]
  team_win_loss_train['Result'] = team_win_loss_train['Result'].apply(lambda x: x[:1])
  team_win_loss_train['Result'] = team_win_loss_train['Result'].replace({'W': 1, 'L': 0})
  team_win_loss_train = pd.get_dummies(team_win_loss_train, columns=['Location']) # One-Hot Encoding

  team_stats_train = stats_train[stats_train['Team'] == team_name].drop(['Conference', 'Team'], axis=1)
  team_stats_train.columns = 'team_' + team_stats_train.columns[0:]

  # Rename opponent stats to have the prefix 'oponnent_'
  opponent_stats_train = stats_train.drop(['Conference'], axis=1)
  opponent_stats_train.columns = opponent_stats_train.columns[:1].union('opponent_' + opponent_stats_train.columns[1:])
  opponent_stats_train = opponent_stats_train.rename(columns={'Team': 'Opponent Name'})

  combined_stats_train = pd.merge(team_win_loss_train, opponent_stats_train, on=['Opponent Name'])
  combined_stats_train[team_stats_train.columns] = team_stats_train.iloc[0]

  complete_data_train = complete_data_train.append(combined_stats_train)

for team_name in valid_teams_test:
  team_win_loss_test = kpteam.get_schedule(browser, team=team_name, season=testing_season)

  # Get a teams schedule by getting a dataframe with whether or not they won or lost, and the name of their opponent
  team_win_loss_test = team_win_loss_test[team_win_loss_test['Opponent Name'].isin(valid_teams_test)][['Result', 'Opponent Name', 'Location']]
  team_win_loss_test['Result'] = team_win_loss_test['Result'].apply(lambda x: x[:1])
  team_win_loss_test['Result'] = team_win_loss_test['Result'].replace({'W': 1, 'L': 0})
  team_win_loss_test = pd.get_dummies(team_win_loss_test, columns=['Location']) # One-Hot Encoding

  team_stats_test = stats_test[stats_test['Team'] == team_name].drop(['Conference', 'Team'], axis=1)
  team_stats_test.columns = 'team_' + team_stats_test.columns[0:]

  # Rename opponent stats to have the prefix 'opponent_'
  opponent_stats_test = stats_test.drop(['Conference'], axis=1)
  opponent_stats_test.columns = opponent_stats_test.columns[:1].union('opponent_' + opponent_stats_test.columns[1:])
  opponent_stats_test = opponent_stats_test.rename(columns={'Team': 'Opponent Name'})

  combined_stats_test = pd.merge(team_win_loss_test, opponent_stats_test, on=['Opponent Name'])
  combined_stats_test[team_stats_test.columns] = team_stats_test.iloc[0]

  complete_data_test = complete_data_test.append(combined_stats_test)

complete_data_train = complete_data_train.fillna(0)
complete_data_test = complete_data_test.fillna(0)

complete_data_train.to_csv('WP_data_train.csv', index=False)
complete_data_test.to_csv('WP_data_test.csv', index=False)