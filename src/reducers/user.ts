import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/';

const initialState: User = {
  telegramId: '',
  username: '',
  name: '',
  lastname: '',
  isAdmin: false,
  isLimitedToCreate: false,
  maxKeyAvalible: 0,
  keys: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      return {
        ...state,
        ...(action.payload as User),
      };
    },
  },
});

export const { setUser } = userSlice.actions;
export const { actions, reducer: userReducer } = userSlice;
