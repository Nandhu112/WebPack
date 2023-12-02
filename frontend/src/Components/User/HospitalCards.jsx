import React from 'react'
import { Card, CardHeader, CardBody, CardFooter,Stack,Heading,Button,Image,Text,AspectRatio,Divider,ButtonGroup } from '@chakra-ui/react'
function HospitalCards(item) {
  return (
    <Card maxW='300px' className=' mt-10' >
  <CardBody>
    <Image
      src='../public/Images/Aster.webp'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>item</Heading>
      <Text>
      multispeciality hospital in Kochi, Ernakulam,Kerala.
      </Text>
      <Text color='blue.600' fontSize='2xl'>
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter display='flex' justifyContent='center'>
    <Button variant='solid' colorScheme='blue'>
      View Profile      
    </Button>
  </CardFooter>
</Card>
  )
}

export default HospitalCards
