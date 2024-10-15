import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getAuthManager } from '@/utils';

import type { PayloadAction } from '@reduxjs/toolkit';

interface Credential {
  id: string;
  name: string;
  issuingOrganization: string;
  startDate: string;
  endDate: string;
  credentialId: string;
}

interface CredentialState {
  credentials: Credential[];
  selectedCredential: Credential | null;
  loading: boolean;
  error: string | null;
}

const initialState: CredentialState = {
  credentials: [],
  selectedCredential: null,
  loading: false,
  error: null,
};

export const fetchCredentials = createAsyncThunk(
  'credential/fetchCredential',
  async (userId: string) => {
    const auth = await getAuthManager();
    const response = await auth.axios
      .get<any>(`/credential/user/${userId}`)
      .then((res) => res.data);
    return response;
  },
);

const credentialSlice = createSlice({
  name: 'credential',
  initialState,
  reducers: {
    addCredential: (state, action: PayloadAction<Credential>) => {
      state.credentials.push(action.payload);
    },
    updateCredential: (state, action: PayloadAction<Credential>) => {
      const index = state.credentials.findIndex((cred) => cred.id === action.payload.id);
      if (index !== -1) {
        state.credentials[index] = action.payload;
      }
    },
    deleteCredential: (state, action: PayloadAction<string>) => {
      state.credentials = state.credentials.filter((cred) => cred.id !== action.payload);
    },
    setSelectedCredential: (state, action: PayloadAction<Credential | null>) => {
      state.selectedCredential = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCredentials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCredentials.fulfilled, (state, action) => {
        state.loading = false;
        state.credentials = action.payload;
      })
      .addCase(fetchCredentials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch credentials';
      });
  },
});

export const { addCredential, updateCredential, deleteCredential, setSelectedCredential } =
  credentialSlice.actions;

export default credentialSlice.reducer;
