import React from 'react';
import './App.css';
import Form from './component/CRUD/UserData';
import Add from './component/CRUD/AddUser';
import Update from './component/CRUD/EditUser';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/add" element={<Add />} />
            <Route path="/update/:id" element={<Update />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
