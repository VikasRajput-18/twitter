import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserInfo: (state, action) => {
      return { ...state, user: action.payload };
    },
    logoutUser: (state, action) => {
      state.user = null;
    },
  },
});

export const { setUserInfo, logoutUser } = userSlice.actions;

export default userSlice.reducer;
