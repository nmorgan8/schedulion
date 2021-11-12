import { Bar } from 'react-chartjs-2';

const TempoChart = (team) => {
    return (
        <div>
            <Bar
                data = {{
                    // labels: 'Tempo',
                    datasets: [
                        {
                            label: "Loyola Marymount",
                            backgroundColor: 'rgba(0, 255, 0, 0.6)',
                            data: [3]
                        },
                        {
                            label: "Opponent",
                            backgroundColor: 'rgba(255, 0, 0, 0.6)',
                            data: [4]
                        }
                    ]
                }}
                options = {{
                    pulgins: {
                    title: {
                        display: true,
                        text: "Efficiency Match Ups",
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

export default TempoChart