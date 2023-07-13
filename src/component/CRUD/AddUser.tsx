import React from "react";
import { Formik, ErrorMessage, Field } from "formik";
import { IData } from "../../InterFace/commonInterface";
import { dataValidation } from "../../validate/validation";
import { TextFieldController } from "../common/TextFieldControl/TextFieldControl";
import { USERS } from "../user";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { showToastError, showToastSuccess } from "../../Toast/toastUtils";

const Add = () => {
  const initialValue: IData = {
    id:0,
    firstName: "",
    lastName: "",
    emailAddress: "",
    dOB: "",
    gender: "",
    password: "",
    cPassword: ""
  };
const navigate = useNavigate();
  const dropdown = [
    {key: 'plz select gender', value:""},
    {key: 'male', value: "Male"},
    {key: 'female' ,value: "Female"}
  ]

const onSubmit = (values: IData,{resetForm}:{resetForm : ()=> void}) => {
    const emailExists = USERS.some((user) => user.emailAddress === values.emailAddress);
    const idExists = USERS.some((user) => user.id  === values.id)
    if (emailExists) {
      debugger
    showToastError("This Email Address already exists.");
      resetForm();
    } 
    else if(idExists){
      showToastError("This Id already exists.");
      resetForm();
    }
    else {
      USERS.push(values);
      showToastSuccess("User added successfully");
      resetForm();
      setTimeout(() =>{
        navigate('/');
      },2000)
    }
    
    console.log(values);
    console.log(USERS);
  };

  const handleCancel = () => {
    navigate("/");
  };
  return (
    <>
    <div className="content">
    <Formik
      initialValues={initialValue}
      validationSchema={dataValidation}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleSubmit }) => (
        <form className="row" autoComplete="off" onSubmit={handleSubmit}>
          <TextFieldController
                name="id"
                onChange={handleChange}
                placeholder="Enter your id"
              />
          <TextFieldController
            name="firstName"
            onChange={handleChange}
            placeholder="Enter your FirstName"
          />
          <TextFieldController
            name="lastName"
            onChange={handleChange}
            placeholder="Enter your LastName"
          />
          <TextFieldController
            name="emailAddress"
            onChange={handleChange}
            placeholder="Enter your Email Address"
          />
          <TextFieldController
            name="dOB"
            type="date"
            onChange={handleChange}
            placeholder="Enter your Date of Birth"
          />
          <Field
            
            name="gender"
            as="select"
            onChange={handleChange}
            placeholder="Select your Gender"
          >
            {
                dropdown.map(option => {
                    return(
                        <option key={option.value} value={option.value}>{option.key}</option>
                    )
                })
            }
           
          </Field>
          <div className='row p-0 m-0 w-100'>
          <ErrorMessage className="text-danger"  name='Gender'/>
          </div>
          <TextFieldController
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Enter your Password"
          />
          <TextFieldController
            name="cPassword"
            type="password"
            onChange={handleChange}
            placeholder="Enter your Password"
          />
          <div className="AddEditButton">
            <button className="button" type="submit">
              Add
            </button>
            <button className="button" type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </Formik>
    </div>
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar closeOnClick pauseOnHover draggable limit={1} />
    </>
  );
};

export default Add;
