import React from 'react';
import { Box } from '@material-ui/core';
import './Summary.css'

export default function ScheduledGames({scheduledGames}) {
  let summary = {
    win: 0,
    games: 0,
    homeRatio: 0,
    avgNET: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0
  }
  scheduledGames.forEach((team, teamIx) => {
    if (team.winPercentage >= 0.5) { summary.win++ }
    if (team.advantage === "Home") { summary.homeRatio++ }
    summary.games++
    summary.avgNET += team.ranking
    summary[team.quadrant]++
    if (scheduledGames.length - 1 === teamIx) {
        summary.avgNET = (summary.avgNET/ summary.games).toFixed(1)
        summary.homeRatio = (summary.homeRatio / summary.games).toFixed(2)
    }
  })

  return (
    <div className='Box'>
    <div className='Summary'>
      Schedule Metrics:
    </div>
      <Box className='box'
        sx={{
          display: 'inline',
          p: 0.5,
          m: 1,
          borderRadius: 2,
          fontSize: '1rem',
          fontWeight: '700',
        }}
      >
        <b>Win-Loss Ratio</b> | {summary.win}-{summary.games - summary.win}
      </Box>
      <Box className='box'
        sx={{
          display: 'inline',
          p: 0.5,
          m: 1,
          borderRadius: 2,
          fontSize: '1rem',
          fontWeight: '700',
        }}
      >
        Average NET | {summary.avgNET}
      </Box>
      <Box className='box'
        sx={{
          display: 'inline',
          p: 0.5,
          m: 1,
          borderRadius: 2,
          fontSize: '1rem',
          fontWeight: '700',
        }}
      >
        Home-Away Ratio | {summary.homeRatio}
      </Box>
      <Box className='box'
        sx={{
          display: 'inline',
          p: 0.5,
          m: 1,
          borderRadius: 2,
          fontSize: '1rem',
          fontWeight: '700',
        }}
      >
        Q1:Q2:Q3:Q4 | {summary[1]} : {summary[2]} : {summary[3]} : {summary[4]}
      </Box>
    </div>
  )
}
