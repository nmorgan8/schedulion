import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import TeamCard from "./TeamCard";
import loader from "../../images/loader.gif";
import GameSearchBar from "./GameSearchBar";
import './SearchPanel.css'

export default function Teams({ teamsLoading, teams, rankingsLoading, rankings, selectedSchedule, user, URL_VARIABLE }) {
  const [teamCards, setTeamCards] = useState([])
  const [displayCards, setDisplayCards] = useState([])
  const [gameQuery, setGameQuery] = useState("")
  const [queryLoading, setQueryLoading] = useState(false)

  const setQuery = (e) => {
    const query = e.target.value
    setGameQuery(query)
    updateQuery(query)
  }

  function getRankingValue(teamName) {
    for (const key in rankings) {
      const rankingTeam = rankings[key]['team']
      if (teamName == rankingTeam) {
        const ranking = rankings[key]['True_Ranking']
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
        cardProperties.push(key)
        cardProperties.push(teams[key]['away'].toFixed(2))
        cardProperties.push(ranking)
        cardProperties.push('Away')
        cards.push(cardProperties)

        cardProperties = []
        cardProperties.push(key)
        cardProperties.push(teams[key]['home'].toFixed(2))
        cardProperties.push(ranking)
        cardProperties.push('Home')
        cards.push(cardProperties)
      }
    }

    setTeamCards(cards);
    setDisplayCards(cards)
  }

  function updateQuery(query) {
    setQueryLoading(true)

    let cards = teamCards
    let display = []
    let modifiedQuery = query.toLowerCase()
    for (let i = 0; i < teamCards.length; i++) {
      const modifiedTeamName = cards[i][0].toLowerCase()
      if (modifiedTeamName.includes(modifiedQuery)) {
        display.push(cards[i])
      }
    }
    setDisplayCards(display)
    setQueryLoading(false)
  }

  useEffect(() => {
    if (teamsLoading == false && rankingsLoading == false) {
      console.log(URL_VARIABLE)
      populateTeamCards();
    }
  }, [teamsLoading, rankingsLoading]);

  return teamsLoading || rankingsLoading || queryLoading ? (
    <img className='loading-gif' src={loader} alt="loading..." />
  ) : (
    <Grid container>
      <GameSearchBar
        setQuery = {setQuery}
        query = {gameQuery}
      />
      {displayCards.map((element, index) => {
        return <TeamCard key={index} opponentName={element[0]} winningPercentage={element[1]} ranking={element[2]} advantage={element[3]} selectedSchedule={selectedSchedule} user={user} URL_VARIABLE={URL_VARIABLE}/>;
      })}
    </Grid>
  );
}
