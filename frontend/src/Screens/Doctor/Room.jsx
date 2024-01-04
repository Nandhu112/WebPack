import { Box, Button, Center } from '@chakra-ui/react';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function Room() {
  const {roomId}= useParams()

  const myMeeting=async(element)=>{
  const appID = 1884366205
  const serverSecret = "be0a408ea3e285832158c400a01fc628"
  const kitToken= ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomId,
    Date.now().toString(),
    "nandhu"
  )
console.log(kitToken,'lllllllllllllllllll')
  const zc=ZegoUIKitPrebuilt.create(kitToken)
  zc.joinRoom({
    container:element,
    scenario:{
      mode:ZegoUIKitPrebuilt.OneONoneCall
    },


    showScreenSharingButton:false,
    sharedLinks:[{
      name:"copy Link",
      url:window.location.href
    }]
  })
}
  return (

      <Box  ref={myMeeting}>

      </Box>
   
  
  )
}

export default Room;