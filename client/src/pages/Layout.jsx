import Aside from '../components/Aside';
import Header from '../components/Navigation1/Header'
import { Outlet } from 'react-router-dom'
import RightSide from '../components/RightSide';

const Layout = () => {
  return (
    <>
      <div className='flex'>
        <Header />
        <div className="grid grid-cols-12 w-full mt-[100px]">
          <div className='col-span-2'></div>
          <Outlet />
          <div className='col-span-3'></div>
        </div>
        <div className="fixed top-0 left-0 w-full grid grid-cols-12 mt-[100px]">
          <Aside />
          <div className='col-span-7 relative -z-50'></div>
          <RightSide />
        </div>
      </div>
    </>
  )
}

export default Layout;