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
    useUpdatePatienProfilePicMutation
  
  } = userApiSlice;