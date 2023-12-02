import { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Image,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'

import { useSelector } from "react-redux";
import {useAdminVerifyHospitalMutation} from "../../../slices/hospitalApiSlice"

const UploadCertificateModal = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [updateVerification, { isLoading }] = useAdminVerifyHospitalMutation();
  const [certificate, setcertificate] = useState('')
  let imageInfo

  const { hospitalInfo } = useSelector((state) => state.hospitalAuth)
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
      setFileToBase2(file);
    }
  };

  const setFileToBase2 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // console.log(reader.result,'reader.result');
      // var kk = {uu:reader.result}
    //   setprofileImage('kjabsgfkjhaksghlkashflkhfkjhkjh');
      imageInfo= reader.result
      setcertificate(imageInfo)
      
    };
    
  };
  const toast = useToast()
  const handleSubmit = async() => {
  
    console.log(certificate,'chkk uploaad1')

    try {
      const res = await updateVerification({certificate:certificate,hospital:hospitalInfo._id}).unwrap();
      console.log(res)
      toast({
        title: 'Application sed successfully.',
        description: res.success,
        status: 'success',
        duration: 9000,
        isClosable: true,
    })
      onClose();
      
    } catch (error) {
      console.log(error.data,'error')
      toast({
        title: `Appilcation already exist `,
        status: 'error',
        isClosable: true,
      })
      onClose();
    }

  };



 

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload Your Certificate</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel htmlFor="file-upload">Choose File</FormLabel>
            <Input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              accept=".jpg, .jpeg, .png, .pdf" // Define accepted file formats
            />
          </FormControl>
          {selectedFile && (
            <Image src={selectedFile} alt="Uploaded File Preview" maxH="200px" mt="4" />
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="green" onClick={handleSubmit} isDisabled={!selectedFile}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ApplyVerification = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button colorScheme="red" onClick={openModal} mt="7" mb="7">
        Apply Verrification
      </Button>
      <UploadCertificateModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default ApplyVerification
