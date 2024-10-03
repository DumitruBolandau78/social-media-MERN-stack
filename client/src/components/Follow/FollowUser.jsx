import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";

// eslint-disable-next-line react/prop-types
const FollowUser = ({ avatarUrl, name, username, _id }) => {
  const { user, following, setFollowing, toggleFollow } = useContext(UserContext);

  function isUserFollowed() {
    fetch(process.env.DOMAIN + `/api/isUserFollowed?userID=${_id}`, {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if(data.msg){
          setFollowing(prev => [...prev, _id]);
        }
      }).catch((err) => console.log(err));
  }

  useEffect(() => {
    isUserFollowed();
  }, []);

  async function followUserHandler() {
    if (!user) {
      return console.log('login for this');
    }

    toggleFollow(_id);

    await fetch(process.env.DOMAIN + '/api/followUser', {
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
        <div className="avatar flex items-center rounded-full border-[1px] border-gray-200"><img className="rounded-full object-cover object-center w-[50px] h-[50px]" src={process.env.DOMAIN + avatarUrl} alt="user avatar" /></div>
        <div>
          <div className="name text-nowrap font-medium">{name}</div>
          <div className="username text-nowrap font-normal">@{username}</div>
        </div>
      </div>
      <div><button onClick={followUserHandler} className={'rounded-full bg-gray-900 text-white font-medium py-2 px-3 user-' + _id}>{following.includes(_id) ? "Unfollow" : "Follow"}</button></div>
    </div>
  )
}

export default FollowUser