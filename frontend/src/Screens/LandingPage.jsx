import React from 'react'

import {

    Text,
    Center,
    Heading,
    Image

} from '@chakra-ui/react'
import {  useNavigate } from 'react-router-dom';
import { AspectRatio, Box, IconButton, Button, Flex } from '@chakra-ui/react'

// import Image from '../../Components/User/Images.jsx';
// import Image from '../Components/User/Images.jsx';
import Services from './User/Services.jsx';
import Departments from './User/Departments.jsx';
import { motion } from 'framer-motion';
import SwitchModal from './SwitchModal.jsx';
import { useState } from 'react'
const MotionBox = motion(Box);

function LandingPage() {
    const [openModa, setOpenModa] = useState(false)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1.5 } },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };
    const navigate = useNavigate();
    const userLoginHandler=()=>{
        navigate('/userLogin');
    }
    const hospitalLoginHandler=()=>{
        setOpenModa(true)
    }
    return (
        <Box  >
            {openModa?<SwitchModal setOpenModa={setOpenModa}/>:null}
            <MotionBox
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                bg="#f0f8ff"
          
            >
                <Box
                    variants={containerVariants}
                    bg="#32788a"
             
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
                            <Text pt="100" fontSize={{ base: 'xl', md: '3xl' }} fontWeight="bold" mb={4} color="white">
                                <Text as="span" color="blue.900">
                                    MedPack:
                                </Text>{' '}
                                Your Health, Our Priority - Your One-Stop Health Management Solution!
                            </Text>
                          

                        </MotionBox>
                    </Flex>

                </Box>
                <Flex maxW="100%" borderRadius={"20"} >
                                <Flex
                                onClick={userLoginHandler}
                                    overflow="hidden"
                                    boxShadow="md"
                                    transition="transform 0.2s"
                                    _hover={{ transform: "scale(1.05)" }}
                                    minW="50%" bgGradient="linear(to-r, blue.100, blue.300)" >
                                    <Image

                                        maxW="130"

                                        src="https://res.cloudinary.com/dvu6xxiqx/image/upload/v1704976816/Screenshot_114_hciixx.png"
                                        alt="Description"
                                        borderRadius="lg"
                                    />
                                    <Box mt="10" ml="10">
                                        <Heading fontSize={"xl"}>For Users</Heading>
                                        <Text>"Explore Your Health Journey"</Text>
                                    </Box>
                                </Flex>
                                <Flex
                                   onClick={hospitalLoginHandler}
                                    overflow="hidden"
                                    boxShadow="md"
                                    transition="transform 0.2s"
                                    _hover={{ transform: "scale(1.05)" }}
                                    minW="50%"
                                    bgGradient="linear(to-r, blue.100, blue.300)" // You can customize the colors here

                                >
                                    <Image
                                        maxW="150"
                                        src="https://res.cloudinary.com/dvu6xxiqx/image/upload/v1704976810/Screenshot_115_n1pia3.png"
                                        alt="Description"
                                        borderRadius="lg"
                                    />
                                    <Box mt="10" ml="10">
                                        <Heading fontSize={"xl"}>For Hospitals</Heading>
                                        <Text>"Empowering Healthcare Professionals"</Text>
                                    </Box>
                                </Flex>
                            </Flex>
            </MotionBox>


            <Box bg="gray.200" >
                <Center>
                    <Heading color="#087c9c" pt="20" >Your Personalized Healthcare Hub</Heading>
                </Center>
                <Center>
                    <Text pt="10" align="center">Streamline your healthcare information and effortlessly organize your medical history, tests,<br />and upcoming schedules in one accessible platform.</Text>
                </Center>
                <Center >
                    <Box mt="50" mb="20">
                        <Box

                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            boxShadow="md"
                            transition="transform 0.2s"
                            _hover={{ transform: "scale(1.05)" }}
                        >
                            <Center>
                            </Center>
                            {/* <Button onClick={()=>setOpenProfile(true)} colorScheme='blue'>ViewProfile</Button> */}
                        </Box>
                    </Box>
                </Center>

            </Box >

            <Box mb="50" bg="#087c9c">
                <Center>
                    <Heading pt="20" color="white">What Would You Like To Do Today?</Heading>
                </Center>
                <Center >
                    <Box mt="50" mb="20">
                        <Services />
                    </Box>
                </Center>

            </Box >

            <Box mt="50" >
                <Center pt="10">
                    <Heading>Explore our Centres of Clinical Excellence</Heading>
                </Center>
                <Box m="50" >
                    <Departments />
                </Box>
            </Box>


            {/* <HospitalRating  /> */}
            {/* <Box maxW="220" position="sticky" bottom="10px">
      <ChatAccordion />
    </Box> */}




        </Box>
    )
}

export default LandingPage
