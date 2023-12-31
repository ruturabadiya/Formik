import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { IData } from "../../InterFace/commonInterface";
import { dataValidation } from "../../validate/validation";
import { TextFieldController} from "../common/CommonController/TextFieldControl";
import { USERS } from "../user";
import { toast } from "react-toastify";
import { DatePickerController } from "../common/CommonController/DatePickerControl";
import { DropdownFieldController } from "../common/CommonController/SelectDropDownControl";
import { selectGenderOptions } from "../common/CommonController/Common";

const AddEditUser = () => {
  const initialValues: IData = {
    id: 0,
    firstName: "",
    lastName: "",
    emailAddress: "",
    dOB: new Date(),
    gender: "",
    password: "",
    cPassword: ""
  };

  const { id } = useParams<{ id: string | undefined }>();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(initialValues);
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      const userId = parseInt(id ?? "");
      const foundUser = USERS.find((user) => user.id === userId);
      setUserData(foundUser);
    }
  });

  const onSubmit = (values: IData,{resetForm}:{resetForm: () => void }) => {
    const emailExists = USERS.some((user) => user.emailAddress === values.emailAddress);
    if (emailExists && (!isEditing || (isEditing && values.emailAddress !== userData!.emailAddress))) {
      toast.error("This Email Address already exists.");
      resetForm();
      return;
    }

    if (isEditing && userData) {
      const updatedUser = { ...values, id: userData.id };

      const index = USERS.findIndex((user) => user.id === userData.id);
      USERS[index] = updatedUser;

      toast.success("User updated successfully");
    } else {
      const nextId = USERS.length > 0 ? USERS[USERS.length - 1].id + 1 : 1;

      const newUser: IData = {
        ...values,
        id: nextId
      };

      USERS.push(newUser);
      resetForm();
      toast.success("User added successfully");
    }

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="content">
      <Formik
        initialValues={userData}
        validationSchema={dataValidation}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleSubmit }) => (
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

export default AddEditUser;
