import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  doctorInfo: localStorage.getItem('doctorInfo')
    ? JSON.parse(localStorage.getItem('doctorInfo'))
    : null,
};

const doctorAuthSlice = createSlice({   
  name: 'doctorAuth',  
  initialState,
  reducers: {
    setDoctorCredentials: (state, action) => {
      state.doctorInfo = action.payload;
      localStorage.setItem('doctorInfo', JSON.stringify(action.payload));
    },
    // eslint-disable-next-line no-unused-vars
    doctorLogout: (state, action) => {  
      state.doctorInfo = null;
      localStorage.removeItem('doctorInfo');
    },
  },
});

export const { setDoctorCredentials, doctorLogout } = doctorAuthSlice.actions;

export default doctorAuthSlice.reducer;