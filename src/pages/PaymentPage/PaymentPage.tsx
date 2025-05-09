import { Suspense, useRef } from 'react';
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
import i18next from '../../lang';

export const PaymentPageLoader: LoaderFunction = async ({ params }) => {
  const key = await requestFunction(`/api/getKey/${params.id}`);
  return defer({ key });
};

const PaymentPage = () => {
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
              <h1 className='title'>{i18next.t('payment_for_key')}</h1>
              <PaymentForm dataKey={resolvedValue} />
            </>
          );
        }}
      />
    </Suspense>
  );
};

export default PaymentPage;
