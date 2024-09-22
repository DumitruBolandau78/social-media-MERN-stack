import { useContext, useEffect, useRef, useState } from 'react';
import { domain } from '../../utils/variables'
import { UserContext } from '../../context/UserContext';
import useDateFormat from '../../hooks/useDateFormat';

// eslint-disable-next-line react/prop-types
const Post = ({ _id, description, likes, imgUrl, createdAt, comments, avatarUrl, saved, name, username }) => {
  const formattedDate = useDateFormat(createdAt);

  const id = useRef();
  const { user } = useContext(UserContext);
  const [likesLenght, setLikesLength] = useState(likes.length);
  const [isLike, setIsLike] = useState(user && likes.includes(user._id));
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    user?.saved.forEach(post => {
      if (post.toString() === id.current.value) {
        setIsSaved(true);
      }
    });
  }, []);

  async function likePostHandler() {
    await fetch(domain + '/api/likePostToggle', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "POST",
      credentials: 'include',
      body: JSON.stringify({ postID: id.current.value })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Like') {
          setIsLike(true);
          setLikesLength(prev => prev + 1);
        } else if (data.message === 'Unlike') {
          setIsLike(false);
          setLikesLength(prev => prev - 1);
        }
      })
      .catch(err => console.log(err));
  }

  async function savePostHandler() {
    await fetch(domain + '/api/savePostToggle', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "POST",
      credentials: 'include',
      body: JSON.stringify({ postID: id.current.value })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Saved') {
          setIsSaved(true);
        } else if (data.message === 'Unsaved') {
          setIsSaved(false);
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='shadow-lg bg-white text-gray-900 mb-10 p-10 rounded-md'>
      <input ref={id} type="hidden" name="postID" value={_id} />
      <div className='flex justify-between shadow-md'>
        <div className='flex gap-5 items-center p-2 rounded-lg'>
          <div className='rounded-full p-3'>
            <img className='w-full max-w-[40px] shadow-md' src={domain + avatarUrl} alt="user avatar" />
          </div>
          <div>
            <div className='flex gap-2 items-start flex-col'>
              <div className='font-medium text-md'>
                {user?.username === username ? name + ' (You)' : name}
              </div>
              <button className='bg-gray-900 text-white font-normal rounded-full py-1 px-6'>Follow</button>
            </div>
          </div>
        </div>
        <div className='font-medium p-4'>
          Posted at: {formattedDate}
        </div>
      </div>
      <p className='mt-4'>{description}</p>
      <div className='flex justify-center my-10'>
        <img className='object-center object-cover max-w-[500px] shadow-md max-h-[500px]' src={domain + imgUrl} alt="post image" />
      </div>
      <div className='border-t-[1px] border-gray-200 flex items-center justify-around pt-6'>
        <div className='flex gap-3 w-[80px] justify-center'>
          {user ?
            isLike ?
              (<svg onClick={likePostHandler} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 cursor-pointer text-red-600">
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>)
              :
              <svg onClick={likePostHandler} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"size-6 cursor-pointer"}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            :
            <svg onClick={() => console.log('logIn for this')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"size-6 cursor-pointer"}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          }
          {likesLenght}
        </div>
        <div className='flex gap-3 w-[80px] justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>

        </div>
        <div className='flex gap-3 w-[80px] justify-center'>
          {user ?
            isSaved ?
              <svg onClick={savePostHandler} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 cursor-pointer">
                <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
              </svg>
              :
              <svg onClick={savePostHandler} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
            :
            <svg onClick={() => console.log('logIn for this')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>
          }
        </div>
      </div>
    </div >
  )
}

export default Post