import { useState,useRef } from 'react';
import { Button, Input } from '@chakra-ui/react';
import { EditIcon, } from '@chakra-ui/icons'

function fileUpload() {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
      // Get the selected file
      const file = e.target.files[0];
      // You can do something with the file here if needed
      console.log('Selected file:', file);
    };
  
    const handleUploadButtonClick = () => {
      // Trigger the hidden file input
      fileInputRef.current.click();
    };
  
  return (
    <div>

    <Input
      type="file"
      ref={fileInputRef}
      onChange={handleFileChange}
      style={{ display: 'none' }}
    />
    {/* <Button colorScheme="blue" onClick={handleUploadButtonClick}>
      Select File
    </Button> */}
    <EditIcon
        colorScheme="blue"
        onClick={handleUploadButtonClick}
        cursor="pointer" // Set cursor to pointer
        _hover={{ cursor: 'pointer' }} // Change cursor on hover
      />

  

  </div>
  )
}

export default fileUpload
