import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './DataTable.css';
import { cloneElement } from 'react';
import { List, ListActions, Button, CreateButton, ExportButton, TopToolbar, Create } from 'react-admin';

import IconEvent from '@material-ui/icons/Event';
import {
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
} from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 40 },
  { field: 'firstName', headerName: 'Team Name', width: 200, editable: true },
  { field: 'lastName', headerName: 'Date Scheduled', width: 200, editable: true, type: 'date' },
  {
    field: 'age',
    headerName: 'Score',
    type: 'number',
    width: 150,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 10, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 11, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 12, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 13, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 14, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 15, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 16, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport/>
    </GridToolbarContainer>
  );
}

export default function CurrentSchedule() {
  return (
    <div className="Grid" style={{ height: '650px', width: '80%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[5]}
        checkboxSelection
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}
