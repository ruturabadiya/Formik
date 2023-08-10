import * as Yup from 'yup';

const imageFileSizeValidator = async (value: any) => {
  if (!value) {
    return true;
  }
  const maxSize = 100 * 1024;
  return value.size <= maxSize;
};

const imageFileTypeValidator = (value: any) => {
  if (!value) {
    return true;
  }
  const allowedTypes = ['image/png', 'image/jpeg','image/svg+xml'];
  return allowedTypes.includes(value.type);
};

export const productValidation = Yup.object({
  title: Yup.string().required('Title is required').min(2, 'Too short'),
  price: Yup.number().required('Price is required').min(0.1, 'Please enter a value greater than 0'),
  description: Yup.string().required('Description is required').min(12, 'Too short'),
  category: Yup.string().required('Please select a category'),
  image: Yup.mixed()
  .required('Image is required')
  .test('fileType', 'Only PNG and JPEG image files are allowed', imageFileTypeValidator)
  .test('fileSize', 'Image size must be less than 100 KB', imageFileSizeValidator),
});
