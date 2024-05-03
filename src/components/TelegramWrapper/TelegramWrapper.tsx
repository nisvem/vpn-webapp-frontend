import { useEffect, Children } from 'react';

import { useDispatch } from 'react-redux';
import { setUser } from '../../actions/user';

import {
  TelegramWebAppModel,
  useIsTelegramWebAppReady,
  useTelegramWebApp,
} from 'react-telegram-webapp';

import Spiner from '../Spiner/Spiner';
import Error from '../Error/Error';

import { useHttp } from '../../hooks/http.hook';

function TelegramWrapper({ children }: { children: JSX.Element }) {
  const isReady = useIsTelegramWebAppReady();
  const tgApp = useTelegramWebApp();

  const dispatch = useDispatch();

  // const isReady = true;
  const { request, process, errorText, loading } = useHttp();

  const initFunction = async (tgApp: TelegramWebAppModel['app']) => {
    try {
      const response = await request(`/api/getUser/${tgApp?.user.telegramId}`);

      if (response) {
        dispatch(setUser(response));
      } else {
        const createResponse = await request('/api/createUser', 'POST', {
          username: tgApp.user.username,
          telegramId: tgApp.user.telegramId,
          name: tgApp.user.name,
          surname: tgApp.user.surname,
          phone: tgApp.user.phone,
        });
        dispatch(setUser(createResponse));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    isReady ? initFunction(tgApp) : null;
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
  }, [isReady]);

  return process !== 'error' ? (
    <>
      {
        // isReady &&
        // tgApp?.initDataUnsafe &&
        // tgApp?.initDataUnsafe?.user &&
        !loading ? (
          <>
            {Children.map(children, (child) => {
              return child;
            })}
          </>
        ) : (
          <div className='min-h-screen flex items-center justify-center'>
            <Spiner />
          </div>
        )
      }
    </>
  ) : (
    <Error text={errorText} />
  );
}

export default TelegramWrapper;
