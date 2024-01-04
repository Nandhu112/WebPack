import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Box, HStack, Modal, ModalOverlay, ModalContent,Heading,Center,ModalHeader} from '@chakra-ui/react';
import axios from 'axios';
import { CloseIcon } from '@chakra-ui/icons'

export default function HospitalRating({ setShiwHospitalRating,count, size }) {

  const [hover, setHover] = useState(null);
  const [color, setColor] = useState("")
  const fun=(index)=>{
    setColor(index+1)
    console.log(color,"index")
    try {
        axios.post('/api/users/addNewHospitalRating', {
          hospital: "6567038bb3fcd4dd1577a6da",
          rating: index+1,
  
        });
        console.log('Data sent successfully');
        setShiwHospitalRating(false)
      } catch (error) {
        console.error('Error sending data to the backend', error);
      }
  }
  const handleCloseModal=()=>{
    setShiwHospitalRating(false)
  }
  return (
    <Modal isOpen={true} onClose={() => {}} size="md" >
    <ModalOverlay />
    <ModalContent minH="200">
      <ModalHeader display="flex" justifyContent="flex-end">
        <CloseIcon fontSize="15" cursor="pointer" onClick={() => handleCloseModal()} />
      </ModalHeader>
      <Center>
      <Heading
        color="teal.400"
        fontSize= "20" 
        my="1rem"
      >    
       Share Your Experience: Rate Our Hospital
      </Heading>
      </Center>
    <HStack minW="100" spacing={"2px"} mb="20" >
      {[...Array(count || 5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <Box ml="12" mt="5"
          
           onClick={()=>fun(index)}
            as="label"
            key={index}
            color={ index<=(color-1)? "#ffc107" : "#e4e5e9"}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          >
            <FaStar
              cursor={"pointer"}
              size={size || 30}
              transition="color 200ms"
            />
          </Box>
        );
      })}
    </HStack>
    </ModalContent>
    </Modal>
  );
}
