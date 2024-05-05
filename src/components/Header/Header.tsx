import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='sticky w-full left-0 right-0 top-0 px-3 py-3 bg-accent  z-10'>
      <div className='flex justify-between m-auto w-full max-w-xl px-3'>
        <Link
          to='/'
          className='text-center text-2xl font-bold text-accent-text'
        >
          Keys List
        </Link>

        <Link
          to='/faq/'
          className='text-center text-2xl font-bold text-accent-text'
        >
          FAQ
        </Link>
      </div>
    </header>
  );
};

export default Header;
