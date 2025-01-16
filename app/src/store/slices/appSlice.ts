import { App } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';

const initialState: App = {
  collapsedMenu: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleCollapsedMenu: (state) => {
      state.collapsedMenu = !state.collapsedMenu;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { toggleCollapsedMenu, setLoading } = authSlice.actions;

// selectors
export const selectCollapsedMenu = (state: RootState) =>
  state.app.collapsedMenu;
export const selectLoading = (state: RootState) => state.app.loading;

export default authSlice.reducer;
