import React, { useState, ChangeEvent } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip } from '@mui/material';
import { formatFileName } from './common/CommonController/Common';

interface multiProps {
  name:string;
  isMulti: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const MultipleImageSelect: React.FC<multiProps> = ({
  isMulti
}) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleMultiImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles: File[] = [];
    const newInvalidSizeFileNames: string[] = [];
    const newInvalidTypeFileNames: string[] = [];
    const newDuplicateFileNames: string[] = [];

    files.forEach((file) => {
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/svg+xml') {
        if (file.size <= 100 * 1024) {
          if (selectedImages.some(selectedImage => selectedImage.name === file.name)) {
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
        setSelectedImages([validFiles[0]]);
      } else if (newDuplicateFileNames.length > 0) {
        setSelectedImages((prevImages) => [...prevImages])
      } else if (newInvalidSizeFileNames.length > 0 || newInvalidTypeFileNames.length > 0) {
        setSelectedImages([]);
      }
    } else {
      setSelectedImages((prevImages) => [...prevImages, ...validFiles]);
    }

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
  };

  const handleImageRemove = (indexToRemove: number) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const resetInputValue = (event: any) => {
    event.currentTarget.value = null;
  };

  return (
    <div className='multiImg'>
      <input
        type="file"
        accept="image/png, image/jpeg"
        multiple={isMulti}
        onChange={handleMultiImageSelect}
        onClick={resetInputValue}
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
