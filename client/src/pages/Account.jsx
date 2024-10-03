import { useNavigate, useParams } from 'react-router-dom'
import JoinUserForm from '../components/JoinUserForm/JoinUserForm';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';

const Account = () => {
  const params = useParams().slug;
  const [error, setError] = useState(null);
  const [loginName, setLoginName] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPass, setRegisterPass] = useState('');
  const [registerName, setRegisterName] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const fetchUser = async () => {
    await fetch(process.env.DOMAIN + '/api/getCurrentUser', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
          navigate('/');
        }
      })
      .catch(e => console.error(e));
  }

  useEffect(() => {
    fetchUser();

    if (params !== 'login' && params !== 'register' && params !== 'get-new-password') {
      navigate('/wrong-page');
    }
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    let json;

    try {
      if (params === 'login') {
        json = JSON.stringify({ username: loginName, password: loginPass });
        const response = await fetch(process.env.DOMAIN + '/api/login', {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          method: 'POST',
          body: json
        });

        console.log('ok');
        const data = await response.json();
        

        if (data.error) {
          setError(data.error);
        } else if (data.user) {
          setLoginName('');
          setLoginPass('');
          setUser(data.user);
          navigate('/');
        }
      } else if (params === 'register') {
        json = JSON.stringify({
          username: registerUsername,
          name: registerName,
          password: registerPass,
          email: registerEmail
        });

        const response = await fetch(process.env.DOMAIN + '/api/register', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          credentials: 'include',
          body: json
        });

        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else if (data.message) {
          setError(null);
          setRegisterEmail('');
          setRegisterUsername('');
          setRegisterName('');
          setRegisterPass('');
          navigate('/account/login');
        }
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  }

  return (
    <div>
      {params == 'login' ?
        <JoinUserForm submitHandler={submitHandler} title={'LOGIN'} error={error}>
          <div className="inputBox">
            <input value={loginName} onChange={e => setLoginName(e.target.value)} type="text" required /> <i>Username</i>
          </div>
          <div className="inputBox">
            <input value={loginPass} onChange={e => setLoginPass(e.target.value)} type="password" required /> <i>Password</i>
          </div>
          <div className="links"> <Link to={'/account/get-password'}>Forgot Password</Link> <Link to='/account/register'>REGISTER</Link></div>
          <div className="inputBox">
            <input type="submit" value={'LOGIN'} />
          </div>
        </JoinUserForm> :

        params == 'register' ?
          <JoinUserForm submitHandler={submitHandler} title={'REGISTER'} error={error}>
            <div className="inputBox">
              <input value={registerUsername} onChange={e => setRegisterUsername(e.target.value)} type="text" required /> <i>Username</i>
            </div>
            <div className="inputBox">
              <input value={registerName} onChange={e => setRegisterName(e.target.value)} type="text" required /> <i>Name</i>
            </div>
            <div className="inputBox">
              <input value={registerEmail} onChange={e => setRegisterEmail(e.target.value)} type="email" required /> <i>Email</i>
            </div>
            <div className="inputBox">
              <input value={registerPass} onChange={e => setRegisterPass(e.target.value)} type="password" required /> <i>Password</i>
            </div>
            <div className="links"><Link className='invisible'></Link><Link to={'/account/login'}>LOGIN</Link></div>
            <div className="inputBox">
              <input type="submit" value={'REGISTER'} />
            </div>
          </JoinUserForm> :

          params == 'get-new-password' ?
            '' :
            navigate('/')}
    </div>
  )
}

export default Account;