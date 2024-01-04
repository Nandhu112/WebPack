import React from 'react'
import { Grid, GridItem, Box, Image, Text, Center } from "@chakra-ui/react";

function Departments() {
    const data = [
        { imageUrl: "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/cardiology_icon.svg", text: "Cardiology" },
        { imageUrl: "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/neurology.svg", text: "Neurology " },
        { imageUrl: "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/orthopaedic.svg", text: "Orthopaedic" },
        { imageUrl: "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/oncology_icon.svg", text: "oncology" },
        { imageUrl: "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/gynecology.svg", text: "Gynecology" },
        { imageUrl: "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/dermatology.svg", text: "Dermatology" },
        { imageUrl: "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/ophthalmology.svg", text: "Ophthalmology" },
        { imageUrl: "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/paediatricurology.svg", text: "Pediatrics" },
        { imageUrl: "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/endocrinology.svg", text: "Endocrinology" },
        { imageUrl: "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/urology.svg", text: "Urology" },
        { imageUrl: "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/nephrology.svg", text: "Nephrology" },
        { imageUrl: "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/pulmonology.svg", text: "pulmonology" },
        { imageUrl: "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/radiology.svg", text: "radiology" },
        { imageUrl: "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/plasticsurgery.svg", text: "Plasticsurgery" },
        { imageUrl: "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/psychiatry.svg", text: "psychiatry" },
        { imageUrl: "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/dentistry.svg", text: "dentistry" },
        // Add more objects for additional boxes
      ];

  return (
<Grid
 bg="blue.30"
  templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(6, 1fr)", xl: "repeat(7, 1fr)" }}
  gap={4}
>
  {data.map((item, index) => (
    <Box
      key={index}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.05)" }}
    >
      <Center>
        <Image src={item.imageUrl} alt={`Image ${index + 1}`} />
      </Center>
      <Text textAlign="center" p={2} fontSize="sm" fontWeight="bold" color="gray.700">
        {item.text}
      </Text>
    </Box>
  ))}
</Grid>
  )
}

export default Departments
