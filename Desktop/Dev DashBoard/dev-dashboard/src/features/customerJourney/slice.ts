import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomerJourney } from "@/types/customerJourney";

interface CustomerJourneyState {
  journeys: CustomerJourney[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomerJourneyState = {
  journeys: [],
  loading: false,
  error: null,
};

const customerJourneySlice = createSlice({
  name: "customerJourney",
  initialState,
  reducers: {
    setJourneys: (state, action: PayloadAction<CustomerJourney[]>) => {
      state.journeys = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setJourneys, setLoading, setError } =
  customerJourneySlice.actions;
export default customerJourneySlice.reducer;
