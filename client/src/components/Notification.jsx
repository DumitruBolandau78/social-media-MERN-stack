import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext';
import useDateFormat from '../hooks/useDateFormat';
import { Link } from 'react-router-dom';

const Notification = ({ setDescription, setPostImgUrl, setCreatedAt, createdAt, message, postInfo, userInfo, handlOpenModal }) => {
  const { user } = useContext(UserContext);
  const date = useDateFormat(createdAt);

  function postDetailsHandler(){
    handlOpenModal(true); 
    setDescription(postInfo.description);
    setPostImgUrl(postInfo.imgUrl);
    setCreatedAt(createdAt);
  }

  return (
    <div className='my-5 shadow-sm shadow-gray-500 p-2 grid grid-cols-5'>
      <div className='flex gap-5  col-span-2'>
        <div><img className='w-[50px] h-[50px] rounded-full' src={process.env.DOMAIN + userInfo.avatarUrl} alt="avatar user image" /></div>
        <div>
          <div className={(user.username !== userInfo.username)? 'cursor-pointer' : ''}>{userInfo.name} {user.username === userInfo.username && '(You)'}</div>
          <div>@{userInfo.username}</div>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center col-span-2'>
        <div>
        {message === 'like' && 'Liked your post'} {message === 'comment' && 'Added a comment to your post'} {message === 'follow' && 'Started to follow you'}
        </div>
        <div>
          {(message === 'like' || message === 'comment') && <div onClick={postDetailsHandler} className='border-b-[1px] pb-1 w-fit cursor-pointer'>See Post</div>}
          {message === 'follow'  && <div className='border-b-[1px] pb-1 w-fit cursor-pointer'><Link to={'/profile/' + userInfo.username}>See Profile</Link></div>}
        </div>
      </div>
      <div className='justify-self-end  col-span-1'>{date}</div>
    </div>
  )
}

export default Notification