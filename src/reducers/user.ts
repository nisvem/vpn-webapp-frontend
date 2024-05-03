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

// export const setUser = (user: User) => {
//   return {
//     type: UserActions.SET_USER,
//     payload: user,
//   };
// };

// export const setUserTelegramId = (telegramId: string) => {
//   return {
//     type: UserActions.SET_USER_TELEGRAM_ID,
//     payload: telegramId,
//   };
// };

// export const setUserTelegramUsername = (username: string) => {
//   return {
//     type: UserActions.SET_USER_TELEGRAM_USERNAME,
//     payload: username,
//   };
// };

// export const setUserName = (name: string) => {
//   return {
//     type: UserActions.SET_USER_NAME,
//     payload: name,
//   };
// };

// export const setUserLastname = (userLastname: string) => {
//   return {
//     type: UserActions.SET_USER_LASTNAME,
//     payload: userLastname,
//   };
// };

// export const setUserTgApp = (tgApp: TelegramWebAppModel['app']) => {
//   return {
//     type: UserActions.SET_USER_LASTNAME,
//     payload: tgApp,
//   };
// };

export const { setUser } = userSlice.actions;
export const { actions, reducer: userReducer } = userSlice;
