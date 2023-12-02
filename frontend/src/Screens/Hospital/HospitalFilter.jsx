import React, { useState, useEffect } from 'react';
import HospitalAddDepartment from './HospitalAddDepartment';
import Loader from '../../Components/Loader';
import {
  Checkbox,
  VStack,
  Button,
  useToast,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Box,
  Card,
  Text,
  useBreakpointValue
  
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useHospitalListDepartmentsQuery } from "../../slices/hospitalApiSlice"
import { useSelector } from "react-redux";
import {useUserListHospitalDepartmentsQuery} from "../../slices/userApiSlice"


function HospitalFilter({_id}) {


  const { data: hospitalDepartment,isLoading, refetch } = useUserListHospitalDepartmentsQuery({ id:_id})


  const [filters, setFilters] = useState({
    option1: false,
    option2: false,
    option3: false,
    // Add more options if needed
  });

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showFilters, setShowFilters] = useState(true); // Initially showing filters
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [forDrawerOpen, setForDrawerOpen] = useState(false);

  const toast = useToast();

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  const applyFilters = () => {
    // Do something with selected filters
    console.log('Selected Filters:', filters);

    // Example: Show a toast notification with selected filters
    toast({
      title: 'Filters Applied!',
      description: `Selected Filters: ${Object.keys(filters)
        .filter((key) => filters[key])
        .join(', ')}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Set showFilters based on window width
    setShowFilters(windowWidth > 768); // Change 768 to your desired breakpoint
  }, [windowWidth]);

  const isDrawerVisible = useBreakpointValue({ base: true, md: false});

  const handleDrawerToggleOpen=(()=>{
    setForDrawerOpen(true)
    handleDrawerToggle()
  })

  return (
    <React.Fragment>
      {showFilters ? (
        <Box minW='200px'  >
          <Card>
            <VStack spacing={4} p='10' alignItems='flex-start'>
              
            {hospitalDepartment && hospitalDepartment.map((it,index) =>
                  
                  <Checkbox
                    key={index} // Remember to add a unique key for each element in the array
                    name="option1"
                    isChecked={filters.option1}
                    onChange={handleCheckboxChange}
                  >
                    {it.name}
                  </Checkbox>
                )}
               : (
          
              )
              {/* Add more checkboxes as needed */}
              <Box className='mt-5 mb-5'>
                <HospitalAddDepartment refetch={refetch} />
              </Box>
            </VStack>
          </Card>
        </Box>
      ) : (
        <IconButton
          icon={<HamburgerIcon />}
          aria-label="Filter Menu"
          onClick={handleDrawerToggleOpen}

        />
      )}

{isDrawerVisible && forDrawerOpen  && (
      <Drawer placement="left" onClose={handleDrawerToggle} isOpen={isDrawerOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filters</DrawerHeader>
          <DrawerBody>
          <VStack spacing={4} p='10' alignItems='flex-start'>
              
              {hospitalDepartment && hospitalDepartment.map((it,index) =>
                    
                    <Checkbox
                      key={index} // Remember to add a unique key for each element in the array
                      name="option1"
                      isChecked={filters.option1}
                      onChange={handleCheckboxChange}
                    >
                      {it.name}
                    </Checkbox>
                  )}
                 : (
            
                )
                {/* Add more checkboxes as needed */}
                <Box className='mt-5 mb-5'>
                  <HospitalAddDepartment refetch={refetch} />
                </Box>
              </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
        )}

    </React.Fragment>


    // <>{isLoading && <Loader/>}
    //   {hospitalDepartment && hospitalDepartment.map((it) =>
    //     <h1>{it.name}</h1>   
    //   )}
    //    <HospitalAddDepartment refetch={refetch}/>
    // </>

  )
}

export default HospitalFilter
