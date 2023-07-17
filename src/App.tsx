import React from 'react';
import './App.css';
import Form from './component/CRUD/UserData';
import AddUser from './component/CRUD/AddUser';
import EditUser from './component/CRUD/EditUser';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/add" element={<AddUser />} />
            <Route path="/update/:id" element={<EditUser />} />
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
