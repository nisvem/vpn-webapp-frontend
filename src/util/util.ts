import axios from 'axios';
import WebApp from '@twa-dev/sdk';

const { VITE_API_URL, VITE_API_ACCESS_KEY } = import.meta.env;

const api = axios.create();
api.defaults.baseURL = VITE_API_URL;
api.defaults.headers.common['Accept'] = 'application/json';
api.defaults.headers.common['Content-Type'] = 'application/json';
api.defaults.headers.common['X-Access-Code'] = VITE_API_ACCESS_KEY;
api.defaults.headers.common['X-Telegram-Id'] = WebApp.initDataUnsafe.user?.id;

export async function requestFunction(
  url: string,
  method: 'GET' | 'POST' = 'GET',
  body?: object | null
) {
  if (method === 'GET') {
    try {
      const response = await api.get(VITE_API_URL + url);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.error || error.message || error);
    }
  } else {
    try {
      const response = await api.post(VITE_API_URL + url, body);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.error || error.message || error);
    }
  }
}

// export const onFocusInput: FocusEventHandler<
//   HTMLInputElement | HTMLTextAreaElement
// > = (event) => {
//   if (
//     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/.test(
//       navigator.userAgent
//     )
//   ) {
//     document.body.classList.add('padding-keyboard');

//     event.target?.addEventListener(
//       'blur',
//       () => {
//         document.body.classList.remove('padding-keyboard');
//       },
//       { once: true }
//     );
//   }
// };
