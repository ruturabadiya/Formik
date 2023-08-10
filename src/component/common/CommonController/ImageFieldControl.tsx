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

  useEffect(() => {
    if (imageUrl && !values[name]) {
      setFieldValue(name, imageUrl);
    }
  }, [imageUrl, name, setFieldValue, values]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files && e.target.files[0];

    if (selectedImage) {   
        setFieldValue(name, selectedImage);
    }
  };
console.log(imageData,"rutu")
  const isValidImageType = (type: string): boolean => {
    return type === 'image/jpeg' || type === 'image/png';
  };

  return (
    <div>
      <div className="productImage">
        <input
          type="file"
          name={name}
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      {imageData && isValidImageType(imageData.type) && (
        <div className="image-preview">
          <img src={imageData?URL.createObjectURL(imageData): imageData}  className="preview-image" />
        </div>
      )}
      <ErrorMessage name={name} component="div" className="text-danger" />
    </div>
  );
};

///logic  imagedata type 