import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { StarRatingsController } from '../component/common/CommonController/RatingControl';
import { ImageFieldController } from '../component/common/CommonController/ImageFieldControl';
import { DropdownFieldController } from '../component/common/CommonController/SelectDropDownControl';
import { TextAreaController, TextFieldController } from '../component/common/CommonController/TextFieldControl';
import { selectProductOptions } from '../component/common/CommonController/Common';
import { IProduct } from '../InterFace/productDataInterfaace';
import { productValidation } from '../validate/productValidation';
import { Button } from '@mui/material';
import { NumberFieldController } from '../component/common/CommonController/NumberFieldControl';

const AddUpdateData = () => {

    const initialValues: IProduct = {
        id: 0,
        title: "",
        price: 0.1,
        description: "",
        image: "",
        category: "",
        rating: {
            rate: 0
        },
    };
    const { id } = useParams();
    const navigate = useNavigate();
    const isInitialRender = useRef(true);
    const [userData, setUserData] = useState<any>(initialValues);
    const [addedProduct, setAddedProduct] = useState<any>(null);

    useEffect(() => {
        if (!isInitialRender.current) {
            return;
        }
        isInitialRender.current = false;

        const fetchProduct = async () => {
            try {
                if (id) {
                    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                    setUserData(response.data);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const onSubmit = async (values: IProduct) => {
        try {
            const isNewProduct = values.id === 0;

            const requestData = {
                ...values,
                rating: { rate: values.rating.rate } // Include the rating.rate field
            };

            const url = isNewProduct
                ? 'https://fakestoreapi.com/products'
                : `https://fakestoreapi.com/products/${values.id}`;

            const requestMethod = isNewProduct ? axios.post : axios.put;

            const response = await requestMethod(url, requestData);

            console.log(isNewProduct ? 'addProduct' : 'updateProduct', 'API response:', response.data);
            setAddedProduct(response.data);
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="content">
            <Formik
                initialValues={userData}
                validationSchema={productValidation}
                enableReinitialize={true}
                onSubmit={onSubmit}
            >
                {({ handleChange, handleSubmit, setFieldValue }) => (
                    <form className="row" autoComplete="off" onSubmit={handleSubmit}>
                        <TextFieldController
                            name="title"
                            onChange={handleChange}
                            placeholder="Enter the Title"
                        />
                        <NumberFieldController
                            name="price"
                            onChange={handleChange}
                            placeholder="Enter the Price"
                        />
                        <TextAreaController
                            name="description"
                            onChange={handleChange}
                            placeholder="Enter the Description"
                        />
                        <ImageFieldController
                            name="image"
                            onChange={handleChange}
                        />

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

                        <Button type="submit" variant="contained" className='productSubmitBtn'>
                            {userData.id === 0 ? 'Add Product' : 'Update Product'}
                        </Button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default AddUpdateData;
