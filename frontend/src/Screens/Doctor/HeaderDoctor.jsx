import React,{useEffect} from 'react';
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

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useDoctorLogoutMutation } from "../../slices/doctorApiSlice";
import { useNavigate } from "react-router-dom";
import { doctorLogout } from "../../slices/doctorAuthSlice";
import { useGetDoctorInfoQuery } from "../../slices/doctorApiSlice"

const LinkItems = [
  { name: 'DoctorHome',href: '/doctor', icon: FiHome },
  { name: 'Schedule',href: '', icon: FiTrendingUp },
  { name: 'History', icon: FiCompass },

];


function HeaderDoctor() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  

  return (
    <div>
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
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
   <MobileNav onOpen={onOpen}  />
   <Box ml={{ base: 0, md: 60 }} p="4">
     <Outlet/>
   </Box>
 </Box>
 </div>
  )
}

export default HeaderDoctor

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
        const { doctorInfo } = useSelector((state) => state.doctorAuth)
        const { data: fetchDoctorInfo,isLoading, refetch } = useGetDoctorInfoQuery({ id: doctorInfo?._id })
        const dispatch = useDispatch();
        const navigate = useNavigate();
    
        const [doctorLogoutApiCall] = useDoctorLogoutMutation();
  
      const doctorLogoutHandler = async () => {
     
        try {
          await doctorLogoutApiCall().unwrap()
          dispatch(doctorLogout())
          navigate('/doctor/doctorLogin')
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
            <Flex alignItems="center">
              <Menu>
                <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                  <HStack>
                    <Avatar
                      size="sm"
                      src={fetchDoctorInfo?.profileImage}
                    />
                    <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
            
                      <Text fontSize="xs" color="gray.600">{fetchDoctorInfo?.name}</Text>
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
                  <MenuItem onClick={doctorLogoutHandler}  >Sign out</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </HStack>
        </Flex>
      );
    };
    

