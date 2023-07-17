import React from "react";
import { Formik } from "formik";
import { IData } from "../../InterFace/commonInterface";
import { dataValidation } from "../../validate/validation";
import { TextFieldController, DropdownFieldController } from "../common/TextFieldControl/TextFieldControl";
import { USERS } from "../user";
import { useNavigate } from "react-router-dom";
import { showToastError, showToastSuccess } from "../../Toast/toastUtils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Add = () => {
  const navigate = useNavigate();

  const initialValue: IData = {
    id: 0,
    firstName: "",
    lastName: "",
    emailAddress: "",
    dOB: "",
    gender: "",
    password: "",
    cPassword: ""
  };

  const onSubmit = (values: IData, { resetForm }: { resetForm: () => void }) => {
    const emailExists = USERS.some((user) => user.emailAddress === values.emailAddress);

    if (emailExists) {
      showToastError("This Email Address already exists.");
      resetForm();
    } else {
      const nextId = USERS.length > 0 ? USERS[USERS.length - 1].id + 1 : 1; 

      const date = new Date(values.dOB);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;

      const newUser: IData = {
        ...values,
        id: nextId,
        dOB: formattedDate
      };

      USERS.push(newUser);
      showToastSuccess("User added successfully");
      resetForm();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
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
          {({ values, handleChange, handleSubmit }) => (
            <form className="row" autoComplete="off" onSubmit={handleSubmit}>
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
              <div className="form-group">
              <DatePicker
  name="dOB"
  placeholderText="Enter your Date of Birth"
  onChange={(date: Date) => {
    handleChange({ target: { name: "dOB", value: date } });
  }}
  selected={values.dOB ? new Date(values.dOB) : null}
  dateFormat="dd-MM-yyyy"
  className="form-control"
/>
              </div>
              <DropdownFieldController
                name="gender"
                onChange={handleChange}
                as="select"
                placeholder="Select your Gender"
              />
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
    </>
  );
};

export default Add;
