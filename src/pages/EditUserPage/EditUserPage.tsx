import { Suspense } from 'react';
import {
  Await,
  LoaderFunction,
  defer,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { requestFunction } from '../../util/util';
import EditUser from '../../components/EditUser/EditUser';

import WebApp from '@twa-dev/sdk';

import Spiner from '../../components/Spiner/Spiner';
import { User } from '../../types';

export const EditUserPageLoader: LoaderFunction = async ({ params }) => {
  const user = await requestFunction(`/api/getUser/${params.id}`);
  return defer({ user });
};

const EditUserPage = () => {
  const { user } = useLoaderData() as { user: User };
  const navigate = useNavigate();

  WebApp.BackButton.show();
  WebApp.BackButton.onClick(() => {
    navigate(-1);
  });
  return (
    <Suspense fallback={<Spiner />}>
      <Await
        resolve={user}
        children={(resolvedValue) => {
          return (
            <>
              <h1 className='title'>Edit user</h1>
              <EditUser user={resolvedValue} />
            </>
          );
        }}
      />
    </Suspense>
  );
};

export default EditUserPage;
