import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useHttp } from '../../hooks/http.hook';

import date from 'date-and-time';

import { InfoTable, InfoRow } from '../InfoTable/InfoTable';

import Error from '../Error/Error';
import { Store, User } from '../../types';

import KeyItem from '../KeyItem/KeyItem';
import WebApp from '@twa-dev/sdk';

const UserInfo = ({ user }: { user: User }) => {
  const { isAdmin } = useSelector<Store, User>((state) => state.user);
  const navigate = useNavigate();

  const { process, loading, errorText } = useHttp();

  useEffect(() => {
    !isAdmin && navigate('/');
  }, []);

  const deleteUser = async () => {
    if (isAdmin && window.confirm('Do you really want to delete user?')) {
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
        <InfoRow name='Name' onlyAdmin={true}>
          <p>
            {user.name} {user.surname || ''}
          </p>
        </InfoRow>
        {user?.username && (
          <InfoRow name='Nickname' onlyAdmin={true}>
            <a
              href={`https://t.me/${user?.username}`}
              target='_blank'
            >{`@${user?.username}`}</a>
          </InfoRow>
        )}
        {user?.phoneNumber && (
          <InfoRow name='Phone' onlyAdmin={true}>
            <a
              href={`https://t.me/+${user?.phoneNumber}`}
              target='_blank'
            >{` +${user?.phoneNumber}`}</a>
          </InfoRow>
        )}
        <InfoRow name='TelegramId' onlyAdmin={true}>
          <p
            onClick={() => {
              WebApp.requestContact();
            }}
          >
            {user.telegramId}
          </p>
        </InfoRow>
        <InfoRow name='Admin' onlyAdmin={true}>
          <p>{user.isAdmin ? 'Yes' : 'No'}</p>
        </InfoRow>
        <InfoRow name='Limited to create' onlyAdmin={true}>
          <p>{user.isLimitedToCreate ? 'Yes' : 'No'}</p>
        </InfoRow>
        <InfoRow name='Keys' onlyAdmin={true}>
          <p>
            {user.keys.length} / {user.maxKeyAvalible}
          </p>
        </InfoRow>

        {user.lastViewedApp && (
          <InfoRow name='Last logged in the app' onlyAdmin={true}>
            <>
              {date.format(new Date(user.lastViewedApp), 'D/MMMM/YYYY HH:mm') ||
                ''}
            </>
          </InfoRow>
        )}

        {user.dateOfCreateUser && (
          <InfoRow name='Created the user' onlyAdmin={true}>
            <>
              {date.format(
                new Date(user.dateOfCreateUser),
                'D/MMMM/YYYY HH:mm'
              ) || ''}
            </>
          </InfoRow>
        )}
      </InfoTable>

      <div className='w-full grid grid-cols-1 grid-flow-row gap-3 mb-7 mt-5'>
        <h2>Keys:</h2>
        {user.keys.length > 0 ? (
          user.keys.map((item, i) => <KeyItem key={i} data={item} />)
        ) : (
          <p className='text-center'>There aren't keys</p>
        )}
      </div>
      <button
        onClick={() => navigate(`/edit-user/${user.telegramId}`)}
        disabled={loading}
        className='btn w-full mb-3'
      >
        Edit user
      </button>
      <button
        onClick={() => deleteUser()}
        disabled={loading}
        className='btn w-full'
      >
        Delete user
      </button>
    </div>
  );
};

export default UserInfo;
