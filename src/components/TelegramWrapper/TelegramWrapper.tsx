import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { setUser } from '../../reducers/user';
import WebApp from '@twa-dev/sdk';

import Spiner from '../Spiner/Spiner';
import Error from '../Error/Error';

import { useHttp } from '../../hooks/http.hook';
import App from '../App/App';
import i18next from '../../lang';

type CallbackParams = {
  status: 'sent' | 'cancelled';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

function TelegramWrapper() {
  const [isReady, setIsReady] = useState(false);

  const dispatch = useDispatch();
  const { request, process, errorText, loading } = useHttp();

  const initFunction = async () => {
    try {
      const response = await request(
        `/api/getUser/${WebApp.initDataUnsafe.user?.id}`
      );

      if (response?.username || response?.phoneNumber) {
        const updateResponse = await request('/api/updateUser', 'POST', {
          username: WebApp.initDataUnsafe.user?.username || '',
          telegramId: WebApp.initDataUnsafe.user?.id || '',
          name: WebApp.initDataUnsafe.user?.first_name || '',
          surname: WebApp.initDataUnsafe.user?.last_name || '',
          lastViewedApp: new Date(),
        });

        dispatch(setUser(updateResponse));
        setIsReady(true);
      } else {
        if (WebApp.initDataUnsafe.user?.username) {
          const createResponse = await request('/api/createUser', 'POST', {
            username: WebApp.initDataUnsafe.user?.username || '',
            telegramId: WebApp.initDataUnsafe.user?.id || '',
            name: WebApp.initDataUnsafe.user?.first_name || '',
            surname: WebApp.initDataUnsafe.user?.last_name || '',
            lastViewedApp: new Date(),
            dateOfCreateUser: new Date(),
          });
          dispatch(setUser(createResponse));
          setIsReady(true);
        } else {
          WebApp.showConfirm(i18next.t('share_phone'), (confirm) => {
            if (confirm) {
              WebApp.requestContact((access) => !access && WebApp.close());

              WebApp.onEvent(
                'contactRequested',
                async (params: CallbackParams) => {
                  if (response) {
                    const updateResponse = await request(
                      '/api/updateUser',
                      'POST',
                      {
                        username: WebApp.initDataUnsafe.user?.username || '',
                        telegramId: WebApp.initDataUnsafe.user?.id || '',
                        phoneNumber:
                          params.responseUnsafe.contact.phone_number || '',
                        name: WebApp.initDataUnsafe.user?.first_name || '',
                        surname: WebApp.initDataUnsafe.user?.last_name || '',
                        lastViewedApp: new Date(),
                      }
                    );

                    dispatch(setUser(updateResponse));
                    setIsReady(true);
                  } else {
                    const createResponse = await request(
                      '/api/createUser',
                      'POST',
                      {
                        username: WebApp.initDataUnsafe.user?.username || '',
                        telegramId: WebApp.initDataUnsafe.user?.id || '',
                        phoneNumber:
                          params?.responseUnsafe.contact.phone_number || '',
                        name: WebApp.initDataUnsafe.user?.first_name || '',
                        surname: WebApp.initDataUnsafe.user?.last_name || '',
                        lastViewedApp: new Date(),
                        dateOfCreateUser: new Date(),
                      }
                    );
                    dispatch(setUser(createResponse));
                    setIsReady(true);
                  }
                }
              );
            } else {
              WebApp.close();
            }
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    WebApp?.initDataUnsafe?.user ? initFunction() : null;
    WebApp.expand();
    if(WebApp.platform === 'ios' || WebApp.platform === 'android' || WebApp.platform === 'android_x') WebApp.requestFullscreen();
    console.log('WebApp', WebApp);
  }, []);

  return process !== 'error' ? (
    <>
      {!loading && isReady ? (
        <App />
      ) : (
        <div className='min-h-screen w-screen flex items-center justify-center'>
          <Spiner />
        </div>
      )}
    </>
  ) : (
    <div className='min-h-screen w-screen flex items-center justify-center'>
      <Error text={errorText} />
    </div>
  );
}

export default TelegramWrapper;
