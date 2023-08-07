import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Field } from "formik";
import { IData } from "../../InterFace/commonInterface";
import { dataValidation } from "../../validate/validation";
import { TextFieldController } from "../common/CommonController/TextFieldControl";
import { USERS } from "../user";
import { showToastError, showToastSuccess } from "../../Toast/toastUtils";
import { DatePickerController } from "../common/CommonController/DatePickerControl";
import { DropdownFieldController } from "../common/CommonController/SelectDropDownControl";
import { selectGenderOptions } from "../common/CommonController/Common";

const EditUser = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<IData | undefined>(undefined);


  useEffect(() => {
    const userId = parseInt(id ?? "");
    const foundUser = USERS.find((user) => user.id === userId);
    setUserData(foundUser);
  }, [id, navigate]);

  const onSubmit = (values: IData) => {
    if (values.emailAddress !== userData?.emailAddress) {
      const emailExists = USERS.some(
        (user) =>
          user.emailAddress === values.emailAddress
      );
      if (emailExists) {
        showToastError("Entered email address already exists.");
        return;
      }
    }

    const updatedUser = { ...values };

    if (values.id) {
      const index = USERS.findIndex((user) => user.id === values.id);
      USERS[index] = updatedUser
    }
    else {
      USERS.push(updatedUser);
    }
    showToastSuccess("User updated successfully");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleCancel = () => {
    navigate("/");
  };



  return (
    userData ? <>
      <div className="content">
        <Formik
          initialValues={{ ...userData }}
          validationSchema={dataValidation}
          onSubmit={onSubmit}
        >
          {({ handleChange, handleSubmit, values }) => (
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
              <DatePickerController
                name="dOB"
                onChange={handleChange}
                placeholder="Enter your Date of Birth"
              />
             <DropdownFieldController
              name="gender"
              onChange={handleChange}
              selectOptions={selectGenderOptions}
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
    </>
      : <></>
  );
};

export default EditUser;

