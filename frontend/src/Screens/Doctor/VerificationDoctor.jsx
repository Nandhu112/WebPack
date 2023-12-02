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
import { useDoctorVerificationMutation} from '../../slices/doctorApiSlice';

import { setDoctorCredentials } from '../../slices/doctorAuthSlice';
import { toast } from "react-toastify";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'




function VerificationDoctor() {
    const { doctorInfo } = useSelector((state) => state.doctorAuth);
    // const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [errors, setErrors] = useState({});
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
 
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [verify, { isLoading }] = useDoctorVerificationMutation();

    const validateFields = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'Email is required';
        newErrors.password = 'Password not match';
        newErrors.confirmPassword = 'Password not match';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
  
      const submitHandler = async (e) => {
        e.preventDefault();
        const isValid = validateFields();
        if (isValid) {
          try {
            const res = await verify({ email, password }).unwrap();
            console.log(res);
            toast.success(res.message);
            // navigate('/doctor');
          } catch (err) {
            console.log(err, 'kkkkkkkk');
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
        <Heading fontSize={'4xl'}>Verify your account</Heading>
      </Stack>
      <Box
        as="form"
        onSubmit={submitHandler}
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

          <FormControl id="password"isInvalid={!!errors.password}>
            <FormLabel>New Password</FormLabel>
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

          <FormControl id="password" isInvalid={!!errors.confirmPassword} >
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword)
                    }>
                    {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
            </FormControl>


          <Stack spacing={10}>
            {/* Other form elements */}
          </Stack>

          <Button
            type="submit"
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}>
            Sign in
          </Button>
        </Stack>
      </Box>
    </Stack>
  </Flex>
  )
}

export default VerificationDoctor
