import React from 'react';
import { Briefcase, MapPin, DollarSign, Clock, Search, Filter, Bookmark, ChevronRight, Building } from 'lucide-react';

const JobsView = () => {
  const jobs = [
    { 
      id: 1, title: 'Software Engineer - Intern', company: 'Google', location: 'Hyderabad (On-site)', 
      salary: '₹50,000 - ₹70,000 / month', type: 'Full-time', posted: '2 days ago',
      logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
      tags: ['React', 'Node.js', 'Python'], status: 'Active'
    },
    { 
      id: 2, title: 'Associate AI Engineer', company: 'NVIDIA', location: 'Bengaluru (Remote)', 
      salary: '₹18L - ₹24L / year', type: 'Remote', posted: '3 days ago',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/2560px-Nvidia_logo.svg.png',
      tags: ['PyTorch', 'C++', 'CUDA'], status: 'Trending'
    },
    { 
      id: 3, title: 'Frontend Developer', company: 'Zomato', location: 'Gurugram (Hybrid)', 
      salary: '₹12L - ₹15L / year', type: 'Full-time', posted: '1 week ago',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Zomato_Logo.png',
      tags: ['Next.js', 'TypeScript', 'Tailwind'], status: 'Active'
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '40px', fontFamily: 'Sora, sans-serif' }}>
      
      {/* Header section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '2.2rem', color: '#111827', fontWeight: 800 }}>Career Portal</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>Find your next career move with top startups and global tech giants.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
             <button style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '14px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 15px -3px rgba(99,102,241,0.3)' }}>My Applications</button>
             <button style={{ background: '#fff', color: '#64748b', border: '1px solid #e2e8f0', padding: '12px 24px', borderRadius: '14px', fontWeight: 700, cursor: 'pointer' }}>Saved Jobs</button>
        </div>
      </div>

      {/* Search and Filters */}
      <div style={{ background: '#fff', padding: '16px', borderRadius: '20px', border: '1px solid #e2e8f0', display: 'flex', gap: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input 
            type="text" 
            placeholder="Search roles, companies or skills..." 
            style={{ 
              width: '100%', padding: '14px 14px 14px 48px', borderRadius: '12px', 
              border: '1px solid #f1f5f9', background: '#f8fafc', outline: 'none', fontSize: '1rem'
            }} 
          />
        </div>
        <div style={{ position: 'relative', width: '200px' }}>
          <MapPin size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input 
            type="text" 
            placeholder="Location" 
            style={{ 
              width: '100%', padding: '14px 14px 14px 48px', borderRadius: '12px', 
              border: '1px solid #f1f5f9', background: '#f8fafc', outline: 'none', fontSize: '1rem'
            }} 
          />
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f1f5f9', color: '#1e293b', border: 'none', padding: '0 24px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>
           <Filter size={18} /> Filters
        </button>
      </div>

      {/* Jobs List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {jobs.map(job => (
          <div key={job.id} style={{ 
            background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #f1f5f9',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', transition: 'all 0.2s', cursor: 'pointer',
            display: 'flex', gap: '24px'
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.background = '#fefefe'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#f1f5f9'; e.currentTarget.style.background = '#fff'; }}
          >
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #f1f5f9', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <img src={job.logo} alt={job.company} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </div>
            
            <div style={{ flex: 1 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                     <h3 style={{ margin: '0 0 4px 0', fontSize: '1.4rem', fontWeight: 800, color: '#1e293b' }}>{job.title}</h3>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: '#6366f1', fontWeight: 700 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Building size={16} /> {job.company}</span>
                        {job.status === 'Trending' && <span style={{ background: '#fef2f2', color: '#ef4444', padding: '2px 8px', borderRadius: '8px', fontSize: '0.75rem' }}>TRENDING</span>}
                     </div>
                  </div>
                  <button style={{ color: '#94a3b8', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                     <Bookmark size={24} />
                  </button>
               </div>
               
               <div style={{ display: 'flex', gap: '24px', marginBottom: '20px', fontSize: '0.9rem', color: '#64748b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} /> {job.location}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><DollarSign size={16} /> {job.salary}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> {job.posted}</div>
               </div>
               
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                     {job.tags.map(tag => (
                       <span key={tag} style={{ background: '#f5f3ff', color: '#6366f1', padding: '6px 14px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 600 }}>{tag}</span>
                     ))}
                  </div>
                  <button style={{ background: '#1e293b', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                     View Details <ChevronRight size={18} />
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recruitment Banner */}
      <div style={{ background: '#fff', borderRadius: '24px', padding: '40px', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
         <div style={{ width: '80px', height: '80px', background: '#f5f3ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', margin: '0 auto 24px' }}>
            <Briefcase size={40} />
         </div>
         <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', margin: '0 0 12px 0' }}>Are you a Recruiter?</h2>
         <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 32px' }}>Post your job openings and connect with over 50,000+ pre-vetted students from top institutions across India.</p>
         <button style={{ background: '#fff', color: '#111827', border: '2px solid #111827', padding: '14px 32px', borderRadius: '14px', fontWeight: 800, cursor: 'pointer' }}>Post a Job</button>
      </div>

    </div>
  );
};

export default JobsView;
