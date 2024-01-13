import React from 'react';
import { Box, Flex, Image, Text,Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'

const MotionBox = motion(Box);

function image() {
 const navigate=useNavigate()
  const buttonHandler=()=>{
   navigate("/findHospital")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    // <Box bg="blue.200">
    //   <Flex flexDirection={{ base: 'column', md: 'row' }} alignItems="center">
    //     <Box flex={{ base: '1', md: '0.5' }}>
    //       <Image
    //         maxW={{ base: '300' }}
    //         minW={{  md: '100%' }}
    //         width="100%"
    //         src="https://res.cloudinary.com/dvu6xxiqx/image/upload/v1704951490/doctor5_slpcfo.png"
    //         alt="Description"
    //       />
    //     </Box>
    //     <Box flex={{ base: '1', md: '1' }} mt={{ base: 4, md: 0 }} textAlign={{ base: 'center', md: 'left' }}>
    //       <Text fontSize={{ base: 'xl', md: '3xl' }} fontWeight="bold" mb={4}>
    //         <Text as="span" color="blue.500">
    //           MedPack:
    //         </Text>{' '}
    //         Your Health, Our Priority - Your One-Stop Health Management Solution!
    //       </Text>
    //       {/* <Text mb={4} fontSize={{ base: 'sm', md: 'md' }}>
    //         Additional text or description can go here if needed.
    //       </Text> */}
    //       <Button colorScheme="green" size="lg" 
    //         mt={{ base: '0', md: '10' }}
    //         onClick={buttonHandler}>

    //         Book an Appointment
    //       </Button>
    //     </Box>
    //   </Flex>
    // </Box>
    <MotionBox
    initial="hidden"
    animate="visible"
    variants={containerVariants}
    bg="#f0f8ff"
    p={8}
    borderRadius="xl"
  >
    <MotionBox
      variants={containerVariants}
      bg="#32788a"
      borderRadius="xl"
      p={6}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Flex flexDirection={{ base: 'column', md: 'row' }} alignItems="center">
        <MotionBox variants={textVariants} flex={{ base: '1', md: '0.5' }}>
          <Image
            maxW={{ base: '300' }}
            minW={{ md: '100%' }}
            width="100%"
            src="https://res.cloudinary.com/dvu6xxiqx/image/upload/v1704951490/doctor5_slpcfo.png"
            alt="Description"
            borderRadius="lg"
          />
        </MotionBox>
        <MotionBox variants={textVariants} flex={{ base: '1', md: '1' }} mt={{ base: 4, md: 0 }} textAlign={{ base: 'center', md: 'left' }}>
          <Text fontSize={{ base: 'xl', md: '3xl' }} fontWeight="bold" mb={4} color="white">
            <Text as="span" color="blue.900">
              MedPack:
            </Text>{' '}
            Your Health, Our Priority - Your One-Stop Health Management Solution!
          </Text>
              <Button colorScheme="green" size="lg" 
            mt={{ base: '0', md: '10' }}
            onClick={buttonHandler}>

            Book an Appointment
          </Button>
        </MotionBox>
      </Flex>
    </MotionBox>
  </MotionBox>

  )
}

export default image
