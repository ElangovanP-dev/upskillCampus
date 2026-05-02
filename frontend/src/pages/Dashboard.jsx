import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Recruiter specific state
  const [showAddJob, setShowAddJob] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', description: '', location: '', requirements: '', salaryRange: '' });

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      if (user.role === 'RECRUITER') {
        const res = await axios.get('http://localhost:8080/api/jobs/my-jobs');
        setData(res.data);
      } else {
        const res = await axios.get('http://localhost:8080/api/applications/my-applications');
        setData(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/jobs', newJob);
      setShowAddJob(false);
      setNewJob({ title: '', description: '', location: '', requirements: '', salaryRange: '' });
      fetchDashboardData();
    } catch (error) {
      console.error("Failed to create job", error);
    }
  };

  if (loading) return <div className="container text-center mt-8">Loading dashboard...</div>;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Dashboard</h1>
        {user.role === 'RECRUITER' && (
          <button className="btn-primary" onClick={() => setShowAddJob(!showAddJob)}>
            {showAddJob ? 'Cancel' : 'Post New Job'}
          </button>
        )}
      </div>

      {showAddJob && user.role === 'RECRUITER' && (
        <div className="glass-panel mb-4">
          <h2 className="mb-4">Post a New Job</h2>
          <form onSubmit={handleCreateJob}>
            <div className="input-group">
              <label>Job Title</label>
              <input type="text" required value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Location</label>
              <input type="text" required value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Salary Range</label>
              <input type="text" value={newJob.salaryRange} onChange={e => setNewJob({...newJob, salaryRange: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Requirements</label>
              <input type="text" value={newJob.requirements} onChange={e => setNewJob({...newJob, requirements: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Description</label>
              <textarea required rows="4" value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})}></textarea>
            </div>
            <button type="submit" className="btn-primary">Submit Job</button>
          </form>
        </div>
      )}

      <div className="glass-panel">
        <h2 className="mb-4">{user.role === 'RECRUITER' ? 'My Posted Jobs' : 'My Applications'}</h2>
        
        {data.length === 0 ? (
          <p className="text-muted">No records found.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
                  {user.role === 'RECRUITER' ? (
                    <>
                      <th style={{ padding: '1rem' }}>Title</th>
                      <th style={{ padding: '1rem' }}>Location</th>
                      <th style={{ padding: '1rem' }}>Posted At</th>
                    </>
                  ) : (
                    <>
                      <th style={{ padding: '1rem' }}>Job Title</th>
                      <th style={{ padding: '1rem' }}>Status</th>
                      <th style={{ padding: '1rem' }}>Applied At</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    {user.role === 'RECRUITER' ? (
                      <>
                        <td style={{ padding: '1rem' }}>{item.title}</td>
                        <td style={{ padding: '1rem' }}>{item.location}</td>
                        <td style={{ padding: '1rem' }}>{new Date(item.postedAt).toLocaleDateString()}</td>
                      </>
                    ) : (
                      <>
                        <td style={{ padding: '1rem' }}>{item.jobTitle}</td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ 
                            padding: '0.25rem 0.75rem', 
                            borderRadius: '99px', 
                            fontSize: '0.875rem',
                            background: item.status === 'PENDING' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                            color: item.status === 'PENDING' ? '#fde047' : '#86efac'
                          }}>
                            {item.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>{new Date(item.appliedAt).toLocaleDateString()}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
