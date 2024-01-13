import React from 'react'
import { AspectRatio, Image, Box, IconButton, Button } from '@chakra-ui/react'
function HospitalImage({img}) {
    const fun=()=>{
        console.log(img,"img")
    }
    return (
        
           <>
            <AspectRatio maxW='100%' ratio={4 /2}>
                <Image  src={img} />
            
            </AspectRatio>
           </>

      
    )
}

export default HospitalImage
