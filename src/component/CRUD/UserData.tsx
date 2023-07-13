import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TablePagination} from '@mui/material';
import { USERS } from '../user';
import { TableLabel } from '../common/TextFieldControl/TextFieldControl';


const List = () => {
  const navigate = useNavigate();
  
  const handleAddClick = () => {
    navigate('/add');
  };

  const handleEditClick = (id: number) => {
    navigate(`/update/${id}`);
  };
 

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="table">
      <div className="add">
        <input className="Addbutton" type="submit" value="+  Add" onClick={handleAddClick} />
      </div>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableLabel name='id'/>
              <TableLabel name='firstName'/>
              <TableLabel name='lastName'/>
              <TableLabel name='emailAddress'/>
              <TableLabel name='dOB'/>
              <TableLabel name='gender'/>
              <TableLabel name='password'/>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? USERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : USERS
            ).map((data) => (
              <TableRow key={data.emailAddress}>
                <TableCell align="left">{data.id}</TableCell>
                <TableCell align="left">{data.firstName}</TableCell>
                <TableCell align="left">{data.lastName}</TableCell>
                <TableCell align="left">{data.emailAddress}</TableCell>
                <TableCell align="left">{data.dOB}</TableCell>
                <TableCell align="left">{data.gender}</TableCell>
                <TableCell align="left">{data.password}</TableCell>
                <TableCell align="left">
                  <Button variant="outlined" onClick={() => handleEditClick(data.id)}>
                    Edit
                  </Button>
                  &nbsp;
                  <Button variant="outlined" color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 4, 6]}
        component="div"
        count={USERS.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default List;
