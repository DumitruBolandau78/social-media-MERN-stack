import { useContext } from "react";
import { useState } from "react"
import { UserContext } from "../../context/UserContext";

import useDateFormat from "../../hooks/useDateFormat";

// eslint-disable-next-line react/prop-types
const ProfilePost = ({ imgUrl, description, likes, createdAt, _id, currentUserPosts, setCurrentUserPosts, handlOpenModal, setComments }) => {
  const { user, setPostID } = useContext(UserContext);
  const [likesLenght, setLikesLength] = useState(likes.length);
  const [isLike, setIsLike] = useState(user && likes.includes(user._id));
  const dateFormat = useDateFormat(createdAt);

  async function getCommentsHandler(){
    if(!user){
      return alert('login for this');
    }
    
    setPostID(_id);
    handlOpenModal(true);

    await fetch(`/api/getPostComments?postID=${_id}`, {
      method: 'GET',
      credentials: 'include',
    }).then(res => res.json())
    .then(data => {
      if(data.comments){
        setComments(data.comments);
      }
    }).catch(err => console.log(err)
    );
  }

  async function deletePostHandler() {
    await fetch('/api/deletePost', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ postID: _id })
    }).then(res => res.json())
      .then(data => {
        if(data.msg){
          // eslint-disable-next-line react/prop-types
          const updatedPosts = currentUserPosts.filter(post => post._id.toString() !== _id);
          setCurrentUserPosts(updatedPosts);
        }
      })
      .catch(err => console.log(err));
  }

  async function likePostHandler() {
    setIsLike(!isLike);
    await fetch('/api/likePostToggle', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "POST",
      credentials: 'include',
      body: JSON.stringify({ postID: _id })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Like') {
          setLikesLength(prev => prev + 1);
        } else if (data.message === 'Unlike') {
          setLikesLength(prev => prev - 1);
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='shadow-lg bg-white text-gray-900 mb-10 p-10 rounded-md w-2/3'>
      <div className="font-medium">
        {'Posted at ' + dateFormat}
      </div>
      <p className='mt-4'>{description}</p>
      <div className='flex justify-center my-10'>
        <img className='object-center object-cover max-w-[500px] max-h-[500px] shadow-md' src={imgUrl} alt="post image" />
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
            <svg onClick={() => alert('logIn for this')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"size-6 cursor-pointer"}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          }
          {likesLenght}
        </div>
        <div className='flex gap-3 w-[80px] justify-center'>
          <svg onClick={getCommentsHandler} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
        </div>
        <div className='flex gap-3 w-[80px] justify-center'>
          <svg onClick={deletePostHandler} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 cursor-pointer text-red-600">
            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div >
  )
}

export default ProfilePost