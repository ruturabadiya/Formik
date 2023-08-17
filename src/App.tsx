import React from 'react';
import './App.css';
import List from './component/CRUD/UserDataList';
import AddEditUser from './component/CRUD/AddEditUser';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosUserData from './Axios/AxiosUserData';
import AddUpdateProduct from './Axios/AxiosAddUpdateData';
import ProductData from './Axios/ProductData';
import AddUpdate from './Axios/AddEditProduct';
import MultipleImg from './component/MultipleImage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/addedit" element={<AddEditUser />} />
            <Route path="/addedit/:id" element={<AddEditUser />} />
            <Route path='/newUser' element={<AxiosUserData />} />
            <Route path='/productData' element={<ProductData />} />
            <Route path='/addUpdateProduct' element={<AddUpdateProduct />} />
            <Route path='/addUpdate' element={<AddUpdate />} />
            <Route path='/addUpdate/:id' element={<AddUpdate />} />
            <Route path='/multipleImage' element={<MultipleImg />} />
          </Routes>
        </Router>
      </header>
      <ToastContainer
        autoClose={5000}
        position='top-right'
        closeOnClick
        limit={1}
      />
    </div>
  );
}

export default App;

