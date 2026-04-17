import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, User, School, KeyRound, Loader2, Database } from 'lucide-react';

const mockColleges = [
  "VNR VJIET",
  "IIT Bombay",
  "BITS Pilani",
  "NIT Warangal",
  "IIIT Hyderabad",
  "Stanford University",
  "Guest / Custom"
];

const LoginScreen = ({ onLogin }) => {
  const [handle, setHandle] = useState('');
  const [college, setCollege] = useState('VNR VJIET');
  const [role, setRole] = useState('Student');
  const [isLoading, setIsLoading] = useState(false);
  const [glitch, setGlitch] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!handle.trim()) return;

    setIsLoading(true);
    setGlitch(true);

    // Simulate an authentication sequence
    setTimeout(() => setGlitch(false), 200);
    setTimeout(() => setGlitch(true), 600);
    setTimeout(() => setGlitch(false), 800);

    setTimeout(() => {
      onLogin({
        handle,
        college,
        role
      });
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 50, // Above normal UI elements until dismissed
        padding: '2rem'
      }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '450px',
          background: 'rgba(15, 23, 42, 0.75)',
          border: '1px solid rgba(0, 240, 255, 0.4)',
          borderRadius: '16px',
          padding: '2.5rem',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,240,255,0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}
        className={glitch ? 'screen-shake' : ''}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-block', padding: '12px', borderRadius: '50%', background: 'rgba(0, 240, 255, 0.1)', color: 'var(--cyan)', border: '1px solid rgba(0, 240, 255, 0.3)', marginBottom: '1rem' }}>
            <Database size={32} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-hud)', margin: 0, color: '#fff', fontSize: '1.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
            System // Auth
          </h2>
          <p style={{ margin: '0.5rem 0 0', color: 'var(--cyan)', fontSize: '0.85rem', textTransform: 'uppercase', opacity: 0.8, fontFamily: 'monospace' }}>
            Enter Operator Credentials
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Handle */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontFamily: 'monospace', marginBottom: '8px' }}>
              <User size={14} /> HACKER HANDLE
            </label>
            <input 
              type="text"
              value={handle}
              onChange={e => setHandle(e.target.value)}
              placeholder="e.g. Neo, Trinity..."
              disabled={isLoading}
              required
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.5)',
                color: '#fff',
                border: '1px solid rgba(0,240,255,0.3)',
                padding: '12px 15px',
                borderRadius: '8px',
                outline: 'none',
                fontFamily: 'monospace',
                fontSize: '1rem',
                transition: 'border-color 0.3s'
              }}
              onFocus={e => e.target.style.borderColor = 'var(--cyan)'}
              onBlur={e => e.target.style.borderColor = 'rgba(0,240,255,0.3)'}
            />
          </div>

          {/* College */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontFamily: 'monospace', marginBottom: '8px' }}>
              <School size={14} /> FACTION / COLLEGE
            </label>
            <select
              value={college}
              onChange={e => setCollege(e.target.value)}
              disabled={isLoading}
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.5)',
                color: '#fff',
                border: '1px solid rgba(0,240,255,0.3)',
                padding: '12px 15px',
                borderRadius: '8px',
                outline: 'none',
                fontFamily: 'monospace',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              {mockColleges.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Level */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontFamily: 'monospace', marginBottom: '8px' }}>
              <Shield size={14} /> ACCESS LEVEL
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['Student', 'Admin'].map(lvl => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setRole(lvl)}
                  disabled={isLoading}
                  style={{
                    flex: 1,
                    background: role === lvl ? (lvl === 'Admin'? 'rgba(255,45,85,0.15)' : 'rgba(0,240,255,0.15)') : 'transparent',
                    border: '1px solid',
                    borderColor: role === lvl ? (lvl === 'Admin' ? '#ff2d55' : 'var(--cyan)') : 'rgba(255,255,255,0.1)',
                    color: role === lvl ? (lvl === 'Admin' ? '#ff2d55' : 'var(--cyan)') : 'rgba(255,255,255,0.5)',
                    padding: '10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontFamily: 'monospace',
                    fontWeight: role === lvl ? 'bold' : 'normal',
                    transition: 'all 0.3s'
                  }}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !handle}
            style={{
              marginTop: '1rem',
              background: isLoading ? 'rgba(0,240,255,0.2)' : 'var(--cyan)',
              color: isLoading ? 'var(--cyan)' : '#0f172a',
              border: isLoading ? '1px solid var(--cyan)' : 'none',
              padding: '14px',
              borderRadius: '8px',
              fontWeight: 900,
              fontSize: '1.1rem',
              letterSpacing: '1px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              textTransform: 'uppercase',
              boxShadow: isLoading ? 'none' : '0 0 20px rgba(0,240,255,0.5)',
              transition: 'all 0.3s'
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="spin" /> Establish Connection...
              </>
            ) : (
              <>
                <KeyRound size={20} /> Initialize Session
              </>
            )}
          </button>
        </form>
      </div>

      {/* Global CSS for spin class directly injected since it's just one loader */}
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
      `}</style>
    </motion.div>
  );
};

export default LoginScreen;
