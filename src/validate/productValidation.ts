import * as Yup from 'yup';

export const productValidation = Yup.object({
  id:Yup.number().required("id is required"),
  title: Yup.string()
    .required('Title is required')
    .min(2, 'Too short'),
  price:Yup.number().required("price is required"),
  description:Yup.string()
  .required('Title is required')
  .min(12, 'Too short'),
  category:Yup.string().required("Plz select category "),
  image:Yup.string().required("image is required")
});