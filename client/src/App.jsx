import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import Feed from './pages/feed';
import Profile from './pages/Profile';
import Account from './pages/Account';
import WrongPage from './pages/404';
import Layout from './pages/Layout';
import { UserContext } from './context/UserContext';
import { domain } from './utils/variables';
import { useContext } from 'react';

function App() {
  const { setUser } = useContext(UserContext);

  const fetchUser = async () => {
    await fetch(domain + '/api/getUser', {
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
    <div className="app max-w-screen-xl mx-auto">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' index element={<Feed />} />
          <Route path='/profile' element={<Profile />} />
        </Route>

        <Route path='/account/:slug' element={<Account />} />
        <Route path='/wrong-page' element={<WrongPage />} />
      </Routes>
    </div>
  )
}

export default App
