import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './DataTable.css';

const columns = [
  { field: "gameDate", headerName: "Game Date", width: 200, editable: true, type: 'date' },
  { field: "opponent", headerName: "Opponent", width: 200},
  { field: "score", headerName: "Predicted Score", width: 300 },
  { field: "homeAway", headerName: "Home/Away", width: 200 },
  { field: "quadrant", headerName: "Quadrant", width: 200 }
];

const rows = [
  { id: 1, gameDate: '1/1/2022', opponent: 'Baylor', score: 7, homeAway: 'home', quadrant: 4 }
]


export default function ScheduledGames() {
  return (
    <div className="GridSchedule" style={{ height: '700px', width: '100%' }}>
      <DataGrid
        rowHeight={75}
        rows={rows}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
