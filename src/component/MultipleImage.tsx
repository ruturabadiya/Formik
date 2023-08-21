import React, { useState, ChangeEvent, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip } from '@mui/material';
import { formatFileName } from './common/CommonController/Common';
import { ErrorMessage, useFormikContext } from 'formik';
import { string } from 'yup';

interface multiProps {
  name: string;
  isMulti: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const MultipleImageSelect: React.FC<multiProps> = ({
  name,
  isMulti,

}) => {
  const { setFieldValue, values }: any = useFormikContext();
  const [imageData, setImageData] = useState<File[]>([]);

  const userData = values[name];

  const handleMultiImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImages = Array.from(event.target.files || []);
    const validFiles: File[] = [];
    const newInvalidSizeFileNames: string[] = [];
    const newInvalidTypeFileNames: string[] = [];
    const newDuplicateFileNames: string[] = [];

    selectedImages.forEach((file) => {
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/svg+xml') {
        if (file.size <= 100 * 1024) {
          if (imageData.some(selectedImage => selectedImage.name === file.name)) {
            newDuplicateFileNames.push(file.name);
          } else {
            validFiles.push(file);
          }
        } else {
          newInvalidSizeFileNames.push(file.name);
        }
      } else {
        newInvalidTypeFileNames.push(file.name);
      }
    });

    if (!isMulti) {
      if (validFiles.length > 0) {
        setFieldValue(name, [validFiles[0]]);
        setImageData(validFiles)
      } else if (newDuplicateFileNames.length > 0) {
        setFieldValue((prevImages: any) => [...prevImages]);
      } else if (newInvalidSizeFileNames.length > 0 || newInvalidTypeFileNames.length > 0) {
        event.target.value = '';
        setFieldValue(name, null);
        setImageData([]);
      }
    } else {
      setFieldValue(name, [userData] ,[...validFiles]);
      // setFieldValue(name, [userData , ...validFiles]);
      setImageData([...imageData, ...validFiles]);
    }

    if (newInvalidTypeFileNames.length > 0 || newInvalidSizeFileNames.length > 0 || newDuplicateFileNames.length > 0) {
      if (newInvalidTypeFileNames.length > 0 || newInvalidSizeFileNames.length > 0 || newDuplicateFileNames.length > 0) {
        const errorMessage =
          ((newDuplicateFileNames.length > 0 ? `Invalid file(s) because they are already selected:\n ${newDuplicateFileNames.join(', ')}\n` : '') +
            (newInvalidSizeFileNames.length > 0 ? `\nInvalid file(s) because the size is greater than 100 kb:\n ${newInvalidSizeFileNames.join(', ')}\n` : '') +
            (newInvalidTypeFileNames.length > 0 ? `\nInvalid file type(s):\n  ${newInvalidTypeFileNames.join(', ')}` : '')).trim();

        const scrollableContent = (
          <div className='toastScoller'>
            {errorMessage}
          </div>
        );

        toast.error(scrollableContent);

      }
    }

  };

  const handleImageRemove = (indexToRemove: number) => {
    if (indexToRemove === 1) {
      // Remove userData
      setFieldValue(name, null);
      return;
    }
  
    // Remove selected images
    const remainingImages = imageData.filter((_, index) => index !== indexToRemove);
    setImageData(remainingImages);
  
    if (remainingImages.length > 0) {
      setFieldValue(name, remainingImages);
    } else {
      setFieldValue(name, null);
    }
  };


  const resetInputValue = (event: any) => {
    event.currentTarget.value = null;
  };

  const handleSingleImageRemove = () => {
    setImageData([]);
    setFieldValue(name, null);
  };
  debugger

  return (
    <div>
      <div className="productImage">
        <input
          type="file"
          name={name}
          accept="image/png, image/jpeg"
          multiple={isMulti}
          onChange={handleMultiImageSelect}
          onClick={resetInputValue}
          className='image'
        />
      </div>
      {imageData.length === 0 ? (
        <div>
          {userData ? (
            <div className='imgBox'>
              <img
                src={userData}
                alt='selected'
                className='multipleImage' />
              <div className='fileNameContainer'>
                <span className='fileName'>{formatFileName(userData)}</span>
              </div>
              <CancelIcon className='closeBtn' onClick={handleSingleImageRemove} />
            </div>
          ) : null}
        </div>
      ) : (
        <>
          <div>
            {userData ? (
              <div className='imgBox'>
                <img
                  src={userData}
                  alt='selected'
                  className='multipleImage' />
                {/* <div className='fileNameContainer'>
                <span className='fileName'>{formatFileName(userData)}</span>
              </div> */}
                <CancelIcon className='closeBtn' onClick={() => handleImageRemove(1)} />
              </div>
            ) : null}
          </div>
          {imageData && (
            <div>
              {imageData.length > 0 && (
                <p className='imgCount'>
                  {imageData.length} {imageData.length === 1 ? 'file' : 'files'} selected
                </p>
              )}
              {imageData.length > 0 && (
                <div className='selectedImages'>
                  {imageData.map((image, index) => (
                    <div key={index} className='imgBox'>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Selected ${index + 1}`}
                        className='multipleImage'
                      />
                      <div className='fileNameContainer'>
                        <Tooltip title={image.name} placement='bottom'>
                          <span className='fileName'>{formatFileName(image.name)}</span>
                        </Tooltip>
                      </div>
                      <CancelIcon className='closeBtn' onClick={() => handleImageRemove(index)} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>

      )}
      <div className="row p-0 m-0 w-100">
        <ErrorMessage name={name} component="div" className="text-danger" />
      </div>
    </div>
  );
};

export default MultipleImageSelect;