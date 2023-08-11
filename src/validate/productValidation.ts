import * as Yup from 'yup';

const imageFileSizeValidator = async (value: any) => {
  if (!value) {
    return true; 
  }

  let response = await fetch(value);
  let data = await response.blob();
  let metadata = {
    type: 'image/jpeg'
  };
  let file = new File([data], "test.jpg", metadata);

  const fileSize = file.size;
  const maxSize = 100 * 1024; 

  return fileSize <= maxSize;
};

// const imageFileTypeValidator = async (value: any) => {
//   if (!value) {
//     return true;
//   }

//   const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];

//   if (typeof value === 'string' && value.startsWith('http')) {
//     // Fetch image data to determine its type
//     let response = await fetch(value);
//     let data = await response.blob();
//     const fileType = data.type;
//     return allowedTypes.includes(fileType);
//   }

//   // Extract the image type from the base64 string
//   const matches = value.match(/^data:(.*);base64,/);
//   if (!matches || matches.length < 2) {
//     return false; 
//   }

//   const fileType = matches[1];
//   return allowedTypes.includes(fileType);
// };

export const productValidation = Yup.object({
  title: Yup.string().required('Title is required').min(2, 'Too short'),
  price: Yup.number().required('Price is required').min(0.1, "Please enter a value greater than 0"),
  description: Yup.string().required('Description is required').min(12, 'Too short'),
  category: Yup.string().required('Please select a category'),
  image: Yup.mixed()
    .required('Image is required')
   // .test('fileType', 'Only png, jpeg, svg image files are allowed', imageFileTypeValidator)
    .test('fileSize', 'Image size must be less than 100 KB', imageFileSizeValidator),
});
