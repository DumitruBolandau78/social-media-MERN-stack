import { useContext, useEffect, useState } from 'react'
import Container from '../components/Container'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import ProfilePostList from '../components/Posts/ProfilePostList';
import ProfileSavedPostsList from '../components/Posts/ProfileSavedPostsList';
import Modal from '../components/Modal';

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
          <img className='w-[150px] h-[150px]' src={user?.avatarUrl} alt="user avatar" />
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
        <div className='min-w-[700px] max-w-[700px] text-gray-900 h-[65vh] min-h-[65vh] flex flex-col items-center justify-center gap-10'>
          <h2 className="font-medium text-center text-xl ">Edit profile {user?.username}</h2>
          <div className='flex flex-col items-center mt-6 gap-10'>
            <label className='rounded-full shadow-lg overflow-hidden cursor-pointer w-[150px] h-[150px]' title='Change image'>
              <img className='object-center object-cover w-[150px] h-[150px]' src={userImageUrl ? userImageUrl : user?.avatarUrl} alt="user avatar" />
              <input accept='image/*' onChange={replaceUserImage} type="file" className='hidden' />
            </label>
            <div className='flex justify-center items-center gap-6'>
              <span className='font-normal text-2xl'>Name:</span> <input className='px-2 text-lg py-1' style={{ border: '1px solid #212121', fontWeight: 'medium' }} type="text" placeholder='Insert your new name' value={editName} onChange={e => setEditName(e.target.value)} />
            </div>
          </div>
          <div className='flex justify-center gap-5'>
            <button onClick={onSaveProfileUpdate} className='bg-gray-900 text-white px-10 py-3 font-normal'>Save</button>
          </div>
        </div>
      </Modal>
    </Container>
  )
}

export default Profile