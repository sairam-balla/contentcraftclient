import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  role: "user",
  userDetails: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    onLogin: (state, action) => {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.userDetails = action.payload;
    },
    onLogout: (state) => {
      state.isAuthenticated = false;
      state.role = "user";
      state.userDetails = {};
    },
    onUpdate: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { onLogin, onLogout, onUpdate } = userSlice.actions;
export default userSlice.reducer;
