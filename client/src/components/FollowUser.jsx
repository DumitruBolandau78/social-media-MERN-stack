import { useRef } from "react"
import { domain } from "../utils/variables";

// eslint-disable-next-line react/prop-types
const FollowUser = ({ avatarUrl, name, username, _id }) => {
  const userID = useRef();

  return (
    <div className='flex justify-between bg-white rounded-md my-3 text-gray-900 items-center p-1'>
      <input ref={userID} type="hidden" name="userID" value={_id} />
      <div className="flex gap-1 cursor-pointer">
        <div className="avatar flex items-center rounded-full border-[1px] border-gray-900 p-2"><img className="w-9 h-9 object-cover object-center" src={domain + avatarUrl} alt="user avatar" /></div>
        <div>
          <div className="name text-nowrap font-medium">{name}</div>
          <div className="username text-nowrap font-normal">@{username}</div>
        </div>
      </div>
      <div><button className="rounded-full bg-gray-900 text-white font-medium py-2 px-3">Follow</button></div>
    </div>
  )
}

export default FollowUser