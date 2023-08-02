import { createSlice } from "@reduxjs/toolkit";

const kioskSlice = createSlice({
  name: "kiosk",
  initialState: { busStop: '우리집 앞' },
  reducers: {
    changeBusStop(state) {
      state.busStop = '우리집 뒤';
    },
  },
});

export const { changeBusStop } = kioskSlice.actions;

export default kioskSlice;
