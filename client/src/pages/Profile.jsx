import { useContext, useEffect, useState } from 'react'
import Container from '../components/Container'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import ProfilePostList from '../components/Posts/ProfilePostList';
import ProfileSavedPostsList from '../components/Posts/ProfileSavedPostsList';
import Modal from '../components/Modal';
import PostFeed from '../components/Posts/PostFeed';

const Profile = () => {
  const { user, setUser, following } = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('posts');
  const [isOpenModal, toggle] = useState(false);
  const [editName, setEditName] = useState('');
  const [userImageUrl, setUserImageUrl] = useState(null);
  const [userImage, setUserImage] = useState(null);

  function handlOpenModal(bool) {
    toggle(bool);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    fetch(process.env.DOMAIN + '/api/getCurrentUser', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setEditName(data.user.name);
          setUser(data.user);
        } else {
          alert('To access PROFILE please LOG IN.');
          navigate('/');
        }
      })
      .catch(e => console.log(e));
  }

  async function editProfileHandler() {
    handlOpenModal(true);
  }

  function replaceUserImage(e) {
    const file = e.target.files[0];
    setUserImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setUserImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  async function onSaveProfileUpdate(e){
    e.preventDefault();

    const dataForm = new FormData();
    dataForm.append('file', userImage)
    dataForm.append('newName', editName)

    await fetch(process.env.DOMAIN + '/api/updateUserProfile', {
      method: 'POST',
      credentials: 'include',
      body: dataForm
    })
      .then(res => res.json())
      .then(data => {
        handlOpenModal(false);
        setUser(data);
        setUserImageUrl(null);
      })
      .catch(err => console.error(err));
  }

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
        <div onClick={editProfileHandler} className='cursor-pointer bg-white font-medium rounded-full py-2 px-6 text-gray-900'>Edit profile</div>
        <div className='flex gap-14 text-2xl mt-3'>
          <div className='cursor-pointer'>Followers {user?.followers.length ? user.followers.length : 0}</div>
          <div className='cursor-pointer'>Following {following.length?  new Set(following).size : 0}</div>
        </div>
      </div>
      <div className='grid grid-cols-2 border-t-2 border-white mt-6 pt-3'>
        <div onClick={() => setActiveTab('posts')} className={activeTab === 'posts' ? 'justify-self-center cursor-pointer font-semibold' : 'justify-self-center cursor-pointer'}>POSTS</div>
        <div onClick={() => setActiveTab('saved')} className={activeTab === 'saved' ? 'justify-self-center cursor-pointer font-semibold' : 'justify-self-center cursor-pointer'}>SAVED</div>
        <div className={activeTab === 'posts' ? 'col-span-2' : 'col-span-2 hidden'}><ProfilePostList /></div>
        <div className={activeTab === 'saved' ? 'col-span-2' : 'col-span-2 hidden'}><ProfileSavedPostsList /> </div>
      </div>
      <Modal isOpenModal={isOpenModal} handleClose={() => handlOpenModal(false)}>
        <PostFeed />
      </Modal>
    </Container>
  )
}

export default Profile