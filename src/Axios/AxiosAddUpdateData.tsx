import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { IProduct } from "../InterFace/productDataInterfaace";
import { productValidation } from "../validate/productValidation";
import { TextAreaController, TextFieldController } from "../component/common/CommonController/TextFieldControl";
import { DropdownFieldController } from "../component/common/CommonController/SelectDropDownControl";
import { selectProductOptions } from "../component/common/CommonController/Common";
import axios from "axios";
import { ImageFieldController } from "../component/common/CommonController/ImageFieldControl";
import { StarRatingsController } from "../component/common/CommonController/RatingControl";

const AddEditProduct = () => {
  const initialValues: IProduct = {
    id: 12,
    title: "",
    price: 0.1,
    description: "",
    image: "",
    category: "",
    rating: {
      rate: 0
    },
  };

  const { id } = useParams<{ id: string | undefined }>();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(initialValues);
  const isEditing = !!id;

  const onSubmit = (values: IProduct) => {
    const apiUrl = isEditing
      ? `https://fakestoreapi.com/products/${id}`
      : "https://fakestoreapi.com/products";

    axios({
      method: isEditing ? "PUT" : "POST",
      url: apiUrl,
      data: values,
    })
      .then((response) => {
        navigate("/productData", { state: { addedProduct: response.data } });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancel = () => {
    navigate("/productData");
  };

  return (
    <div className="content">
      <Formik
        initialValues={userData}
        validationSchema={productValidation}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleSubmit, values, setFieldValue, errors }) => (
          <form className="row" autoComplete="off" onSubmit={handleSubmit}>
            <TextFieldController
              name="title"
              onChange={handleChange}
              placeholder="Enter the Title"
            />
            <TextFieldController
              name="price"
              onChange={handleChange}
              placeholder="Enter the Price"
            />
            <TextAreaController
              name="description"
              onChange={handleChange}
              placeholder="Enter the Description"
            />
            {/* <ImageFieldController
              name="image"
              onChange={handleChange}
            /> */}
            <DropdownFieldController
              name="category"
              onChange={handleChange}
              selectOptions={selectProductOptions}
              placeholder="Select Category"
            />
            <StarRatingsController
              name="rating.rate"
              onChange={(fieldName, fieldValue) => {
                setFieldValue(fieldName, fieldValue);
              }}
              
            />
            <div className="AddEditButton">
              <button className="button" type="submit">
                {isEditing ? "Update" : "Add"}
              </button>
              <button className="button" type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddEditProduct;