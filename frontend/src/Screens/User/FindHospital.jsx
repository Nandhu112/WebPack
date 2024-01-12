import React, { useEffect, useState } from 'react'
import Header from '../../Components/User/UserHeader.jsx';
import Search from '../../Components/Parts/search.jsx';
import HospitalCards from '../../Components/User/HospitalCards.jsx';
import { Center, Container, Flex } from '@chakra-ui/react';
import { useUserListHospitalQuery, useUserFindNearHospitalsMutation } from "../../slices/userApiSlice.js"
import {
  Card, CardHeader, CardBody, CardFooter, Stack, Heading, Box, Button, Image, Text, AspectRatio, Divider, ButtonGroup, InputGroup
  , Select
} from '@chakra-ui/react'
import { useGetHospitalsRatingInfoQuery } from "../../slices/userApiSlice.js"
import { useNavigate } from 'react-router-dom';
import StarRating from '../../Components/User/StarRating.jsx';



function FindHospital() {
  const navigate = useNavigate();
  const [accessLatitude, setAccessLatitude] = useState('');
  const [accessLongitude, setAccessLongitude] = useState('');

  const [findHospital, isLoading] = useUserFindNearHospitalsMutation();
  const [distance, setdistance] = useState('');
  const [hospitals, sethospitals] = useState([])
  const [cardCount, setCardCount] = useState(0);
  const hospitals1 = [];
  const { data: hospitalRating, refetch: refetchhospitalRating } = useGetHospitalsRatingInfoQuery()


  const handleHospitalChange = async (e) => {
    console.log('Check handleHospitalChange');
    let distanceValue = e.target.value;

    await setdistance(distanceValue); // Assuming setdistance is an asynchronous function

    const res = await findHospital({
      distance: distanceValue,
      accessLatitude, // Assuming accessLatitude and accessLongitude are defined somewhere
      accessLongitude
    }).unwrap();

    console.log(res, "Check res");
    sethospitals(res); // Assuming sethospitals is a function that sets the hospitals
  };

  //Location

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    var crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    setAccessLatitude(crd.latitude)
    setAccessLongitude(crd.longitude)

  }

  function errors1(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then(function (result) {
        // handle permissions
        if (result.state === "granted" || result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(success, errors1, options);
        } else if (result.state === "denied") {
          console.log('Location permission denied');
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    async function fetchData() {
      try {
        const res = await findHospital({
          accessLatitude,
          accessLongitude,
          distance: 'all',
        }).unwrap();
        sethospitals(res);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        // Handle error, maybe set an error state
      }
    }

    fetchData();
    setCardCount(hospitals1.length);
  }, [accessLatitude, accessLongitude]);


  const determineFlexWrap = () => {
    if (cardCount === 1) {
      return 'center';
    } else if (cardCount === 2 || cardCount === 3) {
      return 'wrap';
    } else {
      return 'wrap';
    }
  };
  const handleButtonClick = (_id,img) => {
    // navigate('/viewHospital', { state: _id });
    navigate(`/viewHospital/${_id}`,{ state: img });
  };

  const fun = () => {
    console.log(hospitalRating, "hospitalRating")
  }
  return (
    <Box bg={"blue.100"}>
      {/* <Header/> */}
      <InputGroup  >
        <Select bg={'gray.200'} maxW='200px' maxH='30px' mt="10" ml='16' mb='10' value={distance} onChange={handleHospitalChange} placeholder="Find nearest hospital">
          <option value="10">10 kilometers</option>
          <option value="15">15 kilometers</option>
          <option value="20">20 kilometers</option>
          <option value="30">30 kilometers</option>
          <option value="50">50 kilometers</option>
          <option value='all'>View All</option>
        </Select>
      </InputGroup>
      <Container maxW="container.xl" className='mt-10 ml-10'>
        <Flex flexWrap={determineFlexWrap()} justifyContent={cardCount <= 3 ? 'center' : 'flex-start'}>
          {hospitals.map((item, index) => (
            <Card maxW='300px' className=' mt-15' ml="14" mb="100" >
              <CardBody>
                <Image
                  src={item.profileImage}
                  alt='Green double couch with wooden legs'
                  borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                  <Center>
                  <Heading size='md'>{item.name}</Heading>
                  </Center>
                  <Center>
                  <Text>
                    {item.title}
                  </Text>
                  </Center>
                  <Center>
                  <Text>
                    {item.address}
                  </Text>
                  </Center>
                  <Text color='blue.600' fontSize='2xl'>
                  </Text>

                  {hospitalRating?.find(rating => rating._id === item._id) ? (
                      <Center>
                        <Flex>
                          <Text>{(hospitalRating?.find(rating => rating._id === item._id).average).toFixed(1)}</Text>
                          <Box pl="2" pr="2">
                          <StarRating rating={hospitalRating?.find(rating => rating._id === item._id).average}/>
                          </Box>
                          <Text>({hospitalRating?.find(rating => rating._id === item._id).count})</Text>
                          </Flex>
                          </Center>
                      
                        //  <StarRating rating={3.5}/>
                    // <Text>{hospitalRating.find(rating => rating._id === item._id).average}</Text>
                  ) : (
                    <Text pt="3" color="green.500">Be the First to Rate</Text>
                  )}
             
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter display='flex' justifyContent='center'>
                <Button variant='solid' colorScheme='blue' onClick={() => handleButtonClick(item._id,item.profileImage)} >
                  View Profile
                </Button>
      
              </CardFooter>
            </Card>
          ))}
        </Flex>
      </Container>
      {/* <Button onClick={fun}>hii</Button> */}
    </Box>
  )
}

export default FindHospital
