import React from 'react'
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
  Image
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons'


function LandingHeader() {
    const { isOpen, onToggle } = useDisclosure()
  return (
    <Box>
    <Flex
     bg="blue.50"
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
  

      </Stack>
    </Flex>

    <Collapse in={isOpen} animateOpacity>
      <MobileNav />
    </Collapse>
  </Box>
  )
}

export default LandingHeader

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200')
    const linkHoverColor = useColorModeValue('gray.800', 'white')
    const popoverContentBgColor = useColorModeValue('white', 'gray.800')
  
    return (
      <Stack direction={'row'} spacing={4} >
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label} >
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <Box
                  as="a"
                  p={2}
                  href={navItem.href ?? '#'}
                  fontSize={'sm'}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}>
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

  ];
  

  const MobileNavItem = ({ label, children, href }, NavItem) => {
    const { isOpen, onToggle } = useDisclosure()
  
    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Box
        
          py={2}
          as="a"
          href={href ?? '#'}
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
  
 
      </Stack>
    )
  }
  

