import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import dayjs, { Dayjs } from "dayjs";
import { showToastSuccess } from "../Toast/toastUtils";
import { TableSortControl } from "./common/CommonController/TableSortFilterControl";
import DeleteUser from "./CRUD/DeleteUser";
import { IUser } from "../InterFace/userDataInterface";
import ReactPaginate from 'react-paginate';

const API_URL = "https://api.slingacademy.com/v1/sample-data/users";

const AxiosUserData = () => {
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState<IUser | null>(null);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [data, setData] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, search]);

  const fetchData = () => {
    setLoading(true);
    const searchQuery = search.trim().toLowerCase();
    axios
      .get(`${API_URL}?offset=${(currentPage - 1) * pageSize}&limit=${pageSize}`)
      .then((response) => {
        setData(response.data.users);
        setTotalPages(Math.ceil(response.data.total_users / pageSize));
        setLoading(false);
        console.log("success");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
        // Handle error if needed
      });
  };

  useEffect(() => {
    const sortedData = [...data].sort(sortUsers);
    setFilteredUsers(sortedData);
  }, [data, sortBy, sortOrder, search]);

  const handleAddClick = () => {
    navigate("/addedit");
  };

  const handleEditClick = (id: number) => {
    navigate(`/addedit/${id}`);
  };

  const handleDeleteClick = (user: IUser) => {
    setUserToDelete(user);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = () => {
    showToastSuccess('deleted');
    setUserToDelete(null);
    setShowDeleteConfirmation(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  const handleSort = (columnName: string) => {
    if (sortBy === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(columnName);
      setSortOrder("asc");
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
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

    if (sortBy === "first_name") {
      if (a.first_name < b.first_name) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (a.first_name > b.first_name) {
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

  const filteredData = filteredUsers.filter((user) => {
    if (!search) return true;
    return (
      user.id.toString().includes(search) ||
      user.first_name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
    //  user.date_of_birth.toLowerCase().includes(search) ||
      user.gender.toLowerCase().includes(search) ||
      user.job.toLowerCase().includes(search) ||
      user.state.toLowerCase().includes(search) ||
      user.country.toLowerCase().includes(search) ||
      user.city.toLowerCase().includes(search) 
      //user.zipcode.toLowerCase().includes(search)
    );
  });

  return (
    <>
      <div className="table">
        <div className="addSearch">
        <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search..."
            className="searchInput"
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
                  onClick={() => handleSort("first_name")}
                  active={sortBy === "first_name"}
                  sortOrder={sortOrder}
                />
                <TableSortControl
                  name="Email Address"
                  onClick={() => handleSort("email")}
                  active={sortBy === "email"}
                  sortOrder={sortOrder}
                />
                <TableSortControl
                  name="DOB"
                  onClick={() => handleSort("date_of_birth")}
                  active={sortBy === "date_of_birth"}
                  sortOrder={sortOrder}
                />
                <TableSortControl
                  name="Gender"
                  onClick={() => handleSort("gender")}
                  active={sortBy === "gender"}
                  sortOrder={sortOrder}
                />
                <TableSortControl
                  name="job"
                  onClick={() => handleSort("city")}
                  active={sortBy === "city"}
                  sortOrder={sortOrder}
                />
                <TableSortControl
                  name="state"
                  onClick={() => handleSort("city")}
                  active={sortBy === "city"}
                  sortOrder={sortOrder}
                />
                <TableSortControl
                  name="country"
                  onClick={() => handleSort("city")}
                  active={sortBy === "city"}
                  sortOrder={sortOrder}
                />
                <TableSortControl
                  name="City"
                  onClick={() => handleSort("city")}
                  active={sortBy === "city"}
                  sortOrder={sortOrder}
                />
                <TableSortControl
                  name="zipcode"
                  onClick={() => handleSort("city")}
                  active={sortBy === "city"}
                  sortOrder={sortOrder}
                />
                <TableSortControl name="Actions" />
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7}>Loading...</TableCell>
                </TableRow>
           ) : filteredData.length > 0 ? (
            filteredData.map((userData: IUser) => (
                  <TableRow key={userData.id}>
                    <TableCell className="id">{userData.id}</TableCell>
                    <TableCell>{userData.first_name} {userData.last_name}</TableCell>
                    <TableCell>{userData.email}</TableCell>
                    <TableCell>{new Date(userData.date_of_birth).toLocaleDateString()}</TableCell>
                    <TableCell>{userData.gender}</TableCell>
                    <TableCell>{userData.job}</TableCell>
                    <TableCell>{userData.state}</TableCell>
                    <TableCell>{userData.country}</TableCell>
                    <TableCell>{userData.city}</TableCell>
                    <TableCell>{userData.zipcode}</TableCell>
                    <TableCell className="action">
                      <Button variant="outlined" onClick={() => handleEditClick(userData.id)} className="edit">
                        Edit
                      </Button>
                      &nbsp;
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteClick(userData)}
                        className="delete"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="noDataText">
                    No Data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>     
      </div>
      <div className="pagination">
        	<ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
					pageCount={totalPages}
					marginPagesDisplayed={2}
          pageRangeDisplayed={5}
					onPageChange={handlePageChange}
					containerClassName={'pagination-container'}
					previousLinkClassName={'pagination-previous'}
					breakClassName={'pagination-break'}
					nextLinkClassName={'pagination-next'}
					pageClassName={'pagination-page'}
					disabledClassName={'pagination-disabled'}
					activeClassName={'pagination-active'}
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

export default AxiosUserData;
