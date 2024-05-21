import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import TelegramWrapper from './components/TelegramWrapper/TelegramWrapper';

import store from './store/index.ts';

import './main.scss';
import WebApp from '@twa-dev/sdk';

WebApp.setHeaderColor(WebApp.themeParams.secondary_bg_color);
WebApp.setBackgroundColor(WebApp.themeParams.secondary_bg_color);

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <TelegramWrapper />
  </Provider>
);
