import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import { useHttp } from '../../hooks/http.hook';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import date from 'date-and-time';
import convertSize from 'convert-size';

import { setUser } from '../../actions/user';

import { KeyInfoTable, KeyInfoRow } from '../KeyInfoTable/KeyInfoTable';
import Spiner from '../Spiner/Spiner';
import Error from '../Error/Error';
import SpanActive from '../SpanActive/SpanActive';
import { Key, Store, User } from '../../types';

import copyAnimation from '../../data/copyAnimation.json';

import './KeyInfo.scss';

const KeyInfo = ({ paramId }: { paramId?: string }) => {
  const [key, setKey] = useState<Key>({
    accessUrl: '',
    id: '',
    name: '',
    isOpen: false,
  });

  const [usageData, setUsageData] = useState(' ... ');

  const { isAdmin, telegramId } = useSelector<Store, User>(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const { request, process, loading, errorText } = useHttp();

  const copyBtn = useRef<Player | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getKey() {
      const response = await request(`/api/getKey/${paramId}`);

      if (response) {
        setKey(response);
      }
    }

    async function getDataUsage() {
      const response = await request(`/api/getDataUsage/${paramId}`);

      if (response) {
        setUsageData(convertSize(response.bytes, { accuracy: 1 }));
      }
    }
    getKey();
    getDataUsage();
  }, []);

  const onClickCopy: React.MouseEventHandler<HTMLButtonElement> = () => {
    copyBtn.current?.play();
    navigator.clipboard.writeText(key.accessUrl);
  };

  const deleteKey = (id: string) => {
    if (window.confirm('Do you really want to delete Key?')) {
      request('/api/deleteKey', 'POST', { id })
        .then((response) => {
          response.telegramId === telegramId
            ? dispatch(setUser(response))
            : null;
          navigate('/keys-list/');
        })
        .catch((error) => {
          console.log(error);
        });
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

  return process === 'error' ? (
    <>
      <Error text={errorText}></Error>
    </>
  ) : loading ? (
    <Spiner />
  ) : (
    <div className='flex flex-col w-full'>
      <h1 className='title'>{key.name}</h1>

      <KeyInfoTable>
        <KeyInfoRow name='Status' onlyAdmin={false}>
          <SpanActive isOpen={key.isOpen} />
        </KeyInfoRow>

        <KeyInfoRow name='Owner' onlyAdmin={true}>
          <>
            {key.user?.name ? <p>{`Name: ${key.user?.name}`}</p> : null}
            {key.user?.lastname ? (
              <p>{`Lastname: ${key.user?.lastname}`}</p>
            ) : null}
            {key.user?.phone ? <p>{`Phone: ${key.user?.phone}`}</p> : null}
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
        </KeyInfoRow>

        {key.server ? (
          <KeyInfoRow name='Server' onlyAdmin={false}>
            <span>
              {`${key.server.name} (${key.server.country}) ${getUnicodeFlagIcon(
                key.server.abbreviatedCountry
              )}`}
            </span>
          </KeyInfoRow>
        ) : null}

        <KeyInfoRow name='Usage trafic (last 30 days)' onlyAdmin={false}>
          <>{usageData}</>
        </KeyInfoRow>

        {key.server ? (
          <KeyInfoRow name='Price' onlyAdmin={false}>
            <>{key.server.price} rub/mes</>
          </KeyInfoRow>
        ) : null}

        {key.lastPayment ? (
          <KeyInfoRow name='Last Payment' onlyAdmin={false}>
            <>{date.format(new Date(key.lastPayment), 'D MMMM YYYY') || ''}</>
          </KeyInfoRow>
        ) : null}

        {key.nextPayment ? (
          <KeyInfoRow name='Next Payment' onlyAdmin={false}>
            <>{date.format(new Date(key.nextPayment), 'D MMMM YYYY') || ''}</>
          </KeyInfoRow>
        ) : null}
      </KeyInfoTable>

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
        <button
          onClick={() => switchStatus(key.id)}
          className='btn w-full mb-5'
          disabled={loading ? true : false}
        >
          {key.isOpen ? 'Deactivate' : 'Activate'}
        </button>
      ) : null}

      <button
        onClick={() => console.log(key.id)}
        className='btn w-full mb-5'
        disabled={loading ? true : false}
      >
        Pay for Key
      </button>

      <button
        onClick={() => deleteKey(key.id)}
        className='btn w-full'
        disabled={loading ? true : false}
      >
        Delete Key
      </button>
    </div>
  );
};

export default KeyInfo;
