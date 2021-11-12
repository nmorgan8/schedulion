import { Doughnut } from 'react-chartjs-2';

const WinningPercentageChart = (team) => {
    return (
        <div>
            <Doughnut
                data = {{
                    labels: ['Loyola Marymount', {team}],
                    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
                    datasets: [
                        {
                          label: ['Loyola Marymount', 'Opponent'],
                          data: [50, 50],
                          // you can set indiviual colors for each bar
                          backgroundColor: [
                            'rgba(0, 255, 0, 0.6)',
                            'rgba(255, 0, 0, 0.6)',
                          ],
                          borderWidth: 1,
                        },
                        {
                            label: ['Loyola Marymount', 'Opponent'],
                            data: [50, 50],
                            // you can set indiviual colors for each bar
                            backgroundColor: [
                              'rgba(0, 255, 0, 0.6)',
                              'rgba(255, 0, 0, 0.6)',
                            ],
                            borderWidth: 1,
                          }
                    ]
                }}
                options = {{
                    pulgins: {
                    title: {
                        display: true,
                        text: "Estimated Winning Percentage",
                    },
                    legend: {
                        display: true,
                        position: "bottom",
                    }
                    }
                }}
            />
        </div>
    );
};

export default WinningPercentageChart