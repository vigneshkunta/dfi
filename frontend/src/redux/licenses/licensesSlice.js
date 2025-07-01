import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from '../../utils/fetchData'; 

const initialState = {
  licenses: [],
  loading: false,
  error: null,
};

export const fetchLicenses = createAsyncThunk(
  "licenses/fetchLicenses",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchData("/api/license"); 
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const licensesSlice = createSlice({
  name: "licenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLicenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLicenses.fulfilled, (state, action) => {
        state.licenses = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchLicenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default licensesSlice.reducer;
