import React, { useState, useEffect } from "react";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import { Formik, ErrorMessage, Field } from "formik";
import { IData } from "../../InterFace/commonInterface";
import { dataValidation } from "../../validate/validation";
import { TextFieldController } from "../common/TextFieldControl/TextFieldControl";
import { USERS } from "../user";
import { toast,ToastContainer } from "react-toastify";
import { showToastError, showToastSuccess } from "../../Toast/toastUtils";

const Update = () => {

  const { id } = useParams<{ id: string | undefined }>();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<IData | undefined>(undefined);
  const location = useLocation();
  const user = location.state?.user;
  
  useEffect(() => {
    const userId = parseInt(id ?? ''); // Provide a default value of an empty string if id is undefined
    const foundUser = USERS.find((user) => user.id == userId);
    setUserData(foundUser); 
  }, [id, navigate]);

  const dropdown = [
    { key: "plz select gender", value: "" },
    { key: "male", value: "Male" },
    { key: "female", value: "Female" }
  ];

  const onSubmit = (values: IData) => {
    const updatedUsers = USERS.map((user) => user.id === values.id ? values : user);
    USERS.length = 0;
    USERS.push(...updatedUsers);
    toast.success("User updated successfully");
    setTimeout(() =>{
      navigate('/');
    },2000)
  };
  const handleCancel = () => {
    navigate("/");
  };

  if (!userData) {
    return null; 
  }

  return (
    <>
      <div className="content">
        <Formik
          initialValues={userData}
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
                {dropdown.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.key}
                    </option>
                  );
                })}
              </Field>
              <div className="row p-0 m-0 w-100">
                <ErrorMessage className="text-danger" name="gender" />
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
                  Update
                </button>
                <button
                  className="button"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        limit={1}
      />
    </>
  );
};

export default Update;



