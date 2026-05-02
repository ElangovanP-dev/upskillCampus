import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function Login() {
  const [searchParams] = useSearchParams();
  const isRegister = searchParams.get('mode') === 'register';
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CANDIDATE');
  const [error, setError] = useState('');
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    let result;
    if (isRegister) {
      result = await register(name, email, password, role);
    } else {
      result = await login(email, password);
    }

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">{isRegister ? 'Create an Account' : 'Welcome Back'}</h2>
        
        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#fca5a5', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} />
            </div>
          )}
          
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          {isRegister && (
            <div className="input-group">
              <label>I am a...</label>
              <select value={role} onChange={e => setRole(e.target.value)}>
                <option value="CANDIDATE">Job Seeker (Candidate)</option>
                <option value="RECRUITER">Employer (Recruiter)</option>
              </select>
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            {isRegister ? 'Sign Up' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
