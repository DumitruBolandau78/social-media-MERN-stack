import { useContext, useEffect, useState } from 'react'
import Notification from '../components/Notification';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Container from '../components/Container';
import Modal from '../components/Modal';
import useDateFormat from '../hooks/useDateFormat';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpenModal, toggle] = useState(false);

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [description, setDescription] = useState('');
  const [imgUrl, setPostImgUrl] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);

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
          setUser(data.user);
        } else {
          alert('To access PROFILE please LOG IN.');
          navigate('/');
        }
      })
      .catch(e => console.log(e));
  }

  async function getNotifications() {
    await fetch(process.env.DOMAIN + '/api/getNotifications', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.notifications) setNotifications(data.notifications);
      }).catch(err => console.log(err));
  }

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <Container>
      <div className='p-4 text-white'>{notifications.length ? notifications.map(n => <Notification setCreatedAt={setCreatedAt} setPostImgUrl={setPostImgUrl} setDescription={setDescription} handlOpenModal={handlOpenModal} createdAt={n.createdAt} message={n.message} postInfo={n.post} userInfo={n.user} key={n._id} />) : <div className=''>You do not have notifications yet.</div>}</div>
      <Modal isOpenModal={isOpenModal} handleClose={() => handlOpenModal(false)}>
        <div className='shadow-lg bg-white text-gray-900 rounded-md p-2 min-w-[700px] max-w-[700px] h-[65vh] min-h-[65vh] overflow-scroll'>
          <div className='font-medium'>Posted on {useDateFormat(createdAt)}</div>
          <div className='my-5'>{description}</div>
          <div><img className='w-full object-cover object-center' src={process.env.DOMAIN + imgUrl} alt="post image" /></div>
          <div className='mt-9'>
            <Link className='font-medium text-xl flex items-center gap-3 border-b-2 border-blue-600 w-fit text-blue-600' to={'/profile'}>See more about this post <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 pt-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
            </Link>
          </div>
        </div>
      </Modal>
    </Container>
  )
}

export default Notifications