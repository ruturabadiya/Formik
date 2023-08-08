import React, { ChangeEvent } from 'react';
import { ErrorMessage, useFormikContext } from 'formik';

interface ImageFieldControllerProps {
  name: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ImageFieldController: React.FC<ImageFieldControllerProps> = ({
  name,
  onChange,
  placeholder = 'Select Image',
}) => {
  const { setFieldValue }: any = useFormikContext();

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
    <>
      <div className="field">
        <input
          type="file"
          name={name}
          accept="image/*"
          onChange={(e) => {
            handleImageChange(e);
            onChange(e);
          }}
        />
      </div>
      <div className="row p-0 m-0 w-100">
        <ErrorMessage name={name} component="div" className="text-danger" />
      </div>
    </>
  );
};
