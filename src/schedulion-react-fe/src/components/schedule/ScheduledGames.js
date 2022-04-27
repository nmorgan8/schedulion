import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import './DataTable.css';
import loader from '../images/loader.gif'
import Summary from './Summary';


export default function ScheduledGames({scheduledGames, scheduledGamesLoading}) {
  let idIt = -1

  const COLUMN_LIST = [
    { field: "opponent", headerName: "Opponent", flex: 0.3},
    { field: "advantage", headerName: "Home / Away", flex: 0.2 },
    { field: "winPercentage", headerName: "Predicted Win Percentage", flex: 0.2 },
    { field: "ranking", headerName: "Predicted NET", flex: 0.2 },
    { field: "aggregate", headerName: "Strength", flex: 0.2 }
  ];

  const handleGetRowID = (e) => {
    idIt += 1
    return idIt
  }

  return (
      scheduledGamesLoading ?
      <div className="GridSchedule" style={{ height: '700px', width: '100%' }}>
        <img className='loading-gif' src={loader} alt="loading..." />
      </div> :
      <div className="GridSchedule" style={{ height: '700px', width: '100%' }}>
        <Summary 
          scheduledGames={scheduledGames}
        />
        <DataGrid
          rowHeight={75}
          columns={COLUMN_LIST}
          rows = {scheduledGames}
          getRowId={handleGetRowID}
          pageSize={15}
          rowsPerPageOptions={[5]}
          components={{ Toolbar: GridToolbar }}
        />
      </div>
  );
}
