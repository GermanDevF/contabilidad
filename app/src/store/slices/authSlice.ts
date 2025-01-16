import { AuthState, User } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';

const initialState: AuthState = {
  user: null,
  token: null,
  autehnticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearAuth: (state) => {
      state.autehnticated = false;
      state.user = null;
      state.token = null;
    },
    login: (state, action: PayloadAction<User>) => {
      state.autehnticated = true;
      state.user = action.payload;
    },
  },
});

export const { login, setToken, clearAuth } = authSlice.actions;

//selectors

export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.autehnticated;

export default authSlice.reducer;
