import { User } from '../../types';
import UserItem from '../UserItem/UserItem';

const UsersList = ({ users }: { users: User[] }) => {
  const newUsers = users.sort((a: User, b: User) => {
    return (
      new Date(b.lastViewedApp || 0).getTime() -
      new Date(a.lastViewedApp || 0).getTime()
    );
  });

  return (
    <div className='w-full grid grid-cols-1 grid-flow-row gap-3 mb-7 '>
      {newUsers.length > 0 ? (
        <>
          <p className='text-right text-xs'>Users: {`${newUsers.length}`}</p>
          {newUsers.map((item, i) => (
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
