import React, { ChangeEvent, useEffect, useState } from 'react';
import { ErrorMessage, useFormikContext } from 'formik';
import { showToastError } from '../../../Toast/toastUtils';

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
  const defaultFileName = imageData ? imageData.substring(imageData.lastIndexOf('/') + 1) : '';

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files && e.target.files[0];

    if (!selectedImage) {
      // Reset the imageData when no file is selected
        setFieldValue(name, null);
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(selectedImage.type)) {
      e.target.value = '';
      showToastError("Only png, jpeg, svg files are allowed");
      setFieldValue(name, null);
      return;
  }
  

    // Size validation
    const maxSize = 100 * 1024; 
    if (selectedImage.size > maxSize) {
      e.target.value = '';
      showToastError('Image size must be less than 100 KB');
      setFieldValue(name,null);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageDataURL = event.target?.result as string;
      setFieldValue(name, imageDataURL);
    };

    reader.readAsDataURL(selectedImage);
  };
  return (
    <div>
      <div className="productImage">
      <input
          type="file"
          name={name}
          accept="image/*,image/svg+xml"
          onChange={handleImageChange}
        />
      </div>
      {imageData && (
        <>
        <span>{defaultFileName.endsWith('.jpg') ? defaultFileName : null}</span>
        <div className="image-preview">
          <img src={imageData} alt="Selected Image" className="preview-image" />
        </div>
        </>
      )}
        
      <div className="row p-0 m-0 w-100">
        <ErrorMessage name={name} component="div" className="text-danger" />
      </div>
    </div>
  );
};


{/* {imageData && (
  <div className="image-preview">
    {imageData.startsWith('data:image/') || imageData.startsWith('https://fakestoreapi.com/img/') ? (
      <img src={imageData} alt="Selected Image" className="preview-image" />
        ) : null}
        </div>
      )} */}