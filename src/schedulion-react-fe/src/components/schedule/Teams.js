import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import TeamCard from "./TeamCard";
import loader from "../images/loader.gif";

export default function Teams({ teamsLoading, teams }) {
  const [teamCards, setTeamCards] = useState([]);

  function populateTeamCards() {
    let newArray = [];

    Object.keys(teams).forEach(function (key) {
      Object.keys(teams[key]).forEach(function (t) {
        console.log(teams[key][t]['rank'])
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
    <img src={loader} alt="loading..." />
  ) : (
    <Grid container>
      {teamCards.map((element, index) => {
        return <TeamCard key={index} oppName={element[0]} winningPercentage={element[1]} ranking={element[2]}/>;
      })}
    </Grid>
  );
}
