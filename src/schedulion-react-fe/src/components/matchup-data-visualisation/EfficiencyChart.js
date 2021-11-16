import { Bar } from 'react-chartjs-2';

const EfficiencyChart = (eff) => {
    const LMUEfficiency = [eff.LMUOff, eff.LMUDef]
    const OppEfficiency = [eff.OppOff, eff.OppDef]
    return (
        <div>
            <Bar
                data = {{
                    labels: ["Offensive Efficiency", "Defensive Efficiency"],
                    datasets: [
                        {
                            label: "Loyola Marymount",
                            backgroundColor: 'rgba(0, 255, 0, 0.6)',
                            data: LMUEfficiency,
                        },
                        {
                            label: eff.OppName,
                            backgroundColor: 'rgba(255, 0, 0, 0.6)',
                            data: OppEfficiency,
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

export default EfficiencyChart