import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Button,TablePagination} from "@mui/material";
import { USERS } from "../user";
import { TableLabelControl } from "../common/CommonController/TableLabelControl";
import DeleteUser from "./DeleteUser";
import {  } from "../../InterFace/commonInterface";
import { showToastSuccess } from "../../Toast/toastUtils";

interface IData {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  dOB: Date;
  gender: string;
  password: string;
  cPassword: string;
  [key: string]: string | number | Date;
}

const List = () => {
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState<IData | null>(null);

  const handleAddClick = () => {
    navigate("/add");
  };

  const handleEditClick = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteClick = (user: IData) => {
    setUserToDelete(user);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      const index = USERS.findIndex((user) => user.id === userToDelete.id);
      if (index !== -1) {
        USERS.splice(index, 1);
        
        if (page > 0  && USERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length === 0) {
          setPage(page - 1); 
        } else if (index >= page * rowsPerPage && index < (page + 1) * rowsPerPage) {
          setPage(page);
        }
      }
      showToastSuccess('deleted');
      setUserToDelete(null);
      setShowDeleteConfirmation(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className="table">
      <div className="addSearch">
           <input
             type="text"
             placeholder="Search..."
         />
        <input className="Addbutton" type="submit" value="+  Add" onClick={handleAddClick} />
         </div>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableLabelControl name="Id" />
                <TableLabelControl name="UserName" />
                <TableLabelControl name="EmailAddress" />
                <TableLabelControl name="DOB" />
                <TableLabelControl name="Gender" />
                <TableLabelControl name="Password" />
                <TableLabelControl name="Action" />
              </TableRow>
            </TableHead>
            <TableBody>
              {USERS.length > 0 ? (
                (rowsPerPage > 0
                  ? USERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : USERS
                ).map((data) => (
                  <TableRow key={data.emailAddress}>
                    <TableCell align="left">{data.id}</TableCell>
                    <TableCell align="left">
                      {data.firstName} {data.lastName}
                    </TableCell>
                    <TableCell align="left">{data.emailAddress}</TableCell>
                    <TableCell align="left">{data.dOB.toDateString()}</TableCell>
                    <TableCell align="left">{data.gender}</TableCell>
                    <TableCell align="left">{data.password}</TableCell>
                    <TableCell align="left">
                      <Button variant="outlined" onClick={() => handleEditClick(data.id)}>
                        Edit
                      </Button>
                      &nbsp;
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteClick(data)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>No Data available</TableCell>
                </TableRow>
              )}
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
      {showDeleteConfirmation && (
        <DeleteUser
          user={userToDelete}
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </>
  );
};

export default List;