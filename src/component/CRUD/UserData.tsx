import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TablePagination } from "@mui/material";
import { USERS } from "../user";
import { TableLabel } from "../common/TextFieldControl/TextFieldControl";
import DeleteUser from "./DeleteUser";
import { IData } from "../../InterFace/commonInterface";
import { showToastSuccess } from "../../Toast/toastUtils";

const List = () => {
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState<IData | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleAddClick = () => {
    navigate("/addedit");
  };

  const handleEditClick = (id: number) => {
    navigate(`/addedit/${id}`);
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

        if (page > 0 && USERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length === 0) {
          setPage(page - 1);
        } else if (index >= page * rowsPerPage && index < (page + 1) * rowsPerPage) {
          setPage(page);
        }
      }
      showToastSuccess("deleted");
      setUserToDelete(null);
      setShowDeleteConfirmation(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedUsers = [...USERS];
  sortedUsers.sort((a: any, b: any) => {
    const dateA = new Date(a[sortBy]);
    const dateB = new Date(b[sortBy]);

    if (dateA < dateB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (dateA > dateB) {
      return sortOrder === "asc" ? 1 : -1;
    }

    if (sortBy === "firstName" && a.firstName === b.firstName) {
      if (a.lastName < b.lastName) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (a.lastName > b.lastName) {
        return sortOrder === "asc" ? 1 : -1;
      }
    }

    if (a[sortBy] < b[sortBy]) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (a[sortBy] > b[sortBy]) {
      return sortOrder === "asc" ? 1 : -1;
    }
    
    return 0;
  });


  return (
    <>
      <div className="table">
        <div className="add">
          <input className="Addbutton" type="submit" value="+  Add" onClick={handleAddClick} />
        </div>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableLabel name="#" onClick={() => handleSort("id")} />
                <TableLabel name="UserName" onClick={() => handleSort("firstName")} active={sortBy === "firstName"} sortOrder={sortOrder} />
                <TableLabel name="EmailAddress" onClick={() => handleSort("emailAddress")} active={sortBy === "emailAddress"} sortOrder={sortOrder} />
                <TableLabel name="DOB" onClick={() => handleSort("dOB")} active={sortBy === "dOB"} sortOrder={sortOrder} />
                <TableLabel name="Gender" onClick={() => handleSort("gender")} active={sortBy === "gender"} sortOrder={sortOrder} />
                <TableLabel name="Password" onClick={() => handleSort("password")} active={sortBy === "password"} sortOrder={sortOrder} />
                <TableLabel name="Action" />
              </TableRow>
            </TableHead>
            <TableBody>
              {USERS.length > 0 ? (
                (rowsPerPage > 0 ? sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : sortedUsers).map(
                  (data) => (
                    <TableRow key={data.id}>
                      <TableCell align="left">{data.id}</TableCell>
                      <TableCell align="left">{data.firstName} {data.lastName}</TableCell>
                      <TableCell align="left">{data.emailAddress}</TableCell>
                      <TableCell align="left">{data.dOB}</TableCell>
                      <TableCell align="left">{data.gender}</TableCell>
                      <TableCell align="left">{data.password}</TableCell>
                      <TableCell align="left">
                        <Button variant="outlined" onClick={() => handleEditClick(data.id)}>
                          Edit
                        </Button>
                        &nbsp;
                        <Button variant="outlined" color="error" onClick={() => handleDeleteClick(data)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>No Data available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[6, 12, 18]}
          component="div"
          count={USERS.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      {showDeleteConfirmation && (
        <DeleteUser user={userToDelete} onCancel={handleDeleteCancel} onConfirm={handleDeleteConfirm} />
      )}
    </>
  );
};

export default List;
