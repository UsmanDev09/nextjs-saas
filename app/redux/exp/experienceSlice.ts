import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getAuthManager } from '@/utils';

import type { PayloadAction } from '@reduxjs/toolkit';

interface Experience {
  id: string;
  title: string;
  companyName: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperienceState {
  experiences: Experience[];
  selectedExperience: Experience | null;
  loading: boolean;
  error: string | null;
}

const initialState: ExperienceState = {
  experiences: [],
  selectedExperience: null,
  loading: false,
  error: null,
};

export const fetchExperiences = createAsyncThunk(
  'experience/fetchExperiences',
  async (userId: string) => {
    const auth = getAuthManager();
    const response = (await auth).axios.get<any>(`experiences/${userId}`).then((res) => res.data);
    return response;
  },
);

const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {
    addExperience: (state, action: PayloadAction<Experience>) => {
      state.experiences.push(action.payload);
    },
    updateExperience: (state, action: PayloadAction<Experience>) => {
      const index = state.experiences.findIndex((exp) => exp.id === action.payload.id);
      if (index !== -1) {
        state.experiences[index] = action.payload;
      }
    },
    deleteExperience: (state, action: PayloadAction<string>) => {
      state.experiences = state.experiences.filter((exp) => exp.id !== action.payload);
    },
    setSelectedExperience: (state, action: PayloadAction<Experience | null>) => {
      state.selectedExperience = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperiences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences = action.payload;
      })
      .addCase(fetchExperiences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch experiences';
      });
  },
});

export const { addExperience, updateExperience, deleteExperience, setSelectedExperience } =
  experienceSlice.actions;
export default experienceSlice.reducer;
