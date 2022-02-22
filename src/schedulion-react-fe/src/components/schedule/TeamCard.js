import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@material-ui/core'
import { Stack } from '@mui/material'
import WinningPercentageChart from '../dev/matchup-data-visualization/WinningPercentageChart'


export default function MediaCard({teamName}) {
    const wp = (
        <Box
            sx={{
                width: 150,
                height: 150,
                margin: "auto"
            }}
        >
            <WinningPercentageChart LMU={50} Opp={50} OppName={"Gonzaga"}/>
        </Box>
    )
    
    const rank = (
        <Box
            sx={{
                display: 'flex',
                width: 150,
                height: 150,
                margin: "auto",
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box>Ranked #75</Box>
        </Box>
    )

  return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ minWidth: 300 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {teamName}
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
                <Button size="small">Select</Button>
                <Button size="small">More Details</Button>
            </CardActions>
            </Card>
        </Grid>
  );
}