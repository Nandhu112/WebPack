import { useState,useRef } from 'react';
import { EditIcon, } from '@chakra-ui/icons'
import {useUpdatePatienProfilePicMutation} from "../../slices/userApiSlice"
import { toast } from "react-toastify";
import { Button, Input } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'


function UpdateUserProfile({id,refetch,patientRefetch}) {
    const [profileImage, setprofileImage] = useState('')
    let imageInfo

    const [updateImage, { isLoading }] = useUpdatePatienProfilePicMutation();

    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
         console.log('fileeeeeeee')
      const file = e.target.files[0];
    
      setFileToBase2(file);
    };
    const setFileToBase2 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          // console.log(reader.result,'reader.result');
          // var kk = {uu:reader.result}
          setprofileImage('kjabsgfkjhaksghlkashflkhfkjhkjh');
          imageInfo= reader.result
          console.log(profileImage,'profileImage');
          updateProfileImage()
        };
        
      };

      const toast = useToast()
       const updateProfileImage = (async()=>{
        console.log(imageInfo,'reader.result')
        try {
            const res = await updateImage({profileImage:imageInfo,id}).unwrap();
            console.log(res)
            toast({
              title: 'Profile Updated',
              description: res.message,
              status: 'success',
              duration: 9000,
              isClosable: true,
          })
            refetch()
            patientRefetch()
            
          
          } catch (error) {
            // Handle errors if the login function fails
            console.error('Login failed:', error);
          }
       })
  
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

    <EditIcon
        colorScheme="blue"
        onClick={handleUploadButtonClick}
        cursor="pointer" // Set cursor to pointer
        _hover={{ cursor: 'pointer' }} // Change cursor on hover
      />
  </div>
  )
}

export default UpdateUserProfile
