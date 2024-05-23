import { Suspense, useRef } from 'react';
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
import i18next from '../../lang';

export const EditUserPageLoader: LoaderFunction = async ({ params }) => {
  const user = await requestFunction(`/api/getUser/${params.id}`);
  return defer({ user });
};

const EditUserPage = () => {
  const data = useLoaderData() as { user: User };
  const loaderData = useRef(data?.user);

  const navigate = useNavigate();

  WebApp.BackButton.show();
  WebApp.BackButton.onClick(() => {
    navigate(-1);
  });
  return (
    <Suspense fallback={<Spiner />}>
      <Await
        resolve={loaderData.current}
        children={(resolvedValue) => {
          return (
            <>
              <h1 className='title'>{i18next.t('edit_user')}</h1>
              <EditUser user={resolvedValue} />
            </>
          );
        }}
      />
    </Suspense>
  );
};

export default EditUserPage;
