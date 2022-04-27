import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material'
import './TeamCard.css';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const GreyTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(136, 139, 141, 0.97)',
    color: 'rgba(255, 255, 255, 1)',
    boxShadow: theme.shadows[1],
    fontSize: 16,
  },
}));

export default function MediaCard({winningPercentage, ranking, opponentName, advantage, selectedSchedule, user, URL_VARIABLE, gameDate, postGameRequest}) {
  const homeTeamWP = parseInt(winningPercentage * 100)
  const awayTeamWP = parseInt(homeTeamWP)

    const wp = (
        <GreyTooltip title="Predicted win percentage based on KenPom statistics" arrow>
        <Box className='wp'
        sx={{
            display: 'flex',
            width: 200,
            height: 50,
            margin: "auto",
            alignItems: 'center',
            justifyContent: 'center',
        }}
        >
            W: {awayTeamWP}%
        </Box>
        </GreyTooltip>
    )

    const addGame = () => {
        console.log(postGameRequest)

        postGameRequest({opponentName, advantage, user, selectedSchedule, gameDate})
    }

    const rank = (
      <GreyTooltip title="Predicted NET ranking of a team based on previous year's trends and data" arrow>
        <Box className='rank'
            sx={{
                display: 'flex',
                width: 200,
                height: 50,
                margin: "auto",
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box>R: #{ranking}</Box>
        </Box>
        </GreyTooltip>
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
