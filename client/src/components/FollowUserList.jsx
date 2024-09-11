import { useEffect } from "react"
import FollowUser from "./FollowUser"
import { domain } from "../utils/variables";

const FollowUserList = () => {
  async function getUsersToFollow(){
    await fetch(domain + '/api/getUsers', {

    })
    .then(res => res.json())
    .then(data => {

    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    getUsersToFollow();
  }, []);
  return getUsersToFollow.map(user => <FollowUser key={user._id} {...user} />);
}

export default FollowUserList