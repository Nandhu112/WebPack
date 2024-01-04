
import React from 'react'
import { Card,Center,Flex, CardHeader,Box,Avatar, CardBody, CardFooter, Stack, Heading, Button, Image, Text, AspectRatio } from '@chakra-ui/react'
import ViewDoctorProfile from '../../User/ViewDoctorProfile'
import {useGetDoctorsRatingInfoQuery} from "../../../slices/userApiSlice"
import StarRating from '../../../Components/User/StarRating'
function HospitalHomeCard({item}) {
  const { data: doctorRating, refetch: refetchDoctorRating } = useGetDoctorsRatingInfoQuery()
  return (
    <Card ml="20" mr="20" mb="20"
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

          {doctorRating?.find(rating => rating._id === item._id) ? (
                  
                        <Flex mt="3">
                          <Text>{(doctorRating?.find(rating => rating._id === item._id).average).toFixed(1)}</Text>
                          <Box pl="2" pr="2">
                          <StarRating rating={doctorRating?.find(rating => rating._id === item._id).average}/>
                          </Box>
                          <Text>({doctorRating?.find(rating => rating._id === item._id).count})</Text>
                          </Flex>
                  
                      
                        //  <StarRating rating={3.5}/>
                    // <Text>{hospitalRating.find(rating => rating._id === item._id).average}</Text>
                  ) : (
                    <Text pt="3" color="green.500" >Be the First to Rate</Text>
                  )}
        </CardBody>

        <CardFooter>
         <ViewDoctorProfile item={item}/>
        </CardFooter>
      </Stack>
    </Card>
  )
}

export default HospitalHomeCard
