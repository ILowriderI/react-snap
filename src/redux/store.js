import { configureStore } from "@reduxjs/toolkit";
import postIdReducer from "./slices/postIdSlice";
import tokenReducer from "./slices/tokenSlice";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";



export const store = configureStore({
    reducer: {postIdReducer,tokenReducer,productReducer,userReducer,},
  })