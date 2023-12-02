import React,{useState} from 'react'
import { toast } from "react-toastify";

import {
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Button,
    Select,
    Drawer,
    DrawerOverlay,
    DrawerHeader,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    Textarea,
    FormErrorMessage
} from '@chakra-ui/react'
import { useHospitalListDepartmentsQuery } from "../../slices/hospitalApiSlice"
import { useSelector } from "react-redux";
import {useHospitalAddDoctorMutation} from "../../slices/hospitalApiSlice"

function AddDoctorModal({refetch}) {
    const { hospitalInfo } = useSelector((state) => state.hospitalAuth)
    const { data: hospitalDepartment, isLoading, refetch:chech } = useHospitalListDepartmentsQuery({ id: hospitalInfo._id })
    const [addDoctor]= useHospitalAddDoctorMutation()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [department,setDepartments]= useState('')
    const [title, setTitle] = useState('');
    const [qualification,setQualification]= useState('')
    const [description,setDescription]= useState('')
    const [errors, setErrors] = useState({});

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const addDoctors = async () => {
    const hospital =hospitalInfo._id

        try {
            console.log("add dd");
          const response = await addDoctor({name,email,password,department,hospital,title,qualification,description})
          console.log(response.data.success,'response')
          refetch()
          toast.success(response.data.success);
          onClose()
        } catch (error) {
        }
      }

      const validateFields = () => {
        const newErrors = {};
        if (!department) newErrors.departments = 'Department is required';
        if (!name) newErrors.name = 'Name is required';
        if (!email) newErrors.email = 'Email is required';
        if (!title) newErrors.title = 'Title is required';
        if (!qualification) newErrors.qualification = 'Qualification is required';
        if (!description) newErrors.description = 'Description is required';
        if (!password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

    const confirmHandler =(()=>{
      console.log("chkk doct");
        const isValid = validateFields();
        console.log(isValid,"isValid")
        if (isValid) {
        addDoctors()
        }
    })

    return (
        <>
        <Button colorScheme="green" className="pl-10" onClick={onOpen}>
          Add Doctor
        </Button>
  
        <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="lg">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>Add New Doctor</DrawerHeader>
            <DrawerBody pb={6}>
              <Select placeholder="Select option" onChange={(event) => setDepartments(event.target.value)}>
                {hospitalDepartment &&
                  hospitalDepartment.map((it, index) => (
                    <option key={it._id} value={it._id}>
                      {it.name}
                    </option>
                  ))}
              </Select>
              <FormControl mt={4} isInvalid={!!errors.departments}>
                <FormErrorMessage>{errors.departments}</FormErrorMessage>
              </FormControl>
  
              <FormControl mt={4} isInvalid={!!errors.name}>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
  
              <FormControl mt={4} isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
  
              <FormControl mt={4} isInvalid={!!errors.title}>
                <FormLabel>Title</FormLabel>
                <Input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                <FormErrorMessage>{errors.title}</FormErrorMessage>
              </FormControl>
  
              <FormControl mt={4} isInvalid={!!errors.qualification}>
                <FormLabel>Qualification</FormLabel>
                <Input placeholder="Qualification" onChange={(e) => setQualification(e.target.value)} />
                <FormErrorMessage>{errors.qualification}</FormErrorMessage>
              </FormControl>
  
              <FormControl mt={4} isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
  
              <FormControl mt={4} isInvalid={!!errors.description}>
                <FormLabel>Description</FormLabel>
                <Textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              </FormControl>
            </DrawerBody>
  
            <DrawerFooter>
              <Button colorScheme="blue" mr={3} className="align-top" onClick={confirmHandler}>
                Confirm
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
}

export default AddDoctorModal
