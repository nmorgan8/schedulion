import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
# from net_predictor.kenpom_creds import email, password # A file (named "kenpom_creds.py") with proper credentials must be made in the "net_predictor" folder 
from kenpompy.utils import login
import kenpompy.summary as kp
import kenpompy.misc as kpmisc
import os

# email, password = os.environ['email'], os.environ['password']
email, password = 'craig.pintens@lmu.edu', '#3AnthonyIreland'

def run_regression():
    browser = login(email, password)
    training_season = 2021  # Choose which year's data the model is trained on
    testing_season = 2022   # Choose which year's data the model is tested on
    stats_train = kp.get_efficiency(browser, season=training_season)
    stats_test = kp.get_efficiency(browser, season=testing_season)
    pom_stats_train = kpmisc.get_pomeroy_ratings(browser, season=training_season)
    pom_stats_test = kpmisc.get_pomeroy_ratings(browser, season=testing_season)
    columns_to_drop = ['Team', 'Conference']

    label_name = 'Rk'
    columns_to_drop.append(label_name)

    # Merge the two data sets
    pom_stats_train = pom_stats_train.rename(columns={'Conf': 'Conference'})
    pom_stats_test = pom_stats_test.rename(columns={'Conf': 'Conference'})

    combined_stats_train = pd.merge(stats_train, pom_stats_train[[label_name, 'Team', 'Conference']], on=['Team', 'Conference'])
    combined_stats_test = pd.merge(stats_test, pom_stats_test[[label_name, 'Team', 'Conference']], on=['Team', 'Conference'])

    # Get the names of the features based on columns_to_drop
    feature_names_train = combined_stats_train.drop(columns_to_drop, axis=1).columns
    feature_names_test = combined_stats_test.drop(columns_to_drop, axis=1).columns

    x_train = combined_stats_train[feature_names_train].values.astype(float)
    y_train = combined_stats_train[label_name].values.reshape(-1,1).astype(float)
    x_test = combined_stats_test[feature_names_test].values.astype(float)
    y_test = combined_stats_test[label_name].values.reshape(-1,1).astype(float)

    # Fit and predict with the model
    model = LinearRegression()
    model.fit(x_train, y_train)
    y_train_pred = model.predict(x_train)
    y_test_pred = model.predict(x_test)

    # Determine accuracy using r2 score
    print('Sklearn\'s model\'s train and test r2 score')
    print(r2_score(y_train, y_train_pred))
    print(r2_score(y_test, y_test_pred))

    y_pred_df = pd.DataFrame(y_test_pred, columns=['Calculated_Ranking'])
    y_pred_teams = pd.concat([y_pred_df, combined_stats_test['Team']], axis=1)
    y_pred_teams = y_pred_teams.sort_values(by='Calculated_Ranking')
    y_pred_teams.insert(1, 'True_Ranking', range(1, 1 + len(y_pred_teams)))
    y_pred_teams = y_pred_teams.drop(columns=['Calculated_Ranking'])
    y_pred_teams = y_pred_teams.rename({'Team': 'team'}, axis='columns')
    print(y_pred_teams)
    return y_pred_teams