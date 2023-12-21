import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import callSlice from "./callSlice.js";

const store = configureStore({
    reducer:{
        userSlice,
        callSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })

})

export default store;