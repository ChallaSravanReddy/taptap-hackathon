import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Zap, RefreshCcw, ChevronRight, Cpu, Triangle, RotateCcw, Terminal } from 'lucide-react';
import MazeMode from './components/MazeMode';
import SurvivalMode from './components/SurvivalMode';
import LoginScreen from './components/LoginScreen';
import DashboardLayout from './components/DashboardLayout';
import DashboardView from './components/DashboardView';
import ProfileView from './components/ProfileView';
import LearnView from './components/LearnView';
import AssessView from './components/AssessView';
import PrepareView from './components/PrepareView';
import GamesView from './components/GamesView';
import JobsView from './components/JobsView';
import StudyAbroadView from './components/StudyAbroadView';
import CollegeView from './components/CollegeView';


/* ── SCREEN GLITCH ─────────────────────────────────── */
const Glitch = ({ active }) => (
  <AnimatePresence>
    {active && (
      <motion.div
        key="glitch"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.12, 0, 0.08, 0] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, times: [0, 0.2, 0.4, 0.6, 1] }}
        style={{
          position: 'fixed', inset: 0, zIndex: 200, pointerEvents: 'none',
          background: 'rgba(255,45,85,0.06)',
          boxShadow: 'inset 0 0 80px rgba(255,45,85,0.1)'
        }}
      />
    )}
  </AnimatePresence>
);

/* ── STAR PARTICLES ────────────────────────────────── */
const Stars = () => {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
  }));
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      {stars.map(s => (
        <motion.div
          key={s.id}
          animate={{ opacity: [0.1, 0.8, 0.1] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity }}
          style={{
            position: 'absolute',
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.size, height: s.size,
            borderRadius: '50%',
            background: 'rgba(0,240,255,0.9)',
            boxShadow: '0 0 4px rgba(0,240,255,0.6)'
          }}
        />
      ))}
    </div>
  );
};

