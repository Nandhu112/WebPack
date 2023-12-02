import React from 'react'
import { AspectRatio,Image,Box,IconButton } from '@chakra-ui/react'

function image() {
  return (
<Box bg='#dfeef7' w='100%' ratio={4 / 3}>
  
<AspectRatio maxW='700px' ratio={4 / 3}>
<Image className='pl-10 inline-block' src='../public/Images/Doctor4.png' alt='naruto' objectFit='cover' />
  </AspectRatio>

</Box>

  )
}

export default image
