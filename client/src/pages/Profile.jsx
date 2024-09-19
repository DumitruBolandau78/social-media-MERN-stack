import { useContext, useEffect } from 'react'
import Container from '../components/Container'
import { UserContext } from '../context/UserContext';
import { domain } from '../utils/variables';
import { useLocation, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(location.pathname === '/profile'){
      if(!user){
        alert('To access PROFILE please LOG IN.');
        navigate('/');
      }
    }
  }, []);

  return (
    <Container>
      <div className='text-center flex flex-col items-center'>
        <div className='rounded-full bg-white p-3 overflow-hidden border-4 border-gray-300'>
          <img className='max-w-[150px] w-full' src={domain + user?.avatarUrl} alt="user avatar" />
        </div>
        <div className='my-4'>
          <div>{user?.name}</div>
          <div>@{user?.username}</div>
        </div>
        <div className='cursor-pointer bg-white font-medium rounded-full py-2 px-6 text-gray-900'>Edit profile</div>
        <div className='flex gap-14 text-2xl mt-3'>
          <div className='cursor-pointer'>Followers 0 {user?.followersCount}</div>
          <div className='cursor-pointer'>Following 0 {user?.followingCount}</div>
        </div>
      </div>
      <div className='grid grid-cols-2 border-t-2 border-white mt-6 pt-3'>
        <div className='justify-self-center'>POSTS</div>
        <div className='justify-self-center'>SAVED</div>

      </div>
    </Container>
  )
}

export default Profile