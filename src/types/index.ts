import { TelegramWebAppModel } from 'react-telegram-webapp';

export interface Action<T, S> {
  type: T;
  payload: S | S[];
}

export interface Store {
  user: User;
}

export interface StateUser {
  user: User;
}

export interface User {
  telegramId: string;
  username: string;
  isAdmin: boolean;
  isLimitedToCreate: boolean;
  maxKeyAvalible: number;
  keys: Key[];
  tgApp?: TelegramWebAppModel['app'];

  name?: string;
  lastname?: string;
  phone?: string;
}

export interface Key {
  accessUrl: string;
  id: string;
  name: string;
  isOpen: boolean;

  server?: Server;

  user?: User;
  price?: number;
  lastPayment?: Date;
  nextPayment?: Date;
}

export interface CreateKeyForm {
  name: string;
  server: string;
}

export interface Server {
  name: string;
  country: string;
  abbreviatedCountry: string;
  price: number;
}
