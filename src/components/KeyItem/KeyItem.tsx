import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import getUnicodeFlagIcon from 'country-flag-icons/unicode';

import SpanActive from '../SpanActive/SpanActive';

import { Key, Store, User } from '../../types';

import './KeyItem.scss';

const KeyItem = ({ data }: { data: Key }) => {
  const { isAdmin } = useSelector<Store, User>((state) => state.user);

  return (
    <Link
      to={`/key/${data.id}/`}
      className={`key-item ${data.isOpen ? 'bg-unlock' : 'bg-lock'}`}
    >
      <p className='text-xl mb-2'>{data.name}</p>
      {isAdmin ? (
        <p className='text-xs mb-2'>
          {`${data.user?.name ? data.user?.name : ''} ${
            data.user?.lastname ? data.user?.username : ''
          } / @${data.user?.username} (${data.user?.telegramId})`}
        </p>
      ) : null}
      {data.server ? (
        <p className='text-xs mb-2 text-accent-text'>
          {`${data.server.name} (${data.server.country}) ${getUnicodeFlagIcon(
            data.server.abbreviatedCountry
          )}`}
        </p>
      ) : null}
      <SpanActive isOpen={data.isOpen} />
    </Link>
  );
};

export default KeyItem;
