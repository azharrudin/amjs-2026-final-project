import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MoneyState {
  amount: number;
}

const initialState: MoneyState = {
  amount: 1000,
};

const moneySlice = createSlice({
  name: "money",
  initialState,
  reducers: {
    addMoney: (state, action: PayloadAction<number>) => {
      state.amount += action.payload;
    },
    subtractMoney: (state, action: PayloadAction<number>) => {
      state.amount -= action.payload;
    },
    resetMoney: (state) => {
      state.amount = 0;
    },
  },
});

export const { addMoney, subtractMoney, resetMoney } =
  moneySlice.actions;

export default moneySlice.reducer;
