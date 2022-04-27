import React from 'react';
import './Info.css'
import tigerlilly from './images/tigerlilly.png'
import nick from './images/nick.png'
import joey from './images/joey.png'
import andrew from './images/andrew.png'
import lmu from './images/lmu_logo.jpg'

export default function Info() {
  return (
    <div className='Info'>
      <div className='guide'>
        <h2><b>Welcome to the ScheduLion Information Page!</b></h2>
        <br></br>
        <h3><b>Our Goal</b></h3>
        <h5>Loyola Marymount University's athletic director, <a className='link' href='https://lmulions.com/staff-directory/craig-pintens/1345' target="_blank">Craig Pintens</a>, approached us with a fascinating data problem: devising a system that can construct and assist LMU's basketball coaches in constructing the best schedule of opponent teams
        for the basketball season as a function of the team's NCAA evaluation tool (NET) ranking, special features constructed by the coaching team, and raw data provided by services like <a href='https://kenpom.com/' className='link' target="_blank">KenPom</a>.</h5>
        <br></br>
        <h3><b>Our Model</b></h3>
        <h5>The problem is that the exact formula used to compute NET ranking is not public knowledge... schedules must take into account opponents with a good ratio of NET ranking and likelihood of defeat, and a number of other features that will constitute the model like coaching styles and what constitutes a good <i>matchup</i>.</h5>
        <h5>Our model does just that. With the use of machine learning and artificial intelligence, ScheduLion uses two models to assist in this task; the NET prediction model and the win percentage model.</h5>
        <br></br>
        <h3><b>Understanding the Model</b></h3>
        <h5>The NET prediction model is based on the prior year's Kenpom data and trained on the last decades worth of data. It predicts what NET ranking a team will have at the end of the next season.</h5>
        <h5>The Win percentage model outputs an estimated win percentage that one team (LMU) has against another team. While these numbers are not perfect, they will provide you with new information from a statistical and machine learning standpoint. </h5>
        <h5>Each team has an <i>Expected Utility (+/-)</i> score associated with them. The expected utility scores indicate how highly the models recommends adding that team to the schedule. A higher expected utility score denotes a higher recommendation</h5>
        <br></br>
        <h3><b>Meet The Team</b></h3>
        <div className='Profiles'>
          <img className='Person' src={joey} alt="Joey Ortiz" />
          <img className='Person' src={nick} alt="Nick Morgan" />
          <img className='Person' src={tigerlilly} alt="Tigerlilly Zietz" />
          <img className='Person' src={andrew} alt="Andrew Seaman" />
        </div>
        <div className='Names'>
          <h6 className='Name'>Joey Ortiz</h6>
          <h6 className='Name'>Nick Morgan</h6>
          <h6 className='Name'>Tigerlilly Zietz</h6>
          <h6 className='Name'>Andrew Seaman</h6>
        </div>

        <br></br>
        <h3><b>Contact Us</b></h3>
        <h5>Questions or comments? Email us at <a href='mailto:schedulion@gmail.com' className='link'>schedulion@gmail.com</a>!</h5>
        <br></br>
        <img className='lmu-logo' src={lmu} alt="LMU Logo"/>
      </div>
    </div>

)}
