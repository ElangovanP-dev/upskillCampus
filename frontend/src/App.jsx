import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { LogOut, User as UserIcon, Briefcase } from 'lucide-react';

function App() {
  const { user, logout } = useAuth();

  return (
    <Router>
      <nav className="nav-bar">
        <Link to="/" className="nav-brand">
          <Briefcase size={24} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
          SmartJob
        </Link>
        <div className="nav-links">
          <Link to="/">Jobs</Link>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                <UserIcon size={18} />
                <span>{user.name}</span>
              </div>
              <button onClick={logout} className="btn-outline" style={{ padding: '0.4rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline">Login</Link>
              <Link to="/login?mode=register" className="btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
