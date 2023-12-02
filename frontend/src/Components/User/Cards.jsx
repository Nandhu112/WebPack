import React from 'react'
import { Card,Box ,Avatar,CardHeader, CardBody, CardFooter,Stack,Heading,Button,Image,Text,AspectRatio } from '@chakra-ui/react'
import PatientProfile from '../../Screens/User/PatientProfile'
function Cards({item}) {
  return (
    <Card   className='mt-10'
    ml="10"
    mr="10"
    direction={{ base: 'column', sm: 'row' }}
    overflow='hidden'
    variant='outline'
    bg="gray.200" // Change this line to set the background color
  >
<Box bg="blue.200" minW="200px" borderRadius="md" p={2} display="flex" justifyContent="center" alignItems="center">
            <Avatar size="2xl" name={item.name} src="" />
          </Box>
  <Stack>
    <CardBody>
      <Heading size='md' pb="2">{item.name}</Heading>

      <Text >
      {item.gender}
      </Text>
      <Text >
      {item.dateOfBirth}
      </Text>
      <Text >
      {item.bloodGroup}
      </Text>
    </CardBody>

    <CardFooter>
     <PatientProfile _id={item._id}/>
    </CardFooter>
  </Stack>
</Card>
  )
}

export default Cards
