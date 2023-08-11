import React, { ChangeEvent, useEffect } from 'react';
import { ErrorMessage, useFormikContext } from 'formik';

interface ImageFieldControllerProps {
  name: string;
  imageUrl?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ImageFieldController: React.FC<ImageFieldControllerProps> = ({
  name,
  imageUrl,
}) => {
  const { setFieldValue, values }: any = useFormikContext();
  const imageData = values[name];

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files && e.target.files[0];
  
    // Clear any existing error message
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }
  
    if (selectedImage) {
      if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(selectedImage.type)) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerText = 'Only PNG and JPEG files are allowed';
        document.body.appendChild(toast);
  
        setFieldValue(name, null);
  
        return;
      }
  
      // if (selectedImage.size > 100 * 1024) {
      //   const toast = document.createElement('div');
      //   toast.className = 'toast';
      //   toast.innerText = 'Image size must be less than 100 KB';
      //   document.body.appendChild(toast);
  
      //   setFieldValue(name, null);
  
      //   return;
      // }
  
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataURL = event.target?.result as string;
        setFieldValue(name, imageDataURL);
      };
  
      reader.readAsDataURL(selectedImage);
    }
  };
  
  
  useEffect(() => {
    if (imageUrl) {
      setFieldValue(name, imageUrl);
    }
  }, [imageUrl, name, setFieldValue]);

  return (
    <div>
      <div className="productImage">
        <input
          type="file"
          name={name}
          accept="image/*,image/svg+xml" // Allow both JPEG and PNG files
          onChange={handleImageChange}
        />
      </div>
      {imageData && (
        <div className="image-preview">
          {imageData.startsWith('data:image/') || imageData.startsWith('https://fakestoreapi.com/img/') ? (
            <img src={imageData} alt="Selected Image" className="preview-image" />
          ) : null}
        </div>
      )}
      <div className="row p-0 m-0 w-100">
        <ErrorMessage name={name} component="div" className="text-danger" />
      </div>
    </div>
  );
};
