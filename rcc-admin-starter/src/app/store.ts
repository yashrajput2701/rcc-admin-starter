import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";

// Add each feature's slice here as you build it out, e.g.:
// import employeesReducer from "../features/employees/employees.slice";
const rootReducer = combineReducers({
  auth: authReducer,
  // employees: employeesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.MODE !== "production",
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
