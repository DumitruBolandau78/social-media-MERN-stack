import { useContext } from 'react'
import Container from '../components/Container'
import { UserContext } from '../context/UserContext';
import { domain } from '../utils/variables';

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <Container>
      <div className=''>
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

      </div>
    </Container>
  )
}

export default Profile