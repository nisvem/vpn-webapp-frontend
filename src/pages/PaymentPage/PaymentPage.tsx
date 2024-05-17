import { Suspense } from 'react';
import {
  Await,
  LoaderFunction,
  defer,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { requestFunction } from '../../util/util';
import WebApp from '@twa-dev/sdk';
import PaymentForm from '../../components/PaymentForm/PaymentForm';
import { Key } from '../../types';
import Spiner from '../../components/Spiner/Spiner';

export const PaymentPageLoader: LoaderFunction = async ({ params }) => {
  const key = await requestFunction(`/api/getKey/${params.id}`);
  return defer({ key });
};

const PaymentPage = () => {
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
          return (
            <>
              <h1 className='title'>Payment for Key</h1>
              <PaymentForm dataKey={resolvedValue} />
            </>
          );
        }}
      />
    </Suspense>
  );
};

export default PaymentPage;
