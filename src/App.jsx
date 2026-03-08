import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Zap, RefreshCcw, ChevronRight, Cpu, Triangle, RotateCcw } from 'lucide-react';
import MazeMode from './components/MazeMode';
import SurvivalMode from './components/SurvivalMode';

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
  const [screen, setScreen] = useState('start');
  const [score, setScore]   = useState(0);
  const [shake, setShake]   = useState(false);
  const [selectedMode, setSelectedMode] = useState(null);

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

  return (
    <div className={shake ? 'screen-shake' : ''} style={{ minHeight: '100vh' }}>
      <Stars />
      <Glitch active={shake} />

      {/* Corner HUD decorations */}
      <div style={corner('top-left')} />
      <div style={corner('top-right')} />
      <div style={corner('bottom-left')} />
      <div style={corner('bottom-right')} />

      <AnimatePresence mode="wait">
        {screen === 'start'    && <StartScreen    key="start" onStart={startGame} />}
        {screen === 'maze'     && <MazeMode       key="maze" onGameOver={s => end(s,'gameover')} onVictory={s => end(s,'victory')} onIntensityChange={triggerShake} />}
        {screen === 'survival' && <SurvivalMode   key="surv" onGameOver={s => end(s,'gameover')} onIntensityChange={triggerShake} />}
        {(screen === 'gameover' || screen === 'victory') && (
          <EndScreen key="end" type={screen} score={score} onRestart={() => setScreen('start')} />
        )}
      </AnimatePresence>
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
const StartScreen = ({ onStart }) => {
  const [hover, setHover] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }}
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', zIndex: 5 }}
    >
      <div style={{ maxWidth: 800, width: '100%', textAlign: 'center' }}>

        {/* Badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 18px', borderRadius: 99,
            background: 'rgba(0,240,255,0.07)', border: '1px solid rgba(0,240,255,0.2)',
            marginBottom: '2rem'
          }}
        >
          <Triangle size={10} fill="rgba(0,240,255,0.8)" style={{ color: 'transparent' }} />
          <span className="hud-label" style={{ color: 'var(--cyan)' }}>Neural Interface Active — v2.1.0</span>
          <Triangle size={10} fill="rgba(0,240,255,0.8)" style={{ color: 'transparent', transform: 'rotate(180deg)' }} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-hud)',
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
            background: 'linear-gradient(180deg, #fff 30%, rgba(0,240,255,0.5) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          CODE<br />RUNNER
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          style={{ color: 'var(--dim)', fontSize: '1rem', maxWidth: 440, margin: '0 auto 3.5rem', lineHeight: 1.7 }}
        >
          Deploy Python scripts, solve logic sequences, and maintain core stability in a high-fidelity digital battlefield.
        </motion.p>

        {/* Mode Cards */}
        <motion.div
          initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.45 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}
        >
          {[
            {
              id: 'maze', icon: <Play size={28} />, label: 'Maze Escape',
              sub: '30s per challenge · 10 levels · Multiple choice', color: 'var(--cyan)'
            },
            {
              id: 'survival', icon: <Zap size={28} />, label: 'Python Survival',
              sub: '10 min endurance · Type real Python · Live execution', color: 'var(--purple)'
            }
          ].map(m => (
            <motion.button
              key={m.id}
              onHoverStart={() => setHover(m.id)}
              onHoverEnd={() => setHover(null)}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onStart(m.id)}
              style={{
                background: hover === m.id ? `rgba(${m.id === 'maze' ? '0,240,255' : '168,85,247'},0.08)` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${hover === m.id ? (m.id === 'maze' ? 'rgba(0,240,255,0.35)' : 'rgba(168,85,247,0.35)') : 'rgba(255,255,255,0.07)'}`,
                borderRadius: '1.25rem',
                padding: '2rem',
                textAlign: 'left',
                transition: 'all 0.25s ease',
                boxShadow: hover === m.id ? `0 20px 50px ${m.id === 'maze' ? 'rgba(0,240,255,0.1)' : 'rgba(168,85,247,0.1)'}` : 'none',
                position: 'relative', overflow: 'hidden'
              }}
            >
              <div style={{ color: m.color, marginBottom: '1rem' }}>{m.icon}</div>
              <div style={{ fontFamily: 'var(--font-hud)', fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>
                {m.label}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--dim)', lineHeight: 1.6 }}>{m.sub}</div>
              
              {/* Arrow */}
              <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', color: m.color, opacity: hover === m.id ? 1 : 0.3, transition: 'opacity 0.2s' }}>
                <ChevronRight size={20} />
              </div>

              {/* Glow corner */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: 80, height: 80,
                background: `radial-gradient(circle at top right, ${m.color}20, transparent)`,
                pointerEvents: 'none'
              }} />
            </motion.button>
          ))}
        </motion.div>

        {/* Tech tags */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {['Python 3', 'Brython Engine', 'React 19', 'Framer Motion'].map(t => (
            <span key={t} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              color: 'var(--dim)', padding: '4px 12px',
              border: '1px solid var(--border)', borderRadius: 99
            }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/* ── END SCREEN ─────────────────────────────────────── */
const EndScreen = ({ type, score, onRestart }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
    style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, position: 'relative', padding: '2rem' }}
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
