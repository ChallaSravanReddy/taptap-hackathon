import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Pet = ({ state }) => {
  const cfg = useMemo(() => ({
    healthy: {
      gradient: 'radial-gradient(circle at 35% 35%, #00f0ff, #4facfe 60%, #0a2550)',
      glow: 'rgba(0,240,255,0.6)',
      glowSoft: 'rgba(0,240,255,0.15)',
      eyeColor: '#fff',
      label: 'NOMINAL',
      labelColor: 'var(--cyan)',
      anim: { y: [0, -14, 0], scale: [1, 1.03, 1] },
      transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
      ringColor: 'rgba(0,240,255,0.4)',
    },
    warning: {
      gradient: 'radial-gradient(circle at 35% 35%, #ffd60a, #ff9f43 60%, #3d1a00)',
      glow: 'rgba(255,214,10,0.6)',
      glowSoft: 'rgba(255,214,10,0.12)',
      eyeColor: '#fff',
      label: 'DEGRADED',
      labelColor: 'var(--yellow)',
      anim: { rotate: [-1, 1, -1], y: [0, -6, 0] },
      transition: { duration: 1.5, repeat: Infinity },
      ringColor: 'rgba(255,214,10,0.4)',
    },
    critical: {
      gradient: 'radial-gradient(circle at 35% 35%, #ff2d55, #ff6b6b 60%, #300010)',
      glow: 'rgba(255,45,85,0.7)',
      glowSoft: 'rgba(255,45,85,0.15)',
      eyeColor: '#fff',
      label: '!!! CRITICAL !!!',
      labelColor: 'var(--red)',
      anim: { x: [0,-5,5,-4,4,-2,2,0], scale: [1,1.07,0.95,1.04,1] },
      transition: { duration: 0.35, repeat: Infinity },
      ringColor: 'rgba(255,45,85,0.5)',
    }
  }), []);

  const c = cfg[state] || cfg.healthy;
  const isCrit = state === 'critical';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>

      {/* ── Avatar Glow Base ── */}
      <div style={{ position: 'relative', width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* Soft ambient glow */}
        <div style={{
          position: 'absolute', inset: -20,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${c.glowSoft}, transparent 70%)`,
          animation: 'petGlow 2s ease-in-out infinite'
        }} />

        {/* Pulse ring */}
        <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: `1.5px solid ${c.ringColor}`, animation: 'pulseRing 2s ease-out infinite' }} />
        {isCrit && <div style={{ position: 'absolute', inset: -12, borderRadius: '50%', border: `1px solid ${c.ringColor}`, animation: 'pulseRing 2s ease-out infinite 0.4s' }} />}

        {/* Main orb */}
        <motion.div
          animate={c.anim}
          transition={c.transition}
          style={{
            width: 128, height: 128,
            borderRadius: '50%',
            background: c.gradient,
            boxShadow: `0 0 30px ${c.glow}, 0 0 80px ${c.glow}40, inset 0 -10px 30px rgba(0,0,0,0.4), inset 0 4px 12px rgba(255,255,255,0.2)`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 8, position: 'relative'
          }}
        >
          {/* Specular highlight */}
          <div style={{
            position: 'absolute', top: '12%', left: '20%',
            width: '35%', height: '18%',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)',
            transform: 'rotate(-20deg)',
            filter: 'blur(2px)'
          }} />

          {/* Eyes */}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: 8 }}>
            {[0, 1].map(i => (
              <motion.div
                key={i}
                animate={isCrit ? { scaleY: [1, 0.15, 1] } : { scaleY: 1 }}
                transition={isCrit ? { duration: 0.2, repeat: Infinity, repeatDelay: 0.1 } : {}}
                style={{
                  width: 12, height: 12, borderRadius: '50%',
                  background: '#fff',
                  boxShadow: '0 0 8px rgba(255,255,255,0.8)',
                }}
              />
            ))}
          </div>

          {/* Mouth */}
          <motion.div
            animate={isCrit ? { scaleX: 0.5, borderRadius: '3px' } : { scaleX: 1 }}
            style={{ width: 30, height: 5, borderRadius: '4px', background: 'rgba(255,255,255,0.3)' }}
          />
        </motion.div>
      </div>

      {/* Status label */}
      <div style={{ textAlign: 'center' }}>
        <div className="hud-label" style={{ marginBottom: 4 }}>Digital Core</div>
        <motion.div
          animate={isCrit ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
          transition={isCrit ? { duration: 0.5, repeat: Infinity } : {}}
          className="hud-label"
          style={{ color: c.labelColor, fontSize: '0.7rem', letterSpacing: '0.25em' }}
        >
          {c.label}
        </motion.div>
      </div>

      <style>{`
        @keyframes petGlow {
          0%,100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default Pet;
