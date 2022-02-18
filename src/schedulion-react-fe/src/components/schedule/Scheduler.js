import * as React from 'react';
import './DataTable.css';
import './Scheduler.css';
import { Link } from 'react-router-dom';
import { CalendarPlus } from 'react-bootstrap-icons';
import ReactTooltip from 'react-tooltip';
import ScheduleList from './ScheduleList';
import './Create.css';
//
// import IconEvent from '@material-ui/icons/Event';
// import {
//   GridToolbarContainer,
//   GridToolbarExport,
//   gridClasses,
// } from '@mui/x-data-grid';

// const columns = [
//   { field: 'id', headerName: 'ID', width: 40 },
//   { field: 'firstName', headerName: 'Team Name', width: 200 },
//   { field: 'lastName', headerName: 'Date Scheduled', width: 200, editable: true, type: 'date' },
//   {
//     field: 'age',
//     headerName: 'Score',
//     type: 'number',
//     width: 150,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: true,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.getValue(params.id, 'firstName') || ''} ${
//         params.getValue(params.id, 'lastName') || ''
//       }`,
//   },
// ];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   { id: 10, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 11, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 12, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 13, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 14, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 15, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 16, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

// function CustomToolbar() {
//   return (
//     <GridToolbarContainer className={gridClasses.toolbarContainer}>
//       <GridToolbarExport/>
//     </GridToolbarContainer>
//   );
// }

export default function Scheduler() {
  return (
    <div className="Create">

    <text data-tip data-for="addTip" className="NewSchedule">
              <Link to="/create" className="CreateIcon">
                <CalendarPlus/>
              </Link>
              <ReactTooltip id="addTip" place="right" effect="solid">
                Create
              </ReactTooltip>
    </text>
    <ScheduleList/>
    </div>
  );
}

//         components={{
        //   Toolbar: CustomToolbar,
        // }}


