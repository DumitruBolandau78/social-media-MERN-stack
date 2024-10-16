import { useContext, useState } from "react";
import { UserContext } from '../../context/UserContext.jsx';
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal.jsx";


const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const [isOpenModal, toggle] = useState(false);
  const navigate = useNavigate();

  async function logoutHandler() {
    await fetch(process.env.DOMAIN + '/api/logout', {
      method: 'POST',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.message){
          setUser(null);
          toggle(false);
          navigate('/');
        }
      })
      .catch(err => console.error(err));
  }

  function handlOpenModal(bool) {
    toggle(bool);
  }

  return (
    <header className='flex py-4 w-full justify-between items-center h-[80px] mb-6 px-7 bg-[#222831] border-b-[1px] border-gray-600 fixed z-20'>
      <Link to={'/'} className="icon">
        <svg className='max-w-10 h-10 fill-red-600' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" /></svg>
      </Link>
      <form className="search flex gap-3">
        <input placeholder="Search a friend..." className='min-w-[600px] py-1 px-3 text-xl' type="text" name="search" id="" />
        <button type='submit'><svg className='max-w-7 h-7 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg></button>
      </form>
      <div>
        {user ?
          <div onClick={() => handlOpenModal(true)} className="w-[40px] h-[40px] cursor-pointer text-white text-2xl border-b pb-1">
            <img className="w-[40px] h-[40px] rounded-full bg-white w-full border-2" src={process.env.DOMAIN + user.avatarUrl} alt="user avatar" />
          </div>
          :
          <Link to={'/account/login'} className="flex items-center gap-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            LOGIN
          </Link>}
      </div>
      <Modal isOpenModal={isOpenModal} handleClose={() => handlOpenModal(false)}>
        <div className="user-img text-center">
          <img className="max-w-[300px] w-full object-cover object-center rounded-full" style={{border: '2px solid red'}} src={process.env.DOMAIN + user?.avatarUrl} alt="avatar user" />
          <div className="name mt-3 font-medium">{user?.name}</div>
          <div className="username">@{user?.username}</div>
        </div>
        <div className="h-full w-full flex justify-center items-center gap-5 mt-7">
          <button onClick={logoutHandler} className="bg-gray-900 text-white rounded-full py-2 px-6 text-2xl pb-3">Logout</button>
          <Link onClick={() => handlOpenModal(false)} className="bg-gray-900 text-white rounded-full py-2 px-6 text-2xl pb-3" to={'/profile'}>My Profile</Link>
        </div>
      </Modal>
    </header>
  )
}

export default Header