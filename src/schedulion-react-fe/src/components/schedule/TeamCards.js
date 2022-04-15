import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import TeamCard from "./TeamCard";
import loader from "../images/loader.gif";
import orangeLoader from '../images/orange-loader.gif';

export default function TeamCards({ teamsLoading, teams }) {
  const [teamCards, setTeamCards] = useState([]);

  function populateTeamCards() {
    let newArray = [];

    console.log(teams)

    Object.keys(teams).forEach(function (key) {
      Object.keys(teams[key]).forEach(function (t) {
        // console.log(key)
        newArray.push([t, teams[key][t]['win_pt'], teams[key][t]['rank']]);
      });
    });

    setTeamCards(newArray);
  }

  useEffect(() => {
    if (teamsLoading == false) {
      populateTeamCards();
    }
  }, [teamsLoading]);

  return teamsLoading ? (
    <img src={orangeLoader} alt="loading..." />
  ) : (
    <Grid container>
      {teamCards.map((element, index) => {
        return <TeamCard key={index} oppName={element[0]} winningPercentage={element[1]} ranking={element[2]}/>;
      })}
    </Grid>
  );
}
