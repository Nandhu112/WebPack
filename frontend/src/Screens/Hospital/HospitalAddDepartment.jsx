import React, { useEffect,useState } from 'react';
import { useSelector } from "react-redux";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Checkbox,
  Box

} from '@chakra-ui/react'
import { toast } from "react-toastify";

import { useHospitaListAllDepartmentMutation,useHospitalAddNewDepartmentMutation } from "../../slices/hospitalApiSlice"

function HospitalAddDepartment({refetch}) {
const [departments, setDepartments] = useState([])
const [newDepartment,setNewDepartment]=useState([])
const {hospitalInfo}= useSelector((state)=>state.hospitalAuth)
const { isOpen, onOpen, onClose } = useDisclosure()
const firstField = React.useRef()

  const [fetchDepartments] = useHospitaListAllDepartmentMutation()
  const [addDepartment]= useHospitalAddNewDepartmentMutation()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDepartments()
        setDepartments(response.data)
      } catch (error) {
        console.log('error', error)
      }
    }
    fetchData()
  }, [])

  const addNewDepartment = async () => {
    const h_id= hospitalInfo._id
    const dept_id= newDepartment
    try {
      const response = await addDepartment({h_id,dept_id})
      console.log(response.data.success,'response')
      toast.success(response.data.success);
      onClose()
      refetch()
      setNewDepartment([])
    } catch (error) {
    }
  }
  const SubmitDepartment=(()=>{

    addNewDepartment()

  })


  const handleCheckboxChange = (e,id) => {
    let newDepartmentss
  
    if(!e){
       newDepartmentss = newDepartment.filter((number) => number != id );
    }
    else{
      newDepartmentss = [...newDepartment, id];
    }
    setNewDepartment(newDepartmentss);

  };

  return (

    <>
      <Button colorScheme='teal' onClick={onOpen}>
        Add Department
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Add New Department
          </DrawerHeader>

          <DrawerBody>
            {departments ? (departments.map((department) => (
              <Box mt='5'>
                {/* <Checkbox isInvalid>Checkbox</Checkbox> */}
               <Checkbox 
                 onChange={(e)=>{handleCheckboxChange(e.target.checked,department._id)}}
                  >
                    {department.name}
                 </Checkbox>
              </Box>
            ))) : ("oo")}

          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={SubmitDepartment}>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )


}
export default HospitalAddDepartment
