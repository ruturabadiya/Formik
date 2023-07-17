import * as Yup from 'yup';

const currentDate = new Date();
const minDate = new Date("1900-01-01");

export const dataValidation = Yup.object({
  id:Yup.number().required("id is required"),
  firstName: Yup.string()
    .required('First Name is required')
    .matches(/^[A-Za-z]+$/, 'First name should contain only characters')
    .min(2, 'Too short')
    .max(15, 'Too long'),
  lastName: Yup.string()
    .required('Last Name is required')
    .matches(/^[A-Za-z]+$/, 'Last name should contain only characters')
    .min(2, 'Too short')
    .max(15, 'Too long'),
  emailAddress: Yup.string().email('Invalid email').required('E-mail Address Required'),
 dOB: Yup.date()
  .max(currentDate, "Date of Birth cannot be in the future")
  .test(
    "is-after-min-date",
    "Date of Birth should be after " + minDate.toLocaleDateString(),
    value => {
      return value && value >= minDate;
    }
  )
  .required("Date of Birth is required"),
  gender :Yup.string().required("Gender Required"),
  password: Yup.string()
    .required('Password Required')
    .min(8, 'Password must have at least 8 characters')
    .matches(/[0-9]/, 'Password must contain at least one digit')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter'),
  cPassword: Yup.string().required('Conform Password required')
    .oneOf([Yup.ref("password")], "Passwords does not match"),
});