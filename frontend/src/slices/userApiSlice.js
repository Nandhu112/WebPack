import { apiSlice } from './apiSlice';
const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      login: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/auth`,
          method: 'POST',
          body: data,
        }),
      }),
      logout: builder.mutation({
        query:()=>({
          url:`${USERS_URL}/logout`,
          method:'POST',
        })
      }),
      Register: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}`,
          method: 'POST',
          body: data,
        }),
      }),
      userListHospital: builder.query({
        query: () => ({
          url: `${USERS_URL}/listHospital`,
          method: 'GET',         
        }),
      }), 
      AddNewMember: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/addNewMember`,
          method: 'POST',
          body: data,
        }),
      }),  
      listAllMembers: builder.query({
        query: ({_id}) => ({
          url: `${USERS_URL}/listAllMembers?_id=${_id}`,
          method: 'GET',      
        }),
      }),
      getPatientInfo: builder.query({
        query: ({_id}) => ({
          url: `${USERS_URL}/getPatientInfo?_id=${_id}`,
          method: 'GET',      
        }),
      }),
      userFindNearHospitals: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/findNearbyHospitals`,
          method: 'POST',
          body: data,
        }),
      }),  
      usermakeAppointment: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/makeAppointment`,
          method: 'POST',
          body: data,
        }),
      }),  
      showDoctorAppointment: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/listDoctorAppointments`,
          method: 'POST',
          body: data,
        }),
      }), 
      chekUserBlocked: builder.query({
        query: ({_id}) => ({
          url: `${USERS_URL}/checkBlock?_id=${_id}`,
          method: 'GET',      
        }),
      }), 
      userListHospitalDepartments: builder.query({
        query: ({id}) => ({
          url: `${USERS_URL}/listHospitalDepartments?id=${id}`,
          method: 'GET',          
        }),
      }),
      userListHospitalDoctors: builder.query({
        query: ({ _id, department }) => ({
          url: `${USERS_URL}/hospitalListDoctor?_id=${_id}&department=${department}`,
          method: 'GET',         
        }),
      }),
      updatePatienProfilePic: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/updatePatientProflePic`,
          method: 'POST',
          body: data,
        }),
      }),
      getPatientHistory: builder.query({
        query: ({_id}) => ({
          url: `${USERS_URL}/getPatientHistory?patientId=${_id}`,
          method: 'GET',      
        }),
      }),
      userListChat: builder.query({
        query: ({_id}) => ({
          url: `${USERS_URL}/listChat?userId=${_id}`,
          method: 'GET',      
        }),
      }),
      userListMessage: builder.query({
        query: ({_id}) => ({
          url: `${USERS_URL}/listmessage?roomId=${_id}`,
          method: 'GET',      
        }),
      }),
      getNotification: builder.query({
        query: ({_id}) => ({
          url: `${USERS_URL}/getNotification?roomId=${_id}`,
          method: 'GET',      
        }),
      }),
      userDirectListMessage: builder.query({
        query: ({uId,hId}) => ({
          url: `${USERS_URL}/directListMessage?uId=${uId}&hId=${hId}`,
          method: 'GET',      
        }),
      }),
      getHospitalsRatingInfo: builder.query({
        query: (data) => ({
          url: `${USERS_URL}/getHospitalsRatingInfo`,
          method: 'GET',      
        }),
      }),
      getDoctorsRatingInfo: builder.query({
        query: (data) => ({
          url: `${USERS_URL}/getDoctorsRatingInfo`,
          method: 'GET',      
        }),
      }),
      getPatientHistoryByAppointment: builder.query({
        query: ({appointmentId}) => ({
          url: `${USERS_URL}/getPatientHistoryByAppointment?appointmentId=${appointmentId}`,
          method: 'GET',      
        }),
      }),
    }),
  });
  
  export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useUserListHospitalQuery,
    useAddNewMemberMutation,
    useListAllMembersQuery,
    useGetPatientInfoQuery,
    useUserFindNearHospitalsMutation,
    useUsermakeAppointmentMutation,
    useShowDoctorAppointmentMutation,
    useChekUserBlockedQuery,
    useUserListHospitalDepartmentsQuery,
    useUserListHospitalDoctorsQuery,
    useUpdatePatienProfilePicMutation,
    useGetPatientHistoryQuery,
    useUserListChatQuery,
    useUserListMessageQuery,
    useGetNotificationQuery,
    useUserDirectListMessageQuery,
    useGetHospitalsRatingInfoQuery,
    useGetDoctorsRatingInfoQuery,
    useGetPatientHistoryByAppointmentQuery
  
  } = userApiSlice;