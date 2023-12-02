
import React from 'react'
import { Card, CardHeader,Box,Avatar, CardBody, CardFooter, Stack, Heading, Button, Image, Text, AspectRatio } from '@chakra-ui/react'
import ViewDoctorProfile from '../../User/ViewDoctorProfile'
function HospitalHomeCard({item}) {
  return (
    <Card className='mt-10'
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
    >
          <Box bg="blue.200" minW="200px" borderRadius="md" p={2} display="flex" justifyContent="center" alignItems="center">
            <Avatar size="2xl" name={item?.name} src={item?.image} />
            {/* <Avatar size="2xl"  src={item.name} /> */}
          </Box>
      <Stack>
        <CardBody>
          <Heading size='md' pb="2">{item?.name}</Heading>

          <Text>
          {item?.title}
          </Text>
          <Text >
          {item?.department}
          </Text>
          <Heading size='sm'>{item?.qualification}</Heading>

          <Text >
          {item?.description && item.description.split(' ').slice(0, 25).join(' ')}
          </Text>
        </CardBody>

        <CardFooter>
         <ViewDoctorProfile item={item}/>
        </CardFooter>
      </Stack>
    </Card>
  )
}

export default HospitalHomeCard
