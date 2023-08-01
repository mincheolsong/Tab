import { configureStore, createSlice } from "@reduxjs/toolkit";

let busStop = createSlice({
  name: "busStop",
  initialState: "우리집",
  reducers : {
    changehome(){
      return '마당있는집'
    }
  }
});

export let {changehome} = busStop.actions

let busNum = createSlice({
  name: "df",
  initialState: ["1", "2", "3"],
});

export default configureStore({
  reducer: {
    busStop: busStop.reducer,
    busNum : busNum.reducer
  },
});
