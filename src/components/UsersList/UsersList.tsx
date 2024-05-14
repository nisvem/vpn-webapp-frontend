import { useEffect } from 'react';
import { User } from '../../types';
import UserItem from '../UserItem/UserItem';

const UsersList = ({ users }: { users: User[] }) => {
  useEffect(() => {
    users.sort((user) => Number(user.lastViewedApp));
  }, []);

  return (
    <div className='w-full grid grid-cols-1 grid-flow-row gap-3 mb-7 '>
      {users.length > 0 ? (
        <>
          <p className='text-right text-xs'>Users: {`${users.length}`}</p>
          {users.map((item, i) => (
            <UserItem key={i} data={item} />
          ))}
        </>
      ) : (
        <p className='text-center'>There aren't users</p>
      )}
    </div>
  );
};

export default UsersList;
