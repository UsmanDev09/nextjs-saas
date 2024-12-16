import { createSlice } from '@reduxjs/toolkit';

import type { IProfile } from './types';

const initialState: IProfile = {
  profile: {
    id: null,
    name: '',
    username: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
  },
});

export const { setProfile } = authSlice.actions;

export default authSlice.reducer;
