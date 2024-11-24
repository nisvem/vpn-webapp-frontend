import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useHttp } from '../../hooks/http.hook';

import date from 'date-and-time';

import { InfoTable, InfoRow } from '../InfoTable/InfoTable';

import Error from '../Error/Error';
import { Store, User } from '../../types';

import KeyItem from '../KeyItem/KeyItem';
import i18next from '../../lang';

const UserInfo = ({ user }: { user: User }) => {
  const { isAdmin } = useSelector<Store, User>((state) => state.user);
  const navigate = useNavigate();

  const { process, loading, errorText } = useHttp();

  useEffect(() => {
    !isAdmin && navigate('/');
  }, []);

  const deleteUser = async () => {
    if (isAdmin && window.confirm(i18next.t('confirm_delete_user'))) {
      // navigate(`/editUser/${user.telegramId}`);
      // WebApp.showScanQrPopup({ text: 'asd' }, (text) => {
      //   console.log(text);
      // });
    }
  };

  return process === 'error' ? (
    <>
      <Error text={errorText}></Error>
    </>
  ) : (
    <div className='flex flex-col w-full h-full'>
      <h1 className='title'>
        {' '}
        - {user.username ? '@' + user.username : user.telegramId} -{' '}
      </h1>

      <InfoTable>
        <InfoRow name={i18next.t('name')} onlyAdmin={true}>
          <p>
            {user.name} {user.surname || ''}
          </p>
        </InfoRow>
        {user?.username && (
          <InfoRow name={i18next.t('nickname')} onlyAdmin={true}>
            <a
              href={`https://t.me/${user?.username}`}
              target='_blank'
            >{`@${user?.username}`}</a>
          </InfoRow>
        )}
        {user?.phoneNumber && (
          <InfoRow name={i18next.t('phone')} onlyAdmin={true}>
            <a
              href={`https://t.me/+${user?.phoneNumber}`}
              target='_blank'
            >{` +${user?.phoneNumber}`}</a>
          </InfoRow>
        )}
        <InfoRow name='TelegramId' onlyAdmin={true}>
          <p>{user.telegramId}</p>
        </InfoRow>
        <InfoRow name={i18next.t('admin')} onlyAdmin={true}>
          <p>{user.isAdmin ? i18next.t('yes') : i18next.t('no')}</p>
        </InfoRow>
        <InfoRow name={i18next.t('limited_create')} onlyAdmin={true}>
          <p>{user.isLimitedToCreate ? i18next.t('yes') : i18next.t('no')}</p>
        </InfoRow>
        <InfoRow name={i18next.t('keys')} onlyAdmin={true}>
          <p>
            {user.keys.length} / {user.maxKeyAvalible}
          </p>
        </InfoRow>

        {user.lastViewedApp && (
          <InfoRow name={i18next.t('login_date')} onlyAdmin={true}>
            <>
              {date.format(new Date(user.lastViewedApp), 'D/MM/YYYY HH:mm') ||
                ''}
            </>
          </InfoRow>
        )}

        {user.dateOfCreateUser && (
          <InfoRow name={i18next.t('created_user')} onlyAdmin={true}>
            <>
              {date.format(
                new Date(user.dateOfCreateUser),
                'D/MM/YYYY HH:mm'
              ) || ''}
            </>
          </InfoRow>
        )}
      </InfoTable>

      <div className='w-full grid grid-cols-1 grid-flow-row gap-3 mb-7 mt-5'>
        <h2>{i18next.t('keys')}:</h2>
        {user.keys.length > 0 ? (
          user.keys.map((item, i) => <KeyItem key={i} data={item} />)
        ) : (
          <p className='text-center'>{i18next.t('keys_empty')}</p>
        )}
      </div>
      <button
        onClick={() => navigate(`/edit-user/${user.telegramId}`)}
        disabled={loading}
        className='btn w-full mb-3'
      >
        {i18next.t('edit_user_btn')}
      </button>
      <button
        onClick={() => deleteUser()}
        disabled={loading}
        className='btn w-full'
      >
        {i18next.t('delete_user_btn')}
      </button>
    </div>
  );
};

export default UserInfo;
