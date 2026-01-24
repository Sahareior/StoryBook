import { createSlice } from "@reduxjs/toolkit";

const getUserFromStorage = () => {
  const userJson = localStorage.getItem("user");
  if (!userJson || userJson === "undefined") {
    return { id: null, name: null, email: null, roll: null };
  }
  try {
    return JSON.parse(userJson);
  } catch {
    return { id: null, name: null, email: null, roll: null };
  }
};

const initialState = {
  user: getUserFromStorage(),
  access: localStorage.getItem("access") || null,
  refresh: localStorage.getItem("refresh") || null,
  isAuthenticated: !!localStorage.getItem("access"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access, refresh, user } = action.payload;
      state.access = access;
      state.refresh = refresh;
      state.user = user;
      state.isAuthenticated = true;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("user", JSON.stringify(user));
    },

    logout: (state) => {
      console.log("Logout clicked");
      
      // Reset State
      state.isAuthenticated = false;
      state.access = null;
      state.refresh = null;
      state.user = { id: null, name: null, email: null, roll: null };

      // Clear LocalStorage
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      localStorage.removeItem("role"); 
      localStorage.removeItem("persist:root"); // Clear persist data as well
      
      console.log("Local storage cleared");
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;