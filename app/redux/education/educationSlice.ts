import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getAuthManager } from '@/utils';

import type { PayloadAction } from '@reduxjs/toolkit';

interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

interface EducationState {
  educations: Education[];
  selectedEducation: Education | null;
  loading: boolean;
  error: string | null;
}

const initialState: EducationState = {
  educations: [],
  selectedEducation: null,
  loading: false,
  error: null,
};

export const fetchEducation = createAsyncThunk(
  'education/fetchEducation',
  async (UserId: string) => {
    const auth = getAuthManager();
    const response = (await auth).axios.get<any>(`education/${UserId}`).then((res) => res.data);
    return response;
  },
);

const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    addEducation: (state, action: PayloadAction<Education>) => {
      state.educations.push(action.payload);
    },
    updateEducation: (state, action: PayloadAction<Education>) => {
      const index = state.educations.findIndex((edu) => edu.id === action.payload.id);
      if (index !== -1) {
        state.educations[index] = action.payload;
      }
    },
    deleteEducation: (state, action: PayloadAction<string>) => {
      state.educations = state.educations.filter((edu) => edu.id !== action.payload);
    },
    setSelectedEducation: (state, action: PayloadAction<Education | null>) => {
      state.selectedEducation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.educations = action.payload;
      })
      .addCase(fetchEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch educations';
      });
  },
});

export const { addEducation, updateEducation, deleteEducation, setSelectedEducation } =
  educationSlice.actions;

export default educationSlice.reducer;
