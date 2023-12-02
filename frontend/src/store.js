import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/userAuthslice";
import hospitalAuthReducer from "./slices/hospitalAuthSlice.js"
import adminAuthReducer from "./slices/adminAuthSlice.js"
import doctorAuthReducer from "./slices/doctorAuthSlice.js"
import { apiSlice } from "./slices/apiSlice.js";

const rootReducer = combineReducers({
  auth: authReducer,
  hospitalAuth:hospitalAuthReducer,
  adminAuth: adminAuthReducer,
  doctorAuth: doctorAuthReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
