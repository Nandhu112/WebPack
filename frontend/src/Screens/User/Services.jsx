import React from 'react'
import { Grid, GridItem, Box, Image, Text, Center } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom'
function Services({setOpenProfile}) {
  const navigate=useNavigate()
    const data = [
        { imageUrl: "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v2/images/bookappt_icon.svg", text: "Book Appointment" },
        { imageUrl: "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v2/images/buymedicines_icon.svg", text: "Consult Online" },
        { imageUrl: "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v2/images/consultonline_icon.svg", text: " Medicines" },
        { imageUrl: "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v2/images/bookhelathcheck_icon.svg", text: "Book Health Checkup" },
        { imageUrl: "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v2/images/findhsptl_icon.svg", text: "Find Hospital" },
        { imageUrl: "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v2/images/finddoctor_icon.svg", text: "View Records" },


      ];

   const handleNavigation=(name)=>{
   
    if(name === "Book Appointment" || name ===  "Consult Online" || name ===  "Book Health Checkup" || name ===  "Find Hospital"){
      navigate("/findHospital");
    }
    else{
      setOpenProfile(true)
    }
  
      }
  return (
    <Grid
    bg="blue.30"
     templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(6, 1fr)", xl: "repeat(6, 1fr)" }}
     gap={4}
   >
     {data.map((item, index) => (
       <Box
       bg="white"
         key={index}
         borderWidth="1px"
         borderRadius="lg"
         overflow="hidden"
         boxShadow="md"
         transition="transform 0.2s"
         _hover={{ transform: "scale(1.05)" }}
         onClick={()=>handleNavigation(item.text)}
       >
         <Center mt="10">
           <Image src={item.imageUrl} alt={`Image ${index + 1}`} />
         </Center>
         <Text mb="10" textAlign="center" p={2} fontSize="sm" fontWeight="bold" color="gray.700">
           {item.text}
         </Text>
       </Box>
     ))}
   </Grid>
  )
}

export default Services
