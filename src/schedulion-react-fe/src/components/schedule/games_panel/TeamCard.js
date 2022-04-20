import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material'
import './TeamCard.css';


export default function MediaCard({winningPercentage, ranking, opponentName, advantage, selectedSchedule, user, URL_VARIABLE}) {
    const homeTeamWP = winningPercentage * 100
    const awayTeamWP = 100 - homeTeamWP

    const postGameRequest = (body) => {
        URL = URL_VARIABLE + 'add_game'
        return fetch(URL, {
          'method': 'POST',
          headers : {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(responseJson => refreshPage(responseJson))
        .catch(error => console.log(error))
    }

    function refreshPage(response) {
        console.log(response)
    }

    const wp = (
        <Box className='wp'
        sx={{
            display: 'flex',
            width: 150,
            height: 150,
            margin: "auto",
            alignItems: 'center',
            justifyContent: 'center',
        }}
        >
            {awayTeamWP}
        </Box>
    )

    const addGame = () => {
        postGameRequest({opponentName, advantage, user, selectedSchedule})
    }

    const rank = (
        <Box className='rank'
            sx={{
                display: 'flex',
                width: 150,
                height: 150,
                margin: "auto",
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box>{ranking}</Box>
        </Box>
    )

  return (
            <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {opponentName} ({advantage})
                </Typography>
                <Stack style={{
                    display: "flex",
                    flexDirection: "row"
                }}>
                {wp}
                {rank}
                </Stack>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={addGame}
                >
                    Select
                </Button>
            </CardActions>
            </Card>
  );
}
