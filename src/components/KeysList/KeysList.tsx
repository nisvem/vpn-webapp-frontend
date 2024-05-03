import KeyItem from '../KeyItem/KeyItem';

import { Key } from '../../types';

const KeysList = ({ keys }: { keys: Key[] }) => {
  return (
    <div className='w-full grid grid-cols-1 grid-flow-row gap-3 mt-3 mb-7 '>
      {keys.length > 0 ? (
        keys.map((item, i) => <KeyItem key={i} data={item} />)
      ) : (
        <p className='text-center'>No keys</p>
      )}
    </div>
  );
};

export default KeysList;
