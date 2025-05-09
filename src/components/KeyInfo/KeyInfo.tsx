import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Player } from '@lottiefiles/react-lottie-player';
import { useHttp } from '../../hooks/http.hook';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import date from 'date-and-time';
import convertSize from 'convert-size';

import { InfoTable, InfoRow } from '../InfoTable/InfoTable';

import Error from '../Error/Error';
import SpanActive from '../SpanActive/SpanActive';
import { Key, Store, User } from '../../types';

import copyAnimation from '../../data/copyAnimation.json';

import './KeyInfo.scss';
import { setUser } from '../../reducers/user';
import i18next from '../../lang';

const KeyInfo = ({ data }: { data: Key }) => {
  const [key, setKey] = useState<Key>(data);
  const [usageData, setUsageData] = useState(' ... ');
  const [isDeleted, setIsDeleted] = useState(false);

  const { isAdmin, telegramId } = useSelector<Store, User>(
    (state) => state.user
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (isDeleted) {
      navigate(-1);
    }
  }, [isDeleted]);

  const onClickCopy: React.MouseEventHandler<HTMLButtonElement> = () => {
    copyBtn.current?.play();
    navigator.clipboard.writeText(key.accessUrl);
  };

  const deleteKey = async (id: string) => {
    if (window.confirm(i18next.t('confirm_delete_key'))) {
      try {
        const response = await request('/api/deleteKey', 'POST', { id });

        response.telegramId === telegramId ? dispatch(setUser(response)) : null;

        setIsDeleted(true);
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

  return process === 'error' ? (
    <Error text={errorText}></Error>
  ) : (
    <div className='flex flex-col w-full h-full'>
      {isAdmin ? (
        <h1 className='title'>
          {`${key.name} (${
            key.user?.username ? '@' + key.user?.username : key.user?.telegramId
          })`}
        </h1>
      ) : (
        <h1 className='title'>{key.name}</h1>
      )}

      <InfoTable className='mb-5'>
        <InfoRow name={i18next.t('status')} onlyAdmin={false}>
          <SpanActive isOpen={key.isOpen} />
        </InfoRow>

        <InfoRow name={i18next.t('owner')} onlyAdmin={true}>
          <>
            {key.user?.name && <p>{`Name: ${key.user?.name}`}</p>}
            {key.user?.surname && <p>{`Lastname: ${key.user?.surname}`}</p>}
            {key.user?.telegramId && (
              <p>{`TelegramId: ${key.user?.telegramId}`}</p>
            )}
            {key.user?.phoneNumber && (
              <p>
                {`${i18next.t('phone')}: `}
                <a
                  href={`https://t.me/+${key.user?.phoneNumber}`}
                  target='_blank'
                >{`+${key.user?.phoneNumber}`}</a>
              </p>
            )}
            {key.user?.username && (
              <p>
                <a
                  href={`https://t.me/${key.user?.username}`}
                  target='_blank'
                >{`@${key.user?.username}`}</a>
              </p>
            )}
          </>
        </InfoRow>

        {key.server ? (
          <InfoRow name={i18next.t('server')} onlyAdmin={false}>
            <span>
              {`${key.server.name} (${key.server.country}) ${getUnicodeFlagIcon(
                key.server.abbreviatedCountry
              )}`}
            </span>
          </InfoRow>
        ) : null}

        <InfoRow name='ID in Outline:' onlyAdmin={true}>
          <span>{key.id}</span>
        </InfoRow>

        {key.portForKey && (
          <InfoRow name='Port:' onlyAdmin={true}>
            <span>{key.portForKey}</span>
          </InfoRow>
        )}

        <InfoRow name={i18next.t('usage_trafic')} onlyAdmin={false}>
          <span>{usageData}</span>
        </InfoRow>

        {key.currentPrice ? (
          <InfoRow name={i18next.t('price')} onlyAdmin={false}>
            <>
              {key.currentPrice} {i18next.t('rub-30-days')}
            </>
          </InfoRow>
        ) : null}

        {key.dateOfCreated ? (
          <InfoRow name={i18next.t('created_key')} onlyAdmin={true}>
            <span>
              {date.format(new Date(key.dateOfCreated), 'D/MM/YYYY') || ''}
            </span>
          </InfoRow>
        ) : null}

        {key.lastPayment ? (
          <InfoRow name={i18next.t('last_payment')} onlyAdmin={false}>
            <span>
              {date.format(new Date(key.lastPayment), 'D/MM/YYYY') || ''}
            </span>
          </InfoRow>
        ) : null}

        {key.nextPayment ? (
          <InfoRow name={i18next.t('next_payment')} onlyAdmin={false}>
            <span>
              {date.format(new Date(key.nextPayment), 'D/MM/YYYY') || ''}
            </span>
          </InfoRow>
        ) : null}
      </InfoTable>

      {key.isOpen ? (
        <div className='key-place'>
          <p className='key-place__text'>
            <span className='text-md font-bold'>
              {i18next.t('access_key')}:{' '}
            </span>
            {key.accessUrl}
          </p>
          <button className='key-place__btn-copy' onClick={onClickCopy}>
            <Player ref={copyBtn} src={copyAnimation}></Player>
          </button>
        </div>
      ) : (
        <div className='key-place'>
          <p className='key-place__text'>
            <span className='text-md font-bold'>
              {i18next.t('access_key')}:{' '}
            </span>
            <span>{i18next.t('view_access_key')}</span>
          </p>
        </div>
      )}

      {isAdmin ? (
        <>
          <button
            onClick={() => switchStatus(key._id)}
            disabled={loading}
            className='btn w-full mb-3 mt-auto'
          >
            {key.isOpen ? i18next.t('deactivate') : i18next.t('activate')}
          </button>
          {key.user?.telegramId && (
            <button
              onClick={() => navigate(`/users/${key.user?.telegramId}`)}
              disabled={loading}
              className='btn w-full mb-3'
            >
              {i18next.t('go_user_btn')}
            </button>
          )}
          <button
            onClick={() => navigate(`/edit-key/${key._id}`)}
            disabled={loading}
            className='btn w-full mb-3'
          >
            {i18next.t('edit_key_btn')}
          </button>
        </>
      ) : null}

      <button
        onClick={() => navigate(`/payment/${key._id}`)}
        disabled={loading}
        className='btn w-full mb-3'
      >
        {i18next.t('pay_key_btn')}
      </button>

      <button
        onClick={() => deleteKey(key._id)}
        disabled={loading}
        className='btn w-full mt-auto'
      >
        {i18next.t('delete_key_btn')}
      </button>
    </div>
  );
};

export default KeyInfo;
