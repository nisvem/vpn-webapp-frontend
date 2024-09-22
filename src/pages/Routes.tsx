import { createBrowserRouter, Navigate } from 'react-router-dom';

import Layout from './Layout';
import KeysListPage, {
  KeysListPageLoader,
  KeysListPageLoaderForAdmin,
} from './KeysListPage/KeysListPage';
import UsersListPage, {
  UsersListPageLoader,
} from './UsersListPage/UsersListPage';
import KeyPage, { KeyPageLoader } from './KeyPage/KeyPage';
import UserPage, { UserPageLoader } from './UserPage/UserPage';
import CreateKeyPage from './CreateKeyPage/CreateKeyPage';
import FaqPage from './FaqPage/FaqPage';
import EditUserPage, { EditUserPageLoader } from './EditUserPage/EditUserPage';
import EditKeyPage, { EditKeyPageLoader } from './EditKeyPage/EditKeyPage';
import PaymentPage, { PaymentPageLoader } from './PaymentPage/PaymentPage';

import ErrorRouter from '../components/ErrorRouter/ErrorRouter';

export const routes = [
  {
    path: '/',
    name: 'Main',
    element: <Navigate to='/keys' replace />,
  },
  {
    path: '/users',
    name: 'Users list',
    element: <UsersListPage />,
    loader: UsersListPageLoader,
  },
  {
    path: '/users/:id',
    name: 'User',
    element: <UserPage />,
    loader: UserPageLoader,
  },
  {
    path: '/keys',
    name: 'Keys list',
    element: <KeysListPage />,
    loader: KeysListPageLoader,
    loaderForAdmin: KeysListPageLoaderForAdmin,
  },
  {
    path: '/keys/:id',
    name: 'Key',
    element: <KeyPage />,
    loader: KeyPageLoader,
  },

  { path: '/faq', name: 'FAQ', element: <FaqPage /> },
  {
    path: '/create-key',
    name: 'Create key form',
    element: <CreateKeyPage />,
  },
  {
    path: '/edit-user/:id',
    name: 'Edit user form',
    element: <EditUserPage />,
    loader: EditUserPageLoader,
  },
  {
    path: '/edit-key/:id',
    name: 'Edit key form',
    element: <EditKeyPage />,
    loader: EditKeyPageLoader,
  },
  {
    path: '/payment/:id',
    name: 'Payment form',
    element: <PaymentPage />,
    loader: PaymentPageLoader,
  },
  {
    path: '*',
    name: 'Unknown page 404',
    element: <Navigate to='/' replace />,
  },
];

export const router = (isAdmin: boolean) => {
  return createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorRouter />,
      children: routes.map((route) => ({
        index: route.path === '/',
        path: route.path === '/' ? undefined : route.path,
        loader: isAdmin ? route.loaderForAdmin || route.loader : route.loader,
        element: route.element,
        errorElement: route.element || undefined,
      })),
    },
  ]);
};
