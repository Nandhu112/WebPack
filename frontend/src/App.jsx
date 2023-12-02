import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet,useLocation } from 'react-router-dom';
import UserHeader from './Screens/User/UserHeader';
import HospitaHeader from './Screens/Hospital/HospitaHeader';
import AdminHeader from './Screens/Admin/AdminHeader';
import Footer from './Components/footer';
import HeaderDoctor from './Screens/Doctor/HeaderDoctor';
import LandingPage from './Screens/Landing/LandingPage';
import verifyPage from './Screens/Admin/verifyPage';
import UserBookSlot from './Screens/User/UserBookSlot';

import AppointmentModal from './Screens/User/UserBookSlot'



const App = () => {

  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");
  const isHospitalPage = location.pathname.startsWith("/hospital");
  const isdoctorPage = location.pathname.startsWith("/doctor");
  const isuserPage = location.pathname.startsWith("/");



  let header;
  let outlet
if(isAdminPage){
  header=<AdminHeader/>
}else if(isHospitalPage){
  header=<HospitaHeader/>
}else if(isdoctorPage){
  header=<HeaderDoctor/>
}else if(isuserPage){
  outlet=<Outlet />
  header=<UserHeader/>
}


  return (
    <div>
      {header}
      <ToastContainer />
        {outlet}
        <Footer/>
   
    </div>

  )
}

export default App