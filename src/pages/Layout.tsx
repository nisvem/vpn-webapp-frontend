import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import WebApp from '@twa-dev/sdk';

const Layout = () => {
  WebApp.setHeaderColor(WebApp.themeParams.header_bg_color);

  return (
    <div className='w-full flex flex-col items-start flex-1'>
      <Header />
      <div className='max-w-xl mx-auto p-3 w-full flex flex-col items-start flex-1 relative'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
