import Aside from '../components/Aside';
import Header from '../components/navigation/Header'
import { Outlet } from 'react-router-dom'
import RightSide from '../components/RightSide';

const Layout = () => {
  return (
    <>
      <Header />
      <div className='flex'>
        <div className="container grid grid-cols-5 ">
          <Aside />
          <Outlet />
          <RightSide />
        </div>
      </div>

      
    </>
  )
}

export default Layout;