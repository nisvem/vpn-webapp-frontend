import { Suspense } from 'react';
import { Await, LoaderFunction, defer, useLoaderData } from 'react-router-dom';

import { requestFunction } from '../../util/util';

import Spiner from '../../components/Spiner/Spiner';
import UsersList from '../../components/UsersList/UsersList';

import { User } from '../../types';
import WebApp from '@twa-dev/sdk';

export const UsersListPageLoader: LoaderFunction = async () => {
  const data = await requestFunction(`/api/getUsers/`);

  return defer({ data });
};

const UsersListPage = () => {
  const { data } = useLoaderData() as { data: User[] };

  WebApp.BackButton.hide();

  return (
    <Suspense fallback={<Spiner />}>
      <Await
        resolve={data}
        children={(resolvedValue: User[]) => {
          return (
            <>
              <h1 className='title'>Users List</h1>
              <UsersList users={resolvedValue} />
            </>
          );
        }}
      />
    </Suspense>
  );
};

export default UsersListPage;
