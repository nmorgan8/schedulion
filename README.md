# Scedulion

## Check out our deployed application
[Schedulion](https://schedulion.vercel.app/information)

## Our Goal
Loyola Marymount University's athletic director, Craig Pintens, approached us with a fascinating data problem: devising a system that can construct and assist LMU's basketball coaches in constructing the best schedule of opponent teams for the basketball season as a function of the team's NCAA evaluation tool (NET) ranking, special features constructed by the coaching team, and raw data provided by services like KenPom.

## Our Model
The problem is that the exact formula used to compute NET ranking is not public knowledge... schedules must take into account opponents with a good ratio of NET ranking and likelihood of defeat, and a number of other features that will constitute the model like coaching styles and what constitutes a good matchup.
Our model does just that. With the use of machine learning and artificial intelligence, ScheduLion uses two models to assist in this task; the NET prediction model and the win percentage model.

## Understanding the Model
The NET prediction model is based on the prior year's Kenpom data and trained on the last decades worth of data. It predicts what NET ranking a team will have at the end of the next season.
The Win percentage model outputs an estimated win percentage that one team (LMU) has against another team. While these numbers are not perfect, they will provide you with new information from a statistical and machine learning standpoint.
Each team has an Expected Utility (+/-) score associated with them. The expected utility scores indicate how highly the models recommend adding that team to the schedule. A higher expected utility score denotes a higher recommendation.
