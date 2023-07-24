import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TablePagination } from "@mui/material";
import { USERS } from "../user";
import { TableFilterControl, TableSortControl } from "../common/CommonController/TableSortFilterControl";
import DeleteUser from "./DeleteUser";
import { showToastSuccess } from "../../Toast/toastUtils";
import { DateRangeFilterControl } from "../common/CommonController/DateRangePicker";
import { IData } from "../../InterFace/commonInterface";
import dayjs, { Dayjs } from 'dayjs';

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
      // Check global search query
      const globalSearchMatch =
        `${user.firstName} ${user.lastName}`.includes(searchQuery.toLowerCase()) ||
        user.emailAddress.includes(searchQuery.toLowerCase()) ||
        user.gender.includes(searchQuery.toString()) ||
        user.password.includes(searchQuery.toString());
  
      // Check column filters (if any)
      const columnFilterMatch = Object.keys(columnFilters).every((column) => {
        if (column === "dOB" && columnFilters[column] !== "") {
          const [startDateStr, endDateStr] = columnFilters[column].split(",");
          const startDate = dayjs(startDateStr, "DD-MM-YYYY");
          const endDate = dayjs(endDateStr, "DD-MM-YYYY");
          const userDOB = dayjs(user.dOB);
          return userDOB.isBefore(endDate) && userDOB.isAfter(startDate); // Use isBefore and isAfter here
        }
  
        const value = columnFilters[column].toLowerCase();
        return (
          (user as any)[column]?.toString().toLowerCase().includes(value) ||
          (user as any)[column]?.toString().toLowerCase().includes(value)
        );
      });
  
      return globalSearchMatch && columnFilterMatch;
    });
  
    setFilteredUsers(filtered);
  }, [searchQuery, columnFilters, USERS]);
  

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

        if (page > 0 && USERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length === 0) {
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

  const highlightSearchQuery1 = (text: string, columnFilter: string): string => {
    if (columnFilter) {
      const regexFilter = new RegExp(columnFilter, 'gi');
      text = text.replace(regexFilter, (match: string) => `<mark>${match}</mark>`);
    }
    return text;
  };

  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleColumnFilterChange = (column: string, value: string) => {
    // Update column filters
    setColumnFilters((prevFilters) => ({ ...prevFilters, [column]: value }));
    setPage(0);
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

  const [filterValue, setFilterValue] = React.useState('');

  // Callback function to handle filter changes
  const handleFilterChange = (column: string, value: string) => {
    // Update column filters
    setColumnFilters((prevFilters) => ({ ...prevFilters, [column]: value }));
    setPage(0);
  };
  

  return (
    <>
      <div className="table">
        <div className="addSearch">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
          <input className="Addbutton" type="submit" value="+ Add" onClick={handleAddClick} />
        </div>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableSortControl name="#" onClick={() => handleSort("id")} active={sortBy === "id"} sortOrder={sortOrder} />
                <TableSortControl
                  name="UserName"
                  onClick={() => handleSort("firstName")}
                  active={sortBy === "firstName"}
                  sortOrder={sortOrder}
                />
                <TableSortControl
                  name="EmailAddress"
                  onClick={() => handleSort("emailAddress")}
                  active={sortBy === "emailAddress"}
                  sortOrder={sortOrder}
                />
                <TableSortControl
                  name="DOB"
                  onClick={() => handleSort("dOB")}
                  active={sortBy === "dOB"}
                  sortOrder={sortOrder}
                />
                <TableSortControl
                  name="Gender"
                  onClick={() => handleSort("gender")}
                  active={sortBy === "gender"}
                  sortOrder={sortOrder}
                />
                <TableSortControl
                  name="Password"
                  onClick={() => handleSort("password")}
                  active={sortBy === "password"}
                  sortOrder={sortOrder}
                />
              </TableRow>
              <TableRow>
                <TableCell />
                <TableFilterControl
                  name="FirstName"
                  filterValue={columnFilters["firstName" || 'lastName'] || ""}
                  onFilterChange={(value) => handleColumnFilterChange("firstName", value)}
                />
                <TableFilterControl
                  name="emailAddress"
                  filterValue={columnFilters["emailAddress"] || ""}
                  onFilterChange={(value) => handleColumnFilterChange("emailAddress", value)}
                />
                <TableCell className="rangePicker">
  <DateRangeFilterControl
    name="DOB"
    filterValue={columnFilters["dOB"] || ""}
    onFilterChange={(value) => handleFilterChange("dOB", value)} // Pass the correct column name here
  />
</TableCell>

                <TableFilterControl
                  name="gender"
                  filterValue={columnFilters["gender"] || ""}
                  onFilterChange={(value) => handleColumnFilterChange("gender", value)}
                />
                <TableFilterControl
                  name="password"
                  filterValue={columnFilters["password"] || ""}
                  onFilterChange={(value) => handleColumnFilterChange("password", value)}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length > 0 ? (
                (rowsPerPage > 0 ? sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : sortedUsers).map(
                  (data) => (
                    <TableRow key={data.id}>
                      <TableCell align="left">{data.id}</TableCell>
                      <TableCell align="left" dangerouslySetInnerHTML={{ __html: highlightSearchQuery1(`${data.firstName} ${data.lastName}`, columnFilters["firstName"]) }}>
                      </TableCell>
                      <TableCell align="left" dangerouslySetInnerHTML={{ __html: highlightSearchQuery1(data.emailAddress, columnFilters["emailAddress"]) }}>
                      </TableCell>
                      <TableCell align="center" dangerouslySetInnerHTML={{ __html: highlightSearchQuery1(data.dOB.toLocaleDateString(), columnFilters["dOB"]) }}>
                      </TableCell>
                      <TableCell align="left" dangerouslySetInnerHTML={{ __html: highlightSearchQuery1(data.gender, columnFilters["gender"]) }}>
                      </TableCell>
                      <TableCell align="left" dangerouslySetInnerHTML={{ __html: highlightSearchQuery1(data.password, columnFilters["password"]) }}>
                      </TableCell>
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
          rowsPerPageOptions={[2, 4, 6]}
          component="div"
          count={filteredUsers.length}
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
