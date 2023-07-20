import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TablePagination } from "@mui/material";
import { USERS } from "../user";
import { TableLabelControl } from "../common/CommonController/TableLabelControl";
import DeleteUser from "./DeleteUser";
import { IData } from "../../InterFace/commonInterface";
import { showToastSuccess } from "../../Toast/toastUtils";

const List = () => {
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState<IData | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<IData[]>([]);
  const [columnFilters, setColumnFilters] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const filtered = USERS.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const emailAddress = user.emailAddress.toLowerCase();

      // Check global search query
      const globalSearchMatch =
        fullName.includes(searchQuery.toLowerCase()) ||
        emailAddress.includes(searchQuery.toLowerCase());

      // Check column filters (if any)
      const columnFilterMatch = Object.keys(columnFilters).every((column) => {
        const value = columnFilters[column].toLowerCase();
        return (
          (user as any)[column as keyof IData]?.toString().toLowerCase().includes(value) ||
          (user as any)[column as keyof IData]?.toString().toLowerCase().includes(value)
        );
      });

      return globalSearchMatch && columnFilterMatch;
    });

    setFilteredUsers(filtered);
  }, [searchQuery, columnFilters, USERS]);

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

        const filtered = USERS.filter((user) => {
          const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
          const emailAddress = user.emailAddress.toLowerCase();
          return (
            fullName.includes(searchQuery.toLowerCase()) ||
            emailAddress.includes(searchQuery.toLowerCase())
          );
        });
        setFilteredUsers(filtered);

        if (filtered.length === 0) {
          setPage(0);
        } else if (
          page > 0 &&
          filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .length === 0
        ) {
          setPage(page - 1);
        } else if (
          index >= page * rowsPerPage &&
          index < (page + 1) * rowsPerPage
        ) {
          setPage(page);
        }
      }
      showToastSuccess('User deleted successfully!');
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

  const sortedUsers = [...filteredUsers];
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

  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const highlightSearchQuery = (text: string, searchQuery: string): string => {
    const regex = new RegExp(searchQuery, "gi");
    return text.replace(regex, (match: string) => `<mark>${match}</mark>`);
  };

  const handleColumnFilterChange = (column: string, value: string) => {
    // Update column filters
    setColumnFilters((prevFilters) => ({ ...prevFilters, [column]: value }));
    setPage(0); // Reset page when column filter changes
  };

  return (
    <>
      <div className="table">
        <div className="addSearch">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            placeholder="Search..."
          />
            {/* <input
            type="text"
            value={columnFilters["firstName"] || ""}
            onChange={(e) => handleColumnFilterChange("firstName", e.target.value)}
            placeholder="Filter by First Name"
          /> */}
          <input className="Addbutton" type="submit" value="+  Add" onClick={handleAddClick} />
        </div>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableLabelControl name="#" onClick={() => handleSort("id")} active={sortBy === "id"} sortOrder={sortOrder} />
                <TableLabelControl
                  name="UserName"
                  onClick={() => handleSort("firstName")}
                  active={sortBy === "firstName"}
                  sortOrder={sortOrder}
                  filterValue={columnFilters["firstName"] || ""} // Pass filterValue
                  onFilterChange={(value) => handleColumnFilterChange("firstName", value)} // Pass onFilterChange
                />
                <TableLabelControl name="EmailAddress" onClick={() => handleSort("emailAddress")} active={sortBy === "emailAddress"} sortOrder={sortOrder} 
                filterValue={columnFilters["emailAddress"] || ""} // Pass filterValue
                onFilterChange={(value) => handleColumnFilterChange("emailAddress", value)}/>
                <TableLabelControl name="DOB" onClick={() => handleSort("dOB")} active={sortBy === "dOB"} sortOrder={sortOrder} 
                filterValue={columnFilters["dOB"] || ""} // Pass filterValue
                onFilterChange={(value) => handleColumnFilterChange("dOB", value)}/>
                <TableLabelControl name="Gender" onClick={() => handleSort("gender")} active={sortBy === "gender"} sortOrder={sortOrder} 
                filterValue={columnFilters["gender"] || ""} // Pass filterValue
                onFilterChange={(value) => handleColumnFilterChange("gender", value)}/>
                <TableLabelControl name="Password" onClick={() => handleSort("password")} active={sortBy === "password"} sortOrder={sortOrder} 
                filterValue={columnFilters["password"] || ""} // Pass filterValue
                onFilterChange={(value) => handleColumnFilterChange("password", value)}/>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length > 0 ? (
                (rowsPerPage > 0 ? sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : sortedUsers).map(
                  (data) => (
                    <TableRow key={data.id}>
                      <TableCell align="left">{data.id}</TableCell>
                      <TableCell align="left" dangerouslySetInnerHTML={{ __html: highlightSearchQuery(`${data.firstName} ${data.lastName}`, searchQuery) }}></TableCell>
                      <TableCell align="left" dangerouslySetInnerHTML={{ __html: highlightSearchQuery(data.emailAddress, searchQuery) }}></TableCell>
                      <TableCell align="left" dangerouslySetInnerHTML={{ __html: highlightSearchQuery(data.dOB.toDateString(), searchQuery) }}></TableCell>
                      <TableCell align="left" dangerouslySetInnerHTML={{ __html: highlightSearchQuery(data.gender, searchQuery) }}></TableCell>
                      <TableCell align="left" dangerouslySetInnerHTML={{ __html: highlightSearchQuery(data.password, searchQuery) }}></TableCell>
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
                  <TableCell  colSpan={7}>No Data available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[2, 4, 6, 8]}
          component="div"
          count={filteredUsers.length}
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