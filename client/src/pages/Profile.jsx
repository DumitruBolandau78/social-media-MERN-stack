import { useContext, useEffect } from 'react'
import Container from '../components/Container'
import { UserContext } from '../context/UserContext';
import { domain } from '../utils/variables';
import getUser from '../functions/getUser';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  
  useEffect(() =>{
    const currentUser = getUser();
    setUser(currentUser);
    console.log(currentUser);
    
  }, []);

  return (
    <Container>
      <div className=''>
        <div>
          <div className='rounded-full bg-white p-3 overflow-hidden border-4 border-gray-300'>
            <img className='max-w-[150px] w-full' src={domain + user?.avatarUrl} alt="user avatar" />
          </div>

        </div>

      </div>
    </Container>
  )
}

export default Profile