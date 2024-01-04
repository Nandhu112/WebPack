import { Box, Flex, Text, Button, Image, Grid, Center, Avatar, Heading } from '@chakra-ui/react';

const UserProfile = ({ patientHistory }) => {
    console.log(patientHistory, "patientHistory")
    return (
        <Box className="gradient-custom-2" h="100vh">
            <Flex justifyContent="center" alignItems="center" h="100%">
                <Box w="100%" maxW="xl">
                    <Box bg="#fff" rounded="lg" boxShadow="lg">
                        <Flex
                            roundedTop="lg"
                            color="white"
                            bg="blue.400"
                            justify="space-between"
                            p="4"
                        >
                            <Flex >
                                <Box ml="5" bg="blue.200" p="2" borderRadius={"xl"}>
                                    <Flex>
                                        <Avatar size="xl" name="ff" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp" />
                                        <Box pt="5" pl="2">
                                            <Heading color='black' fontSize="20">{patientHistory ? patientHistory[0].pName : null}</Heading>
                                            <Text color='black' fontSize="15">{patientHistory ? patientHistory[0].Blood : null}</Text>
                                        </Box>
                                    </Flex>
                                </Box>
                            </Flex>
                            <Flex>

                                <Flex mr="30" pl="2" bg="blue.200" borderRadius={"xl"} >

                                    <Box pt="5"  >
                                        <Heading color='black' fontSize="20">{patientHistory ? patientHistory[0].dName : null}</Heading>
                                        <Text color='black' fontSize="15">{patientHistory ? patientHistory[0].dTitle : null}</Text>
                                        <Text color='black' fontSize="10">{patientHistory ? patientHistory[0].department : null}</Text>
                                        <Text color='black' fontSize="10">{patientHistory ? patientHistory[0].hospital : null}</Text>
                                    </Box>
                                    <Avatar pt="2" size="xl" name={patientHistory ? patientHistory[0].dName : null} src={patientHistory ? patientHistory[0].dImage : null} />

                                </Flex>

                            </Flex>
                        </Flex>
                        <Box bg="gray.100" p="4">
                            <Flex justify="space-between" textAlign="center" py="1">
                                <Box>
                                    <Heading mb="1" fontSize="lg">{new Date(patientHistory ? patientHistory[0].createdAt : null).toLocaleDateString()}</Heading>
                                </Box>
                                <Box px="3">
                                    <Heading mb="1" fontSize="lg">{patientHistory ? patientHistory[0].hospital : null}</Heading>
                                </Box>
                                <Box>
                                    <Heading mb="1" fontSize="lg">{patientHistory ? patientHistory[0].department : null}</Heading>
                                </Box>
                            </Flex>
                        </Box>
                        <Box p="4">
                            <Box mb="5">

                                <Box bg="gray.100" p="4">
                                    <Flex justifyContent="space-between">
                                        <Box>
                                            <Heading fontSize="18" pb="2">Enduring health issues</Heading>
                                            {patientHistory ? (
                                                patientHistory[0].ailments?.map((item, index) => (
                                                    <Text key={index} fontStyle="italic" mb="1">
                                                        {item} 
                                                    </Text>
                                                ))
                                            ) : (
                                                null
                                            )}
                                        </Box>
                                        <Box mr="10">
                                            <Heading fontSize="18" pb="2">Allergies</Heading>
                                            {patientHistory ? (
                                                patientHistory[0].allergies?.map((item, index) => (
                                                    <Text key={index} fontStyle="italic" mb="1">
                                                        {item} 
                                                    </Text>
                                                ))
                                            ) : (
                                                null
                                            )}                             
                                        </Box>
                                    </Flex>
                                </Box>
                            </Box>
                            <Box mb="5">

                                <Box bg="gray.100" p="4">
                                    <Flex justifyContent="space-between">
                                        <Box mr="10">
                                            <Heading fontSize="18" pb="2">Treatments</Heading>
                                            {patientHistory ? (
                                                patientHistory[0].treatments?.map((item, index) => (
                                                    <Text key={index} fontStyle="italic" mb="1">
                                                        {item} 
                                                    </Text>
                                                ))
                                            ) : (
                                                null
                                            )}
                                        </Box>
                                        <Box mr="10">
                                            <Heading fontSize="18" pb="2">Test Results</Heading>
                                            {patientHistory ? (
                                                patientHistory[0].testResults?.map((item, index) => (
                                                    <Text key={index} fontStyle="italic" mb="1">
                                                        {item} 
                                                    </Text>
                                                ))
                                            ) : (
                                                null
                                            )}
                                        </Box>
                                    </Flex>
                                    <Box mr="10" mt="10">
                                        <Heading fontSize="18" pb="2">Medication List</Heading>
                                        {patientHistory ? (
                                                patientHistory[0].medicationList?.map((item, index) => (
                                                    <Text key={index} fontStyle="italic" mb="1">
                                                        {item} 
                                                    </Text>
                                                ))
                                            ) : (
                                                null
                                            )}
                                    </Box>
                                    <Box mt="10">
                                        <Heading fontSize="18" pb="2">Description</Heading>
                                        <Text fontStyle="italic" mb="1">{patientHistory ? patientHistory[0].description : null}</Text>

                                    </Box>

                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default UserProfile;
