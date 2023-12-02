import React,{useState} from 'react'
import { Input, InputGroup, InputLeftElement,Select} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

function search() {
  const [selectedHospital, setSelectedHospital] = useState('');

  const handleHospitalChange = (e) => {
    setSelectedHospital(e.target.value);
  };
  return (
 
   <InputGroup maxW='200px' maxH='30px'>
    <Select  value={selectedHospital} onChange={handleHospitalChange} placeholder="Find nearest hospital">
      <option value="10">10 kilometers</option>
      <option value="15">15 kilometers</option>
      <option value="20">20 kilometers</option>
      <option value="30">30 kilometers</option>
      <option value="50">50 kilometers</option>
    </Select>
  </InputGroup>

  )
}

export default search
