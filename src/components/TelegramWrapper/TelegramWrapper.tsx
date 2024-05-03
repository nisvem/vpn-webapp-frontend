import { useEffect, Children } from 'react';

import { useDispatch } from 'react-redux';
import { setUser, setUserTelegramId } from '../../reducers/user';
import WebApp from '@twa-dev/sdk';

// import {
//   TelegramWebAppModel,
//   useIsTelegramWebAppReady,
//   useTelegramWebApp,
// } from 'react-telegram-webapp';

import Spiner from '../Spiner/Spiner';
import Error from '../Error/Error';

import { useHttp } from '../../hooks/http.hook';

function TelegramWrapper({ children }: { children: JSX.Element }) {
  const dispatch = useDispatch();

  // const isReady = true;
  const { request, process, errorText, loading } = useHttp();

  const initFunction = async () => {
    try {
      console.log(WebApp);
      const response = await request(
        `/api/getUser/${WebApp.initDataUnsafe.user?.id}`
      );

      if (response) {
        dispatch(setUser(response));
      } else {
        dispatch(setUserTelegramId(WebApp.initDataUnsafe.user?.id + ''));

        const createResponse = await request('/api/createUser', 'POST', {
          username: WebApp.initDataUnsafe.user?.username,
          telegramId: WebApp.initDataUnsafe.user?.id,
          name: WebApp.initDataUnsafe.user?.first_name,
          surname: WebApp.initDataUnsafe.user?.last_name,
        });

        dispatch(setUser(createResponse));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    WebApp?.initDataUnsafe?.user ? initFunction() : null;
    // isReady
    //   ? initFunction({
    //       user: {
    //         telegramId: 683299990,
    //         username: 'nisvem',
    //         name: 'Artem',
    //         surname: '',
    //         phone: '',
    //       },
    //     })
    //   : null;
  }, [WebApp?.initDataUnsafe?.user]);

  return process !== 'error' ? (
    <>
      {WebApp?.initDataUnsafe && WebApp?.initDataUnsafe?.user && !loading ? (
        <>
          {Children.map(children, (child) => {
            return child;
          })}
        </>
      ) : (
        <div className='min-h-screen flex items-center justify-center'>
          <Spiner />
        </div>
      )}
    </>
  ) : (
    <Error text={errorText} />
  );
}

export default TelegramWrapper;
