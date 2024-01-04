import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Flex } from '@chakra-ui/react';

function HospitalBarChart({data}) {

  return (
    <Flex  w={"md"} h={96}>
    <ResponsiveBar
     data={data}
     keys={['historyCount']}
     indexBy="name"
     margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
     padding={0.3}
     colors={{ scheme: 'category10' }}
     enableLabel={true}
     labelSkipWidth={12}
     labelSkipHeight={12}
        axisBottom={{
         tickRotation: -45, // Set the rotation angle for date labels
       }}
   />
   
</Flex>
  )
}

export default HospitalBarChart
