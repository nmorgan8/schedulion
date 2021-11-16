import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from "react-router-dom"
import WinningPercentageChart from './matchup-data-visualisation/WinningPercentageChart'
import EfficiencyChart from './matchup-data-visualisation/EfficiencyChart'
import TempoChart from './matchup-data-visualisation/TempoChart'

export default function Team() {
    const params = useParams("/teams/:id")
    const [APITeamData, setAPITeamData] = useState({columns: [], data: []})
    const [oppStatData, setOppStatData] = useState({winPercentage: 50, offEff: 0, defEff: 80, tempo: 0})
    const [LMUStatData, setLMUStatData] = useState({winPercentage: 50, offEff: 0, defEff: 0, tempo: 0})
    const history = useHistory()

    useEffect(() => {
        fetch('/api/get_teamstats').then(res => res.json()).then(data => {
          console.log(data)
          setAPITeamData(data)
        })
      }, []);

    useEffect(() => {
        if (!params.team) {
            history.push('/matchup')
        }
        for (let i = 0; i < APITeamData.data.length; i++) {
            if (APITeamData.data[i][1] === params.team) {
                createDataVisObject(APITeamData.data[i], setOppStatData)
            }
            if (APITeamData.data[i][1] === "Loyola Marymount") {
                createDataVisObject(APITeamData.data[i], setLMUStatData)            }
        }
    }, [APITeamData])

    function createDataVisObject(data, setFunction) {
        setFunction(
            {
                winPercentage: 50,
                offEff: parseFloat(data[5]),
                defEff: parseFloat(data[7]),
                tempo: parseFloat(data[9]),  
            } 
        )
    }

    return (
    <div>
        <p>{params.team}</p>
        <WinningPercentageChart LMU={LMUStatData.winPercentage} Opp={oppStatData.winPercentage} OppName={params.team}/>
        <EfficiencyChart LMUOff={LMUStatData.offEff} OppOff={oppStatData.offEff} LMUDef={LMUStatData.defEff} OppDef={oppStatData.defEff} OppName={params.team}/>
        <TempoChart LMU={LMUStatData.tempo} Opp={oppStatData.tempo} OppName={params.team}/>
    </div>
    )
}