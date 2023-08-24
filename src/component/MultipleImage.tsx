import React, { useState, ChangeEvent, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip } from '@mui/material';
import { formatFileName } from './common/CommonController/Common';
import { ErrorMessage, useFormikContext } from 'formik';
import { useDropzone } from 'react-dropzone';

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
  const [imageData, setImageData] = useState<(File | string)[]>([]);
  const userData = values[name];

  const handleMultiImageSelect = (acceptedFiles: File[], event?: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = acceptedFiles;
    const validFiles: File[] = [];
    const newInvalidSizeFileNames: string[] = [];
    const newInvalidTypeFileNames: string[] = [];
    const newDuplicateFileNames: string[] = [];

    selectedImages.forEach((file) => {
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/svg+xml') {
        if (file.size <= 100 * 1024) {
          if (
            imageData.some(
              (selectedImage) =>
                selectedImage instanceof File && selectedImage.name === file.name
            )
          ) {
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
        if (event) {
          event.target.value = '';
      }
        setFieldValue(name, null);
        setImageData([]);
      }
    } else {
      if (typeof userData !== 'string') {
        setFieldValue(name, ...validFiles);
        setImageData([...imageData, ...validFiles]);
      }
      else {
        setFieldValue(name, [...validFiles]);
        setImageData([...imageData, ...validFiles, userData]);
      }

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
    if (indexToRemove === -1) {
      setFieldValue(name, null);
    }

    const remainingImages = imageData.filter((_, index) => index !== indexToRemove);
    if (remainingImages.length > 0) {
      setFieldValue(name, [userData, ...remainingImages]);
      setImageData(remainingImages);
    } else {
      setFieldValue(name, null);
      setImageData([]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: isMulti,
    onDrop: (acceptedFiles: File[]) => handleMultiImageSelect(acceptedFiles),
  });
  

  return (
    <div>
      <div className="productImage">
         <div {...getRootProps()} className='image-dropzone'>
          <input {...getInputProps()} />
          <p>Select Images..</p>
        </div>
      </div>
      {imageData.length === 0 ? (
        <div>
          {userData ? (
            <div className='imgBox'>
              <div className='imageContainer'>
                <img
                  src={typeof userData === 'string' ? userData : URL.createObjectURL(userData)}
                  alt='selected'
                  className='multipleImage'
                />
                <CancelIcon
                  className='closeBtn'
                  onClick={() => handleImageRemove(-1)}
                />
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <>
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
                        src={
                          typeof image === 'string' ? image : URL.createObjectURL(image as File)
                        }
                        alt={`Selected ${index + 1}`}
                        className='multipleImage'
                      />

                      <div className='fileNameContainer'>
                        <Tooltip title={typeof image === 'string' ? image : image.name} placement='bottom'>
                          <span className='fileName'>{formatFileName(typeof image === 'string' ? image : image.name)}</span>
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
      {imageData.length === 0 && userData === null && (
        <p className="errorText">No files selected. Please select at least one file.</p>
      )}
      <div className="row p-0 m-0 w-100">
        <ErrorMessage name={name} component="div" className="text-danger" />
      </div>
    </div>
  );
};


export default MultipleImageSelect;