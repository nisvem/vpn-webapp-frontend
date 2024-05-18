import { Link } from 'react-router-dom';
import { User } from '../../types';

import './UserItem.scss';

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
      <p className='text-sm'>Keys: {`${data.keys.length}`}</p>
    </Link>
  );
};

export default UserItem;
