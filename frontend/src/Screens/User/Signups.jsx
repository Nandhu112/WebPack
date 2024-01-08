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
import { ToastContainer } from 'react-toastify';
import { LinkContainer } from "react-router-bootstrap";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify";
// import Loader from '../components/Loader';
import { useRegisterMutation } from '../../slices/userApiSlice';
import { setCredentials } from '../../slices/userAuthslice';

// google Auth
import React from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});


  const validateConfirm = () => {
    const newErrors = {};
    if (password !== confirmPassword) {
      const newErrors = {};
      newErrors.password = 'Password not match';
      newErrors.confirmPassword = 'Password not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  else{
    setErrors({}); // Clear errors when passwords match
    return true; 
  }
  
}

  const validateFields = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (!name) newErrors.name = 'Name is required';
    if (!confirmPassword) newErrors.confirmPassword = 'ConfirmPassword is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  
  const submitHandler = async (e) => {
    console.log(name, 'frm fun')
    console.log(email, 'frm fun')

    e.preventDefault();
    const isValid = validateFields();

    if(isValid){
     const isValidateConfirm =validateConfirm()
     if(isValidateConfirm){
      const isPaassword =validatePassword()
      if(isPaassword){
        try {
          console.log('chkk confirm')
          const res = await register({ name, email, password }).unwrap();
          // dispatch(setCredentials({ ...res }));
          console.log(res, 'chkkk responce')
          toast.success(res.message);
    
          // navigate('/')
    
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }

      }
  
     }
    
    }
  };

  const googleSubmitHandler = async (decoded) => {
    const name = decoded.name
    const email = decoded.email

    // e.preventDefault();
    try {
      const res = await register({ name, email }).unwrap();
      dispatch(setCredentials({ ...res }));
      // navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }

  };




  const validatePassword = () => {
    console.log("chkk validatePassword ",password)
    const upperCaseRegex = /[A-Z]/; // Regex for uppercase letter
    const symbolRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/; // Regex for symbol
    const newErrors = {};
  
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      newErrors.confirmPassword = 'Password must be at least 6 characters long';
      // return 'Password must be at least 6 characters long';
    }
  
    if  (!upperCaseRegex.test(password)) {     
      newErrors.password = 'Password must contain at least one uppercase letter';
      newErrors.confirmPassword = 'Password must contain at least one uppercase letter';
      // return 'Password must contain at least one uppercase letter';
    }
  
    if (!symbolRegex.test(password)) {     
      newErrors.password = 'Password must contain at least one symbol';
      newErrors.confirmPassword = 'Password must contain at least one symbol';
      // return 'Password must contain at least one symbol';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  
  
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
        <ToastContainer />
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign up to your account</Heading>
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
            <FormControl id="name" isInvalid={!!errors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
                 <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>
            <FormControl id="password" isInvalid={!!errors.password}>
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
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Stack align={'center'} justify={'center'}>
                <GoogleOAuthProvider clientId="370355015242-i74ue5fs2dmhutl5bca639b1cldsa20j.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      const decoded = jwtDecode(
                        credentialResponse.credential
                      )
                      console.log(decoded.email, decoded.name);
                      googleSubmitHandler(decoded)

                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
                </GoogleOAuthProvider>
              </Stack>
              <Button
                type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
              <LinkContainer to="/userLogin">
              <Text color={'blue.400'} textAlign="center" _hover={{ cursor: 'pointer' }}>
                Sign in
              </Text>
              </LinkContainer>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>

  )
}

export default signup



