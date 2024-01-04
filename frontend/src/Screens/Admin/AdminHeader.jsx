import React from 'react';
import {
  IconButton,
  Avatar,
  CloseButton,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';

import { useSelector, useDispatch } from "react-redux";
import { useAdminLogoutMutation } from "../../slices/adminApiSlice";
import { adminLogout } from "../../slices/adminAuthSlice";
// import { adminLogout } from "../slices/adminAuthSlice";
import { useNavigate } from "react-router-dom";

const LinkItems = [
  { name: 'Home',href: '/admin', icon: FiHome },
  { name: 'Departments',href: '/admin/getDepartment', icon: FiTrendingUp },
  { name: 'Hospitals',href: '/admin/getHospital', icon: FiCompass },
  { name: 'Doctors',href:'/admin/getDoctor', icon: FiStar },
  { name: 'Users',href:'/admin/getUser',icon: FiSettings },
  { name: 'Verifiction',href:'/admin/verification',icon: FiSettings },
];


function AdminHeader() {
    const { isOpen, onOpen, onClose } = useDisclosure()



  return (
    <div>
       <Box minH="100vh" >
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet/>
      </Box>
    </Box>
    </div>
  )
}

export default AdminHeader

const SidebarContent = ({ onClose, ...rest }) => {
  const navigate = useNavigate();
    return (
      <Box
        transition="3s ease"
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        {...rest}
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Logo
          </Text>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon}   onClick={() => navigate(link.href) 
          }>
            {link.name}
            
          </NavItem>
        ))}
      </Box>
    );
  };
  
  import { Box, Icon } from '@chakra-ui/react';
  
  const NavItem = ({ icon, children, ...rest }) => {
    return (
      <Box as="a" href="#" textDecoration="none" _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    );
  };
  
  
  import {
    Flex,
  } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
  
  const MobileNav = ({ onOpen, ...rest }) => {
    const [adminLogoutApiCall] = useAdminLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const adminLogoutHandler=async()=>{
        console.log('chk hospital logout');
        try {
          await adminLogoutApiCall().unwrap()
          dispatch(adminLogout())
          navigate('/admin/adminLogin')
        } catch (error) {
          console.error(error);
        }

    }
    return (
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg="white"
        borderBottomWidth="1px"
        borderBottomColor="gray.200"
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
        {...rest}
      >
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
  
        <Text
          display={{ base: 'flex', md: 'none' }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          Logo
        </Text>
  
        <HStack spacing={{ base: '0', md: '6' }}>
          <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
          <Flex alignItems="center">
            <Menu>
              <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar
                    size="sm"
                    src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  />
                  <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
          
                    <Text fontSize="xs" color="gray.600">Admin</Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList bg="white" borderColor="gray.200">
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuDivider />
                <MenuItem onClick={adminLogoutHandler}  >Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    );
  };
  