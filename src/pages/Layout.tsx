import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

const Layout = () => {
  return (
    <div className='w-full flex flex-col items-start bg-background bg-tg-theme-bg flex-1'>
      <Header />
      <div className='max-w-xl mx-auto p-4 w-full flex flex-col items-start flex-1 relative'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
