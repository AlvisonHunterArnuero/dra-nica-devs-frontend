import { configureStore } from "@reduxjs/toolkit";
import candidateReducer from "./candidates/reducers";

export default configureStore({
  reducer: {
    candidates: candidateReducer,
  },
});
