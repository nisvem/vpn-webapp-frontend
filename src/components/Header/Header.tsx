import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Store, User } from '../../types';

const Header = () => {
  const { isAdmin } = useSelector<Store, User>((state) => state.user);
  return (
    <header className='sticky w-full left-0 right-0 top-0 px-3 py-3 bg-accent bg-tg-theme-button  z-10'>
      <div className='flex justify-between m-auto w-full max-w-xl px-3'>
        {isAdmin ? (
          <>
            <Link
              to='/keys'
              className='text-center text-2xl font-bold text-accent-text text-tg-theme-button-text'
            >
              Keys List
            </Link>
            <Link
              to='/users'
              className='text-center text-2xl font-bold text-accent-text text-tg-theme-button-text'
            >
              Users List
            </Link>
          </>
        ) : (
          <>
            <Link
              to='/keys'
              className='text-center text-2xl font-bold text-accent-text text-tg-theme-button-text'
            >
              Keys List
            </Link>

            <Link
              to='/faq/'
              className='text-center text-2xl font-bold text-accent-text text-tg-theme-button-text'
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
