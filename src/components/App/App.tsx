import { RouterProvider } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { Store, User } from '../../types';
import { router } from '../../pages/Routes';

function App() {
  const { isAdmin, telegramId } = useSelector<Store, User>(
    (state) => state.user
  );

  return telegramId && <RouterProvider router={router(isAdmin)} />;
}

export default App;
