import React from 'react';
import { 
  LayoutDashboard, MessageSquare, BookOpen, Target, 
  CheckSquare, Briefcase, Globe, GraduationCap, LifeBuoy, Terminal, Code
} from 'lucide-react';
import NotificationSystem from './NotificationSystem';
import LeaderboardSystem from './LeaderboardSystem';

const DashboardLayout = ({ user, activeTab = 'Dashboard', onTabChange, children }) => {
  // Navigation Menu matching the TapTap side menu style
  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'Socials', icon: <MessageSquare size={18} /> },
    { label: 'Learn', icon: <BookOpen size={18} /> },
    { label: 'Employability Track', icon: <Target size={18} /> },
    { label: 'Prepare', icon: <CheckSquare size={18} /> },
    { label: 'Assess', icon: <Briefcase size={18} /> },
    { label: 'Job Posts', icon: <Briefcase size={18} /> },
    { label: 'Study Abroad', icon: <Globe size={18} /> },
    { label: 'My College', icon: <GraduationCap size={18} /> },
    { label: 'Support', icon: <LifeBuoy size={18} /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5', color: '#333', fontFamily: 'sans-serif' }}>
      
      {/* ── SIDEBAR ── */}
      <div style={{ 
        width: '260px', 
        background: '#0a0a0a', 
        color: '#fff', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 50
      }}>
        {/* Logo Section */}
        <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#00f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="https://i.ibb.co/VvzM47y/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', filter: 'hue-rotate(90deg)' }} onError={(e) => e.target.style.display='none'} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.2rem', letterSpacing: '0.5px' }}>TapTaP</div>
            <div style={{ fontSize: '0.8rem', color: '#999' }}>by Blackbucks</div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
          {navItems.map(item => {
            const isActive = activeTab === item.label;
            return (
              <div 
                key={item.label}
                onClick={() => onTabChange && onTabChange(item.label)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: isActive ? '#2c2c2c' : 'transparent',
                  color: isActive ? '#fff' : '#aaa',
                  cursor: 'pointer',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if(!isActive) { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }
                }}
                onMouseLeave={(e) => {
                  if(!isActive) { e.currentTarget.style.color = '#aaa'; e.currentTarget.style.background = 'transparent'; }
                }}
              >
                {item.icon}
                <span style={{ fontSize: '0.9rem' }}>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>


      {/* ── MAIN CONTENT AREA ── */}
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }}>
        
        {/* TOPBAR */}
        <div style={{ 
          height: '70px', 
          background: '#0a0a0a', 
          borderBottom: '1px solid #ddd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 30px',
          color: '#fff',
          position: 'sticky',
          top: 0,
          zIndex: 40
        }}>
          
          {/* Left Side: Mock Scores (MET Score, etc) */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ background: '#333', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: '#7c3aed', padding: '2px 6px', borderRadius: '50%', fontSize: '0.6rem', color: 'white' }}>NA</span>
              MET Score
            </div>
            <div style={{ background: '#333', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🔥 0
            </div>
          </div>

          {/* Right Side: Tools, Leaderboard, Notifications, Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Dev Code Icon */}
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#2c2c2c', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Code size={16} />
            </div>

            {/* Leaderboard System */}
            <LeaderboardSystem user={user} />

            {/* Notification System */}
            <NotificationSystem user={user} />

            {/* Profile Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '10px' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#f43f5e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
                {user?.handle ? user.handle.charAt(0).toUpperCase() : 'U'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user?.handle || 'User'}</span>
                <span style={{ fontSize: '0.75rem', color: '#aaa', maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.college || 'Unknown College'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div style={{ padding: '30px', flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
