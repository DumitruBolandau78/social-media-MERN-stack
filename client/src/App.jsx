import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Account from './pages/Account';
import WrongPage from './pages/404';
import Layout from './pages/Layout';
import { UserContext } from './context/UserContext';
import { useContext } from 'react';
import Notifications from './pages/Notifications';
import ProfileByUser from './pages/ProfileByUser';

function App() {
  const { setUser } = useContext(UserContext);
  
  const fetchUser = async () => {
    await fetch(process.env.DOMAIN + '/api/getCurrentUser', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if(data.user){
          setUser(data.user);
        }
      })
      .catch(e => console.log(e));
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="app w-full">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' index element={<Feed />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/:username' element={<ProfileByUser />} />
          <Route path='/notifications' element={<Notifications />} />
        </Route>

        <Route path='/account/:slug' element={<Account />} />
        <Route path='/wrong-page' element={<WrongPage />} />
      </Routes>
    </div>
  )
}

export default App
