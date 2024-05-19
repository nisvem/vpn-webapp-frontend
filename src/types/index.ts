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
  _id: string;
  telegramId: string;
  username: string;
  isAdmin: boolean;
  isLimitedToCreate: boolean;
  maxKeyAvalible: number;
  keys: Key[];
  tgApp?: TelegramWebAppModel['app'];

  name?: string;
  phoneNumber?: string;

  lastViewedApp?: Date;
  dateOfCreateUser?: Date;
  surname?: string;
}

export interface Key {
  _id: string;
  accessUrl: string;
  id: string;
  name: string;
  isOpen: boolean;

  server?: Server;
  portForKey: number;

  user?: User;
  currentPrice?: number;
  lastPayment?: Date;
  nextPayment?: Date;
}

export interface CreateKeyForm {
  name: string;
  user?: Option;
  server?: Option;
}

export interface EditKeyForm {
  name: string;
  currentPrice: number;
  lastPayment?: Date;
  nextPayment?: Date;
}

export interface PaymentKeyForm {
  tariff?: Option;
}

export interface EditUserForm {
  isAdmin: boolean;
  isLimitedToCreate: boolean;
  maxKeyAvalible: number;
}

export interface Server {
  name: string;
  country: string;
  abbreviatedCountry: string;
  price: number;
}

export interface Tariff {
  _id: string;
  name: string;
  days: string;
  discountPercentage: string;
}

export interface Option {
  value: string;
  label: string;
  price?: string;
  country?: string;
  discountPercentage?: string;
  abbreviatedCountry?: string;
  days?: string;
}
