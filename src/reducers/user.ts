import { Action, User } from '../types/';
import { UserActions } from '../actions/types';
import { TelegramWebAppModel } from 'react-telegram-webapp';

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

const user = (
  state = initialState,
  action: Action<UserActions, unknown>
): User => {
  switch (action.type) {
    case UserActions.SET_USER:
      return {
        ...state,
        ...(action.payload as User),
      };
    case UserActions.SET_USER_TELEGRAM_ID:
      return {
        ...state,
        telegramId: action.payload as string,
      };
    case UserActions.SET_USER_TELEGRAM_USERNAME:
      return {
        ...state,
        username: action.payload as string,
      };

    case UserActions.SET_USER_NAME:
      return {
        ...state,
        name: action.payload as string,
      };

    case UserActions.SET_USER_LASTNAME:
      return {
        ...state,
        lastname: action.payload as string,
      };

    case UserActions.SET_USER_TGAPP:
      return {
        ...state,
        tgApp: action.payload as TelegramWebAppModel['app'],
      };
    default:
      return state;
  }
};

export default user;
