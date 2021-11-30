import sys
from kenpompy.utils import login
import kenpompy.summary as kp
sys.path.append("../kenpom_creds")
import kenpom_creds as cred
import matplotlib.pyplot as plt
from matplotlib.ticker import MaxNLocator

browser = login(cred.login_email, cred.login_password)

def plot_stats_over_time(stat_name, season):
    stats_arr = []

    stats = kp.get_efficiency(browser, season=season)
    stats_arr = stats[stat_name].values
    
    title = '%s vs %s' % (team1_name, team2_name)
    plot_data(year_arr, team1_stats_arr, team2_stats_arr, 'year', stat_name, title, team1_name, team2_name)


def plot_data(x, y, x_label, y_label, plot_title, team1_name, team2_name):
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