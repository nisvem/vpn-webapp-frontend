import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/';

const initialState: User = {
  _id: '',
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
    setUserTelegramId(state, action: PayloadAction<string>) {
      return {
        ...state,
        telegramId: action.payload as string,
      };
    },
  },
});

export const { setUser, setUserTelegramId } = userSlice.actions;
export const { actions, reducer: userReducer } = userSlice;
