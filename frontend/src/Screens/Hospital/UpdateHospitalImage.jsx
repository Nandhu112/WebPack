import { useState,useRef } from 'react';
import { Button, Input } from '@chakra-ui/react';
import { EditIcon, } from '@chakra-ui/icons'
import { useSelector } from "react-redux";
// import {useDoctorUpdateImageMutation} from "../../slices/doctorApiSlice"
import {useUpdateProfilePicMutation} from "../../slices/hospitalApiSlice"

import { useToast } from '@chakra-ui/react'


function UpdateHospitalImage({refetch}) {

  const [profileImage, setprofileImage] = useState('')
  let imageInfo

  const { hospitalInfo } = useSelector((state) => state.hospitalAuth)
  const [updateImage, { isLoading }] = useUpdateProfilePicMutation();

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    console.log("chk click")
    const file = e.target.files[0];
  //   console.log(file,'file')
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
      console.log('chk out')
      const _id =hospitalInfo._id
      console.log(imageInfo,'reader.result')
      try {
          const res = await updateImage({profileImage:imageInfo,_id}).unwrap();
          console.log(res)
          refetch()
          toast({
            title: 'Profile Updated',
            description: res.success,
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
     
          
          
        
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

export default UpdateHospitalImage
