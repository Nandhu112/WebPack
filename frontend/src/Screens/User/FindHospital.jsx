import React ,{useEffect,useState} from 'react'
import Header from '../../Components/User/UserHeader.jsx';
import Search from '../../Components/Parts/search.jsx';
import HospitalCards from '../../Components/User/HospitalCards.jsx';
import { Container,Flex } from '@chakra-ui/react';
import { useUserListHospitalQuery,useUserFindNearHospitalsMutation } from "../../slices/userApiSlice.js"
import { Card, CardHeader, CardBody, CardFooter,Stack,Heading,Button,Image,Text,AspectRatio,Divider,ButtonGroup ,InputGroup
  ,Select} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
function FindHospital() {
  const navigate = useNavigate();
  const [accessLatitude, setAccessLatitude] = useState('');
  const [accessLongitude, setAccessLongitude] = useState('');
  
  const [findHospital,  isLoading ] = useUserFindNearHospitalsMutation();
  const [distance, setdistance] = useState('');
  const [hospitals,sethospitals]=useState([])
  const [cardCount, setCardCount] = useState(0);
  const hospitals1 = [];


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
const handleButtonClick = (_id) => {
  navigate('/viewHospital',{ state: _id }); 
};
  return (
    <div>
      {/* <Header/> */}
      <InputGroup maxW='200px' maxH='30px' mt='10' ml='16' mb='10'>
      <Select value={distance} onChange={handleHospitalChange} placeholder="Find nearest hospital">
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
                   src='../public/Images/Aster.webp'
                   alt='Green double couch with wooden legs'
                   borderRadius='lg'
                 />
                 <Stack mt='6' spacing='3'>
                   <Heading size='md'>{item.name}</Heading>
                   <Text>
                   {item.title} 
                   </Text>
                   <Text>
                   {item.address}
                   </Text>
                   <Text color='blue.600' fontSize='2xl'>
                   </Text>
                 </Stack>
               </CardBody>
               <Divider />
               <CardFooter display='flex' justifyContent='center'>
                 <Button variant='solid' colorScheme='blue' onClick={() => handleButtonClick(item._id)} >
                   View Profile      
                 </Button>
               </CardFooter>
             </Card>
          ))}
        </Flex>
      </Container>
 

    </div>
  )
}

export default FindHospital
