import React from 'react'
import { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Grid,
  VStack,
  Heading,
  Text,
  Avatar,
} from '@chakra-ui/react';

import UserBookSlot from './UserBookSlot';

function ViewDoctorProfile({item}) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const onClose = () => setIsDrawerOpen(false);
    const onOpen = () => setIsDrawerOpen(true);
  return (
    <Box>
    <Button colorScheme='blue' onClick={onOpen}>View Profile</Button>

    <Drawer placement="right" onClose={onClose} isOpen={isDrawerOpen} size="lg">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>Doctor's Profile</DrawerHeader>
        <DrawerBody>
          <Box p={4} maxW="600px" bg="white" borderRadius="lg" boxShadow="md">
            <Grid templateColumns="1fr 2fr" gap={8}>
              {/* Avatar */}
              <Box bg="blue.200" borderRadius="md" p={2} display="grid" justifyContent="center" alignItems="center">
                <Avatar size="2xl" name={item.name} src={item?.image} />
              </Box>
              
              {/* Personal Data */}
              <Box bg="gray.200" borderRadius="md" p={2}>
                <VStack align="flex-start" spacing={2} color='gray.600'>
                  <Heading size="md">{item?.name}</Heading>
                  <Text>
                    <strong>Title:</strong> {item?.title}
                  </Text>
                  <Text>
                    <strong>Department:</strong> {item?.department}
                  </Text>
                  <Text>
                    <strong>Qualification:</strong> {item?.qualification}
                  </Text>
                </VStack>
              </Box>
            </Grid>

            {/* Details */}
            <Box bg="gray.200" borderRadius="md" p={4} mt={4}>
              <VStack align="flex-start" spacing={2}>
                <Text color='gray.600'>
                  <strong>About:</strong> {item?.description}
                </Text>
                {/* Add more details as needed */}
              </VStack>
              <UserBookSlot item={item} />
            </Box>
          </Box>
         
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  </Box>
  )
}

export default ViewDoctorProfile
