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
  FormErrorMessage,
  Grid
} from '@chakra-ui/react'
import { LinkContainer } from "react-router-bootstrap";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify";
// import Loader from '../components/Loader';
import { useHospitalRegisterMutation } from '../../slices/hospitalApiSlice';
import {setHospitalCredentials} from '../../slices/hospitalAuthSlice';

// google Auth
import React from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";



function AddNewHospitalAdmin() {

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [errors, setErrors] = useState({});
    const [accessLatitude, setAccessLatitude] = useState('');
    const [accessLongitude, setAccessLongitude] = useState('');
  
    
  
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
      if (!title) newErrors.title = 'Title is required';
      if (!address) newErrors.address = 'Address is required';
      if (!password) newErrors.password = 'Password is required';
      if (!name) newErrors.name = 'Name is required';
      if (!confirmPassword) newErrors.confirmPassword = 'ConfirmPassword is required';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const { hospitalInfo } = useSelector((state) => state.hospitalAuth);
  
    const [register, { isLoading }] = useHospitalRegisterMutation();
  
  //Location
  
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    var crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    setAccessLatitude(crd.latitude)
    setAccessLongitude(crd.longitude)
    
  }
  
  function errors1(err) {
    // console.warn(ERROR(${err.code}): ${err.message});
  }
  
  
    useEffect(() => {
      // if (hospitalInfo) {
      //   navigate('/hospital');
      // }
  
      if (navigator.geolocation) {
        console.log("Your curren:");
        navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            console.log(result,"kk");
            if (result.state === "granted") {
              //If granted then you can directly call your function here
              navigator.geolocation.getCurrentPosition(success, errors1, options);
            } else if (result.state === "prompt") {
              //If prompt then the user will be asked to give permission
              navigator.geolocation.getCurrentPosition(success, errors1, options);
            } else if (result.state === "denied") {
              //If denied then you have to show instructions to enable location
              console.log('chkk slse');
            }
          });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }, []);
  
    const submitHandler = async (e) => {
      console.log(name, 'frm fun')
      console.log(email, 'frm fun')
  
      e.preventDefault();
  
      const isValid = validateFields();
  
      if(isValid){
        const isValidateConfirm =validateConfirm()
        if(isValidateConfirm){
      try {
        const res = await register({ name, email, password,title,address,accessLatitude,accessLongitude }).unwrap();
        // dispatch(setCredentials({ ...res }));
        console.log(res,'chkkk responce')
        toast.success(res.message);
        
        // navigate('/')
  
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
      }
    }
    };
  
  return (
    <Stack minH={'100vh'} align={'center'} justify={'center'} bg={'gray.50'}>
    <Button onClick={handleOpenModal} bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500' }}>
      Add Hospital
    </Button>

    <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign up to your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={submitHandler}>
            <Stack spacing={8}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
          <FormControl id="title" isInvalid={!!errors.title}>
            <FormLabel>Type</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FormErrorMessage>{errors.title}</FormErrorMessage>
          </FormControl>
          <FormControl id="address" isInvalid={!!errors.address}>
            <FormLabel>Address</FormLabel>
            <Input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <FormErrorMessage>{errors.address}</FormErrorMessage>
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
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>

              <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormControl>

              <Button
                type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{ bg: 'blue.500' }}
              >
                Sign in
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  </Stack>
  )
}

export default AddNewHospitalAdmin
