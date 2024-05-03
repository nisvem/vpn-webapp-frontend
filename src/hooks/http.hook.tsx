import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Store, User } from '../types';

type Process = 'load' | 'loading' | 'error' | 'success';

const { VITE_API_UR } = import.meta.env;

const api = axios.create();

api.defaults.baseURL = VITE_API_UR;

api.defaults.headers.common['Accept'] = 'application/json';
api.defaults.headers.common['Content-Type'] = 'application/json';

export const useHttp = () => {
  const { telegramId } = useSelector<Store, User>((state) => state.user);
  const [process, setProcess] = useState<Process>('load');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('Something wrong!');

  useEffect(() => {
    switch (process) {
      case 'loading':
        setLoading(true);
        setErrorText(`Something wrong!`);
        break;
      default:
        setLoading(false);
        break;
    }
  }, [process]);

  const request = useCallback(
    async (
      url: string,
      method: 'GET' | 'POST' = 'GET',
      body?: object | null
    ) => {
      setProcess('loading');
      setErrorText(`Something wrong!`);

      api.defaults.headers.common['X-Telegram-Id'] = telegramId;

      if (method === 'GET') {
        return api
          .get(VITE_API_UR + url)
          .then(function (response) {
            setProcess('success');
            return response.data;
          })
          .catch(function (error) {
            setProcess('error');
            error.response.data.error
              ? setErrorText(`Error: ${error.response.data.error}`)
              : setErrorText(`Error: ${error.message}`);
          });
      } else {
        return api
          .post(VITE_API_UR + url, body)
          .then(function (response) {
            setProcess('success');
            return response.data;
          })
          .catch(function (error) {
            setProcess('error');
            error.response.data.error
              ? setErrorText(`Error: ${error.response.data.error}`)
              : setErrorText(`Error: ${error.message}`);
          });
      }
    },
    [telegramId]
  );

  return {
    request,
    process,
    loading,
    errorText,
    setProcess,
    setErrorText,
  };
};
