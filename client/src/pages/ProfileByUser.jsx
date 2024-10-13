import { useEffect, useState } from 'react';
import Container from '../components/Container';
import { useParams } from 'react-router-dom';

const ProfileByUser = () => {
  const usernameParam = useParams();
  const [user, setUser] = useState([]);

  async function fetchUserByUsername() {
    const response = await fetch(process.env.DOMAIN + '/api/fetchUserByUsername?username=' + usernameParam.username);
    const data = await response.json();

    console.log(data);
    setUser(data);
  }

  useEffect(() => {
   fetchUserByUsername();
  }, [usernameParam]);

  return (
    <Container>
      <div className='text-center flex flex-col items-center'>
        <div className='rounded-full bg-white overflow-hidden border-4 border-gray-300'>
          <img className='w-[150px] h-[150px]' src={process.env.DOMAIN + user?.avatarUrl} alt="user avatar" />
        </div>
        <div className='my-4'>
          <div>{user?.name}</div>
          <div>@{user?.username}</div>
        </div>
        <div className='flex gap-14 text-2xl mt-3'>
          <div className='cursor-pointer'>Followers {user?.followers?.length ? user.followers.length : 0}</div>
          <div className='cursor-pointer'>Following {user?.following?.length ? new Set(user?.following).size : 0}</div>
        </div>
      </div>
      <div className='border-t-2 border-white mt-6 pt-3'>
        <div className='text-center font-medium text-xl'>{user?.name} Posts</div>
        <div></div>
      </div>
    </Container>
  )
}

export default ProfileByUser;