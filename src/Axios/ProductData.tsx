import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { IProduct } from "../InterFace/productDataInterfaace";

const ProductData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const addedProductFromState = location.state?.addedProduct;
  const [addedProducts, setAddedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (addedProductFromState) {
      setAddedProducts([...addedProducts, addedProductFromState]);
    }
  }, [addedProductFromState]);

  const handleAddClick = () => {
            navigate("/addUpdateProduct");
        };
    
  return (
    <div className="abc">
         <div className="addSearch">
       <input className="Addbutton" type="submit" value="+ Add" onClick={handleAddClick} />
       </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "50px", height: "50px" }}
                  />
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="action">
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/addUpdateProduct/${product.id}`)}
                  >
                    Edit
                  </Button>
                  &nbsp;
                  <Button variant="outlined" color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductData;






// import React, { useState } from "react";
// import {  useNavigate } from "react-router-dom";
// import {TableContainer,Table,TableHead,TableRow,TableCell,TableBody,Button} from "@mui/material";
// import { IProduct } from "../InterFace/productDataInterfaace";

// const ProductData = () => {
//     const initialValues: IProduct = {
//         id: 0,
//         title: "",
//         price: 0.1,
//         description: "",
//         image: "",
//         category: "",
//     };

//     const navigate = useNavigate();
//     const [userData, setUserData] = useState<any>(initialValues);

//     const handleAddClick = () => {
//         navigate("/addUpdateProduct");
//     };

//     const handleEditClick = (id: number) => {
//         navigate(`/addUpdateProduct/${id}`);
//     };
//     return (
//         <div className="abc">
//             <div className="addSearch">
//           <input className="Addbutton" type="submit" value="+ Add" onClick={handleAddClick} />
//         </div>
//             <TableContainer>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Title</TableCell>
//                             <TableCell>Price</TableCell>
//                             <TableCell>Description</TableCell>
//                             <TableCell>Image</TableCell>
//                             <TableCell>Category</TableCell>
//                             <TableCell>Action</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         <TableRow>
//                             <TableCell>{userData.title}</TableCell>
//                             <TableCell>{userData.price}</TableCell>
//                             <TableCell>{userData.description}</TableCell>
//                             <TableCell>{userData.image}</TableCell>
//                             <TableCell>{userData.category}</TableCell>
//                             <TableCell className="action">
//                                 <Button variant="outlined" onClick={() => handleEditClick(userData.id)}>
//                                     Edit
//                                 </Button>
//                                 &nbsp;
//                                 <Button variant="outlined" color="error" >
//                                     Delete
//                                 </Button>
//                             </TableCell>

//                         </TableRow>
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>
//     );
// };

// export default ProductData;
