import sys
import numpy as np
from kenpompy.utils import login
import kenpompy.summary as kp
# sys.path.append("../kenpom_creds")
import kenpom_creds as cred
import matplotlib.pyplot as plt
from matplotlib.ticker import MaxNLocator

### NOT COMPLETE. DO NOT USE ###

browser = login(cred.login_email, cred.login_password)

def plot_stats_over_time(stat_name, season):
    stats = kp.get_efficiency(browser, season=season).sort_values(by=[stat_name])
    stat_arr = stats[stat_name].values
    teams_arr = stats['Team'].values
    title = '%s vs %s' % (stat_name, 'Teams')
    plot_data(teams_arr, stat_arr, 'Teams', stat_name, title)
    
def plot_data(x, y, x_label, y_label, plot_title):
    fig = plt.figure()
    fig.suptitle(plot_title)
    stats_plot = fig.add_subplot(1,1,1)

    stats_plot.set_xlabel(x_label)
    stats_plot.set_ylabel(y_label)
    stats_plot.plot(x, y)

    stats_plot.legend()

    plt.show()

def main():
    efficiency_stats_names = kp.get_efficiency(browser).columns
    earliest_year = 2002
    latest_year = 2021 # Must be changed
    USAGE_MESSAGE = ('ERROR:\n'
                    '-----------------------------\n'
                    'Usage: file_name "efficiency_stat" season\n'
                    '-----------------------------')
    def arg_error():
        print(USAGE_MESSAGE)

    list_of_arguments = sys.argv
    if len(list_of_arguments) < 3:
        arg_error()
        print("Not enough arguments")
        sys.exit()

    stat_name = list_of_arguments[1]
    if stat_name not in efficiency_stats_names:
        arg_error()
        print("\"%s\" is not an applicable \"efficiency_stat\". Ensure you are using the correct spelling as provided by KenPom" % stat_name)
        print("For example, \"Tempo-Adj\", \"Off. Efficiency-Adj\", \"Def. Efficiency-Adj\", etc.")
        sys.exit()

    season = int(list_of_arguments[2])
    if season not in list(range(earliest_year, latest_year+1)):
        arg_error()
        print("\"%d\" not an applicable season. \nMust be between %d and %d" % (season, earliest_year, latest_year))
        sys.exit()

    plot_stats_over_time(stat_name, season)
    
if __name__ == "__main__":
    main()