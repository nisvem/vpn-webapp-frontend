import { Link } from 'react-router-dom';
import { User } from '../../types';

import './UserItem.scss';
import i18next from '../../lang';

const UserItem = ({ data }: { data: User }) => {
  console.log();
  return (
    <Link to={`/users/${data.telegramId}`} className='user-item'>
      <p className='text-xl col-span-2'>{`${data.name} ${
        data.surname || ''
      } `}</p>
      <p className='text-sm'>{`${
        data.username ? '@' + data.username + ' / ' : ''
      } ${data.telegramId}`}</p>
      <p className='text-sm'>
        {i18next.t('keys')}: {`${data.keys.length}`}
      </p>
    </Link>
  );
};

export default UserItem;
