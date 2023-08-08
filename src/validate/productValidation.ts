import * as Yup from 'yup';

export const productValidation = Yup.object({
  id: Yup.number().required("id is required"),
  title: Yup.string()
    .required('Title is required')
    .min(2, 'Too short'),
  price: Yup.number().required("price is required"),
  description: Yup.string()
    .required('Description is required')
    .min(12, 'Too short'),
  category: Yup.string().required("Please select a category"),
  image: Yup.string().required("Please select a category"),
  rating: Yup.object({
    rate: Yup.number()
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating must be at most 5')
      .required('Rating is required'),
  }).required('Rating is required'),
});

