import {
  Await,
  useLoaderData,
  defer,
  LoaderFunction,
  useNavigate,
} from 'react-router-dom';

import Spiner from '../../components/Spiner/Spiner';
import KeyInfo from '../../components/KeyInfo/KeyInfo';
import { Suspense, useRef } from 'react';
import { Key } from '../../types';
import { requestFunction } from '../../util/util';
import WebApp from '@twa-dev/sdk';

export const KeyPageLoader: LoaderFunction = async ({ params }) => {
  const key = await requestFunction(`/api/getKey/${params.id}`);

  return defer({ key });
};

const KeyPage = () => {
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
          return <KeyInfo data={resolvedValue} />;
        }}
      />
    </Suspense>
  );
};

export default KeyPage;
