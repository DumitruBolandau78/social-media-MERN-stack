import { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import useDateFormat from '../hooks/useDateFormat';

// eslint-disable-next-line react/prop-types
const Comment = ({ message, username, nameOfUser, avatarUrl, createdAt }) => {
  const date = useDateFormat(createdAt);
  const { user } = useContext(UserContext);

  return (
    <div className='flex items-start gap-5 p-2 rounded-lg shadow-md my-2'>
      <div className='rounded-full'>
        <img className='rounded-full max-w-[40px]' src={process.env.DOMAIN + avatarUrl} alt="user avatar" />
      </div>
      <div className='w-full'>
        <div className='gap-2'>
          <div className='font-medium text-sm flex justify-between'>
            {user?.username === username ? <div>{nameOfUser} (You)</div> : <div className='cursor-pointer'>{name}</div>}
            <div>{date}</div>
          </div>
          <div className='font-normal mt-3' style={{wordBreak: 'break-word'}}>{message}</div>
        </div>
      </div>
    </div>
  )
}

export default Comment