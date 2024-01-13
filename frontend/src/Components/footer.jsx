import React from 'react'
'use client'

import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

function Footer() {
    return (
        <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Container as={Stack} maxW={'6xl'} py={10}>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
            <Stack align={'flex-start'}>
              <ListHeader>Product</ListHeader>
              <Box as="a" href={'#'}>
                Overview
              </Box>
              <Stack direction={'row'} align={'center'} spacing={2}>
                <Box as="a" href={'#'}>
                  Features
                </Box>
                <Tag
                  size={'sm'}
                  bg={useColorModeValue('green.300', 'green.800')}
                  ml={2}
                  color={'white'}>
                  New
                </Tag>
              </Stack>
              <Box as="a" href={'#'}>
                Tutorials
              </Box>
              <Box as="a" href={'#'}>
                Pricing
              </Box>
              <Box as="a" href={'#'}>
                Releases
              </Box>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Company</ListHeader>
              <Box as="a" href={'#'}>
                About Us
              </Box>
              <Box as="a" href={'#'}>
                Press
              </Box>
              <Box as="a" href={'#'}>
                Careers
              </Box>
              <Box as="a" href={'#'}>
                Contact Us
              </Box>
              <Box as="a" href={'#'}>
                Partners
              </Box>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Legal</ListHeader>
              <Box as="a" href={'#'}>
                Cookies Policy
              </Box>
              <Box as="a" href={'#'}>
                Privacy Policy
              </Box>
              <Box as="a" href={'#'}>
                Terms of Service
              </Box>
              <Box as="a" href={'#'}>
                Law Enforcement
              </Box>
              <Box as="a" href={'#'}>
                Status
              </Box>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Follow Us</ListHeader>
              <Box as="a" href={'#'}>
                Facebook
              </Box>
              <Box as="a" href={'#'}>
                Twitter
              </Box>
              <Box as="a" href={'#'}>
                Dribbble
              </Box>
              <Box as="a" href={'#'}>
                Instagram
              </Box>
              <Box as="a" href={'#'}>
                LinkedIn
              </Box>
            </Stack>
          </SimpleGrid>
        </Container>
        <Box py={10}>
          <Flex
            align={'center'}
            _before={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('gray.200', 'gray.700'),
              flexGrow: 1,
              mr: 8,
            }}
            _after={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('gray.200', 'gray.700'),
              flexGrow: 1,
              ml: 8,
            }}>
            <Logo />
          </Flex>
          <Text pt={6} fontSize={'sm'} textAlign={'center'}>
            © 2024 medpack. All rights reserved
          </Text>
        </Box>
      </Box>
    );
  }
 
  export default Footer;

function ListHeader({ children }) {
    return (
      <Text fontWeight={'bold'} mb={2} fontSize={'sm'} color={useColorModeValue('gray.700', 'gray.200')}>
        {children}
      </Text>
    );
  }

  function Logo(props) {
    return (
      React.createElement("svg", { height: 32, viewBox: "0 0 120 28", xmlns: "http://www.w3.org/2000/svg", ...props },
        React.createElement("path", {
          d: "M34.87 8.07H37.87V20.2H34.87V8.07ZM39.06 15.62C39.06 12.62 40.9 10.83 43.74 10.83C46.58 10.83 48.42 12.62 48.42 15.62C48.42 18.62 46.62 20.42 43.74 20.42C40.86 20.42 39.06 18.67 39.06 15.62ZM45.41 15.62C45.41 13.97 44.76 13 43.74 13C42.72 13 42.08 14 42.08 15.62C42.08 17.24 42.71 18.22 43.74 18.22C44.77 18.22 45.41 17.3 45.41 15.63V15.62Z /* ... (and so on) */",
          fill: "currentColor"
        }),
        React.createElement("path", {
          d: "M26.48 8.62001C25.9711 7.45637 25.2975 6.37195 24.48 5.40001C /* ... (truncated for brevity) */",
          fill: "#2F855A"
        })
      )
    );
  }
  
  
