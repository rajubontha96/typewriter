import {useState} from 'react';

const Signup = ({setIsSignup}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!username || !password) {
      setError('All fields required');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    const res = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password}),
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
    } else {
      alert('Signup successful!');
      setIsSignup(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account 🚀</h2>

        <input
          className="auth-input"
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        {error && <p className="auth-error">{error}</p>}

        <button className="auth-button" onClick={handleSignup}>
          Signup
        </button>

        <p style={{marginTop: 10}}>
          Already have an account?{' '}
          <span className="auth-link" onClick={() => setIsSignup(false)}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;