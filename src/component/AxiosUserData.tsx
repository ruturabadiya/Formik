import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, MenuItem, Select } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import { TableSortControl } from "./common/CommonController/TableSortFilterControl";
import { IUser } from "../InterFace/userDataInterface";
import ReactPaginate from 'react-paginate';

const API_URL = "https://api.slingacademy.com/v1/sample-data/users";

const AxiosUserData = () => {
  const [data, setData] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const isInitialRender = useRef(true);
  const [tableOptions, setTableOptions] = useState({
    currentPage: 1,
    pageSize: 5,
    totalPages: 1
  });
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    if (refreshData) {
      fetchData();
      setRefreshData(false);
    }
  }, [refreshData]);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    setLoading(true);
    fetchData();
  }, [tableOptions.currentPage, tableOptions.pageSize, searchKeyword]);


  const fetchData = () => {
    setLoading(true);
    let apiUrl = `${API_URL}?offset=${(tableOptions.currentPage - 1) * tableOptions.pageSize}&limit=${tableOptions.pageSize}`;
    if (searchKeyword) {
      apiUrl += `&search=${encodeURIComponent(searchKeyword)}`;
    }
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data.users);
        setTableOptions((prevOptions) => ({
          ...prevOptions,
          totalPages: Math.ceil(response.data.total_users / tableOptions.pageSize)
        }));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      });

  };

  const handleRefresh = () => {
    setData([]);
    setSearchKeyword("");
    setTableOptions((prevOptions) => ({
      ...prevOptions,
      currentPage: 1,
      pageSize: 5,
      totalPages: 1 
    }));
    setRefreshData(true);
  };


  const handlePageChange = ({ selected }: { selected: number }) => {
    if (selected >= 0 && selected < tableOptions.totalPages) {
      setTableOptions((prevOptions) => ({
        ...prevOptions,
        currentPage: selected + 1
      }));
    }
  };

  const handlePageSizeChange = (event: any) => {
    const newPageSize = event.target.value as number;
    setTableOptions((prevOptions) => ({
      ...prevOptions,
      pageSize: newPageSize,
      currentPage: 1
    }));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
    setTableOptions((prevOptions) => ({
      ...prevOptions,
      currentPage: 1
    }));
  };

  const highlightSearchQuery = (text: string, searchKeyword: string): string => {
    const regex = new RegExp(searchKeyword, "gi");
    return text.replace(regex, (match: string) => `<mark>${match}</mark>`);
  };

  return (
    <>
      <div className="table">
        <div className="addSearch">
          <input
            className="searchInput"
            type="text"
            placeholder="Search..."
            value={searchKeyword}
            onChange={handleSearch}
          />
          <RefreshIcon onClick={handleRefresh} className="refreshBtn" />
        </div>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableSortControl name="#" />
                <TableSortControl name="First Name" />
                <TableSortControl name="Last Name" />
                <TableSortControl name="Email Address" />
                <TableSortControl name="Street" />
                <TableSortControl name="State" />
                <TableSortControl name="Country" />
                <TableSortControl name="City" />
                <TableSortControl name="Job" />
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8}>Loading...</TableCell>
                </TableRow>
              ) : data.length > 0 ? (
                data.map((userData: IUser) => (
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
        <div className="pagination">
          <Select value={tableOptions.pageSize} onChange={handlePageSizeChange} className="pageSize">
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={tableOptions.totalPages}
            onPageChange={handlePageChange}
            containerClassName={'container'}
            previousLinkClassName={tableOptions.currentPage === 1 ? 'previous disabled' : 'previous'}
            breakClassName={'break'}
            nextLinkClassName={(tableOptions.currentPage - 1) === tableOptions.totalPages ? 'next disabled' : 'next'}
            pageClassName={'page'}
            activeClassName={'active'}
            forcePage={tableOptions.currentPage - 1}
          />
        </div>
      </div>

    </>
  );
};

export default AxiosUserData;
