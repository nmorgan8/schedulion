import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './DataTable.css';


const columns = [
  // { field: 'id', headerName: 'ID', width: 40 },
  // { field: 'firstName', headerName: 'Schedule Name', width: 200, editable: true },
  // { field: 'lastName', headerName: 'Date Scheduled', width: 200, editable: true, type: 'date' },
  // {
  //   field: 'age',
  //   headerName: 'Score',
  //   type: 'number',
  //   width: 150,
  // },
  // {
  //   field: 'fullName',
  //   headerName: 'Number of Games',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: true,
  //   width: 200,
  //   valueGetter: (params) =>
  //     `${params.getValue(params.id, 'firstName') || ''} ${
  //       params.getValue(params.id, 'lastName') || ''
  //     }`,
  // },
  { field: "gameDate", headerName: "Game Date", width: 200 },
  { field: "opponent", headerName: "Opponent", width: 200 },
  { field: "score", headerName: "Predicted Score", width: 300 },
];

const rows = [
  { id: 1, gameDate: "1/1/2020", opponent: 'Gonzaga', score: 33 },
  { id: 2, gameDate: "1/2/2020", opponent: 'BYU', score: 45 }
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
