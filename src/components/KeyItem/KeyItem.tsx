import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import date from 'date-and-time';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';

import SpanActive from '../SpanActive/SpanActive';

import { Key, Store, User } from '../../types';

import './KeyItem.scss';

const KeyItem = ({ data }: { data: Key }) => {
  const { isAdmin } = useSelector<Store, User>((state) => state.user);

  return (
    <Link
      to={`/keys/${data._id}`}
      className={`key-item ${data.isOpen ? 'bg-unlock' : 'bg-lock'}`}
    >
      {isAdmin ? (
        <p className='text-md mb-2'>{`${data.name} (${
          data.user?.username
            ? '@' + data.user?.username
            : data.user?.telegramId
        })`}</p>
      ) : (
        <p className='text-xl mb-2'>{data.name}</p>
      )}

      {data.nextPayment && (
        <p className='text-xs mb-1 text-color-text text-tg-theme-hint'>
          Next payment: {date.format(new Date(data.nextPayment), 'D MMMM YYYY')}
        </p>
      )}
      {data.server ? (
        <p className='text-xs mb-2 text-color-text text-tg-theme-hint'>
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
