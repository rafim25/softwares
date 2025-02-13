import { combineReducers } from "@reduxjs/toolkit";
import customerJourneyReducer from "@/features/customerJourney/slice";

const rootReducer = combineReducers({
  customerJourney: customerJourneyReducer,
});

export default rootReducer;
