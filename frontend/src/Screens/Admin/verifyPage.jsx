import { useState } from 'react';
import {
  Box,
  Heading,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Image,
  Text,
  useToast
} from '@chakra-ui/react';
import {useAdminVerifyHospitalsMutation} from "../../slices/adminApiSlice"

function verifyPage({item,refetch}) {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: item.name,
    date: item.date,
    Departments: item.department.length,
    Doctors: item.doctor.length,
    Email: item.email,
    Address: item.address,
    certificateImage: item.certificate, // Sample certificate image URL
    status: item.status,
  });
  
  const [verify, { isLoading }] = useAdminVerifyHospitalsMutation();

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const toast = useToast()
  const handleVerify = async() => {
    const res = await verify({ hospital:item.Hospital_id,application:item?._id }).unwrap();
    console.log(res,'Verification completed.');
    refetch()
    toast({
      title: 'Application sed successfully.',
      description: res.success,
      status: 'success',
      duration: 9000,
      isClosable: true,
  })
    onClose();
  };

  const openImageInNewTab = () => {
    window.open(userData.certificateImage, '_blank');
  };

  return (
    <Box p="4">
      <Button colorScheme="blue" onClick={onOpen} mb="4">
        View
      </Button>

      <Drawer isOpen={isOpen} onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>User Verification</DrawerHeader>
          <DrawerBody>
            <Box mb="4" textAlign="center">
              <Image
                src={userData.certificateImage}
                alt="Certificate"
                w="300px"
                h="200px"
                cursor="pointer"
                onClick={openImageInNewTab}
              />
            </Box>
            <Text>
              <strong>Name:</strong> {userData.name}
            </Text>
            <Text>
              <strong>Date:</strong> {userData.date}
            </Text>
            <Text>
              <strong>Departments:</strong> {userData.Departments}
            </Text>
            <Text>
              <strong> Doctors:</strong> {userData.Doctors}
            </Text>
            <Text>
              <strong>Email:</strong> {userData.Email}
            </Text>
            <Text>
              <strong>Address:</strong> {userData.Address}
            </Text>
            <Text>
              <strong>Status:</strong> {userData.status}
            </Text>

             
              <Button colorScheme="green" mt="4" onClick={handleVerify}>
                Verify
              </Button>
           
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
export default verifyPage
