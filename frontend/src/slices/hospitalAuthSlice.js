import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hospitalInfo: localStorage.getItem('hospitalInfo')
    ? JSON.parse(localStorage.getItem('hospitalInfo'))
    : null,
};

const hospitalAuthSlice = createSlice({
  name: 'hospitalAuth',
  initialState,
  reducers: {
    setHospitalCredentials: (state, action) => {
      state.hospitalInfo = action.payload;
      localStorage.setItem('hospitalInfo', JSON.stringify(action.payload));
    },
    // eslint-disable-next-line no-unused-vars
    hospitalLogout: (state, action) => {
      state.hospitalInfo = null;
      localStorage.removeItem('hospitalInfo');
    },
  },
});

export const { setHospitalCredentials, hospitalLogout } = hospitalAuthSlice.actions;

export default hospitalAuthSlice.reducer;