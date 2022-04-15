import * as React from 'react';
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
  { id: 1, gameDate: "1/1/2020", opponent: 'Gonzaga', score: 33, homeAway:'Home', quadrant:50  },
];

export default function ScheduleList() {
  return (
    <div className="GridSchedule" style={{ height: '700px', width: '80%' }}>
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
