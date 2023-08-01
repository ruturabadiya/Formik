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
import { DropdownFilterControl } from "../common/CommonController/DropDownFilterControl";
import { StartDateFilterControl } from "../common/CommonController/StartDateControl";
import { formatDate, selectOptions } from "../common/CommonController/Common";
import RefreshIcon from '@mui/icons-material/Refresh';


const List = () => {
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState<IData | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<IData[]>([]);
  const [columnFilters, setColumnFilters] = useState<{ [key: string]: string }>({});
  const [genderFilter, setGenderFilter] = useState<string>("");
  const [mutableUsers, setMutableUsers] = useState(USERS);
  const [startDateFilter, setStartDateFilter] = useState<Dayjs | null>(null);
  const [resetDate, setResetDate] = useState(false);


  useEffect(() => {

    const filtered = mutableUsers.filter((user) => {
      const searchQueryLower = searchQuery.toLowerCase();

      const globalSearchMatch =
        `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`.includes(searchQueryLower) ||
        user.emailAddress.toLowerCase().includes(searchQueryLower) ||
        user.gender.toLowerCase().includes(searchQueryLower) ||
        user.password.includes(searchQuery);

      const columnFiltersMatch = Object.keys(columnFilters).every((columnName) => {
        if (columnName === "dOB" && columnFilters[columnName] !== "") {
          const [startDateStr, endDateStr] = columnFilters[columnName].split(",");
          const startDate = dayjs(startDateStr, "DD-MM-YYYY");
          const endDate = dayjs(endDateStr, "DD-MM-YYYY");
          const userDOB = dayjs(user.dOB);
          return userDOB.isBefore(endDate) && userDOB.isAfter(startDate);
        }

        if (columnName === "firstName" || columnName === "lastName") {
          const firstNameValue = columnFilters["firstName"] || "";
          const lastNameValue = columnFilters["lastName"] || "";
          const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
          return fullName.includes(firstNameValue) && fullName.includes(lastNameValue);
        }

        const value = columnFilters[columnName];
          return (
            (user as any)[columnName]?.toString().includes(value) ||
            (user as any)[columnName]?.toString().includes(value)
          );
      });
      const genderFilterMatch = !genderFilter || user.gender === genderFilter;

      const startDateFilterMatch = !startDateFilter || dayjs(user.dOB).isAfter(startDateFilter);

      return globalSearchMatch && columnFiltersMatch && genderFilterMatch && startDateFilterMatch;
    });

    setFilteredUsers(filtered);
  }, [searchQuery, columnFilters, genderFilter, mutableUsers, startDateFilter]);

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
      const index = mutableUsers.findIndex((user) => user.id === userToDelete.id);
      if (index !== -1) {
        mutableUsers.splice(index, 1);
      }

      // Update the filteredUsers state after deletion
      setFilteredUsers([...mutableUsers]);

      if (page > 0 && mutableUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length === 0) {
        setPage(page - 1);
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

  const handleSort = (columnName: string) => {
    if (sortBy === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(columnName);
      setSortOrder("asc");
    }
  };

  const highlightSearchQuery = (text: string, columnFilter: string): string => {
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

  const sortUsers = (a: any, b: any) => {
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
  };
  const sortedUsers = [...filteredUsers].sort(sortUsers);

  const handleColumnFilterChange = (columnName: string, value: string) => {
    if (columnName === "gender") {
      setGenderFilter(value); 
    } else {
      setColumnFilters((prevFilters) => ({ ...prevFilters, [columnName]: value }));
    }
    setPage(0);
  };

  const handleClearAllFilters = () => {
    setColumnFilters({});
    setGenderFilter("");
    setSearchQuery("");
    setResetDate(true);
    setStartDateFilter(null); 
  };

  const handleClearGenderFilter = () => {
    setGenderFilter('');
  };

  const handleClearStartDateFilter = () => {
    setStartDateFilter(null);
  };

  const handleFilterChange = (selectedDate: Dayjs | null) => {
    setStartDateFilter(selectedDate);
    setPage(0); 
  };


  const handleRefresh = () => {
    window.location.reload();
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
          <RefreshIcon onClick={handleRefresh} className="refreshBtn" />
        </div>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableSortControl
                  name="#"
                  onClick={() => handleSort("id")}
                  active={sortBy === "id"}
                  sortOrder={sortOrder}
                />
                <TableSortControl
                  name="User Name"
                  onClick={() => handleSort("firstName")}
                  active={sortBy === "firstName"}
                  sortOrder={sortOrder}
                />
                <TableSortControl
                  name="Email Address"
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
                <TableSortControl name="Actions" />
              </TableRow>

              <TableRow>
                <TableCell />
                <TableFilterControl
                  name="First Name"
                  filterValue={columnFilters["firstName" || "lastName"] || ""}
                  onFilterChange={(value) => handleColumnFilterChange("firstName" || "lastName", value)}
                  onClearFilter={() => handleColumnFilterChange("firstName" || "lastName", "")}
                />
                <TableFilterControl
                  name="Email Address"
                  filterValue={columnFilters["emailAddress"] || ""}
                  onFilterChange={(value) => handleColumnFilterChange("emailAddress", value)}
                  onClearFilter={() => handleColumnFilterChange("emailAddress", "")}
                />
                <TableCell className="rangePicker" >
                  <DateRangeFilterControl
                    name="DOB"
                    filterValue={columnFilters["dOB"] || ""}
                    onFilterChange={(value) => handleColumnFilterChange("dOB", value)}
                    resetDate={resetDate} 
                    onClearFilter={() => handleColumnFilterChange("dOB", "")}
                  />
                  <StartDateFilterControl
                    name="DOB"
                    filterValue={columnFilters['dOB'] || ""}
                    onFilterChange={handleFilterChange}
                    resetDate={resetDate}
                    onClearFilter={handleClearStartDateFilter}
                  />
                </TableCell>
                <TableCell className="gender">
                  <DropdownFilterControl
                    name="Gender"
                    filterValue={genderFilter}
                    onFilterChange={(value) => handleColumnFilterChange("gender", value)}
                    select={true}
                    selectOptions={selectOptions}
                    onClearFilter={handleClearGenderFilter}
                  />
                </TableCell>
                <TableFilterControl
                  name="Password"
                  filterValue={columnFilters["password"] || ""}
                  onFilterChange={(value) => handleColumnFilterChange("password", value)}
                  onClearFilter={() => handleColumnFilterChange("password", "")}
                />
                <TableCell>
                  <button onClick={handleClearAllFilters}>Clear All</button> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length > 0 ? (
                (rowsPerPage > 0 ? sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : sortedUsers).map(
                  (data) => (
                    <TableRow key={data.id}>
                      <TableCell className="id">{data.id}</TableCell>
                      <TableCell dangerouslySetInnerHTML={{ __html: highlightSearchQuery(`${data.firstName} ${data.lastName}`, columnFilters["firstName"]) }}>
                      </TableCell>
                      <TableCell dangerouslySetInnerHTML={{ __html: highlightSearchQuery(data.emailAddress, columnFilters["emailAddress"]) }}>
                      </TableCell>
                      <TableCell dangerouslySetInnerHTML={{ __html: highlightSearchQuery(formatDate(data.dOB), columnFilters["dOB"]) }}>
                      </TableCell>
                      <TableCell dangerouslySetInnerHTML={{ __html: highlightSearchQuery(data.gender, columnFilters["gender"]) }}>
                      </TableCell>
                      <TableCell dangerouslySetInnerHTML={{ __html: highlightSearchQuery(data.password, columnFilters["password"]) }}>
                      </TableCell>
                      <TableCell className="action">
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
                  <TableCell colSpan={7} className="noDataText">No Data available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[3, 6, 9]}
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
