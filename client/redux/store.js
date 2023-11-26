import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice.js";

const store = configureStore({
    reducer:{
        userSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })

})

export default store;