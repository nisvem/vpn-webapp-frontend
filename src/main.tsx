import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/App/App.tsx';
import TelegramWrapper from './components/TelegramWrapper/TelegramWrapper';

import store from './store/index.ts';

import './main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <TelegramWrapper>
      <App />
    </TelegramWrapper>
  </Provider>
);
