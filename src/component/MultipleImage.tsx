import React, { useState, ChangeEvent } from 'react';
import { showToastError } from '../Toast/toastUtils';
import CancelIcon from '@mui/icons-material/Cancel';

const MultipleImageSelect = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [invalidFileNames, setInvalidFileNames] = useState<string[]>([]);

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles: File[] = [];
    const newInvalidFileNames: string[] = [];

    files.forEach((file) => {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        if (file.size <= 100 * 1024) {
          validFiles.push(file);
        } else {
          newInvalidFileNames.push(file.name);
        }
      } else {
        newInvalidFileNames.push(file.name);
      }
    });

    setSelectedImages((prevImages) => [...prevImages, ...validFiles]);
    setInvalidFileNames(newInvalidFileNames);

    if (newInvalidFileNames.length > 0) {
      showToastError(
        `Invalid file(s): ${newInvalidFileNames.join(', ')}`
      );
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
        <p className='imgCount'>
          {selectedImages.length} {selectedImages.length === 1 ? 'file' : 'files'} selected
        </p>
        {selectedImages.length > 0 && (
          <div className='selectedImages'>
            {selectedImages.map((image, index) => (
              <div key={index} className='imgBox'>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Selected ${index + 1}`}
                  className='multipleImage'
                />
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


// import React, { useState, ChangeEvent } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const MultipleImageSelect = () => {
//   const [selectedImages, setSelectedImages] = useState<File[]>([]);

//   const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(event.target.files || []);
//     const validFiles: File[] = [];
//     let invalidFiles = false;

//     files.forEach((file) => {
//       if (file.type === 'image/jpeg' || file.type === 'image/png') {
//         if (file.size <= 100 * 1024) {
//           validFiles.push(file);
//         } else {
//           invalidFiles = true;
//         }
//       } else {
//         invalidFiles = true;
//       }
//     });

//     setSelectedImages((prevImages) => [...prevImages, ...validFiles]);

//     if (invalidFiles) {
//       toast.error('Invalid files selected');
//     }
//   };

//   const handleImageRemove = (indexToRemove: number) => {
//     setSelectedImages((prevImages) =>
//       prevImages.filter((_, index) => index !== indexToRemove)
//     );
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         accept="image/png, image/jpeg"
//         multiple
//         onChange={handleImageSelect}
//         className='image'
//       />
//       <div>
//       <p >{selectedImages.length} {selectedImages.length === 1 ? 'file' : 'files'} selected</p>
//         {selectedImages.map((image, index) => (
//           <div key={index} style={{ display: 'inline-block', position: 'relative' }}>
//             <img
//               src={URL.createObjectURL(image)}
//               alt={`Selected ${index + 1}`}
//               className='multipleImage'
//             />
//             <button
//               onClick={() => handleImageRemove(index)}
//               style={{
//                 position: 'absolute',
//                 top: '5px',
//                 right: '5px',
//                 background: 'none',
//                 border: 'none',
//                 cursor: 'pointer',
//                 color: 'red',
//                 fontSize: '1.5rem',
//               }}
//             >
//               &#10006;
//             </button>
//           </div>
//         ))}
//       </div>
//       <ToastContainer position="bottom-right" />
//     </div>
//   );
// };

// export default MultipleImageSelect;
