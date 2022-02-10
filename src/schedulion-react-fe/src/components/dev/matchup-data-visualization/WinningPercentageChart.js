import { Doughnut } from 'react-chartjs-2';

const WinningPercentageChart = (team) => {
    return (
        <div>
            <Doughnut
                data = {{
                    labels: ['Loyola Marymount', 'Opponent'],
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