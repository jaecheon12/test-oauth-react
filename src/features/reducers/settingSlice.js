import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  userInfo: {},
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setAccessToken, setUserInfo } = settingSlice.actions;
export default settingSlice.reducer;

