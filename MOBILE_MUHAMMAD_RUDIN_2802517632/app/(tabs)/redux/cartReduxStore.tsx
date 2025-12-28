import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import duitReducer from "./duitRedux";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    duit: duitReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
