import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import {
  Await,
  LoaderFunction,
  defer,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';

import { requestFunction } from '../../util/util';

import Spiner from '../../components/Spiner/Spiner';
import KeysList from '../../components/KeysList/KeysList';

import { Key, Store, User } from '../../types';
import WebApp from '@twa-dev/sdk';

export const KeysListPageLoader: LoaderFunction = async () => {
  const data = await requestFunction(`/api/getKeys/`);

  return defer({ data });
};

export const KeysListPageLoaderForAdmin: LoaderFunction = async () => {
  const data = await requestFunction(`/api/getAllKeys/`);

  return defer({ data });
};

const KeysListPage = () => {
  const { isLimitedToCreate, maxKeyAvalible, keys, isAdmin } = useSelector<
    Store,
    User
  >((state) => state.user);
  const { data } = useLoaderData() as { data: Key[] };
  const navigate = useNavigate();

  WebApp.BackButton.show();
  WebApp.BackButton.onClick(() => {
    navigate('/');
  });

  WebApp.BackButton.hide();

  return (
    <Suspense fallback={<Spiner />}>
      <Await
        resolve={data}
        children={(resolvedValue) => {
          return (
            <>
              <h1 className='title'>Keys List</h1>
              <KeysList keys={resolvedValue} />
              {!isAdmin ? (
                <p
                  className={`${
                    keys.length >= maxKeyAvalible
                      ? 'text-red'
                      : 'text-gray font-thin'
                  } mt-auto mb-4 text-sm text-center w-full`}
                >{`You have ${keys.length} of ${maxKeyAvalible} avalible keys.`}</p>
              ) : null}
              <button
                onClick={() => {
                  navigate('/create-key');
                }}
                className='btn w-full'
                disabled={isLimitedToCreate ? true : false}
              >
                Add
              </button>
            </>
          );
        }}
      />
    </Suspense>
  );
};

export default KeysListPage;
