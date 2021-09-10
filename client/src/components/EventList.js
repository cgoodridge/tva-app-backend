import React from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import moment from 'moment';


  const columns = [
    { id: 'code', type:'string', label: 'Event', minWidth: 170 },
    { 
      id: 'dateTime', 
      label: 'Date',
      type:'date', 
      minWidth: 100,
      format: (value) => moment(value).format("MMM-DD-YYYY"),
    },
    {
      id: 'dateTime',
      label: 'Time',
      type:'time',
      minWidth: 170,
      align: 'left',
      format: (value) => moment(value).format("h:mm a"),
    },
    {
      id: 'location',
      label: 'Location',
      type:'string',
      minWidth: 170,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    
  ];
  

const EventList = ({ nexusEvents }) => (

    <>
    
    
      <TableContainer className="tableContainer">
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow>
              {columns.map((column, key) => (
                <TableCell
                  key={key}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
                <TableCell>
                  Actions
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nexusEvents.map((row,key) => {
              {console.log(row['code'])}

              return (
                <TableRow hover tabIndex={-1} key={key}>
                  {columns.map((column, key) => {
                    const value = row[column.id];

                    return (
                      <TableCell key={key} align={column.align}>

                          {column.format && column.type === 'string' ? value : column.format && column.type === 'date' ? column.format(value) : column.format && column.type === 'time' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  <TableCell> 
                    <Link key={key} to={`/event/${row['code']}`} >
                      <Button variant="outlined" size="small" color="primary">
                        View Event
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

    
    
    </>
);


export default EventList;