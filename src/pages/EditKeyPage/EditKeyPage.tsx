import { Suspense, useRef } from 'react';
import {
  Await,
  LoaderFunction,
  defer,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { requestFunction } from '../../util/util';
import EditKey from '../../components/EditKey/EditKey';

import WebApp from '@twa-dev/sdk';

import Spiner from '../../components/Spiner/Spiner';
import { Key } from '../../types';

export const EditKeyPageLoader: LoaderFunction = async ({ params }) => {
  const key = await requestFunction(`/api/getKey/${params.id}`);
  return defer({ key });
};

const EditKeyPage = () => {
  const data = useLoaderData() as { key: Key };
  const loaderData = useRef(data?.key);

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
              <h1 className='title'>Edit key</h1>
              <EditKey dataKey={resolvedValue} />
            </>
          );
        }}
      />
    </Suspense>
  );
};

export default EditKeyPage;
