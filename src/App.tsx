import React from 'react';
import './App.css';
import List from './component/CRUD/UserData';
import AddEditUser from './component/CRUD/AddEditUser';
// import Table from './component/CRUD/Table';
// import AddEditUser from './component/CRUD/AddUser';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/addedit"  element={<AddEditUser />} />
            <Route path="/addedit/:id"  element={<AddEditUser />} />
            {/* <Route path="/" element={<Table />} />
            <Route path="/addedit"  element={<AddEditUser />} />
            <Route path="/addedit/:id"  element={<AddEditUser />} /> */}
          </Routes>
        </Router>
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
