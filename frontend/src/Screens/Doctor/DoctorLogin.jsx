import React from 'react'
'use client'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  FormErrorMessage
} from '@chakra-ui/react'

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useDoctorLoginMutation} from '../../slices/doctorApiSlice';

import { setDoctorCredentials } from '../../slices/doctorAuthSlice';
import { toast } from "react-toastify";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

//Google Auth
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function DoctorLogin() {

    // const { doctorInfo } = useSelector((state) => state.doctorAuth)
    const { doctorInfo } = useSelector((state) => state.doctorAuth);
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateFields = () => {
      const newErrors = {};
      if (!email) newErrors.email = 'Email is required';
      if (!password) newErrors.password = 'Password is required';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [login, { isLoading }] = useDoctorLoginMutation();

  
    useEffect(() => {
      if (doctorInfo) {
        navigate('/doctor');
      }
    }, [navigate, doctorInfo]);
  
    const submitHandler = async (e) => {
      e.preventDefault();
      const isValid = validateFields();
      if (isValid) {
      try {
        const res = await login({ email, password,gmail:false }).unwrap();
        dispatch(setDoctorCredentials({ ...res }));
        navigate('/doctor');
      } catch (err) {
        console.log(err,'kkkkkkkk')
        toast.error(err?.data?.message || err.error);
      }
    }
    };
  
  return (
   <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>Log in to your account</Heading>
      </Stack>
      <Box
        as="form" // Added form element here
        onSubmit={submitHandler} // Added onSubmit event handler
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={4}>
        <FormControl id="email" isInvalid={!!errors.email}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
             <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl id="password"  isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>
          <Stack spacing={10}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Text color={'blue.400'}>Forgot password?</Text>
            </Stack>
            <Stack align={'center'} justify={'center'}>
    
            </Stack>
            <Button
              type="submit" // Added type as submit
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
  )
}

export default DoctorLogin
