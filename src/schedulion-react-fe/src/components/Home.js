import React from 'react';
import './Home.css';
import Button from 'react-bootstrap/Button'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

export default function Home() {
    return (
      <div className="Home">
        <style type="text/css">
          {`
          .btn-xxl {
            font-size: 1.5rem;
          }
          `}
        </style>
        <Link to="/scheduling">
          <Button className="SchedulerButton" variant="outline-light" size="xxl">My Schedules</Button>
        </Link>
        <Link to="/statistics">
          <Button className="StatisticsButton" variant="outline-light" size="xxl">Statistics</Button>
        </Link>
      </div>
    );
}
