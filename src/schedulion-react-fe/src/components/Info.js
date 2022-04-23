import React from 'react';
import './Info.css'
import tigerlilly from './images/tigerlilly.png'
import nick from './images/nick.png'
import joey from './images/joey.png'
import andrew from './images/andrew.png'

export default function Info() {
  return (
    <div className='Info'>
      <div className='guide'>
        <h2><b>Welcome to the ScheduLion Information Page!</b></h2>
        <br></br>
        <h3><b>Our Goal</b></h3>
        <h5>Loyola Marymount University's athletic director, <a className='link' href='https://lmulions.com/staff-directory/craig-pintens/1345' target="_blank">Craig Pintens</a>, approached us with a fascinating data problem: devising a system that can construct and assist LMU's basketball coaches in constructing the best schedule of opponent teams
        for the basketball season as a function of the team's rating percentage index (RPI), special features constructed by the coaching team, and raw data provided by services like <a href='https://kenpom.com/' className='link' target="_blank">KenPom</a>.</h5>
        <br></br>
        <h3><b>Our Model</b></h3>
        <h5>The problem is that the formula used to compute RPI is not public knowledge... schedules must take into account opponents with a good ratio of RPI and likelihood of defeat, and a number of other features that will constitute the model like coaching styles and what constitutes a good <i>matchup</i>.</h5>
        <h5>Our model does just that. With the use of machine learning and artificial intelligence, ScheduLion has "ADD MORE INFO"</h5>
        <br></br>
        <h3><b>Understanding the Model</b></h3>
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
      </div>
    </div>

)}
