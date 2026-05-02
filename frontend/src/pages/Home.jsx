import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, DollarSign, Building } from 'lucide-react';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/jobs/public');
      setJobs(res.data);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (search.trim()) {
        const res = await axios.get(`http://localhost:8080/api/jobs/public/search?keyword=${search}`);
        setJobs(res.data);
      } else {
        fetchJobs();
      }
    } catch (error) {
      console.error("Failed to search", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="text-center mb-4">
        <h1 className="page-title">Find Your <span className="text-primary">Dream Job</span></h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Discover thousands of job opportunities with top companies.
        </p>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
          <input 
            type="text" 
            placeholder="Search by job title or keyword..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'rgba(30, 41, 59, 0.7)', color: 'white' }}
          />
          <button type="submit" className="btn-primary">Search</button>
        </form>
      </div>

      <div className="grid mt-8">
        {loading ? (
          <p className="text-center w-100">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center w-100">No jobs found.</p>
        ) : (
          jobs.map(job => (
            <div key={job.id} className="glass-panel job-card">
              <h3 className="job-title">{job.title}</h3>
              <div className="job-meta">
                <span className="job-meta-item"><Building size={16} /> {job.recruiterName}</span>
                <span className="job-meta-item"><MapPin size={16} /> {job.location}</span>
                <span className="job-meta-item"><DollarSign size={16} /> {job.salaryRange}</span>
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flex: 1 }}>
                {job.description.length > 100 ? job.description.substring(0, 100) + '...' : job.description}
              </p>
              <button className="btn-outline" style={{ width: '100%' }}>View Details</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
