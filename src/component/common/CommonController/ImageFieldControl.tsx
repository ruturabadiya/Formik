import React, { ChangeEvent, useEffect, useState } from 'react';
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
  const [imageUrlState, setImageUrlState] = useState<string>();
  useEffect(() => {
    if (imageUrl) {
      setFieldValue(name, imageUrl);
    }
  }, [imageUrl, name, setFieldValue]);
console.log(imageData,"xyz")
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files && e.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataURL = event.target?.result as string;
        setFieldValue(name, imageDataURL);
      };

      reader.readAsDataURL(selectedImage);
    }
  };

  return (
    <div>
      <div className="field">
        <input
          type="file"
          name={name}
          accept="image/jpg"
          onChange={handleImageChange}
        />
      </div>
      {imageData && (
        <div className="image-preview">
          <img
            src={imageData}
            alt="Selected Image"
            className="preview-image"
          />
        </div>
      )}
      <div className="row p-0 m-0 w-100">
        <ErrorMessage name={name} component="div" className="text-danger" />
      </div>
    </div>
  );
};
