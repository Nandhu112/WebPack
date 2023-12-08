import { apiSlice } from './apiSlice';
const DOCTOR_URL = '/api/doctors';

export const doctorApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      doctorLogin: builder.mutation({
        query: (data) => ({
          url: `${DOCTOR_URL}/`,
          method: 'POST',
          body: data,
        }),
      }),
      getDoctorInfo: builder.query({
        query: ({id}) => ({
          url: `${DOCTOR_URL}/getProfile?id=${id}`,
          method: 'GET',    
        }),
      }), 
      doctorVerification: builder.mutation({
        query: (data) => ({
          url: `${DOCTOR_URL}/verification`,
          method: 'POST',
          body: data,
        }),
      }),
      doctorLogout: builder.mutation({
        query:()=>({
          url:`${DOCTOR_URL}/logout`,
          method:'POST',
        })
      }), 
      doctorUpdateImage: builder.mutation({
        query: (data) => ({
          url: `${DOCTOR_URL}/updateDoctorPic`,
          method: 'POST',
          body: data,
        }),
      }),  
      checkDoctorBlock: builder.query({
        query: ({_id}) => ({
          url: `${DOCTOR_URL}/checkDoctorBlocked?_id=${_id}`,
          method: 'GET',      
        }),
      }), 
      listDoctorSchedule: builder.query({
        query: ({_id}) => ({
          url: `${DOCTOR_URL}/listAppointments?_id=${_id}`,
          method: 'GET',      
        }),
      }), 
      getPatientInfo: builder.query({
        query: ({_id}) => ({
          url: `${DOCTOR_URL}/getPatientInfo?_id=${_id}`,
          method: 'GET',      
        }),
      }), 
    })
  });

  
  export const {
    useDoctorLoginMutation,
    useGetDoctorInfoQuery,
    useDoctorVerificationMutation,
    useDoctorLogoutMutation,
    useDoctorUpdateImageMutation,
    useCheckDoctorBlockQuery,
    useListDoctorScheduleQuery,
    useGetPatientInfoQuery

  } = doctorApiSlice;    