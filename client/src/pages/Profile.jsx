import { useContext, useEffect, useState } from 'react'
import Container from '../components/Container'
import { UserContext } from '../context/UserContext';
import { domain } from '../utils/variables';
import { useNavigate } from 'react-router-dom';
import ProfilePostList from '../components/Posts/ProfilePostList';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    fetch(domain + '/api/getCurrentUser', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        } else {
          alert('To access PROFILE please LOG IN.');
          navigate('/');
        }
      })
      .catch(e => console.log(e));
  }

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
        <div onClick={() => setActiveTab('posts')} className={activeTab === 'posts'? 'justify-self-center cursor-pointer font-semibold' : 'justify-self-center cursor-pointer'}>POSTS</div>
        <div onClick={() => setActiveTab('saved')} className={activeTab === 'saved'? 'justify-self-center cursor-pointer font-semibold' : 'justify-self-center cursor-pointer'}>SAVED</div>
        <div className={activeTab === 'posts'? 'col-span-2' : 'col-span-2 hidden'}><ProfilePostList /></div>
        <div className={activeTab === 'saved'? 'col-span-2' : 'col-span-2 hidden'}><div></div> </div>
      </div>
    </Container>
  )
}

export default Profile