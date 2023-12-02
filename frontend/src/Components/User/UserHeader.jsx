import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/userApiSlice";
import { logout } from "../../slices/userAuthslice";
// import { adminLogout } from "../slices/adminAuthSlice";
import { useNavigate } from "react-router-dom";

function Header() {

  const { userInfo } = useSelector((state) => state.auth);
  // const { adminInfo } = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/userLogin");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="bg-black p-4">
    <ul className="flex items-center justify-center">
      <li>
        <LinkContainer to="/">
          <a href="#" className="text-white">Home</a>
        </LinkContainer>
      </li>
      <li className="ml-4">
        <LinkContainer to="/findHospital">
          <a href="#" className="text-white">Hospitals</a>
        </LinkContainer>
      </li>
      {/* Add more navigation items as needed */}
      <li className="ml-4">
        <button onClick={logoutHandler} className="text-white">Logout</button>
      </li>
    </ul>
  </nav>
  )
}

export default Header
