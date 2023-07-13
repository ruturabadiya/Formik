import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, ErrorMessage, Field } from "formik";
import { IData } from "../../InterFace/commonInterface";
import { dataValidation } from "../../validate/validation";
import { TextFieldController } from "../common/TextFieldControl/TextFieldControl";
import { USERS } from "../user";
import { ToastContainer } from "react-toastify";
import { showToastError, showToastSuccess } from "../../Toast/toastUtils";

const Update = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [initialValue, setInitialValue] = useState<IData>({
    id: 0,
    firstName: "",
    lastName: "",
    emailAddress: "",
    dOB: "",
    gender: "",
    password: "",
    cPassword: ""
  });

  useEffect(() => {
    if (id) {
        debugger
      const userId = parseInt(id);
      const user = USERS.find((user) => user.id === userId);

      if (user) {
        debugger
        setInitialValue(user);
      } else {
        debugger
        navigate("/");
      }
    } else {
        debugger
      navigate("/");
    }
  }, [id, navigate]);

  const dropdown = [
    { key: "plz select gender", value: "" },
    { key: "male", value: "Male" },
    { key: "female", value: "Female" }
  ];

  const onSubmit = (values: IData, { resetForm }: { resetForm: () => void }) => {
    const emailExists = USERS.some(
      user => user.emailAddress === values.emailAddress
    );

    if (emailExists) {
      showToastError("This Email Address already exists.");
      resetForm();
    } else {
      // Update the user object in the USERS array
      const updatedUsers = USERS.map(user =>
        user.id === values.id ? values : user
      );
      // Update the USERS array
      // Assuming USERS is a mutable array, otherwise, you should use a state management solution
      USERS.length = 0;
      USERS.push(...updatedUsers);
      
      showToastSuccess("User updated successfully");
      navigate("/");
    }

    console.log(values);
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
                {dropdown.map(option => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.key}
                    </option>
                  );
                })}
              </Field>
              <div className="row p-0 m-0 w-100">
                <ErrorMessage className="text-danger" name="Gender" />
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
                <button className="button" type="button" onClick={handleCancel}>
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
