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
    <div className="productTable">
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
              <TableCell>Rating</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addedProducts.map((addedProduct) => (
              <TableRow key={addedProduct.id}>
                <TableCell>{addedProduct.title}</TableCell>
                <TableCell>{addedProduct.price}</TableCell>
                <TableCell>{addedProduct.description}</TableCell>
                <TableCell>
                  <img
                    src={addedProduct.image}
                    style={{ width: "50px", height: "50px" }}
                    alt="Product"
                  />
                </TableCell>
                <TableCell>{addedProduct.category}</TableCell>
                {/* <TableCell>
                  {addedProduct.rating?.rate}
                </TableCell> */}
                <TableCell className="action">
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/addUpdateProduct/${addedProduct.id}`)}
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
