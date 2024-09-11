import { Route, Routes } from 'react-router-dom';
import './App.css';
import Feed from './pages/feed';
import Profile from './pages/Profile';
import Account from './pages/Account';
import WrongPage from './pages/404';
import Layout from './pages/Layout';
import UserProvider from './context/UserContext';

function App() {

  return (
    <div className="app max-w-screen-xl mx-auto">
      <UserProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' index element={<Feed />} />
            <Route path='/profile' element={<Profile />} />
          </Route>

          <Route path='/account/:slug' element={<Account />} />
          <Route path='/wrong-page' element={<WrongPage />} />
        </Routes>
      </UserProvider>
    </div>
  )
}

export default App
