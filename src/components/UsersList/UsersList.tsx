import { useEffect, useState } from 'react';
import i18next from '../../lang';
import { User } from '../../types';
import UserItem from '../UserItem/UserItem';

const UsersList = ({ users }: { users: User[] }) => {
  const [sortedUsers, setSortedUsers] = useState(users);
  const [, setDirectionOfSort] = useState(false);
  const [currentSort, setCurrentSort] = useState('');

  const sortByName = () => {
    const nameOfSort = 'name';

    setDirectionOfSort((prevDirection) => {
      const newDirection = currentSort === nameOfSort ? !prevDirection : true;
      setCurrentSort(nameOfSort);

      const sorted = [...users].sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        return nameB.localeCompare(nameA) * (newDirection ? -1 : 1);
      });

      setSortedUsers(sorted);
      return newDirection;
    });
  };

  const sortByKeys = () => {
    const nameOfSort = 'keys';

    setDirectionOfSort((prevDirection) => {
      const newDirection = currentSort === nameOfSort ? !prevDirection : true;
      setCurrentSort(nameOfSort);

      const sorted = [...users].sort((a, b) => {
        return (a.keys.length - b.keys.length) * (newDirection ? -1 : 1);
      });

      setSortedUsers(sorted);
      return newDirection;
    });
  };

  useEffect(() => {
    sortByName();
  }, []);

  return (
    <div className='w-full h-full grid grid-cols-1 grid-flow-row gap-3 mb-7 '>
      <div className='w-full flex flex-row items-center gap-3'>
        <button
          onClick={sortByName}
          className={`${currentSort === 'name' ? 'underline' : ''}`}
        >
          By name
        </button>
        <button
          onClick={sortByKeys}
          className={`${currentSort === 'keys' ? 'underline' : ''}`}
        >
          By keys
        </button>
      </div>

      {sortedUsers.length > 0 ? (
        <>
          <p className='text-right text-xs'>
            {i18next.t('users')}: {`${sortedUsers.length}`}
          </p>
          {sortedUsers.map((item, i) => (
            <UserItem key={i} data={item} />
          ))}
        </>
      ) : (
        <p className='text-center'>{i18next.t('users_empty')}</p>
      )}
    </div>
  );
};

export default UsersList;
