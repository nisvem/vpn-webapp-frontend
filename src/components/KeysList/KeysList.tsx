import { useSelector } from 'react-redux';
import KeyItem from '../KeyItem/KeyItem';

import { Key, Store, User } from '../../types';
import i18next from '../../lang';

const KeysList = ({ keys }: { keys: Key[] }) => {
  const { isAdmin } = useSelector<Store, User>((state) => state.user);

  const newKeys =
    keys?.length > 0
      ? keys.sort((a: Key, b: Key) => {
          return (
            new Date(a.nextPayment || 0).getTime() -
            new Date(b.nextPayment || 0).getTime()
          );
        })
      : [];

  return (
    <div className='w-full grid grid-cols-1 grid-flow-row gap-3 mb-16 relative z-0'>
      {newKeys.length > 0 ? (
        <>
          {isAdmin && (
            <p className='text-center text-xs'>
              {i18next.t('keys')}: {`${newKeys.length}`}
            </p>
          )}
          {newKeys.map((item, i) => (
            <KeyItem key={i} data={item} />
          ))}
        </>
      ) : (
        <p className='text-center'>{i18next.t('keys_empty')}</p>
      )}
    </div>
  );
};

export default KeysList;
