import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

function Layout() {
  return (
    <div className='min-h-screen w-full flex flex-col items-start bg-background flex-1'>
      <Header />
      <div className='max-w-xl min-h-full mx-auto p-5 w-full flex flex-col items-start flex-1'>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
