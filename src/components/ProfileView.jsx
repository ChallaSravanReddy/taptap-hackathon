import React, { useState } from 'react';
import { Camera, Book, Briefcase, Award, Mail, Phone, MapPin, Edit3, Check, Plus, X, User, Target, Activity, BarChart3, ChevronDown } from 'lucide-react';

const ProfileView = ({ user }) => {
  const initial = user?.handle ? user.handle.charAt(0).toUpperCase() : 'U';

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    handle: user?.handle || 'Sravan Reddy',
    college: user?.college || 'Unknown College',
    email: 'sravan@example.com',
    phone: '+91 9876543210',
    location: 'Hyderabad, India',
    bio: 'Aspiring software developer with a passion for building scalable web applications.',
    skills: ['React', 'JavaScript', 'Node.js', 'Python'],
    qualifications: [
      { id: 1, title: 'B.Tech in Computer Science', institution: 'JNTUH', year: '2020 - 2024' },
    ]
  });

  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would make an API call here to persist the data
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      
      {/* ── TOP STATS ROW ── */}
      {/* ── TOP STATS ROW ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        {/* Profile Completion / Overview */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '50%', border: '4px solid #f1f5f9', borderTopColor: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-45deg)' }}>
            <div style={{ transform: 'rotate(45deg)', background: '#be123c', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>
              {initial}
            </div>
            <div style={{ position: 'absolute', top: '-5px', right: '-15px', background: '#6366f1', color: '#fff', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '12px', transform: 'rotate(45deg)', fontWeight: 'bold' }}>
              17%
            </div>
          </div>
          <div>
             <h3 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', color: '#111827' }}>Profile Setup</h3>
             <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>Add more details to increase your profile strength.</p>
          </div>
        </div>

        {/* Smart Interview */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f8e8ff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', color: '#111827' }}>Smart Interview</h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280' }}>Valid for 1 Interview • No Renewal</p>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b5cf6' }}>0<span style={{ fontSize: '0.9rem', color: '#9ca3af' }}>/1</span></div>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <button style={{ flex: 1, background: '#8b5cf6', color: '#fff', border: 'none', padding: '8px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' }}>Start</button>
            <button style={{ background: '#f5f3ff', color: '#8b5cf6', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' }}>Plan</button>
          </div>
        </div>

        {/* Learning Metrics & MET */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '16px 24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Learning Time</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#111827' }}>8 mins</div>
            </div>
            <div style={{ width: '40px', height: '40px', background: '#eff6ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
              <Book size={20} />
            </div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)', borderRadius: '16px', padding: '16px 24px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={20} />
              </div>
              <span style={{ fontWeight: 600, fontSize: '1rem', letterSpacing: '0.5px' }}>MET SCORE</span>
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>NA<span style={{ fontSize: '0.9rem', opacity: 0.7 }}>/100</span></span>
          </div>
        </div>
        
      </div>

      {/* ── PRACTICE SECTION ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#111827', fontWeight: 700 }}>Practice</h2>
        </div>
        <div style={{ width: '100%', height: '1px', borderTop: '2px dashed #e5e7eb', marginBottom: '10px' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          
          {/* Progress Semi-Circle & Difficulty */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '30px' }}>
            <div style={{ position: 'relative', width: '180px', height: '120px', overflow: 'hidden' }}>
              <svg viewBox="0 0 100 50" style={{ width: '100%', height: '100%' }}>
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#f1f5f9" strokeWidth="8" strokeLinecap="round" />
                <path d="M 10 50 A 40 40 0 0 1 30 15" fill="none" stroke="#8b5cf6" strokeWidth="8" strokeLinecap="round" />
                <path d="M 30 15 A 40 40 0 0 1 70 15" fill="none" stroke="#f97316" strokeWidth="8" strokeLinecap="round" />
                <path d="M 70 15 A 40 40 0 0 1 90 50" fill="none" stroke="#84cc16" strokeWidth="8" strokeLinecap="round" />
              </svg>
              <div style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827' }}>6/10161</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
               {[
                 { label: 'Easy', count: '6/4018', color: '#f5f3ff', tagColor: '#8b5cf6' },
                 { label: 'Medium', count: '1/3643', color: '#fff7ed', tagColor: '#f97316' },
                 { label: 'Hard', count: '0/2500', color: '#f0fdf4', tagColor: '#84cc16' }
               ].map(item => (
                 <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: item.color, padding: '8px 12px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: item.tagColor }}>{item.label}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#4b5563' }}>{item.count}</span>
                 </div>
               ))}
            </div>
          </div>

          {/* Accuracy Card */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
             <div style={{ position: 'absolute', top: '24px', right: '24px', width: '32px', height: '32px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
               <Activity size={18} />
             </div>
             <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>27%</div>
             <div style={{ color: '#64748b', fontSize: '1rem', fontWeight: 500 }}>My Overall Accuracy</div>
          </div>

          {/* Rank Card */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
             <div style={{ position: 'absolute', top: '24px', right: '24px', width: '32px', height: '32px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
               <BarChart3 size={18} />
             </div>
             <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>529</div>
             <div style={{ color: '#64748b', fontSize: '1rem', fontWeight: 500 }}>My College Rank</div>
          </div>

        </div>

        {/* Submission History Heatmap */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#111827', fontWeight: 600 }}>Submission in year</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
              2026 <ChevronDown size={16} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'].map(month => (
              <div key={month} style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 12px)', gap: '4px' }}>
                  {Array.from({ length: 28 }).map((_, i) => {
                    // Mock data logic for coloring
                    let bg = '#f1f5f9';
                    if (month === 'April' && i === 25) bg = '#d9f99d'; // One highlight per mockup
                    return <div key={i} style={{ width: '12px', height: '12px', borderRadius: '2px', background: bg }} />;
                  })}
                </div>
                <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{month}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px', marginTop: '20px', fontSize: '0.75rem', color: '#6b7280' }}>
            <span>Less</span>
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} style={{ width: '12px', height: '12px', borderRadius: '2px', background: ['#f1f5f9', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80'][i] }} />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>


      {/* ── PROFILE DETAILS & EDIT SECTION ── */}
      <div style={{ 
        background: '#fff', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden'
      }}>
        
        {/* Header Banner */}
        <div style={{ height: '120px', background: 'linear-gradient(90deg, #1e293b 0%, #0f172a 100%)', position: 'relative' }}>
          <div style={{ position: 'absolute', right: '24px', top: '24px' }}>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', backdropFilter: 'blur(4px)', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                <Edit3 size={16} /> Edit Profile
              </button>
            ) : (
              <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 10px rgba(16, 185, 129, 0.4)' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <Check size={16} /> Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '0 32px 32px 32px', position: 'relative', display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
          
          {/* Left Column: Avatar & Basic Info */}
          <div style={{ width: '280px', marginTop: '-60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '140px', height: '140px', borderRadius: '16px', background: '#be123c', border: '4px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '4rem', fontWeight: 'bold', marginBottom: '20px' }}>
              {isEditing ? (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Camera size={32} />
                </div>
              ) : ''}
              {initial}
            </div>

            {isEditing ? (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginBottom: '4px', fontWeight: 600 }}>Full Name</label>
                  <input name="handle" value={profileData.handle} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.95rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginBottom: '4px', fontWeight: 600 }}>College / Institution</label>
                  <input name="college" value={profileData.college} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.95rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginBottom: '4px', fontWeight: 600 }}>Location</label>
                  <input name="location" value={profileData.location} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.95rem' }} />
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', width: '100%' }}>
                <h1 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', color: '#111827', fontWeight: 800 }}>{profileData.handle}</h1>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#4b5563', fontSize: '0.95rem', marginBottom: '8px' }}>
                  <Book size={16} style={{ color: '#6366f1' }} /> {profileData.college}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#6b7280', fontSize: '0.9rem', marginBottom: '24px' }}>
                  <MapPin size={16} /> {profileData.location}
                </div>
              </div>
            )}
            
            <div style={{ width: '100%', height: '1px', background: '#e5e7eb', margin: '20px 0' }} />

            {/* Contact Details */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4b5563' }}>
                  <Mail size={16} />
                </div>
                {isEditing ? (
                  <input name="email" value={profileData.email} onChange={handleChange} style={{ flex: 1, padding: '6px 10px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.9rem' }} />
                ) : (
                  <span style={{ color: '#374151', fontSize: '0.95rem', wordBreak: 'break-all' }}>{profileData.email}</span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4b5563' }}>
                  <Phone size={16} />
                </div>
                {isEditing ? (
                  <input name="phone" value={profileData.phone} onChange={handleChange} style={{ flex: 1, padding: '6px 10px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.9rem' }} />
                ) : (
                  <span style={{ color: '#374151', fontSize: '0.95rem' }}>{profileData.phone}</span>
                )}
              </div>
            </div>
          </div>


          {/* Right Column: Bio, Skills, Experience */}
          <div style={{ flex: 1, paddingTop: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* About / Bio */}
            <div>
              <h2 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={20} style={{ color: '#6366f1' }}/> About Me
              </h2>
              {isEditing ? (
                <textarea name="bio" value={profileData.bio} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.95rem', minHeight: '100px', resize: 'vertical', fontFamily: 'inherit' }} />
              ) : (
                <p style={{ margin: 0, color: '#4b5563', fontSize: '1rem', lineHeight: 1.6 }}>{profileData.bio}</p>
              )}
            </div>

            <div style={{ width: '100%', height: '1px', background: '#f1f5f9' }} />

            {/* Skills Array */}
            <div>
              <h2 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Target size={20} style={{ color: '#ef4444' }}/> Core Skills
              </h2>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {profileData.skills.map((skill, idx) => (
                  <div key={idx} style={{ 
                    background: '#eff6ff', color: '#1d4ed8', padding: '6px 14px', borderRadius: '20px', 
                    fontSize: '0.9rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' 
                  }}>
                    {skill}
                    {isEditing && (
                      <button onClick={() => removeSkill(skill)} style={{ background: 'transparent', border: 'none', color: '#60a5fa', cursor: 'pointer', padding: 0, display: 'flex' }}>
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
                
                {isEditing && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', border: '1px dashed #cbd5e1', padding: '4px 4px 4px 12px', borderRadius: '20px' }}>
                    <input 
                      value={newSkill} 
                      onChange={e => setNewSkill(e.target.value)} 
                      placeholder="Add skill..." 
                      onKeyDown={e => e.key === 'Enter' && addSkill()}
                      style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.85rem', width: '100px' }} 
                    />
                    <button onClick={addSkill} style={{ background: '#e2e8f0', border: 'none', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#475569' }}>
                      <Plus size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div style={{ width: '100%', height: '1px', background: '#f1f5f9' }} />

            {/* Qualifications Timeline */}
            <div>
              <h2 style={{ margin: '0 0 20px 0', fontSize: '1.2rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Briefcase size={20} style={{ color: '#f59e0b' }}/> Educational Qualifications
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {profileData.qualifications.map(qual => (
                  <div key={qual.id} style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #fef3c7' }}>
                      <Book size={20} />
                    </div>
                    <div>
                      {isEditing ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                           <input defaultValue={qual.title} placeholder="Degree" style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.95rem' }} />
                           <input defaultValue={qual.institution} placeholder="Institution" style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.9rem' }} />
                           <input defaultValue={qual.year} placeholder="Year (e.g. 2020 - 2024)" style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.85rem' }} />
                        </div>
                      ) : (
                        <>
                          <div style={{ fontWeight: 700, color: '#1f2937', fontSize: '1.05rem', marginBottom: '2px' }}>{qual.title}</div>
                          <div style={{ color: '#4b5563', fontSize: '0.95rem', marginBottom: '4px' }}>{qual.institution}</div>
                          <div style={{ color: '#9ca3af', fontSize: '0.85rem', fontWeight: 500 }}>{qual.year}</div>
                        </>
                      )}
                    </div>
                  </div>
                ))}

                {isEditing && (
                  <button style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6366f1', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 600, padding: '8px 0', width: 'max-content' }}>
                    <Plus size={16} /> Add Qualification
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
