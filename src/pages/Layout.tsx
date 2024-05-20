import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const Layout = () => {
  return (
    <div className='w-full flex flex-col items-start flex-1'>
      <ScrollToTop />
      <Header />
      <div className='max-w-xl mx-auto p-3 w-full flex flex-col items-start flex-1 relative'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
