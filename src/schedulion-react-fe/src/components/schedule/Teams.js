import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import TeamCard from "./TeamCard";
import loader from "../images/loader.gif";

export default function Teams({ teamsLoading, teams, rankingsLoading, rankings }) {
  const [teamCards, setTeamCards] = useState([]);

  function getRankingValue(teamName) {
    for (const key in rankings) {
      const rankingTeam = rankings[key]['team']
      if (teamName == rankingTeam) {
        const ranking = rankings[key]['True_Ranking']
        console.log(ranking)
        const found = true
        return {ranking, found}
      }
    }
    const ranking = 0
    const found = false
    return {ranking, found}
  }

  function populateTeamCards() {
    let cards = [];

    let rankedTeams = []
    for (const key in rankings) {
      rankedTeams.push(rankings[key]['team'])
    }

    for (const key in teams) {
      let cardProperties = []
      const rankingValue = getRankingValue(key)
      if (rankingValue.found) {
        const ranking = rankingValue.ranking
        console.log(ranking)
        cardProperties.push(key)
        cardProperties.push(teams[key]['away'].toFixed(2))
        cardProperties.push(ranking)
        cardProperties.push('AWAY')
        cards.push(cardProperties)
  
        cardProperties = []
        cardProperties.push(key)
        cardProperties.push(teams[key]['home'].toFixed(2))
        cardProperties.push(ranking)
        cardProperties.push('HOME')
        cards.push(cardProperties)
      }
    }


    setTeamCards(cards);
  }

  useEffect(() => {
    if (teamsLoading == false && rankingsLoading == false) {
      populateTeamCards();
    }
  }, [teamsLoading, rankingsLoading]);

  return teamsLoading || rankingsLoading ? (
    <img src={loader} alt="loading..." />
  ) : (
    <Grid container>
      {teamCards.map((element, index) => {
        return <TeamCard key={index} oppName={element[0]} winningPercentage={element[1]} ranking={element[2]} advantage={element[3]}/>;
      })}
    </Grid>
  );
}
