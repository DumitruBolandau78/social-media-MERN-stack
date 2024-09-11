import { useEffect, useState } from "react"
import FollowUser from "./FollowUser"
import { domain } from "../utils/variables";

const FollowUserList = () => {
  const [users, setUsers] = useState([]);
  async function getUsersToFollow(){
    await fetch(domain + '/api/getUsers', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => setUsers(data))
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