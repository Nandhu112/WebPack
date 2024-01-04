import React from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Image,
  IconButton,
  Button,
  Icon,
  Modal,
  Avatar,
  Badge,
  Box,
  Flex
} from '@chakra-ui/react'
import axios from 'axios';
import {
  FiBell,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function Notification({ notificationOpen,setNotificationOpen,notifications,setShowPrescription,setAppointmentId,refetchNotification}) {
 
  const navigate = useNavigate();

  const fun = (roomId,_id) => {
    console.log(_id,'changeNotifictionStatus handler11');
    try {
      axios.post('/api/users/changeNotifictionStatus', {
        _id:_id,
      });
      console.log('changeNotifictionStatussuccessfully');
      refetchNotification()
      setNotificationOpen(false)
    } catch (error) {
      console.error('Error sending data to the backend', error);
    }
    navigate(`/doctor/room/${roomId}`);
  }


  const handleShowPrescription = (appointmentId,_id) => {
    console.log(_id,'changeNotifictionStatus handler11');
    try {
      axios.post('/api/users/changeNotifictionStatus', {
        _id:_id,
      });
      console.log('changeNotifictionStatussuccessfully');
      refetchNotification()
      setNotificationOpen(false)
    } catch (error) {
      console.error('Error sending data to the backend', error);
    }
    console.log(appointmentId)
    setAppointmentId(appointmentId)
    setShowPrescription(true)
    
  };
  return (
    <Box>
      <Menu>
        {/* <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} /> */}

        <MenuButton bgColor={"white"} as={Button}>
          <Icon fontSize="1.5em" as={FiBell} />
          {notificationOpen || notifications?.length>0 ? <Badge bgColor="red" color="white" borderRadius="full" fontSize="0.8em" pos="absolute" >
            {notifications?.length}
          </Badge> : null}
        </MenuButton>
        {notifications?.length > 0 ?
          <MenuList>
            {notifications?.map((item, index) => (
              <MenuItem key={index} minH='48px'>
                <Flex align='center'>
                  <Avatar
                    size='sm'
                    name='NA'
                    src=''
                    mr={2} // Margin to separate Avatar from text
                  />
                  {item.videoCall ? <span onClick={() => fun(item.link,item._id)}>Please join</span> :
                    <span onClick={() => handleShowPrescription(item.appointmentId,item._id)}>Prescription updated</span>}
                </Flex>
              </MenuItem>
            ))}
          </MenuList>
          : null}
      </Menu>
   
    </Box>
  )
}

export default Notification
