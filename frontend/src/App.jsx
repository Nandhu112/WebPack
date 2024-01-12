import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet, useLocation } from 'react-router-dom';
import UserHeader from './Screens/User/UserHeader';
import HospitaHeader from './Screens/Hospital/HospitaHeader';
import AdminHeader from './Screens/Admin/AdminHeader';
import Footer from './Components/footer';
import HeaderDoctor from './Screens/Doctor/HeaderDoctor';
import UserProfile from './Screens/User/MdbProfile';
import { SocketProvider } from './Provider/socketProvider';
import { Modal, Box, ModalOverlay, ModalContent, Button } from '@chakra-ui/react';
import { useGetPatientHistoryByAppointmentQuery } from "./slices/userApiSlice"
import DoctorRating from './Screens/User/Rating/DoctorRating';
import HospitalRating from './Screens/User/Rating/HospitalRatming';
import ChatAccordion from './Screens/User/Chat/ChatAccordion';
import LandingHeader from './Components/LandingHeader';
const App = () => {

  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");
  const isHospitalPage = location.pathname.startsWith("/hospital");
  const isdoctorPage = location.pathname.startsWith("/doctor");
  const islanding = location.pathname.startsWith("/LandingPage");
  const isuserPage = location.pathname.startsWith("/");
  const [showPrescription, setShowPrescription] = useState(false)
  const [appointmentId, setAppointmentId] = useState("")
  const [showDoctorRating, setShowDoctorRating] = useState(false)
  const [shiwHospitalRating, setShiwHospitalRating] = useState(false)
  const { data: patientHistory, refetch: refetchPatientHistory } = useGetPatientHistoryByAppointmentQuery({ appointmentId })
  const [doctorId, setDoctorId] = useState("")
  const [hospitalId, setHospitalId] = useState("")
  const [messageOpen, setMessageOpen] = useState(false)

  let header;
  let outlet
  let footer
  let chat
  if (isAdminPage) {
    header = <AdminHeader />
  } else if (isHospitalPage) {
    header = <HospitaHeader />
  } else if (isdoctorPage) {
    header = <HeaderDoctor />
  } else if (islanding) {
    header = <LandingHeader />
    // outlet = <Outlet />
  } else if (isuserPage) {
    if(islanding){
      header = <LandingHeader />
    }

    outlet = <Outlet />
    header = (
      <Box
        style={{
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
     
        }}

      >
        <UserHeader setShowPrescription={setShowPrescription} setAppointmentId={setAppointmentId} />
      </Box>
    );
   chat = <Box maxW={messageOpen?"600":"200"}position="sticky" bottom="10px" ml="auto" >
  <ChatAccordion messageOpen={messageOpen} setMessageOpen={setMessageOpen} />
</Box>
    footer = <Footer />
      }
  

  const handleClose = () => {
    setDoctorId(patientHistory ? patientHistory[0].doctor : null)
    setHospitalId(patientHistory ? patientHistory[0].hospitalId : null)
    setShowPrescription(false)
    setShowDoctorRating(true)
  }

  return (
    <div>
      {/* <Box w="100%" pos={"fixed"} zIndex={"5"}> */}
      <SocketProvider>
        {header}

        {showPrescription ? <Modal isOpen={true} onClose={() => { }} size="xl" >
          <ModalOverlay />
          <ModalContent minH="200" >
            <Box mt="15" mb="10" >
              <UserProfile patientHistory={patientHistory} />

              <Button borderRadius="0" mt="20" minW="100%" colorScheme='blue' onClick={handleClose}>Close</Button>
            </Box>
          </ModalContent>

        </Modal> : null}
        {/* </Box> */}

        {showDoctorRating ? <DoctorRating setShowDoctorRating={setShowDoctorRating} setShiwHospitalRating={setShiwHospitalRating} doctorId={doctorId} /> : null}

        {shiwHospitalRating ? <HospitalRating setShiwHospitalRating={setShiwHospitalRating} /> : null}

        <ToastContainer />
        {outlet}
        {chat}
        {footer}
      </SocketProvider>
    </div>

  )
}

export default App