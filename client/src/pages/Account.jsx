import { useNavigate, useParams } from 'react-router-dom'
import JoinUserForm from '../components/JoinUserForm/JoinUserForm';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { domain } from '../utils/variables';
import { UserContext } from '../context/UserContext';

const Account = () => {
  const params = useParams().slug;
  const [error, setError] = useState(null);
  const [loginName, setLoginName] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPass, setRegisterPass] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  if(user){
    navigate('/');
  }

  useEffect(() => {
    if(params !== 'login' && params !== 'register' && params !== 'get-new-password'){
      navigate('/wrong-page');
    }
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    let json;

    if(params == 'login') {
      json = JSON.stringify({ username: loginName, password: loginPass });
      await fetch(domain + '/api/login', {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        method: 'POST',
        body: json
      })
      .then(res => res.json())
      .then(data => {
        if(data.error){
          setError(data.error)
        } else if(data.message){
          setLoginName('');
          setLoginPass('');
          setUser(data.user);
          navigate('/');
        }
      })
    } else if(params == 'register'){
      json = JSON.stringify({ username: registerName, password: registerPass, email: registerEmail });
      await fetch(domain + '/api/register', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
        body: json
      })
      .then(res => res.json())
      .then(data => {
        if(data.error){
          setError(data.error)
        } else if(data.message){
          setRegisterEmail('');
          setRegisterName('');
          setRegisterPass('');
          navigate('/account/login');
        }
      })
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
              <input value={registerName} onChange={e => setRegisterName(e.target.value)} type="text" required /> <i>Username</i>
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