import React from 'react'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import store from './store.js'
import { Provider } from 'react-redux';
import PrivateRoute from './Components/PrivateRoute.jsx';


//user
import UserHome from './Screens/User/UserHome.jsx'
import FindHospital from './Screens/User/FindHospital.jsx'
import Signups from './Screens/User/Signups.jsx'
import Login from './Screens/User/UserLogin.jsx'
import ViewHospital from './Screens/User/ViewHospital.jsx'

//Hospital
import PrivateRouteHospital from './Components/PrivateRouteHospital.jsx'
import HospitalSignup from './Screens/Hospital/HospitalSignup.jsx'
import HospitalHome from './Screens/Hospital/HospitalHome/HospitalHome.jsx'
import HospialLogin from './Screens/Hospital/HospitalLogin.jsx'
import ListDoctorHospital from './Screens/Hospital/ListDoctorHospital.jsx'
import HospitalDash from './Screens/Hospital/HospitalHome/HospitalDash.jsx'
import ProfileHospital from './Screens/Hospital/ProfileHospital.jsx'

//Admin
import PrivateRouteAdmin from './Components/PrivateRouteAdmin.jsx'
import AdminHome from './Screens/Admin/AdminHome.jsx'
import AdminLogin from './Screens/Admin/AdminLogin.jsx'
import DepartmentAdmin from './Screens/Admin/DepartmentAdmin.jsx'
import HospitalAdmin from './Screens/Admin/HospitalAdmin.jsx'
import DoctorAdmin from './Screens/Admin/DoctorAdmin.jsx'
import UserAdmin from './Screens/Admin/UserAdmin.jsx'
// import Verification from './Screens/Admin/verification.jsx'

//Doctor 
import PrivateRouteDoctor from './Components/PrivateRouteDoctor.jsx'
import DoctorLogin from './Screens/Doctor/DoctorLogin.jsx'
import DoctorProfile from './Screens/Doctor/DoctorProfile.jsx'
import VerificationDoctor from './Screens/Doctor/VerificationDoctor.jsx'
import Room from './Screens/Doctor/Room.jsx'
import ListScheduleDoctor from './Screens/Doctor/ListScheduleDoctor.jsx'

import LandingPage from './Screens/Landing/LandingPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
   <Route path="/userRegister" element={<Signups />} />
    <Route path="/userLogin" element={<Login />} />
      <Route path="/" element={<App user={true} />}>

        <Route path="/LandingPage" element={<LandingPage />} />
    
        <Route path="" element={<PrivateRoute />}>
          <Route index={true} path="/" element={<UserHome />} />
          <Route path="/findHospital" element={<FindHospital />} />
          <Route path="/viewHospital" element={<ViewHospital />} />
        </Route>
      </Route>
      <Route path="/hospital/hospitalLogin" element={<HospialLogin />} />
      <Route path="/hospital/hospitalRegister" element={<HospitalSignup />} />
      <Route path="/hospital" element={<App hospital={true} />}>
        <Route path="" element={<PrivateRouteHospital />}>
          <Route path="/hospital/" element={<HospitalDash />} />
          <Route path="/hospital/listDoctor" element={<ListDoctorHospital />} />
          <Route path="/hospital/dashboard" element={<HospitalDash />} />
          <Route path="/hospital/profile" element={<ProfileHospital />} />
          {/* <Route path="/hospital/create-user" element={<AdminCreateUser />} /> */}
          {/* <Route path="/hospital/edit-user/:user" element={<AdminEditUser />} /> */}
        </Route>
      </Route>
      <Route path="/admin/adminLogin" element={<AdminLogin />} />
      <Route path="/admin" element={<App admin={true} />}>
    
        <Route path="" element={<PrivateRouteAdmin />}>
          <Route path="/admin/" element={<AdminHome />} />
          <Route path="/admin/getDepartment" element={<DepartmentAdmin />} />
          <Route path="/admin/getHospital" element={<HospitalAdmin />} />
          <Route path="/admin/getDoctor" element={<DoctorAdmin />} />
          <Route path="/admin/getUser" element={<UserAdmin />} />
          {/* <Route path="/admin/verification" element={<Verification />} /> */}

        </Route>
      </Route>
      <Route path="/doctor/doctorLogin" element={<DoctorLogin/>} />
      <Route path="/doctor" element={<App doctor={true} />}>
        <Route path="" element={<PrivateRouteDoctor />}>
        <Route path="/doctor/" element={<DoctorProfile/>} />
        <Route path="/doctor/room/:roomId" element={<Room/>} />
        <Route path="/doctor/schedule" element={<ListScheduleDoctor/>} />

        </Route>
      </Route>

    </>

  )

)

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>
  </ChakraProvider>
)