import React from 'react'
import Header from '../../Components/User/UserHeader.jsx';
import SignUp from '../../Components/User/UserSignUp.jsx';
import Image from '../../Components/User/Images.jsx';
import Cards from '../../Components/User/Cards.jsx';
import {
    Flex,
    Box,
    Button

  } from '@chakra-ui/react'

function LandingPage() {
  return (
    <div>
    {/* <Header/> */}
    <Image/>
    <Box mb='10'>
      <Flex direction={{ base: 'column', md: 'row' }} width="100%" height="200px">
        <Box flex={{ base: 'none', md: 1 }} backgroundColor="#f2f2f2" height="100%" backgroundImage="url('path_to_image1.jpg')" backgroundSize="cover" backgroundPosition="left">
          <Button variant="solid" colorScheme="blue" left="10px" position="absolute">
            Button 1
          </Button>
        </Box>
        <Box flex={{ base: 'none', md: 1 }} backgroundColor="#e6e6e6" height="100%" backgroundImage="url('path_to_image2.jpg')" backgroundSize="cover" backgroundPosition="left">
          <Button variant="solid" colorScheme="red" left="10px" position="absolute">
            Button 2
          </Button>
        </Box>
      </Flex>
    </Box>
</div>
  )
}

export default LandingPage
