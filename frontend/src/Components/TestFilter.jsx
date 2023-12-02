import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const TestFilter = () => {
  const [filters, setFilters] = useState({
    option1: false,
    option2: false,
    option3: false,
    // Add more options if needed
  });

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showFilters, setShowFilters] = useState(true); // Initially showing filters
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  return (
    <React.Fragment>
      {showFilters ? (
        <VStack spacing={4}>
          <Checkbox
            name="option1"
            isChecked={filters.option1}
            onChange={handleCheckboxChange}
          >
            Option 1
          </Checkbox>
          <Checkbox
            name="option2"
            isChecked={filters.option2}
            onChange={handleCheckboxChange}
          >
            Option 2
          </Checkbox>
          <Checkbox
            name="option3"
            isChecked={filters.option3}
            onChange={handleCheckboxChange}
          >
            Option 3
          </Checkbox>
          {/* Add more checkboxes as needed */}
          <Button colorScheme="blue" onClick={applyFilters}>
            Apply Filters
          </Button>
        </VStack>
      ) : (
        <IconButton
          icon={<HamburgerIcon />}
          aria-label="Filter Menu"
          onClick={handleDrawerToggle}
        />
      )}

      <Drawer placement="left" onClose={handleDrawerToggle} isOpen={isDrawerOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filters</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4}>
              <Checkbox
                name="option1"
                isChecked={filters.option1}
                onChange={handleCheckboxChange}
              >
                Option 1
              </Checkbox>
              <Checkbox
                name="option2"
                isChecked={filters.option2}
                onChange={handleCheckboxChange}
              >
                Option 2
              </Checkbox>
              <Checkbox
                name="option3"
                isChecked={filters.option3}
                onChange={handleCheckboxChange}
              >
                Option 3
              </Checkbox>
              {/* Add more checkboxes as needed */}
              <Button colorScheme="blue" onClick={applyFilters}>
                Apply Filters
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
};

export default TestFilter;
