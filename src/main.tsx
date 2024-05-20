import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import TelegramWrapper from './components/TelegramWrapper/TelegramWrapper';

import store from './store/index.ts';

import './main.scss';
import WebApp from '@twa-dev/sdk';

WebApp.setHeaderColor(WebApp.themeParams.header_bg_color);
WebApp.setBackgroundColor(WebApp.themeParams.header_bg_color);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <TelegramWrapper />
  </Provider>
);
