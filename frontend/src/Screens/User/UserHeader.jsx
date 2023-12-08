import React from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/userApiSlice";
import { logout } from "../../slices/userAuthslice";
// import { adminLogout } from "../slices/adminAuthSlice";
import { useNavigate } from "react-router-dom";

'use client'

import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    HStack,
    Menu,
    MenuButton,
    VStack,
    MenuList,
    Avatar,
    MenuItem,
    MenuDivider,
    AspectRatio,
    Image


} from '@chakra-ui/react'
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
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons'



function UserHeader() {
    const { isOpen, onToggle } = useDisclosure()
    const { userInfo } = useSelector((state) => state.auth);
    // const { adminInfo } = useSelector((state) => state.adminAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/userLogin");
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
           
<Image maxW='8' src="https://cdn.healthtechalpha.com/static/startup_data_images/112166.png" alt='naruto' objectFit='cover' />


                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    {userInfo ?
                        <HStack spacing={{ base: '0', md: '6' }}>
                            <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
                            <Flex alignItems="center">
                                <Menu>
                                    <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                                        <HStack>
                                            <Avatar
                                                size="sm"
                                                name={userInfo?.name}
                                                src={userInfo?.name}
                                            />
                                            <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">

                                                <Text fontSize="xs" color="gray.600">{userInfo?.name}</Text>
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
                                        <MenuItem onClick={logoutHandler}  >Sign out</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Flex>
                        </HStack>
                        : <Button>Log in</Button>}
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    )
}

export default UserHeader

const DesktopNav = () => {
    const navigate = useNavigate()
    const linkColor = useColorModeValue('gray.600', 'gray.200')
    const linkHoverColor = useColorModeValue('gray.800', 'white')
    const popoverContentBgColor = useColorModeValue('white', 'gray.800')

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box
                    key={navItem.label}
                    as="a"
                    p={2}
                    fontSize={'sm'}
                    fontWeight={500}
                    color={linkColor}
                    _hover={{
                        textDecoration: 'none',
                        color: linkHoverColor,
                        cursor: navItem.label === 'Home' || navItem.label === 'Hospitals' ? 'pointer' : 'default',
                    }}
                    onClick={() => navigate(navItem.href)}
                >
                    {navItem.label}
                </Box>
            ))}
        </Stack>
    )
}

const MobileNav = () => {
    return (
        <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    )
}


const NAV_ITEMS = [

    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Hospitals',
        href: '/findHospital',
    },
];


const MobileNavItem = ({ label, children, href }, NavItem) => {
    const { isOpen, onToggle } = useDisclosure()
    const navigate = useNavigate()

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Box
                py={2}
                as="a"
                onClick={() => navigate(href)}
                justifyContent="space-between"
                alignItems="center"
                _hover={{ textDecoration: 'none', cursor: 'pointer' }} // Change cursor style here
            >
                <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Box>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Box as="a" key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Box>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    )
}

