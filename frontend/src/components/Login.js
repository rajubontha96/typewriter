import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../redux/actions';
import Signup from './Signup';

const Login = () => {
  const [username, setU] = useState('');
  const [password, setP] = useState('');
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('All fields required');
      return;
    }

    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password}),
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
    } else {
      localStorage.setItem('token', data.token);
      dispatch(loginSuccess(data.token));
    }
  };

  if (isSignup) return <Signup setIsSignup={setIsSignup} />;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back 👋</h2>

        <input
          className="auth-input"
          placeholder="Username"
          onChange={e => setU(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          onChange={e => setP(e.target.value)}
        />

        {error && <p className="auth-error">{error}</p>}

        <button className="auth-button" onClick={handleLogin}>
          Login
        </button>

        <p style={{marginTop: 10}}>
          New user?{' '}
          <span className="auth-link" onClick={() => setIsSignup(true)}>
            Create account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;