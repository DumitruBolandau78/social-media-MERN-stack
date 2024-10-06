import { useEffect, useState } from "react"
import FollowUser from "./FollowUser"

const FollowUserList = () => {
  const [users, setUsers] = useState([]);
  async function getUsersToFollow(){
    await fetch(process.env.DOMAIN + '/api/getUsers', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => setUsers(data.users))
    .catch(err => console.log(err));
  }

  useEffect(() => {
    getUsersToFollow();
  }, []);

  return (
    <div>
      { users.map(user => <FollowUser key={user._id} {...user} />) }
    </div>
  )
}

export default FollowUserList;