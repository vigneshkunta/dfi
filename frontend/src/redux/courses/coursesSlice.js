import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from '../../utils/fetchData'; 
const initialState = {
  courses: [],
  loading: false,
  error: null,
};

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchData("/api/course"); 
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default coursesSlice.reducer;
