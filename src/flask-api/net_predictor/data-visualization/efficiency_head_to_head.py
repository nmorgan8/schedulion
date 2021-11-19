import sys
from kenpompy.utils import login
import kenpompy.summary as kp
import kenpom_creds as cred # A file (named "kenpom_creds.py") with proper credentials must be made in the "net_predictor" folder 
import matplotlib.pyplot as plt
from matplotlib.ticker import MaxNLocator

browser = login(cred.login_email, cred.login_password)

def plot_teams_stats_over_time(team1_name, team2_name, stat_name, start_year, end_year):
    year_arr = list(range(start_year, end_year+1))
    team1_stats_arr = []
    team2_stats_arr = []

    for year in year_arr:
        stats = kp.get_efficiency(browser, season=year)
        team1_stats_arr.append(float(stats.loc[stats['Team'] == team1_name][stat_name].values[0]))
        team2_stats_arr.append(float(stats.loc[stats['Team'] == team2_name][stat_name].values[0]))
    
    title = '%s vs %s' % (team1_name, team2_name)
    plot_data(year_arr, team1_stats_arr, team2_stats_arr, 'year', stat_name, title, team1_name, team2_name)


def plot_data(x, y1, y2, x_label, y_label, plot_title, team1_name, team2_name):
    fig = plt.figure()
    fig.suptitle(plot_title)

    stats_plot = fig.add_subplot(1,1,1)
    stats_plot.set_xlabel(x_label)
    stats_plot.set_ylabel(y_label)

    stats_plot.xaxis.set_major_locator(MaxNLocator(integer=True))

    stats_plot.plot(x, y1, label=team1_name)
    stats_plot.plot(x, y2, label=team2_name)

    stats_plot.legend()

    plt.show()

def main():
    school_names = kp.get_efficiency(browser)['Team'].values
    efficiency_stats_names = kp.get_efficiency(browser).columns
    earliest_year = 2002
    latest_year = 2021
    USAGE_MESSAGE = ('ERROR:\n'
                    '-----------------------------\n'
                    'Usage: file_name "school_name_1" "school_name_2" "efficiency_stat" [start_year] [end_year]\n'
                    '-----------------------------')

    def arg_error():
        print(USAGE_MESSAGE)

    list_of_arguments = sys.argv

    if len(list_of_arguments) < 4:
        arg_error()
        print("Not enough arguments")
        sys.exit()

    team_name_1 = list_of_arguments[1]
    team_name_2 = list_of_arguments[2]
    stat_name = list_of_arguments[3]

    if team_name_1 not in school_names:
        arg_error()
        print("\"%s\" is not an applicable \"school_name_1\". Ensure you are using the correct spelling as provided by KenPom" % team_name_1)
        print("For example, Loyola Marymount University is \"Loyola Marymount\" on KenPom.")
        sys.exit()
    if team_name_2 not in school_names:
        arg_error()
        print("\"%s\" is not an applicable \"school_name_2\". Ensure you are using the correct spelling as provided by KenPom" % team_name_2)
        print("For example, Loyola Marymount University is \"Loyola Marymount\" on KenPom.")
        sys.exit()
    if stat_name not in efficiency_stats_names:
        arg_error()
        print("\"%s\" is not an applicable \"efficiency_stat\". Ensure you are using the correct spelling as provided by KenPom" % stat_name)
        print("For example, \"Tempo-Adj\", \"Off. Efficiency-Adj\", \"Def. Efficiency-Adj\", etc.")
        sys.exit()
    start_year = int(list_of_arguments[4]) if len(list_of_arguments) >= 5 else earliest_year
    end_year = int(list_of_arguments[5]) if len(list_of_arguments) >= 5 else latest_year
    if start_year not in list(range(earliest_year, latest_year+1)) or start_year >= end_year:
        arg_error()
        print("\"%d\" not an applicable \"start_year\". \nMust be greater than or equal to %d and larger than \"start_year\"" % (start_year, earliest_year))
        sys.exit()
    if end_year not in list(range(earliest_year, latest_year+1)):
        arg_error()
        print("\"%d\" not an applicable \"end_year\". \nMust be less than or equal to %d and larger than \"start_year\"" % (end_year, latest_year))
        sys.exit()

    plot_teams_stats_over_time(team_name_1, team_name_2, stat_name, start_year, end_year)

if __name__ == "__main__":
    main()