import { apiSlice } from './apiSlice';
const USERS_URL = '/api/users';
const ADMIN_URL = '/api/admin';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    AddDepartment: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/addNewDepartment`,
        method: 'POST',
        body: data,
      }),
    }),
    AdminListDepartment: builder.query({
      query: ({status}) => ({
        url: `${ADMIN_URL}/adminListDepartment?status=${status}`,
        method: 'GET',      
      }),
    }),
    AdminListHospital: builder.query({
      query: ({status}) => ({
        url: `${ADMIN_URL}/adminListHospitals?status=${status}`,
        method: 'GET',      
      }),
    }),
    AdminListDoctor: builder.query({
      query: ({status}) => ({
        url: `${ADMIN_URL}/adminListDoctors?status=${status}`,
        method: 'GET',      
      }),
    }),
    AdminLisUser: builder.query({
      query: ({status}) => ({
        url: `${ADMIN_URL}/adminListUsers?status=${status}`,
        method: 'GET',      
      }),
      invalidatesTags:["users"]
    }),
    BlockUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/adminBlocktUser`,
        method: 'POST',
        body: data,
      }),
    }),
    UnBlockUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/adminUnBlocktUser`,
        method: 'POST',
        body: data,
      }),
    }),
    BlockDoctor: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/adminBlockDoctor`,
        method: 'POST',
        body: data,
      }),
    }),
    UnBlockDoctor: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/adminUnBlockDoctor`,
        method: 'POST',
        body: data,
      }),
    }),
    BlockHospital: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/adminBlockHospital`,
        method: 'POST',
        body: data,
      }),
    }),
    UnBlockHospital: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/adminUnBlockHospital`,
        method: 'POST',
        body: data,
      }),
    }),
    BlockDepartment: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/adminBlockDepartment`,
        method: 'POST',
        body: data,
      }),
    }),
    UnBlockDepartment: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/adminUnBlockDepartment`,
        method: 'POST',
        body: data,
      }),
    }),
    
    adminLogout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    adminGetVerification: builder.query({
      query: (data) => ({
        url: `${ADMIN_URL}/getVerification`,
        method: 'GET',      
      }),
    }),
    adminVerifyHospitals: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/Verification`,
        method: 'POST',
        body: data,
      }),
    }),
    adminGetDeptDash: builder.query({
      query: (data) => ({
        url: `${ADMIN_URL}/adminGetDeptDashboard`,
        method: 'GET',      
      }),
    }),
    adminGetDeptDashboardBoxs: builder.query({
      query: (data) => ({
        url: `${ADMIN_URL}/adminGetDeptDashboardBoxs`,
        method: 'GET',      
      }),
    }),
    adminGethospitalHistoryCount: builder.query({
      query: (data) => ({
        url: `${ADMIN_URL}/adminGethospitalHistoryCount`,
        method: 'GET',      
      }),
    }),
  }),
});

export const {

  useAdminLoginMutation,

  useAdminLogoutMutation,
  useAddDepartmentMutation,
  useAdminListDepartmentQuery,
  useAdminListHospitalQuery,
  useAdminListDoctorQuery,
  useAdminLisUserQuery,
  useBlockUserMutation,
  useUnBlockUserMutation,
  useBlockDoctorMutation,
  useUnBlockDoctorMutation,
  useBlockHospitalMutation,
  useUnBlockHospitalMutation,
  useBlockDepartmentMutation,
  useUnBlockDepartmentMutation,
  useAdminGetVerificationQuery,
  useAdminVerifyHospitalsMutation,
  useAdminGetDeptDashQuery,
  useAdminGetDeptDashboardBoxsQuery,
  useAdminGethospitalHistoryCountQuery
  
} = userApiSlice;