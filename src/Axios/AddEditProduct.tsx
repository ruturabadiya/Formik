import React, { useState, useEffect } from 'react';
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
import MultipleImageSelect from '../component/MultipleImage';

const AddUpdateData = () => {
    const initialValues: IProduct = {
        id: 0,
        title: '',
        price: 0,
        description: '',
        image: '',
        category: '',
        rating: {
            rate: 0
        },
    };
    const { id } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState<any>(initialValues);

    useEffect(() => {
        if (id) {
            axios.get(`https://fakestoreapi.com/products/${id}`)
                .then((response) => {
                    setUserData(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching product:', error);
                });
        }
    }, [id]);

    const onSubmit = (values: IProduct) => {
        const isNewProduct = values.id === 0;

        const url = isNewProduct
            ? 'https://fakestoreapi.com/products'
            : `https://fakestoreapi.com/products/${values.id}`;

        const requestMethod = isNewProduct ? axios.post : axios.put;

        requestMethod(url, values)
            .then((response) => {
                navigate('/');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
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
                        <MultipleImageSelect
                            name="image"
                            isMulti={false}
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
