import { Suspense, useEffect, useRef } from 'react';
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
import i18next from '../../lang';

export const KeysListPageLoader: LoaderFunction = async () => {
  const keys = await requestFunction(`/api/getKeys/`);

  return defer({ keys });
};

export const KeysListPageLoaderForAdmin: LoaderFunction = async () => {
  const keys = await requestFunction(`/api/getAllKeys/`);

  return defer({ keys });
};

const KeysListPage = () => {
  const { isLimitedToCreate, maxKeyAvalible, keys, isAdmin } = useSelector<
    Store,
    User
  >((state) => state.user);
  const data = useLoaderData() as { keys: Key[] };
  const loaderData = useRef(data?.keys);

  const navigate = useNavigate();

  useEffect(() => {
    WebApp.BackButton.hide();
  });

  return (
    <Suspense fallback={<Spiner />}>
      <Await
        resolve={loaderData.current}
        children={(resolvedValue) => {
          return (
            <>
              <h1 className='title'>{i18next.t('keys_list')}</h1>
              <KeysList keys={resolvedValue} />
              {!isAdmin ? (
                <p
                  className={`${
                    keys.length >= maxKeyAvalible
                      ? 'text-red text-tg-theme-destructive-text'
                      : 'text-gray text-tg-theme-hint font-thin'
                  } mt-auto mb-16 text-sm text-center w-full`}
                >
                  {i18next.t('avalible_keys', {
                    keys: keys.length,
                    max: maxKeyAvalible,
                  })}
                  {keys.length >= maxKeyAvalible && (
                    <>
                      <br />
                      <span>
                        {i18next.t('change_parametr')}{' '}
                        <a href='https://t.me/@nisvem'>@nisvem</a>.
                      </span>
                    </>
                  )}
                </p>
              ) : null}

              <button
                onClick={() => {
                  navigate('/create-key');
                }}
                className='btn fixed bottom-5 left-3 right-3 z-10'
                disabled={isLimitedToCreate ? true : false}
              >
                {i18next.t('add_key')}
              </button>
            </>
          );
        }}
      />
    </Suspense>
  );
};

export default KeysListPage;
