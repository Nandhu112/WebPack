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
  Button,
} from '@chakra-ui/react';
import {useGetHospitalInfoQuery} from "../../slices/hospitalApiSlice"
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
import { useHospitalLogoutMutation } from "../../slices/hospitalApiSlice";

import { useSelector, useDispatch } from "react-redux";
import { hospitalLogout } from "../../slices/hospitalAuthSlice";
import { adminLogout } from "../../slices/adminAuthSlice";
// import { adminLogout } from "../slices/adminAuthSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useSocket } from '../../Provider/socketProvider';
import { SocketProvider } from '../../Provider/socketProvider';

const LinkItems = [
  { name: 'Home',href: '/hospital', icon: FiHome },
  { name: 'Doctors',href: '/hospital/listDoctor', icon: FiTrendingUp },
  { name: 'Booking', icon: FiCompass },
  { name: 'Schedule',icon: FiStar },
  { name: 'History',icon: FiSettings },
  { name: 'Profile',href: '/hospital/profile',icon: FiSettings },
  { name: 'Messages',href: '/hospital/chat',icon: FiSettings },
  
];


function HospitaHeader() {
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

export default HospitaHeader

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
      const { socket, socketConnected } = useSocket();
      const {hospitalInfo}= useSelector((state)=>state.hospitalAuth)
      const { data: getHospital,isLoading, refetch } = useGetHospitalInfoQuery({_id: hospitalInfo?._id })

      const [hospitalLogoutApiCall] = useHospitalLogoutMutation();
      const dispatch = useDispatch();
      const navigate = useNavigate();

      useEffect(() => {
        if (socket && hospitalInfo && hospitalInfo?._id) {
            console.log('chkk use eff')
            socket.emit("setup",hospitalInfo?._id);
        }
    }, [socket, hospitalInfo]);
  
      const hospitaLogoutHandler = async () => {
        console.log('chk hospital logout');
        try {
          await hospitalLogoutApiCall().unwrap()
          console.log('chk hospital logout11');
          dispatch(hospitalLogout())
          console.log('chk hospital logout22');
          navigate('/hospital/hospitalLogin')
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
                      src={getHospital?.profileImage}
                    />
                    <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
            
                      <Text fontSize="xs" color="gray.600">{hospitalInfo?.name}</Text>
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
                  <MenuItem onClick={hospitaLogoutHandler}  >Sign out</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </HStack>
        </Flex>
      );
    };
    
