import { Bar } from 'react-chartjs-2';

const TempoChart = (tempo) => {
    const LMUTempo = [tempo.LMU]
    const oppTempo = [tempo.Opp]
    return (
        <div>
            <Bar
                data = {{
                    labels: ['Tempo'],
                    datasets: [
                        {
                            label: "Loyola Marymount",
                            backgroundColor: 'rgba(0, 255, 0, 0.6)',
                            data: LMUTempo,
                        },
                        {
                            label: tempo.OppName,
                            backgroundColor: 'rgba(255, 0, 0, 0.6)',
                            data: oppTempo
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