/* ── MAIN APP ──────────────────────────────────────── */
const App = () => {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState('start');
  const [score, setScore]   = useState(0);
  const [shake, setShake]   = useState(false);
  const [selectedMode, setSelectedMode] = useState(null);
  const [dashboardTab, setDashboardTab] = useState('Dashboard');

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 450);
  };

  const startGame = (mode) => {
    setScore(0);
    setSelectedMode(mode);
    setScreen(mode);
  };

  const end = (final, type) => {
    setScore(final);
    setScreen(type);
  };

  const handleLaunchGame = (mode) => {
    startGame(mode);
    setDashboardTab('Games');
  };

  return (
    <div className={shake ? 'screen-shake' : ''} style={{ minHeight: '100vh', position: 'relative' }}>
      {!user && (
        <>
          <div className="crt-overlay" />
          <Stars />
          <Glitch active={shake} />
        </>
      )}

      {!user ? (
        <AnimatePresence mode="wait">
          <LoginScreen key="login" onLogin={setUser} />
        </AnimatePresence>
      ) : (
        <DashboardLayout user={user} activeTab={dashboardTab} onTabChange={setDashboardTab}>
          
          {dashboardTab === 'Dashboard' && <DashboardView user={user} onNavigate={setDashboardTab} onLaunchGame={handleLaunchGame} />}
          
          {dashboardTab === 'Profile' && <ProfileView user={user} onNavigate={setDashboardTab} />}

          {dashboardTab === 'Learn' && <LearnView />}

          {dashboardTab === 'Assess' && <AssessView />}

          {dashboardTab === 'Prepare' && screen === 'start' && <PrepareView onNavigate={setDashboardTab} onLaunchGame={handleLaunchGame} />}

          {dashboardTab === 'Games' && screen === 'start' && <GamesView onLaunchGame={handleLaunchGame} />}

          {['Prepare', 'Games'].includes(dashboardTab) && screen !== 'start' && (
              <div style={{ position: 'relative', width: '100%', flex: 1, minHeight: 'calc(100vh - 70px)', background: '#0f172a', overflow: 'hidden', borderRadius: '24px' }}>
                <div className="crt-overlay" />
                <Stars />
                <Glitch active={shake} />

                <div style={corner('top-left')} />
                <div style={corner('top-right')} />
                <div style={corner('bottom-left')} />
                <div style={corner('bottom-right')} />

                <AnimatePresence mode="wait">
                  {screen === 'maze'     && <MazeMode       key="maze" onGameOver={s => end(s,'gameover')} onVictory={s => end(s,'victory')} onIntensityChange={triggerShake} />}
                  {screen === 'survival' && <SurvivalMode   key="survival" onGameOver={s => end(s,'gameover')} onIntensityChange={triggerShake} />}
                  {(screen === 'gameover' || screen === 'victory') && (
                    <EndScreen key="end" type={screen} score={score} onRestart={() => setScreen('start')} />
                  )}
                </AnimatePresence>
                
                {/* Back to Prepare Hub button */}
                <button 
                  onClick={() => setScreen('start')}
                  style={{ position: 'absolute', bottom: '24px', right: '24px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', zIndex: 100 }}
                >
                  Exit Game
                </button>
              </div>
          )}

          {dashboardTab === 'Job Posts' && <JobsView />}

          {dashboardTab === 'Study Abroad' && <StudyAbroadView />}

          {dashboardTab === 'My College' && <CollegeView />}

          {!['Dashboard', 'Profile', 'Learn', 'Assess', 'Prepare', 'Games', 'Job Posts', 'Study Abroad', 'My College'].includes(dashboardTab) && (
            <div style={{ padding: '60px 40px', textAlign: 'center', background: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
               <div style={{ width: '80px', height: '80px', background: '#f8fafc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', margin: '0 auto 24px' }}>
                  <Terminal size={40} />
               </div>
               <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', margin: '0 0 12px 0' }}>{dashboardTab}</h2>
               <p style={{ margin: '0 auto 32px auto', color: '#64748b', fontSize: '1.1rem', maxWidth: '400px' }}>This intelligence module is currently being calibrated. Check back soon for the full experience.</p>
               <button onClick={() => setDashboardTab('Dashboard')} style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>Return to Dashboard</button>
            </div>
          )}
        </DashboardLayout>
      )}
    </div>
  );
};

/* ── CORNER DECORATION ─────────────────────────────── */
const corner = (pos) => {
  const base = { position: 'fixed', zIndex: 10, pointerEvents: 'none', width: 40, height: 40 };
  const styles = {
    'top-left':     { top: 16, left: 16,  borderTop: '1px solid rgba(0,240,255,0.3)', borderLeft: '1px solid rgba(0,240,255,0.3)' },
    'top-right':    { top: 16, right: 16,  borderTop: '1px solid rgba(0,240,255,0.3)', borderRight: '1px solid rgba(0,240,255,0.3)' },
    'bottom-left':  { bottom: 16, left: 16, borderBottom: '1px solid rgba(0,240,255,0.3)', borderLeft: '1px solid rgba(0,240,255,0.3)' },
    'bottom-right': { bottom: 16, right: 16, borderBottom: '1px solid rgba(0,240,255,0.3)', borderRight: '1px solid rgba(0,240,255,0.3)' },
  };
  return { ...base, ...styles[pos] };
};

/* ── START SCREEN ──────────────────────────────────── */
const StartScreen = ({ user, onStart }) => {
  const [hover, setHover] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', zIndex: 5, overflowY: 'auto' }}
    >
      <div style={{ maxWidth: 900, width: '100%', textAlign: 'center' }}>

        {/* Badge */}
        <motion.div
          initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, type: 'spring' }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '8px 24px', borderRadius: 0,
            background: 'linear-gradient(90deg, rgba(0,240,255,0.02), rgba(0,240,255,0.1) 50%, rgba(0,240,255,0.02))', 
            borderTop: '1px solid rgba(0,240,255,0.3)', borderBottom: '1px solid rgba(0,240,255,0.3)',
            marginBottom: '2rem', backdropFilter: 'blur(4px)'
          }}
        >
          <Triangle size={12} fill="var(--cyan)" style={{ color: 'transparent', filter: 'drop-shadow(0 0 4px var(--cyan))' }} />
          <span className="hud-label" style={{ color: 'var(--cyan)' }}>Welcome {user?.handle} // {user?.college} // Lvl: {user?.role}</span>
          <Triangle size={12} fill="var(--cyan)" style={{ color: 'transparent', transform: 'rotate(180deg)', filter: 'drop-shadow(0 0 4px var(--cyan))' }} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 40, opacity: 0, filter: 'blur(20px)' }} animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }} transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gradient"
          style={{
            fontFamily: 'var(--font-hud)',
            fontSize: 'clamp(4rem, 12vw, 8rem)',
            fontWeight: 900,
            lineHeight: 0.85,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
            position: 'relative'
          }}
        >
          CODE<br />RUNNER
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          style={{ color: 'var(--text)', fontSize: '1.1rem', maxWidth: 500, margin: '0 auto 4rem', lineHeight: 1.8, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
        >
          Deploy script executions, bypass logic firewalls, and maintain system stability in a high-fidelity tactical environment.
        </motion.p>

        {/* Mode Cards */}
        <motion.div
          initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }}
          className="grid-2col"
          style={{ marginBottom: '4rem', perspective: '1200px' }}
        >
          {[
            {
              id: 'maze', icon: <Play size={32} strokeWidth={1.5} />, label: 'Maze Escape',
              sub: '30s / Node · Logic Sequences', color: 'var(--cyan)'
            },
            {
              id: 'survival', icon: <Zap size={32} strokeWidth={1.5} />, label: 'Endurance',
              sub: 'Live Python · Core Life Support', color: 'var(--blue)'
            }
          ].map(m => (
            <motion.button
              key={m.id}
              onHoverStart={() => setHover(m.id)}
              onHoverEnd={() => setHover(null)}
              whileHover={{ scale: 1.02, rotateX: 2, rotateY: m.id === 'maze' ? -2 : 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStart(m.id)}
              style={{
                background: hover === m.id ? `linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(30,58,138,0.4) 100%)` : 'rgba(15,23,42,0.6)',
                border: '1px solid',
                borderColor: hover === m.id ? m.color : 'rgba(255,255,255,0.1)',
                clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)',
                padding: '2.5rem 2rem',
                textAlign: 'left',
                backdropFilter: 'blur(20px)',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                boxShadow: hover === m.id ? `0 20px 50px rgba(0,0,0,0.5), inset 0 0 20px ${m.color}20, 0 0 30px ${m.color}40` : '0 10px 30px rgba(0,0,0,0.5)',
                position: 'relative', overflow: 'hidden'
              }}
            >
              {/* Scanline overlay on hover */}
              <AnimatePresence>
                {hover === m.id && (
                  <motion.div
                    initial={{ top: '-10%' }} animate={{ top: '110%' }} exit={{ opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    style={{ position: 'absolute', left: 0, width: '100%', height: '2px', background: m.color, opacity: 0.5, boxShadow: `0 0 10px ${m.color}` }}
                  />
                )}
              </AnimatePresence>

              <div style={{ color: m.color, marginBottom: '1.25rem', filter: `drop-shadow(0 0 8px ${m.color})` }}>{m.icon}</div>
              <div style={{ fontFamily: 'var(--font-hud)', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem', color: '#fff', textTransform: 'uppercase' }}>
                {m.label}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--dim)', lineHeight: 1.6, fontFamily: 'var(--font-mono)' }}>{m.sub}</div>
              
              {/* Arrow */}
              <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', color: m.color, opacity: hover === m.id ? 1 : 0.3, transition: 'opacity 0.3s', transform: hover === m.id ? 'translateX(5px)' : 'none' }}>
                <ChevronRight size={24} />
              </div>

              {/* Angle accent corner */}
              <div style={{ position: 'absolute', top: 0, right: 0, width: 40, height: 40, borderRight: `2px solid ${m.color}`, borderTop: `2px solid ${m.color}`, opacity: hover === m.id ? 1 : 0.1, transform: 'translate(-10px, 10px)' }} />
            </motion.button>
          ))}
        </motion.div>

        {/* Tech tags */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="mobile-hidden"
          style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}
        >
          {['SYS.CORE 3.1', 'R-ENGINE', 'BRY-COMPILER', 'FMX-RENDER'].map(t => (
            <span key={t} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              color: 'var(--cyan)', opacity: 0.6, padding: '4px 12px',
              border: '1px solid rgba(0,240,255,0.2)', background: 'rgba(0,240,255,0.03)',
              clipPath: 'polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)'
            }}>{t}</span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ── END SCREEN ─────────────────────────────────────── */
const EndScreen = ({ type, score, onRestart }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
    style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, position: 'relative', padding: '2rem', overflowY: 'auto' }}
  >
    <div style={{ textAlign: 'center', maxWidth: 480 }}>
      <div className="hud-label" style={{ marginBottom: '1.5rem', color: type === 'victory' ? 'var(--green)' : 'var(--red)' }}>
        {type === 'victory' ? '— Mission Complete —' : '— System Failure —'}
      </div>
      <h1 style={{ fontFamily: 'var(--font-hud)', fontSize: '2.5rem', fontWeight: 900, marginBottom: '2.5rem' }}>
        {type === 'victory' ? 'CORE STABILIZED' : 'CORE OFFLINE'}
      </h1>

      <div className="g-panel" style={{ padding: '2.5rem', marginBottom: '2rem', borderRadius: '1.5rem' }}>
        <div className="hud-label" style={{ marginBottom: '0.75rem' }}>Integrity Score</div>
        <div className={`hud-value ${type === 'victory' ? 'hud-value-good' : 'hud-value-crit'}`} style={{ fontSize: '5rem', lineHeight: 1 }}>
          {score}
        </div>
      </div>

      <button className="g-btn-ghost" onClick={onRestart} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
        <RotateCcw size={16} /> Re-Initialize
      </button>
    </div>
  </motion.div>
);

export default App;
