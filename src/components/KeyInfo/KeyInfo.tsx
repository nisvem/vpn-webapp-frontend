import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Player } from '@lottiefiles/react-lottie-player';
import { useHttp } from '../../hooks/http.hook';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import date from 'date-and-time';
import convertSize from 'convert-size';
import WebApp from '@twa-dev/sdk';

import { setUser } from '../../reducers/user';

import { InfoTable, InfoRow } from '../InfoTable/InfoTable';

import Error from '../Error/Error';
import SpanActive from '../SpanActive/SpanActive';
import { Key, Store, User } from '../../types';

import copyAnimation from '../../data/copyAnimation.json';

import './KeyInfo.scss';

const KeyInfo = ({ data }: { data: Key }) => {
  const [key, setKey] = useState<Key>(data);
  const [usageData, setUsageData] = useState(' ... ');

  const { isAdmin, telegramId } = useSelector<Store, User>(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const useHttpForDate = useHttp();
  const { request, process, loading, errorText } = useHttp();

  const copyBtn = useRef<Player | null>(null);

  useEffect(() => {
    async function getDataUsage() {
      try {
        const response = await useHttpForDate.request(
          `/api/getDataUsage/${key._id}`
        );

        if (response) {
          setUsageData(convertSize(response.bytes, { accuracy: 1 }));
        }
      } catch (e) {
        console.error(e);
      }
    }

    getDataUsage();
  }, []);

  const onClickCopy: React.MouseEventHandler<HTMLButtonElement> = () => {
    copyBtn.current?.play();
    navigator.clipboard.writeText(key.accessUrl);
  };

  const deleteKey = async (id: string) => {
    if (window.confirm('Do you really want to delete Key?')) {
      try {
        const response = await request('/api/deleteKey', 'POST', { id });
        response.telegramId === telegramId ? dispatch(setUser(response)) : null;
        navigate('/keys');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const switchStatus = async (id: string) => {
    if (key.isOpen) {
      const response = await request('/api/disableKey', 'POST', { id });
      setKey(response);
    } else {
      const response = await request('/api/enableKey', 'POST', { id });
      setKey(response);
    }
  };

  const requestToPay = async (id: string) => {
    try {
      await request(`/api/getUrlToChat`, 'POST', {
        idKey: id,
        telegramId: telegramId,
      });
      WebApp.close();
    } catch (e) {
      console.error(e);
    }
  };

  return process === 'error' ? (
    <>
      <Error text={errorText}></Error>
    </>
  ) : (
    <div className='flex flex-col w-full'>
      <h1 className='title'>{key.name}</h1>

      <InfoTable>
        <InfoRow name='Status' onlyAdmin={false}>
          <SpanActive isOpen={key.isOpen} />
        </InfoRow>

        <InfoRow name='Owner' onlyAdmin={true}>
          <>
            {key.user?.name ? <p>{`Name: ${key.user?.name}`}</p> : null}
            {key.user?.surname ? (
              <p>{`Lastname: ${key.user?.surname}`}</p>
            ) : null}
            {key.user?.telegramId ? (
              <p>{`TelegramId: ${key.user?.telegramId}`}</p>
            ) : null}
            {key.user?.username ? (
              <p>
                <a
                  href={`https://t.me/${key.user?.username}`}
                  target='_blank'
                >{`@${key.user?.username}`}</a>
              </p>
            ) : null}
          </>
        </InfoRow>

        {key.server ? (
          <InfoRow name='Server' onlyAdmin={false}>
            <span>
              {`${key.server.name} (${key.server.country}) ${getUnicodeFlagIcon(
                key.server.abbreviatedCountry
              )}`}
            </span>
          </InfoRow>
        ) : null}

        <InfoRow name='Usage trafic (last 30 days)' onlyAdmin={false}>
          <>{usageData}</>
        </InfoRow>

        {key.currentPrice ? (
          <InfoRow name='Price' onlyAdmin={false}>
            <>{key.currentPrice} rub/mes</>
          </InfoRow>
        ) : null}

        {key.lastPayment ? (
          <InfoRow name='Last Payment' onlyAdmin={false}>
            <>{date.format(new Date(key.lastPayment), 'D MMMM YYYY') || ''}</>
          </InfoRow>
        ) : null}

        {key.nextPayment ? (
          <InfoRow name='Next Payment' onlyAdmin={false}>
            <>{date.format(new Date(key.nextPayment), 'D MMMM YYYY') || ''}</>
          </InfoRow>
        ) : null}
      </InfoTable>

      <div className='key-place'>
        <p className='key-place__text'>
          <span className='text-md font-bold'>Access key: </span>
          {key.accessUrl}
        </p>
        <button className='key-place__btn-copy' onClick={onClickCopy}>
          <Player ref={copyBtn} src={copyAnimation}></Player>
        </button>
      </div>

      {isAdmin ? (
        <>
          <button
            onClick={() => switchStatus(key._id)}
            disabled={loading}
            className='btn w-full mb-3'
          >
            {key.isOpen ? 'Deactivate' : 'Activate'}
          </button>
          {key.user?.telegramId && (
            <button
              onClick={() => navigate(`/users/${key.user?.telegramId}`)}
              disabled={loading}
              className='btn w-full mb-3'
            >
              Go to the user
            </button>
          )}
          <button
            onClick={() => navigate(`/edit-key/${key._id}`)}
            disabled={loading}
            className='btn w-full mb-3'
          >
            Edit key
          </button>
        </>
      ) : null}

      <button
        onClick={() => requestToPay(key._id)}
        disabled={loading}
        className='btn w-full mb-3'
      >
        Pay for Key
      </button>

      <button
        onClick={() => deleteKey(key._id)}
        disabled={loading}
        className='btn w-full'
      >
        Delete Key
      </button>
    </div>
  );
};

export default KeyInfo;
