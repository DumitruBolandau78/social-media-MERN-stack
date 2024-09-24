import { useContext, useEffect, useState } from "react";
import { domain } from "../utils/variables";
import { UserContext } from "../context/UserContext";

// eslint-disable-next-line react/prop-types
const FollowUser = ({ avatarUrl, name, username, _id }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { user } = useContext(UserContext);

  function isUserFollowed() {
    fetch(domain + `/api/isUserFollowed?userID=${_id}`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setIsFollowing(data.msg);
      }).catch((err) => console.log(err));
  }

  useEffect(() => {
    isUserFollowed();
  }, []);

  async function followUserHandler() {
    if (!user) {
      return console.log('login for this');
    }

    setIsFollowing(!isFollowing);

    document.querySelectorAll('.user-' + _id).forEach(btn => {
      btn.textContent = `${!isFollowing ? 'Unfollow' : 'Follow'}`;
    });

    await fetch(domain + '/api/followUser', {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        userID: _id
      })
    }).catch(err => console.error(err));
  }

  return (
    <div className='flex justify-between bg-white rounded-md my-3 text-gray-900 items-center p-1'>
      <input type="hidden" name="userID" value={_id} />
      <div className="flex gap-1 cursor-pointer">
        <div className="avatar flex items-center rounded-full border-[1px] border-gray-900 p-2"><img className="w-9 h-9 object-cover object-center" src={domain + avatarUrl} alt="user avatar" /></div>
        <div>
          <div className="name text-nowrap font-medium">{name}</div>
          <div className="username text-nowrap font-normal">@{username}</div>
        </div>
      </div>
      <div><button onClick={followUserHandler} className={'rounded-full bg-gray-900 text-white font-medium py-2 px-3 user-' + _id}>{isFollowing? 'Unfollow' : 'Follow'}</button></div>
    </div>
  )
}

export default FollowUser