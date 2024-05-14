import { Suspense } from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';

import { useSelector } from 'react-redux';

import Layout from '../../pages/Layout';
import KeysListPage, {
  KeysListPageLoader,
  KeysListPageLoaderForAdmin,
} from '../../pages/KeysListPage/KeysListPage';
import UsersListPage, {
  UsersListPageLoader,
} from '../../pages/UsersListPage/UsersListPage';
import KeyPage, { KeyPageLoader } from '../../pages/KeyPage/KeyPage';
import UserPage, { UserPageLoader } from '../../pages/UserPage/UserPage';
import CreateKeyPage from '../../pages/CreateKeyPage/CreateKeyPage';
import FaqPage from '../../pages/FaqPage/FaqPage';
import EditUserPage, {
  EditUserPageLoader,
} from '../../pages/EditUserPage/EditUserPage';

import Error from '../Error/Error';
import Spiner from '../Spiner/Spiner';

import { Store, User } from '../../types';

import './App.scss';
import EditKeyPage, {
  EditKeyPageLoader,
} from '../../pages/EditKeyPage/EditKeyPage';

function App() {
  const { isAdmin } = useSelector<Store, User>((state) => state.user);

  const router = createBrowserRouter([
    {
      id: 'root',
      path: '/',
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: isAdmin ? (
            <Navigate to='/users' replace />
          ) : (
            <Navigate to='/keys' replace />
          ),
        },
        {
          path: 'users',
          children: [
            {
              index: true,
              loader: UsersListPageLoader,
              element: <UsersListPage />,
            },
            {
              path: ':id',
              loader: UserPageLoader,
              element: <UserPage />,
            },
          ],
        },
        {
          path: 'keys',
          children: [
            {
              index: true,
              loader: isAdmin ? KeysListPageLoaderForAdmin : KeysListPageLoader,
              element: <KeysListPage />,
            },
            {
              path: ':id',
              loader: KeyPageLoader,
              element: <KeyPage />,
            },
          ],
        },
        {
          path: 'faq',
          element: <FaqPage />,
        },
        {
          path: 'create-key',
          element: <CreateKeyPage />,
        },
        {
          path: 'edit-user',
          children: [
            {
              path: ':id',
              loader: EditUserPageLoader,
              element: <EditUserPage />,
            },
          ],
        },
        {
          path: 'edit-key',
          children: [
            {
              path: ':id',
              loader: EditKeyPageLoader,
              element: <EditKeyPage />,
            },
          ],
        },
        {
          path: '*',
          element: <Navigate to='/' replace />,
        },
      ],
    },
  ]);

  return (
    <Suspense fallback={<Spiner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
