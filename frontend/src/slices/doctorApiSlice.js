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
        query: ({_id,status}) => ({
          url: `${DOCTOR_URL}/listAppointments?_id=${_id}&&status=${status}`,
          method: 'GET',      
        }),
      }), 
      getPatientInfo: builder.query({
        query: ({_id}) => ({
          url: `${DOCTOR_URL}/getPatientInfo?_id=${_id}`,
          method: 'GET',      
        }),
      }), 
      addRecord: builder.mutation({
        query: (data) => ({
          url: `${DOCTOR_URL}/addNewRecord`,
          method: 'POST',
          body: data,
        }),
      }), 
      deleteRecord: builder.mutation({
        query: (data) => ({
          url: `${DOCTOR_URL}/deleteRecord`,
          method: 'PUT',
          body: data,
        }),
      }), 
      getAppointmentStatus: builder.query({
        query: ({appointmentId}) => ({
          url: `${DOCTOR_URL}/getAppointmentStatus?appointmentId=${appointmentId}`,     
          method: 'GET',      
        }),
      }), 
      doctorGetPatientHistory: builder.query({
        query: ({patientId}) => ({
          url: `${DOCTOR_URL}/getPatientHistory?patientId=${patientId}`,     
          method: 'GET',      
        }),
      }), 
      showDoctorAppointment: builder.mutation({
        query: (data) => ({
          url: `${DOCTOR_URL}/listDoctorAppointments`,
          method: 'POST',
          body: data,
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
    useGetPatientInfoQuery,
    useAddRecordMutation,
    useDeleteRecordMutation,
    useGetAppointmentStatusQuery,
    useShowDoctorAppointmentMutation,
    useDoctorGetPatientHistoryQuery

  } = doctorApiSlice;    