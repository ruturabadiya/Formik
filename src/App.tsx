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

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Router>
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/addedit"  element={<AddEditUser />} />
            <Route path="/addedit/:id"  element={<AddEditUser />} />
            <Route path='/newUser' element={ <AxiosUserData/> }/>
            <Route path='/productData' element={<ProductData/>}/>
            <Route path='/addUpdateProduct' element={<AddUpdateProduct/>}/>
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

