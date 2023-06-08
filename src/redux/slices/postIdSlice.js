import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
};

export const postIdSlice = createSlice({
  name: "postId",
  initialState,
  reducers: {
    setId(state, action) {
      state.id = action.payload;
    },
  },
});

export const {setId} = postIdSlice.actions;
export default postIdSlice.reducer;
