import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice.js";

const store = configureStore({
    reducer:{
        userSlice
    }
})

export default store;