import React from 'react';
import { Box } from '@material-ui/core';

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
    <div>
      <Box
        sx={{
          display: 'inline',
          p: 0.5,
          m: 1,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        Schedule Summary:
      </Box>
      <Box
        sx={{
          display: 'inline',
          p: 0.5,
          m: 1,
          border: '1px solid',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        W-L | {summary.win}-{summary.games - summary.win}
      </Box>      
      <Box
        sx={{
          display: 'inline',
          p: 0.5,
          m: 1,
          border: '1px solid',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        AVG NET | {summary.avgNET}
      </Box>
      <Box
        sx={{
          display: 'inline',
          p: 0.5,
          m: 1,
          border: '1px solid',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        Home-Away Ratio | {summary.homeRatio}
      </Box>
      <Box
        sx={{
          display: 'inline',
          p: 0.5,
          m: 1,
          border: '1px solid',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        Q1:Q2:Q3:Q4 | {summary[1]}:{summary[2]}:{summary[3]}:{summary[4]}
      </Box>            
    </div>
  )
}