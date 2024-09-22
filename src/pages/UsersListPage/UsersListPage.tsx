import { Suspense, useRef } from 'react';
import { Await, LoaderFunction, defer, useLoaderData } from 'react-router-dom';

import { requestFunction } from '../../util/util';

import Spiner from '../../components/Spiner/Spiner';
import UsersList from '../../components/UsersList/UsersList';

import { User } from '../../types';
import WebApp from '@twa-dev/sdk';
import i18next from '../../lang';

export const UsersListPageLoader: LoaderFunction = async () => {
  const users = await requestFunction(`/api/getUsers/`);

  return defer({ users });
};

const UsersListPage = () => {
  const data = useLoaderData() as { users: User[] };
  const loaderData = useRef(data?.users);

  WebApp.BackButton.hide();

  return (
    <Suspense fallback={<Spiner />}>
      <Await
        resolve={loaderData.current}
        children={(resolvedValue: User[]) => {
          return (
            <>
              <h1 className='title'>{i18next.t('users_list')}</h1>
              <UsersList users={resolvedValue} />
            </>
          );
        }}
      />
    </Suspense>
  );
};

export default UsersListPage;
