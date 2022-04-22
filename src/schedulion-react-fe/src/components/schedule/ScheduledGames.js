import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import './DataTable.css';
import loader from '../images/loader.gif'

export default function ScheduledGames({scheduledGames, scheduledGamesLoading}) {
  let idIt = -1

  const COLUMN_LIST = [
    { field: "opponent", headerName: "Opponent", width: 200},
    { field: "advantage", headerName: "Home / Away", width: 200 },
    { field: "winPercentage", headerName: "Predicted Win Percentage", width: 200 },
    { field: "ranking", headerName: "Predicted NET", width: 200 }
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
