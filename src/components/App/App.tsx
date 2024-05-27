import { RouterProvider } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { Store, User } from '../../types';
import { router } from '../../pages/Routes';
import i18next from '../../lang';

function App() {
  const { isAdmin, telegramId, lang } = useSelector<Store, User>(
    (state) => state.user
  );

  i18next.changeLanguage(lang || 'en');

  return telegramId && <RouterProvider router={router(isAdmin)} />;
}

export default App;
