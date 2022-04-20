/**
 * 
 * @param {[[School Name, NET Score, Win Percentage]]} teamScoreArray 
 * This function takes the NET and WP data from the models and outputs an aggregate score for each team
 * The aggregate function is: (LargestNETRanking - teamNETRanking + 1) * teamWinPercentage
 * @returns {[[[School Name, Aggregate Score]]}teamAggregateScore
 */
function aggregateRanking(teamScoreArray){
  let maxNETScore = Math.max.apply(null, teamScoreArray.map(function(row){ return row[1]; }))
  let teamAggregateScore = []
  for(teamData of teamScoreArray){
    console.log(teamData)
    teamAggregateScore.push([teamData[0], (maxNETScore - teamData[1] + 1) * teamData[2]])
  }
  return teamAggregateScore.sort(function(a, b){ return b[1] - a[1]})
}

// Uncomment this to see the function in action. The data is made up to assume that LMU is rank 50 and
// happen to have a good matchup vs the rank 25 team 'u'

// arr = [['q', 1, 0.234],
//         ['w', 2, 0.33],
//         ['e', 75, 0.44],
//         ['r', 49, 0.51],
//         ['t', 51, 0.49],
//         ['y', 100, 0.89],
//         ['u', 25, 0.46],
//         ['i', 99, 0.76],]
// console.log(aggregateRanking(arr))

// export { aggregateRanking }