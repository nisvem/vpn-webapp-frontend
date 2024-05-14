import {
  Await,
  useLoaderData,
  defer,
  LoaderFunction,
  useNavigate,
} from 'react-router-dom';

import Spiner from '../../components/Spiner/Spiner';
import UserInfo from '../../components/UserInfo/UserInfo';
import { Suspense } from 'react';
import { User } from '../../types';
import { requestFunction } from '../../util/util';
import WebApp from '@twa-dev/sdk';

export const UserPageLoader: LoaderFunction = async ({ params }) => {
  const user = await requestFunction(`/api/getUser/${params.id}`);
  return defer({ user });
};

const UserPage = () => {
  const { user } = useLoaderData() as { user: User };
  const navigate = useNavigate();

  WebApp.BackButton.show();
  WebApp.BackButton.onClick(() => {
    return navigate(-1);
  });

  return (
    <Suspense fallback={<Spiner />}>
      <Await
        resolve={user}
        children={(resolvedValue) => {
          return <UserInfo user={resolvedValue} />;
        }}
      />
    </Suspense>
  );
};

export default UserPage;
