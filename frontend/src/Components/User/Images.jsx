import React from 'react'
import { AspectRatio,Image,Box,IconButton,Text,Button, Flex} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function image() {
 const navigate=useNavigate()
  const buttonHandler=()=>{
   navigate("/findHospital")
  }
  return (
    <Box bg="blue.200">
      <Flex flexDirection={{ base: 'column', md: 'row' }} alignItems="center">
        <Box flex={{ base: '1', md: '0.5' }}>
          <Image
            maxW={{ base: '300' }}
            minW={{  md: '100%' }}
            width="100%"
            src="https://res.cloudinary.com/dvu6xxiqx/image/upload/v1704951490/doctor5_slpcfo.png"
            alt="Description"
          />
        </Box>
        <Box flex={{ base: '1', md: '1' }} mt={{ base: 4, md: 0 }} textAlign={{ base: 'center', md: 'left' }}>
          <Text fontSize={{ base: 'xl', md: '3xl' }} fontWeight="bold" mb={4}>
            <Text as="span" color="blue.500">
              MedPack:
            </Text>{' '}
            Your Health, Our Priority - Your One-Stop Health Management Solution!
          </Text>
          {/* <Text mb={4} fontSize={{ base: 'sm', md: 'md' }}>
            Additional text or description can go here if needed.
          </Text> */}
          <Button colorScheme="green" size="lg" 
            mt={{ base: '0', md: '10' }}
            onClick={buttonHandler}>

            Book an Appointment
          </Button>
        </Box>
      </Flex>
    </Box>

  )
}

export default image
