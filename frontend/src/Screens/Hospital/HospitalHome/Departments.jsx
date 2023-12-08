import React from 'react'
import {
    Select,
    AspectRatio,
    Box
} from '@chakra-ui/react'
function Department() {
  return (
   
<Box className='mt-10 ml-10' w='300px' textAlign='left'>
  <Select placeholder='Select option'>
    <option value='option1'>Option 1</option>
    <option value='option2'>Option 2</option>
    <option value='option3'>Option 3</option>
  </Select>
</Box>

  )
}

export default Department
