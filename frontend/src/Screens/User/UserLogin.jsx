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
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { Form, Button, Row, Col } from 'react-bootstrap';
// import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../slices/userApiSlice';
// import Loader from '../components/Loader';
import { setCredentials } from '../../slices/userAuthslice';
import { toast } from "react-toastify";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

//Google Auth
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";



function signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const validateFields = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("chkk validation");
    const isValid = validateFields();
    console.log(isValid,"isValid")
    if (isValid) {
    
      try {
        const res = await login({ email, password,gmail:false }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } catch (err) {
        console.log(err,'kkkkkkkk')
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const googleSubmitHandler = async (decoded) => {
    console.log('hiiii ')
    const email=decoded.email
    try {
      const res = await login({ email,gmail:true }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      console.log(err,'kkkkkkkk')
      toast.error(err?.data?.message || err.error);
    }
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
              <GoogleOAuthProvider clientId="370355015242-i74ue5fs2dmhutl5bca639b1cldsa20j.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const decoded = jwtDecode(
                      credentialResponse.credential
                    )
                    googleSubmitHandler(decoded)

                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
              </GoogleOAuthProvider>
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
            <LinkContainer to="/userRegister">
              <Text color={'blue.400'} textAlign="center" _hover={{ cursor: 'pointer' }}>
                Sign up
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
