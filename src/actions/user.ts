import { TelegramWebAppModel } from 'react-telegram-webapp';
import { User } from '../types';
import { UserActions } from './types';

export const setUser = (user: User) => {
  return {
    type: UserActions.SET_USER,
    payload: user,
  };
};

export const setUserTelegramId = (telegramId: string) => {
  return {
    type: UserActions.SET_USER_TELEGRAM_ID,
    payload: telegramId,
  };
};

export const setUserTelegramUsername = (username: string) => {
  return {
    type: UserActions.SET_USER_TELEGRAM_USERNAME,
    payload: username,
  };
};

export const setUserName = (name: string) => {
  return {
    type: UserActions.SET_USER_NAME,
    payload: name,
  };
};

export const setUserLastname = (userLastname: string) => {
  return {
    type: UserActions.SET_USER_LASTNAME,
    payload: userLastname,
  };
};

export const setUserTgApp = (tgApp: TelegramWebAppModel['app']) => {
  return {
    type: UserActions.SET_USER_LASTNAME,
    payload: tgApp,
  };
};
