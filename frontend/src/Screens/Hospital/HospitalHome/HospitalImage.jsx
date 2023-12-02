import React from 'react'
import { AspectRatio, Image, Box, IconButton } from '@chakra-ui/react'
function HospitalImage() {
    return (
        

            <AspectRatio maxW='100%' ratio={4 /2}>
                <Image  src='../public/Images/aster.webp' alt='naruto' objectFit='cover' />
            </AspectRatio>

      
    )
}

export default HospitalImage
