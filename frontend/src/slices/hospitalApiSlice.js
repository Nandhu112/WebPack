import { apiSlice } from './apiSlice';
const USERS_URL = '/api/hospitals';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      hospitalLogin: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/auth`,
          method: 'POST',
          body: data,
        }),
      }),
      hospitalLogout: builder.mutation({
        query:()=>({
          url:`${USERS_URL}/logout`,
          method:'POST',
        })
      }),
      hospitalRegister: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}`,
          method: 'POST',
          body: data,
        }),
      }),
      hospitaListAllDepartment: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/hospitalAllDepartment`,
          method: 'GET',
          body: data,
        }),
      }),
      hospitalAddNewDepartment: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/hospitalAddDepartment`,
          method: 'POST',
          body: data,
        }),
      }),
      hospitalListDepartments: builder.query({
        query: ({id}) => ({
          url: `${USERS_URL}/listHospitalDepartments?id=${id}`,
          method: 'GET',
          
        }),
      }),
      checkHospitalBlock: builder.query({
        query: ({_id}) => ({
          url: `${USERS_URL}/checkHospitalBlocked?_id=${_id}`,
          method: 'GET',      
        }),
      }), 
      hospitalListDoctors: builder.query({
        query: ({_id,department}) => ({
          url: `${USERS_URL}/hospitalListDoctor?_id=${_id}&&department=${department}`,
          method: 'GET',         
        }),
      }),
      hospitalListRecords: builder.query({
        query: ({_id}) => ({
          url: `${USERS_URL}/listHospitalHistory?_id=${_id}`,
          method: 'GET',         
        }),
      }),
      hospitalAddDoctor: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/addDoctor`,
          method: 'POST',
          body: data,
        }),
      }),
      adminVerifyHospital: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/adminVeriftHospital`,
          method: 'POST',
          body: data,
        }),
      }), 
      getHospitalInfo: builder.query({
        query: ({_id}) => ({
          url: `${USERS_URL}/getHospitalInfo?_id=${_id}`,
          method: 'GET',
          
        }),
      }),
      updateProfilePic: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/updateProfilePic`,
          method: 'POST',
          body: data,
        }),
      }),
      hospitalListChat: builder.query({
        query: ({_id}) => ({
          url: `${USERS_URL}/listChat?hospitalId=${_id}`,
          method: 'GET',      
        }),
      }),
      hospitalListMessage: builder.query({
        query: ({_id}) => ({
          url: `${USERS_URL}/listmessage?roomId=${_id}`,
          method: 'GET',      
        }),
      }),
      HospitalGetDepartmentHistory: builder.query({
        query: ({_id}) => ({
          url: `${USERS_URL}/HospitalGetDepartmentHistory?_id=${_id}`,
          method: 'GET',      
        }),
      }),
      HospitalGetDoctorHistory: builder.query({
        query: ({_id}) => ({
          url: `${USERS_URL}/HospitalGetDoctorHistory?_id=${_id}`,
          method: 'GET',      
        }),
      }),
      hospitalGetBoxsData: builder.query({
        query: ({_id}) => ({
          url: `${USERS_URL}/hospitalGetBoxsData?_id=${_id}`,
          method: 'GET',      
        }),
      }),
    })
  });

  
  export const {
    useHospitalLoginMutation,
    useHospitalRegisterMutation,
    useHospitalLogoutMutation,            
    useHospitaListAllDepartmentMutation,
    useHospitalAddNewDepartmentMutation,
    useHospitalListDepartmentsQuery,
    useHospitalAddDoctorMutation,
    useHospitalListDoctorsQuery,
    useAdminVerifyHospitalMutation,
    useGetHospitalInfoQuery,
    useUpdateProfilePicMutation,
    useCheckHospitalBlockQuery,
    useHospitalListChatQuery,
    useHospitalListMessageQuery,
    useHospitalGetDepartmentHistoryQuery,
    useHospitalGetDoctorHistoryQuery,
    useHospitalGetBoxsDataQuery,
    useHospitalListRecordsQuery


  
  } = userApiSlice;