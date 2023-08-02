import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import { TableSortControl } from "./common/CommonController/TableSortFilterControl";
import { IUser } from "../InterFace/userDataInterface";
import ReactPaginate from 'react-paginate';

const API_URL = "https://api.slingacademy.com/v1/sample-data/users";

const AxiosUserData = () => {
  const [data, setData] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    fetchData();
    
  }, [ currentPage, pageSize, searchKeyword]);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`${API_URL}?offset=${(currentPage - 1) * pageSize}&limit=${pageSize}&search=${searchKeyword}`)
      .then((response) => {
        setData(response.data.users);
        setTotalPages(Math.ceil(response.data.total_users / pageSize));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    if (selected >= 0 && selected < totalPages) {
      setCurrentPage(selected + 1);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
    setCurrentPage(1);
  };  


  const highlightSearchQuery = (text: string, searchKeyword: string): string => {
    const regex = new RegExp(searchKeyword, "gi");
    return text.replace(regex, (match: string) => `<mark>${match}</mark>`);
  };

  useEffect(() => {
    const filteredData = data.filter((user: IUser) => {
      return (
        user.first_name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        user.email.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        user.street.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        user.state.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        user.city.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        user.country.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        user.job.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    });
    setFilteredUsers(filteredData);
  }, [data, searchKeyword]);

  return (
    <>
      <div className="table">
        <div className="addSearch">
          <input
            type="text"
            placeholder="Search..."
            value={searchKeyword}
            onChange={handleSearchChange}
          />
          <input
            className="Addbutton"
            type="submit"
            value="+ Add"
          />
          <RefreshIcon onClick={handleRefresh} className="refreshBtn" />
        </div>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableSortControl
                  name="#"
                />
                <TableSortControl
                  name="First Name"
                />
                <TableSortControl
                  name="Last Name"
                />
                <TableSortControl
                  name="Email Address"
                />
                <TableSortControl
                  name="Street"
                />
                <TableSortControl
                  name="State"
                />
                <TableSortControl
                  name="Country"
                />
                <TableSortControl
                  name="City"
                />
                <TableSortControl
                  name="Job"
                />
                <TableSortControl name="Actions" />
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8}>Loading...</TableCell>
                </TableRow>
               ) : filteredUsers.length > 0 ? (
                filteredUsers.map((userData: IUser) => (
                  <TableRow key={userData.id}>
                    <TableCell className="id">{userData.id}</TableCell>
                    <TableCell dangerouslySetInnerHTML={{ __html: highlightSearchQuery(userData.first_name, searchKeyword) }}></TableCell>
                    <TableCell dangerouslySetInnerHTML={{ __html: highlightSearchQuery(userData.last_name, searchKeyword) }}></TableCell>
                    <TableCell dangerouslySetInnerHTML={{ __html: highlightSearchQuery(userData.email, searchKeyword) }}></TableCell>
                    <TableCell dangerouslySetInnerHTML={{ __html: highlightSearchQuery(userData.street, searchKeyword) }}></TableCell>
                    <TableCell dangerouslySetInnerHTML={{ __html: highlightSearchQuery(userData.state, searchKeyword) }}></TableCell>
                    <TableCell dangerouslySetInnerHTML={{ __html: highlightSearchQuery(userData.country, searchKeyword) }}></TableCell>
                    <TableCell dangerouslySetInnerHTML={{ __html: highlightSearchQuery(userData.city, searchKeyword) }}></TableCell>
                    <TableCell dangerouslySetInnerHTML={{ __html: highlightSearchQuery(userData.job, searchKeyword) }}></TableCell>
                    <TableCell className="action">
                      <Button variant="outlined" className="edit">
                        Edit
                      </Button>
                      &nbsp;
                      <Button variant="outlined" color="error" className="delete">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="noDataText">
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
          onPageChange={handlePageChange}
          containerClassName={'container'}
          previousLinkClassName={currentPage === 1 ? 'previous disabled' : 'previous'}
          breakClassName={'break'}
          nextLinkClassName={currentPage === totalPages ? 'next disabled' : 'next'}
          pageClassName={'page'}
          activeClassName={'active'}
          activeLinkClassName={currentPage === 1 ? 'active' : 'active disabled'}
          forcePage={0}
        />
      </div>
    </>
  );
};

export default AxiosUserData;
