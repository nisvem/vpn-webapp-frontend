import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';

const Layout = () => {
  return (
    <div className='min-h-screen w-full flex flex-col items-start bg-background flex-1'>
      <Header />
      <div className='max-w-xl min-h-full mx-auto p-4 w-full flex flex-col items-start flex-1'>
        {/* <Breadcrumbs /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
