import { useEffect, Children } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../reducers/user';
import WebApp from '@twa-dev/sdk';

import Spiner from '../Spiner/Spiner';
import Error from '../Error/Error';

import { useHttp } from '../../hooks/http.hook';
import { Store, User } from '../../types';

function TelegramWrapper({ children }: { children: JSX.Element }) {
  const { telegramId } = useSelector<Store, User>((state) => state.user);

  const dispatch = useDispatch();
  const { request, process, errorText, loading } = useHttp();

  const initFunction = async () => {
    try {
      const response = await request(
        `/api/getUser/${WebApp.initDataUnsafe.user?.id}`
      );

      if (response) {
        const updateResponse = await request('/api/updateUser', 'POST', {
          username: WebApp.initDataUnsafe.user?.username,
          telegramId: WebApp.initDataUnsafe.user?.id,
          name: WebApp.initDataUnsafe.user?.first_name,
          surname: WebApp.initDataUnsafe.user?.last_name,
          photoUrl: WebApp.initDataUnsafe.user?.photo_url,
          lastViewedApp: new Date(),
        });

        dispatch(setUser(updateResponse));
      } else {
        const createResponse = await request('/api/createUser', 'POST', {
          username: WebApp.initDataUnsafe.user?.username,
          telegramId: WebApp.initDataUnsafe.user?.id,
          name: WebApp.initDataUnsafe.user?.first_name,
          surname: WebApp.initDataUnsafe.user?.last_name,
          photoUrl: WebApp.initDataUnsafe.user?.photo_url,
          lastViewedApp: new Date(),
          dateOfCreateUser: new Date(),
        });

        dispatch(setUser(createResponse));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    WebApp?.initDataUnsafe?.user ? initFunction() : null;
    WebApp.expand();
    console.log('WebApp', WebApp);
  }, []);

  // const initFunction = async (user: {
  //   telegramId: number;
  //   username: string;
  //   name: string;
  //   surname: string;
  //   photo_url: string;
  // }) => {
  //   try {
  //     const response = await request(`/api/getUser/${user.telegramId}`);

  //     if (response) {
  //       const updateResponse = await request('/api/updateUser', 'POST', {
  //         username: user.username,
  //         telegramId: user.telegramId,
  //         name: user.name,
  //         surname: user.surname,
  //         photoUrl: user.photo_url,
  //         lastViewedApp: new Date(),
  //       });

  //       dispatch(setUser(updateResponse));
  //     } else {
  //       const createResponse = await request('/api/createUser', 'POST', {
  //         username: user.username,
  //         telegramId: user.telegramId,
  //         name: user.name,
  //         surname: user.surname,
  //         photoUrl: user.photo_url,
  //         lastViewedApp: new Date(),
  //         dateOfCreateUser: new Date(),
  //       });

  //       dispatch(setUser(createResponse));
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   initFunction({
  //     telegramId: 683299990,
  //     username: 'nisvem',
  //     name: 'Artem',
  //     surname: '',
  //     photo_url: '',
  //   });
  // }, []);

  return process !== 'error' ? (
    <>
      {WebApp?.initDataUnsafe &&
      WebApp?.initDataUnsafe?.user &&
      !loading &&
      telegramId ? (
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
