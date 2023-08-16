import React, { useState, ChangeEvent } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip } from '@mui/material';
import { formatFileName } from './common/CommonController/Common';

const MultipleImageSelect = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [invalidFileTypes, setInvalidFileTypes] = useState<string[]>([]);
  const [duplicateFileNames, setDuplicateFileNames] = useState<string[]>([]);
  const [invalidSizeFileNames, setInvalidSizeFileNames] = useState<string[]>([]);

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles: File[] = [];
    const newDuplicateFileNames: string[] = [];
    const newInvalidSizeFileNames: string[] = [];
    const newInvalidFileTypes: string[] = [];

    files.forEach((file) => {
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/svg+xml') {
        if (file.size <= 100 * 1024) {
          if (selectedImages.some((image) => image.name === file.name)) {
            newDuplicateFileNames.push(file.name);
          } else {
            validFiles.push(file);
          }
        } else {
          invalidSizeFileNames.push(file.name);
        }
      } else {
        invalidFileTypes.push(file.name);
      }
    });

    setSelectedImages((prevImages) => [...prevImages, ...validFiles]);
    setDuplicateFileNames((prevDup) => [...prevDup, ...newDuplicateFileNames]);
    setInvalidSizeFileNames([ ...newInvalidSizeFileNames]);
    setInvalidFileTypes([ ...newInvalidFileTypes]);

    if (invalidFileTypes.length > 0 || newDuplicateFileNames.length > 0 || invalidSizeFileNames.length > 0) {
      const errorMessage =
        ((newDuplicateFileNames.length > 0 ? `Invalid file(s) because they are already selected:\n ${newDuplicateFileNames.join(', ')}\n` : '') +
          (invalidSizeFileNames.length > 0 ? `\nInvalid file(s) because the size is greater than 100 kb:\n ${invalidSizeFileNames.join(', ')}\n` : '') +
          (invalidFileTypes.length > 0 ? `\nInvalid file type(s):\n  ${invalidFileTypes.join(', ')}` : '')).trim();

      const scrollableContent = (
        <div className='toastScoller'>
          {errorMessage}
        </div>
      );

      toast.error(scrollableContent);
    }
  };

  const handleImageRemove = (indexToRemove: number) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className='multiImg'>
      <input
        type="file"
        accept="image/png, image/jpeg"
        multiple
        onChange={handleImageSelect}
        className='image'
      />
      <div>
        {selectedImages.length > 0 && (
          <p className='imgCount'>
            {selectedImages.length} {selectedImages.length === 1 ? 'file' : 'files'} selected
          </p>
        )}
        {selectedImages.length > 0 && (
          <div className='selectedImages'>
            {selectedImages.map((image, index) => (
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
    </div>
  );
};

export default MultipleImageSelect;
