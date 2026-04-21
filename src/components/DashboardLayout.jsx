import React, { useState } from 'react';
import { 
  LayoutDashboard, MessageSquare, BookOpen, Target, 
  CheckSquare, Briefcase, Globe, GraduationCap, LifeBuoy, Terminal, Code, X, Gamepad2, ShieldAlert
} from 'lucide-react';
import NotificationSystem from './NotificationSystem';
import LeaderboardSystem from './LeaderboardSystem';

const DashboardLayout = ({ user, activeTab = 'Dashboard', onTabChange, children }) => {
  // Navigation Menu matching the TapTap side menu style
  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} color="#3b82f6" /> },
    { label: 'Socials', icon: <MessageSquare size={18} color="#06b6d4" /> },
    { label: 'Learn', icon: <BookOpen size={18} color="#f59e0b" /> },
    { label: 'Employability Track', icon: <Target size={18} color="#10b981" /> },
    { label: 'Prepare', icon: <CheckSquare size={18} color="#6366f1" /> },
    { label: 'Games', icon: <Gamepad2 size={18} color="#f43f5e" /> },
    { label: 'Assess', icon: <Briefcase size={18} color="#d97706" /> },
    { label: 'Job Posts', icon: <Briefcase size={18} color="#0d9488" /> },
    { label: 'Study Abroad', icon: <Globe size={18} color="#38bdf8" /> },
    { label: 'My College', icon: <GraduationCap size={18} color="#8b5cf6" /> },
    { label: 'Support', icon: <LifeBuoy size={18} color="#ec4899" /> },
  ];

  if (user?.role === 'Admin') {
     navItems.push({ label: 'Admin Panel', icon: <ShieldAlert size={18} /> });
  }

  const initial = user?.handle ? user.handle.charAt(0).toUpperCase() : 'U';

  // Dashboard2-style color tokens
  const purple = '#7C3AED';
  const purpleLt = 'rgba(124, 58, 237, 0.1)';
  const purpleMid = '#8B5CF6';
  const purpleDk = '#EDE9FE';
  const border = 'rgba(255, 255, 255, 0.08)';
  const text2 = '#94a3b8';
  const text3 = '#64748b';
  const blackBg = '#000000';
  const darkNavBg = '#0a0a0a';

  return (
    <div style={{
      display: 'flex', minHeight: '100vh',
      background: 'radial-gradient(ellipse 120% 70% at 100% -10%,rgba(108,92,231,.18) 0%,transparent 52%),radial-gradient(ellipse 90% 55% at 0% 105%,rgba(232,93,76,.12) 0%,transparent 48%),linear-gradient(165deg,#e4dff5 0%,#ebe7f6 35%,#f0ecf8 100%)',
      color: '#1a1830', fontFamily: "'DM Sans', sans-serif", position: 'relative', overflowX: 'hidden'
    }}>
      
      {/* ── SIDEBAR ── */}
      <div style={{ 
        width: '200px', 
        background: darkNavBg,
        borderRight: `1px solid ${border}`,
        display: 'flex', 
        flexDirection: 'column',
        position: 'fixed',
        left: 0, top: 0, bottom: 0,
        zIndex: 50,
        boxShadow: '4px 0 24px rgba(0,0,0,.3)',
        padding: '1.25rem 0',
        gap: 2,
        overflowY: 'auto',
      }}>
        {/* Logo */}
        <div style={{ padding: '0 1rem 1rem', borderBottom: `1px solid ${border}`, marginBottom: '.5rem' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#ffffff', letterSpacing: '0.05em' }}>TaPTaP</div>
          <div style={{ fontSize: 10, color: text3, fontWeight: 500 }}>by Blackbucks</div>
        </div>

        {/* Nav sections */}
        <div style={{ fontSize: 10, color: text3, padding: '8px 1rem 4px', letterSpacing: '.06em', textTransform: 'uppercase' }}>Main</div>
        {/* Navigation */}
        {navItems.map(item => {
            const isActive = activeTab === item.label;
            return (
              <div 
                key={item.label}
                onClick={() => onTabChange && onTabChange(item.label)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 1rem', fontSize: 13,
                  color: isActive ? '#ffffff' : text2,
                  borderLeft: isActive ? `3px solid ${purpleMid}` : '3px solid transparent',
                  background: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all .2s ease',
                }}
                onMouseEnter={(e) => {
                  if(!isActive) { 
                    e.currentTarget.style.background = 'rgba(255,255,255,.03)'; 
                    e.currentTarget.style.color = '#ffffff'; 
                  }
                }}
                onMouseLeave={(e) => {
                  if(!isActive) { 
                    e.currentTarget.style.background = 'transparent'; 
                    e.currentTarget.style.color = text2; 
                  }
                }}
              >
                <span style={{ opacity: isActive ? 1 : 0.6, flexShrink: 0, display: 'flex' }}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            );
          })}
      </div>

      {/* ── MAIN CONTENT AREA ── */}
      <div style={{ flex: 1, marginLeft: '200px', display: 'flex', flexDirection: 'column' }}>
        
        {/* TOPBAR */}
        <div style={{ 
          background: blackBg,
          borderBottom: `1px solid ${border}`,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          padding: '0 1.5rem',
          height: 56,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 40,
        }}>
          {/* Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#ffffff' }}>{activeTab}</span>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.05)', border: `1px solid ${border}`,
              borderRadius: 99, padding: '4px 14px', fontSize: 12, fontWeight: 500, color: '#e2e8f0',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
              Best MET: 71.2 · Band D
            </div>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <LeaderboardSystem user={user} />
            <NotificationSystem user={user} />
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
              onClick={() => onTabChange && onTabChange('Profile')}
            >
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: purpleMid, color: '#ffffff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 600, border: '2px solid rgba(255,255,255,0.1)'
              }}>
                {initial}
              </div>
            </div>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div style={{ padding: activeTab === 'Prepare' ? 0 : '1.5rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
