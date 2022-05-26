import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};
// console.log(initialState);

const userSlice = createSlice({
  name: "user",
  initialState: { initialState },
  reducers: {
    addUser(state, action) {
      state.user = action.payload;
      // console.log("initial state user :", state.user )
    },

    removeUser(state) {
      state.user = null;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
