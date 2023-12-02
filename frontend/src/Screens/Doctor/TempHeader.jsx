import React from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useDoctorLogoutMutation } from "../../slices/doctorApiSlice";
import { doctorLogout } from "../../slices/doctorAuthSlice";
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
} from '@chakra-ui/react'
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons'

function HeaderDoctor() {
    const { isOpen, onToggle } = useDisclosure()
    const { doctorInfo } = useSelector((state) => state.auth);
    const { data: fetchDoctorInfo,isLoading, refetch } = useGetDoctorInfoQuery({ id: doctorInfo._id })
    // const { adminInfo } = useSelector((state) => state.adminAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [doctorLogoutApiCall] = useDoctorLogoutMutation();

    const doctorLogoutHandler = async () => {
        console.log('chk hospital logout');
        try {
          await doctorLogoutApiCall().unwrap()
          dispatch(doctorLogout())
          navigate('/doctor/doctorLogin')
        } catch (error) {
          console.error(error);
        }
      }
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
            <Text
                textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                fontFamily={'heading'}
                color={useColorModeValue('gray.800', 'white')}>
                Logo
            </Text>

            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                <DesktopNav />
            </Flex>
        </Flex>

        <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
            <Button as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} href={'#'}>
                Sign In
            </Button>
            <Button
                onClick={doctorLogoutHandler}
                as={'a'}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'} /* Change the color to blue */
                bg={'blue.400'} /* Change the background to a shade of blue */
                href={'#'}
                _hover={{
                    bg: 'blue.300', /* Change hover background color if desired */
                }}
            >
                Log Out
            </Button>
        </Stack>
    </Flex>

    <Collapse in={isOpen} animateOpacity>
        <MobileNav />
    </Collapse>
</Box>
  )
}

export default HeaderDoctor

const DesktopNav = () => {
    const navigate = useNavigate()
    const linkColor = useColorModeValue('gray.600', 'gray.200')
    const linkHoverColor = useColorModeValue('gray.800', 'white')
    const popoverContentBgColor = useColorModeValue('white', 'gray.800')

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Box
                                as="a"
                                p={2}
                 
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}
                                onClick={() => navigate(navItem.href) 
                                    }
                            >
                                {navItem.label}
                            </Box>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>

                            </PopoverContent>
                        )}
                    </Popover>
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
        label: 'DoctorHome',
        href: '/',
    },
    {
        label: 'Schedule',
        href: '/findHospital',
    },
    {
        label: 'History',
        href: '/',
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
                // href={href ?? '#'}
                onClick={() => navigate(href)}
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                    textDecoration: 'none',
                }}>
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

