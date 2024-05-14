import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import WebApp from '@twa-dev/sdk';

type Process = 'load' | 'loading' | 'error' | 'success';

const { VITE_API_URL, VITE_API_ACCESS_KEY } = import.meta.env;

const api = axios.create();

api.defaults.baseURL = VITE_API_URL;

api.defaults.headers.common['Accept'] = 'application/json';
api.defaults.headers.common['Content-Type'] = 'application/json';
api.defaults.headers.common['X-Access-Code'] = VITE_API_ACCESS_KEY;
api.defaults.headers.common['X-Telegram-Id'] = WebApp.initDataUnsafe.user?.id;

export const useHttp = () => {
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

      if (method === 'GET') {
        try {
          const response = await api.get(VITE_API_URL + url);
          setProcess('success');
          return response.data;
        } catch (error: any) {
          setProcess('error');
          error.response.data.error
            ? setErrorText(`Error: ${error.response.data.error}`)
            : setErrorText(`Error: ${error.message}`);
        }
      } else {
        try {
          const response = await api.post(VITE_API_URL + url, body);
          setProcess('success');
          return response.data;
        } catch (error: any) {
          setProcess('error');
          error.response.data.error
            ? setErrorText(`Error: ${error.response.data.error}`)
            : setErrorText(`Error: ${error.message}`);
        }
      }
    },
    []
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
