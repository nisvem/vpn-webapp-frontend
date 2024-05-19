import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Store, User } from '../../types';

const Header = () => {
  const { isAdmin } = useSelector<Store, User>((state) => state.user);
  return (
    <header className='sticky w-full left-0 right-0 top-0 z-10 px-2'>
      <div className='flex justify-between m-auto w-full max-w-xl px-3 py-2 bg-accent bg-tg-theme-button rounded-xl'>
        {isAdmin ? (
          <>
            <Link
              to='/keys'
              className='text-center text-xl font-normal text-accent-text text-tg-theme-button-text'
            >
              Keys List
            </Link>
            <Link
              to='/users'
              className='text-center text-xl font-normal text-accent-text text-tg-theme-button-text'
            >
              Users List
            </Link>
          </>
        ) : (
          <>
            <Link
              to='/keys'
              className='text-center text-xl font-normal text-accent-text text-tg-theme-button-text'
            >
              Keys List
            </Link>

            <Link
              to='/faq/'
              className='text-center text-xl font-normal text-accent-text text-tg-theme-button-text'
            >
              FAQ
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
