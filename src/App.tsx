import React from 'react';
import './App.css';
// import List from './component/CRUD/UserDataList';
// import AddEditUser from './component/CRUD/AddEditUser';
import Table from './component/CRUD/Table';
import AddUser from './component/CRUD/AddUser';
import EditUser from './component/CRUD/EditUser';
//import Filter from './component/CRUD/ColumnFilter';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Router>
          <Routes>
            {/* <Route path="/" element={<List />} />
            <Route path="/addedit"  element={<AddEditUser />} />
            <Route path="/addedit/:id"  element={<AddEditUser />} /> */}
            <Route path="/" element={<Table />} />
            <Route path="/add"  element={<AddUser />} />
            <Route path="/edit/:id"  element={<EditUser />} />
           </Routes>
        </Router> 
        {/* <Filter /> */}
      </header>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        limit={1}
      />
    </div>
  );
}

export default App;
