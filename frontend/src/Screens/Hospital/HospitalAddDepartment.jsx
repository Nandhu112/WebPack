import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
} from '@chakra-ui/react';
import { toast } from 'react-toastify';

import {
  useHospitaListAllDepartmentMutation,
  useHospitalAddNewDepartmentMutation
} from '../../slices/hospitalApiSlice';

function HospitalAddDepartment({ refetch,setOpenAddDepartment }) {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState([]);
  const { hospitalInfo } = useSelector((state) => state.hospitalAuth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const [fetchDepartments] = useHospitaListAllDepartmentMutation();
  const [addDepartment] = useHospitalAddNewDepartmentMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDepartments();
        setDepartments(response.data);
        onOpen(); // Open the drawer when data is fetched
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);

  const addNewDepartment = async () => {
    const h_id = hospitalInfo._id;
    const dept_id = newDepartment;
    try {
      const response = await addDepartment({ h_id, dept_id });
      console.log(response.data.success, 'response');
      toast.success(response.data.success);
      onClose(); // Close the drawer on successful submission
      refetch();
      setNewDepartment([]);
    } catch (error) {}
  };

  const SubmitDepartment = () => {
    addNewDepartment();
    close()
  };

  const closeDrawer =()=>{
    addNewDepartment();
  }

  const handleCheckboxChange = (e, id) => {
    let newDepartmentss;

    if (!e) {
      newDepartmentss = newDepartment.filter((number) => number !== id);
    } else {
      newDepartmentss = [...newDepartment, id];
    }
    setNewDepartment(newDepartmentss);
  };

  const close=()=>{
    setOpenAddDepartment(false)
  }
  const fun =()=>{
    console.log(departments)
  }
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='right'
        initialFocusRef={firstField}
        onClose={close}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={close} />
          <DrawerHeader borderBottomWidth='1px'>
            Add New Department
          </DrawerHeader>

          <DrawerBody>
            {departments ? (
              departments.map((department) => (
                <Box mt='5' key={department._id}>
                  <Checkbox
                    onChange={(e) =>
                      handleCheckboxChange(e.target.checked, department._id)
                    }
                  >
                    {department.departmentDetails.name}
                  </Checkbox>
                </Box>
              ))
            ) : (
              <p>Loading departments...</p>
            )}
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={close}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={SubmitDepartment}>
              Submit
            </Button>
            <Button colorScheme='blue' onClick={fun}>
              check
            </Button>

          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default HospitalAddDepartment;