// import React from 'react';
// import { Pencil, Download, CalendarPlus, Files, Trash }from 'react-bootstrap-icons';
// import { useTable } from 'react-table';
// import Table from 'react-bootstrap/Table'
// import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
// import './Scheduler.css';
// import ReactTooltip from 'react-tooltip';
//
// export default function Home() {
//     return (
//       <div className="Scheduler">
//         <div data-tip data-for="addTip" className="NewSchedule">
//           <Link to="/create">
//             <CalendarPlus/>
//           </Link>
//           <ReactTooltip id="addTip" place="right" effect="solid">
//             Create
//           </ReactTooltip>
//         </div>
//         <div className="TableContainer">
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Schedule Name</th>
//                 <th>Date Created</th>
//                 <th>Score</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>1</td>
//                 <td>Spring 2021</td>
//                 <td>01/12/2000</td>
//                 <td>12.50</td>
//                 <td>
//                 <text data-tip data-for="edit" display="inline-block">
//                   <Pencil/> &nbsp;
//                   <ReactTooltip id="edit" place="bottom" effect="solid">
//                     Edit
//                   </ReactTooltip>
//                 </text>
//                   <text data-tip data-for="clone" display="inline-block">
//                     <Files/> &nbsp;
//                     <ReactTooltip id="clone" place="bottom" effect="solid">
//                       Duplicate
//                     </ReactTooltip>
//                   </text>
//                   <text data-tip data-for="export" display="inline-block">
//                     <Download/> &nbsp;
//                     <ReactTooltip id="export" place="bottom" effect="solid">
//                       Export
//                     </ReactTooltip>
//                   </text>
//                   <text data-tip data-for="delete" display="inline-block">
//                     <Trash/>
//                     <ReactTooltip id="delete" place="bottom" effect="solid">
//                       Delete
//                     </ReactTooltip>
//                   </text>
//                 </td>
//                 </tr>
//                 <tr>
//                   <td>2</td>
//                   <td>Spring 2021</td>
//                   <td>01/12/2000</td>
//                   <td>12.50</td>
//                   <td>
//                   <text data-tip data-for="edit" display="inline-block">
//                     <Pencil/> &nbsp;
//                     <ReactTooltip id="edit" place="bottom" effect="solid">
//                       Edit
//                     </ReactTooltip>
//                   </text>
//                     <text data-tip data-for="clone" display="inline-block">
//                       <Files/> &nbsp;
//                       <ReactTooltip id="clone" place="bottom" effect="solid">
//                         Duplicate
//                       </ReactTooltip>
//                     </text>
//                     <text data-tip data-for="export" display="inline-block">
//                       <Download/> &nbsp;
//                       <ReactTooltip id="export" place="bottom" effect="solid">
//                         Export
//                       </ReactTooltip>
//                     </text>
//                     <text data-tip data-for="delete" display="inline-block">
//                       <Trash/>
//                       <ReactTooltip id="delete" place="bottom" effect="solid">
//                         Delete
//                       </ReactTooltip>
//                     </text>
//                   </td>
//                   </tr>
//                   <tr>
//                     <td>3</td>
//                     <td>Spring 2021</td>
//                     <td>01/12/2000</td>
//                     <td>12.50</td>
//                     <td>
//                     <text data-tip data-for="edit" display="inline-block">
//                       <Pencil/> &nbsp;
//                       <ReactTooltip id="edit" place="bottom" effect="solid">
//                         Edit
//                       </ReactTooltip>
//                     </text>
//                       <text data-tip data-for="clone" display="inline-block">
//                         <Files/> &nbsp;
//                         <ReactTooltip id="clone" place="bottom" effect="solid">
//                           Duplicate
//                         </ReactTooltip>
//                       </text>
//                       <text data-tip data-for="export" display="inline-block">
//                         <Download/> &nbsp;
//                         <ReactTooltip id="export" place="bottom" effect="solid">
//                           Export
//                         </ReactTooltip>
//                       </text>
//                       <text data-tip data-for="delete" display="inline-block">
//                         <Trash/>
//                         <ReactTooltip id="delete" place="bottom" effect="solid">
//                           Delete
//                         </ReactTooltip>
//                       </text>
//                     </td>
//                     </tr>
//                     <tr>
//                       <td>4</td>
//                       <td>Spring 2021</td>
//                       <td>01/12/2000</td>
//                       <td>12.50</td>
//                       <td>
//                       <text data-tip data-for="edit" display="inline-block">
//                         <Pencil/> &nbsp;
//                         <ReactTooltip id="edit" place="bottom" effect="solid">
//                           Edit
//                         </ReactTooltip>
//                       </text>
//                         <text data-tip data-for="clone" display="inline-block">
//                           <Files/> &nbsp;
//                           <ReactTooltip id="clone" place="bottom" effect="solid">
//                             Duplicate
//                           </ReactTooltip>
//                         </text>
//                         <text data-tip data-for="export" display="inline-block">
//                           <Download/> &nbsp;
//                           <ReactTooltip id="export" place="bottom" effect="solid">
//                             Export
//                           </ReactTooltip>
//                         </text>
//                         <text data-tip data-for="delete" display="inline-block">
//                           <Trash/>
//                           <ReactTooltip id="delete" place="bottom" effect="solid">
//                             Delete
//                           </ReactTooltip>
//                         </text>
//                       </td>
//                       </tr>
//                       <tr>
//                         <td>5</td>
//                         <td>Spring 2021</td>
//                         <td>01/12/2000</td>
//                         <td>12.50</td>
//                         <td>
//                         <text data-tip data-for="edit" display="inline-block">
//                           <Pencil/> &nbsp;
//                           <ReactTooltip id="edit" place="bottom" effect="solid">
//                             Edit
//                           </ReactTooltip>
//                         </text>
//                           <text data-tip data-for="clone" display="inline-block">
//                             <Files/> &nbsp;
//                             <ReactTooltip id="clone" place="bottom" effect="solid">
//                               Duplicate
//                             </ReactTooltip>
//                           </text>
//                           <text data-tip data-for="export" display="inline-block">
//                             <Download/> &nbsp;
//                             <ReactTooltip id="export" place="bottom" effect="solid">
//                               Export
//                             </ReactTooltip>
//                           </text>
//                           <text data-tip data-for="delete" display="inline-block">
//                             <Trash/>
//                             <ReactTooltip id="delete" place="bottom" effect="solid">
//                               Delete
//                             </ReactTooltip>
//                           </text>
//                         </td>
//                         </tr>
//             </tbody>
//           </Table>
//         </div>
//       </div>
//     );
// }
