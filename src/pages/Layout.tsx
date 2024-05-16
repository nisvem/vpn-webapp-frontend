import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

const Layout = () => {
  return (
    <div className='min-h-full w-full flex flex-col items-start bg-background bg-tg-theme-secondary-bg flex-1'>
      <Header />
      <div className='max-w-xl min-h-full mx-auto p-4 w-full flex flex-col items-start flex-1'>
        {/* <Breadcrumbs /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
