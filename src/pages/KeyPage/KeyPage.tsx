import {
  Await,
  useLoaderData,
  defer,
  LoaderFunction,
  useNavigate,
} from 'react-router-dom';

import Spiner from '../../components/Spiner/Spiner';
import KeyInfo from '../../components/KeyInfo/KeyInfo';
import { Suspense } from 'react';
import { Key } from '../../types';
import { requestFunction } from '../../util/util';
import WebApp from '@twa-dev/sdk';

export const KeyPageLoader: LoaderFunction = async ({ params }) => {
  const key = await requestFunction(`/api/getKey/${params.id}`);

  return defer({ key });
};

const KeyPage = () => {
  const { key } = useLoaderData() as { key: Key };
  const navigate = useNavigate();

  WebApp.BackButton.show();
  WebApp.BackButton.onClick(() => {
    navigate(-1);
  });

  return (
    <Suspense fallback={<Spiner />}>
      <Await
        resolve={key}
        children={(resolvedValue) => {
          return <KeyInfo data={resolvedValue} />;
        }}
      />
    </Suspense>
  );
};

export default KeyPage;
