import React from 'react';
import Button from 'react-bootstrap/Button'
import { List, Datagrid, TextField, DateField, BooleanField, CreateButton } from 'react-admin';
import CurrentSchedule from "./CurrentSchedule";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './Create.css';
import NewGame from "./NewGame";


export default function Create(props) {
    return (
      <div className="Create">


      <CurrentSchedule/>
        <NewGame/>
      </div>
    );
}

// <Plus/>
