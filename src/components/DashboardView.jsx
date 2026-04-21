import React, { useState, useEffect } from 'react';
import { GameConfigService } from '../data/GameConfigService';

/* ── DESIGN TOKENS (from dashboard2.html) ── */
const T = {
  bg:         '#e8e4f0',
  surface:    '#fbfaff',
  surface2:   '#f0ecfa',
  border:     'rgba(83,74,183,.12)',
  borderH:    'rgba(83,74,183,.22)',
  text:       '#1a1830',
  text2:      '#5c5878',
  text3:      '#8b879e',
  coral:      '#e85d4c',
  coralLt:    '#fff0ec',
  coralMid:   '#ff8a6b',
  purple:     '#534AB7',
  purpleLt:   '#EEEDFE',
  purpleMid:  '#7F77DD',
  purpleDk:   '#3C3489',
  green:      '#3B6D11',
  greenLt:    '#EAF3DE',
  greenMid:   '#639922',
  red:        '#A32D2D',
  redLt:      '#FCEBEB',
  amber:      '#854F0B',
  amberLt:    '#FAEEDA',
  amberMid:   '#EF9F27',
  teal:       '#0F6E56',
  tealLt:     '#E1F5EE',
  blueLt:     '#E6F1FB',
  blueDk:     '#0C447C',
};

/* ── SHARED CARD ─────────────────────────────── */
const Card = ({ style = {}, children, hover = false, onClick, className }) => {
  const [hovered, setHovered] = useState(false);
  const base = {
    background: 'linear-gradient(165deg,#fdfcff 0%,#f8f5ff 48%,#faf7fd 100%)',
    border: `0.5px solid ${hovered && hover ? T.borderH : T.border}`,
    borderRadius: 14,
    padding: '1.25rem 1.5rem',
    boxShadow: '0 2px 12px rgba(83,74,183,.08),0 1px 3px rgba(40,30,90,.05)',
    transition: 'border-color .15s, transform .15s, box-shadow .15s',
    transform: hovered && hover ? 'translateY(-1px)' : 'none',
    cursor: hover || onClick ? 'pointer' : 'default',
    ...style,
  };
  return (
    <div
      style={base}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

/* ── PILL BUTTON (purple) ─────────────────────── */
const BtnPurple = ({ children, onClick, style = {} }) => {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        position: 'relative', overflow: 'hidden',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: 6, borderRadius: 90, fontWeight: 600, border: 'none', outline: 'none',
        fontFamily: 'DM Sans, sans-serif', cursor: 'pointer', color: '#fff',
        background: 'linear-gradient(182deg,#A89BFC 2%,#6C5CE7 98%)',
        boxShadow: h
          ? '0 6px 14px rgba(108,92,231,.35),inset 0 1px 1px rgba(255,255,255,.18),inset 0 -2px 2px rgba(72,52,180,.60)'
          : '0 3px 5px rgba(108,92,231,.22),inset 0 1px 1px rgba(255,255,255,.18),inset 0 -2px 2px rgba(72,52,180,.60)',
        transition: 'all .25s cubic-bezier(.34,1.56,.64,1)',
        padding: '8px 18px', fontSize: 13,
        transform: h ? 'scale(1)' : 'scale(1)',
        ...style,
      }}
    >
      {children}
    </button>
  );
};

/* ── OUTLINE BUTTON (secondary) ────────────────── */
const BtnSecondary = ({ children, onClick, style = {} }) => {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        position: 'relative', overflow: 'hidden',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: 6, borderRadius: 90, fontWeight: 600, border: 'none', outline: 'none',
        fontFamily: 'DM Sans, sans-serif', cursor: 'pointer', color: '#6C5CE7',
        background: 'linear-gradient(180deg,#F4F2FF 0%,#EAE6FF 100%)',
        boxShadow: h
          ? '0 4px 10px rgba(108,92,231,.14),inset 0 -3px 2px rgba(156,147,251,.20)'
          : '0 2px 4px rgba(0,0,0,.06),inset 0 -3px 2px rgba(156,147,251,.14)',
        transition: 'all .25s cubic-bezier(.34,1.56,.64,1)',
        padding: '8px 18px', fontSize: 13,
        ...style,
      }}
    >
      {children}
    </button>
  );
};

/* ── SMALL SCORE ROW ──────────────────────────── */
const ScoreRow = ({ label, pct, color, flag }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
    <span style={{ fontSize: 12, color: T.text2, width: 68 }}>
      {label} {flag && <span style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em', color: T.text3 }}>{flag}</span>}
    </span>
    <div style={{ flex: 1, height: 5, background: T.surface2, borderRadius: 99 }}>
      <div style={{ width: `${pct}%`, height: '100%', borderRadius: 99, background: color, transition: 'width .6s ease' }} />
    </div>
    <span style={{ fontSize: 12, color: T.text2, width: 32, textAlign: 'right' }}>{pct}%</span>
  </div>
);

/* ── CHEVRON SVG ──────────────────────────────── */
const Chev = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 3 }}>
    <path d="M4.5 2.5L8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
const DashboardView = ({ user, onNavigate, onLaunchGame }) => {
  const [todayGame, setTodayGame] = useState(null);
  const [solvedCount, setSolvedCount] = useState({ coding: false, aptitude: false, verbal: false });

  useEffect(() => {
    const fetchGame = async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data } = await GameConfigService.getScheduleForDate(today);
      setTodayGame(data || {
        gameId: 'maze', title: 'Two Sum Problem',
        desc: 'Find two numbers that add up to a target value. Test your array skills!'
      });
    };
    fetchGame();
  }, []);

  const userName = user?.name || user?.email?.split('@')[0] || 'Student';
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      color: T.text,
      fontSize: 14,
      lineHeight: 1.5,
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      padding: '0 0 3rem',
      maxWidth: 1100,
      margin: '0 auto',
      width: '100%',
    }}>

      {/* ── INTRO HEADER ─────────────────────────── */}
      <header style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', maxWidth: '42rem' }}>
        <h1 style={{
          fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)', fontWeight: 500, color: T.text,
          letterSpacing: '-.02em', lineHeight: 1.25, margin: 0
        }}>
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {userName} 👋
        </h1>
        <p style={{ fontSize: 13, lineHeight: 1.45, color: T.text2, margin: 0 }}>
          Your placement prep — daily challenges, MET analytics, and company insights in one place.
        </p>
      </header>

      {/* ══ ROW 1: Profile + Smart Interview + Activities ══ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '1.25rem', alignItems: 'start' }}>

        {/* ── LEFT STACK ────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minWidth: 0 }}>

          {/* PROFILE CARD */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              {/* Avatar Ring */}
              <div style={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}>
                <svg width="64" height="64" viewBox="0 0 64 64" style={{ position: 'absolute', top: 0, left: 0 }}>
                  <circle cx="32" cy="32" r="26" fill="none" stroke="#E8E6E3" strokeWidth="2.5" pathLength="100" />
                  <circle cx="32" cy="32" r="26" fill="none" stroke={T.purple} strokeWidth="2.5" strokeLinecap="round"
                    pathLength="100" strokeDasharray="100" strokeDashoffset="32" transform="rotate(-90 32 32)" />
                </svg>
                <div style={{
                  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                  width: 40, height: 40, borderRadius: '50%', background: T.surface, border: '2px solid #fff',
                  boxShadow: `0 0 0 0.5px ${T.border}`, color: T.purple,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 500,
                }}>
                  {initials}
                </div>
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
                  <span style={{ fontSize: 15, fontWeight: 500 }}>{userName}</span>
                  <span title="Verified" style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" fill={T.purple} />
                      <path d="M8 12l2.5 2.5 5-5" stroke="#fff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px 8px', marginTop: 4 }}>
                  <span style={{ fontSize: 13, color: T.text2 }}>Software Developer</span>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', fontSize: 10, fontWeight: 500,
                    letterSpacing: '.05em', textTransform: 'uppercase', padding: '3px 8px',
                    borderRadius: 99, background: T.tealLt, color: T.teal,
                    border: `0.5px solid rgba(15,110,86,.22)`
                  }}>Explorer</span>
                </div>
                {/* Social links */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginTop: 8 }}>
                  {[
                    { title: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                    { title: 'GitHub', path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
                  ].map(s => (
                    <a key={s.title} href="#" title={s.title} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 30, height: 30, borderRadius: 8,
                      background: T.surface2, border: `0.5px solid ${T.border}`,
                      color: T.text2, textDecoration: 'none', transition: 'all .15s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.color = T.purple; e.currentTarget.style.background = T.purpleLt; }}
                      onMouseLeave={e => { e.currentTarget.style.color = T.text2; e.currentTarget.style.background = T.surface2; }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d={s.path} /></svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Progress */}
            <div style={{ marginTop: '0.65rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ width: '100%', height: 4, background: T.surface2, borderRadius: 99 }}>
                <div style={{ width: '68%', height: '100%', borderRadius: 99, background: T.purple }} />
              </div>
              <span style={{ fontSize: 12, color: T.text3 }}>68% profile complete</span>
            </div>
            <BtnSecondary onClick={() => onNavigate('Profile')} style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}>
              Update Profile
            </BtnSecondary>
          </Card>

          {/* SMART INTERVIEW CARD — claim state */}
          <div style={{
            borderRadius: 14, padding: '1.15rem 1.25rem 1.1rem',
            background: 'linear-gradient(135deg,#6A62D4 0%,#534AB7 48%,#43398f 100%)',
            border: '0.5px solid rgba(255,255,255,.14)',
            boxShadow: '0 2px 12px rgba(83,74,183,.08)',
            color: '#fff', display: 'flex', flexDirection: 'column', gap: '0.75rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
              <h2 style={{ fontSize: 14, fontWeight: 500, color: '#fff', margin: 0 }}>Smart Interview</h2>
              <span style={{
                flexShrink: 0, fontSize: 9, fontWeight: 500, letterSpacing: '.06em',
                padding: '4px 9px', borderRadius: 99, background: 'rgba(255,255,255,.2)', color: '#fff',
                border: '0.5px solid rgba(255,255,255,.22)',
              }}>FREE PLAN</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem 1.25rem' }}>
              <div style={{ flex: 1, minWidth: 'min(180px,100%)' }}>
                <p style={{ fontSize: 12, lineHeight: 1.5, color: 'rgba(255,255,255,.88)', margin: '0 0 0.3rem' }}>
                  AI mock interview with instant feedback.
                </p>
                <p style={{ fontSize: 11, lineHeight: 1.35, color: 'rgba(255,255,255,.72)', margin: 0 }}>
                  One free credit · Personalized questions · Feedback report
                </p>
              </div>
              <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <button style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  whiteSpace: 'nowrap', padding: '8px 16px', fontSize: 12,
                  borderRadius: 90, border: 'none', cursor: 'pointer', fontWeight: 600,
                  color: '#6C5CE7', background: 'linear-gradient(180deg,#F4F2FF 0%,#EAE6FF 100%)',
                  fontFamily: 'DM Sans, sans-serif',
                }}>
                  Claim free credit <Chev />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── ACTIVITIES CARD ───────────────────── */}
        <Card style={{ padding: '0.85rem 1rem', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ paddingBottom: '0.5rem', marginBottom: '0.25rem', borderBottom: `0.5px solid ${T.border}` }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: T.text2 }}>Still to do</div>
            <p style={{ fontSize: 11, color: T.text3, margin: '0.35rem 0 0', lineHeight: 1.35 }}>
              Only actions that are still pending — nothing completed shows up here.
            </p>
          </div>

          {/* Activity item — Challenge */}
          {[
            {
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" stroke={T.purple} strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke={T.purple} strokeWidth="1.5" strokeLinecap="round" /></svg>,
              name: 'Challenge of the day', sub: `Coding · ${todayGame?.title || 'Loading...'}`, cta: 'Solve',
              onClick: () => onLaunchGame(todayGame?.gameId || 'maze')
            },
            {
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke={T.purple} strokeWidth="1.5" strokeLinejoin="round" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke={T.purple} strokeWidth="1.5" strokeLinecap="round" /></svg>,
              name: 'Generate resume', sub: 'One-click PDF from your profile', cta: 'Open',
              onClick: () => onNavigate('Profile')
            },
          ].map((item, i) => (
            <div key={i}
              onClick={item.onClick}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                padding: '0.55rem 0.35rem', borderBottom: `0.5px solid ${T.border}`,
                cursor: 'pointer', borderRadius: 6, margin: '0 -0.35rem',
                transition: 'background .12s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = T.surface2}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ flexShrink: 0, width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>{item.icon}</span>
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: T.text, lineHeight: 1.25 }}>{item.name}</span>
                <span style={{ fontSize: 11, color: T.text2, lineHeight: 1.35 }}>{item.sub}</span>
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: 11, fontWeight: 500, color: T.purple, alignSelf: 'center', whiteSpace: 'nowrap' }}>
                {item.cta}<Chev />
              </span>
            </div>
          ))}

          {/* Courses */}
          <div style={{ padding: '0.5rem 0 0.35rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: T.text }}>Courses to complete</span>
              <a href="#" onClick={e => { e.preventDefault(); onNavigate('Learn'); }}
                style={{ display: 'inline-flex', alignItems: 'center', fontSize: 11, fontWeight: 500, color: T.purple, textDecoration: 'none' }}>
                See all<Chev />
              </a>
            </div>
            {[
              { abbr: 'DS', title: 'Data Structures & Algorithms', pct: 35, color: T.purpleMid },
              { abbr: 'PY', title: 'Python Foundations', pct: 10, color: T.greenMid },
              { abbr: 'SY', title: 'System Design', pct: 0, color: T.greenMid },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.4rem' }}>
                <span style={{
                  width: 26, height: 26, borderRadius: 6, background: T.surface2,
                  border: `0.5px solid ${T.border}`, fontSize: 9, fontWeight: 500, color: T.text2,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>{c.abbr}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 10, color: T.text2, display: 'block', marginBottom: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</span>
                  <div style={{ height: 3, background: T.surface2, borderRadius: 99 }}>
                    <div style={{ width: `${c.pct}%`, height: '100%', borderRadius: 99, background: c.color }} />
                  </div>
                </div>
                <span style={{ fontSize: 10, fontWeight: 500, color: T.text3, width: '2rem', textAlign: 'right' }}>{c.pct}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ══ BADGES ══ */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ fontSize: 14, fontWeight: 500 }}>My badges</div>
          <a href="#" style={{ display: 'inline-flex', alignItems: 'center', fontSize: 12, color: T.purple, textDecoration: 'none' }}>
            View all<Chev />
          </a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Hello World', earned: true, icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill={T.purple} /><path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke={T.purple} strokeWidth="1.5" strokeLinecap="round" /></svg> },
            { label: 'First MET', earned: true, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3l2.2 6.5H21l-5.6 4 2.1 6.5L12 16l-5.5 4 2.1-6.5L3 9.5h6.8z" fill={T.purple} /></svg> },
            { label: '10 Streak', earned: true, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H13L13 2z" fill={T.purple} /></svg> },
            { label: 'Solver ×100', earned: false, progress: '89/100' },
            { label: 'Band C', earned: false },
            { label: 'Interview Ready', earned: false },
          ].map((b, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: b.earned ? T.purpleLt : T.surface2,
                  border: b.earned ? `2px solid ${T.purpleMid}` : `1.5px dashed ${T.borderH}`,
                  opacity: b.earned ? 1 : 0.4,
                }}>
                  {b.icon || <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke={T.text3} strokeWidth="1.5" /><path d="M9 12l2 2 4-4" stroke={T.text3} strokeWidth="1.5" strokeLinecap="round" /></svg>}
                  {b.earned && (
                    <div style={{
                      position: 'absolute', bottom: -4, right: -4, width: 16, height: 16, borderRadius: '50%',
                      background: T.greenMid, border: '2px solid #fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" /></svg>
                    </div>
                  )}
                </div>
                {b.progress && (
                  <div style={{
                    position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)',
                    background: T.amberLt, color: T.amber, fontSize: 9, fontWeight: 500,
                    borderRadius: 99, padding: '1px 6px', whiteSpace: 'nowrap',
                  }}>{b.progress}</div>
                )}
              </div>
              <span style={{ fontSize: 10, fontWeight: b.earned ? 500 : 400, color: b.earned ? T.text2 : T.text3, textAlign: 'center', maxWidth: 60, lineHeight: 1.3, marginTop: b.progress ? 8 : 0 }}>
                {b.label}
              </span>
            </div>
          ))}

          {/* Badge progress mini */}
          <div style={{ marginLeft: 'auto', background: T.surface2, borderRadius: 8, padding: '.75rem 1rem', minWidth: 180 }}>
            <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 4 }}>3 of 6 earned</div>
            <div style={{ height: 4, background: T.borderH, borderRadius: 99, marginBottom: 5 }}>
              <div style={{ width: '50%', height: '100%', background: T.purple, borderRadius: 99 }} />
            </div>
            <div style={{ fontSize: 11, color: T.text3 }}>Solve 11 more problems to unlock Solver ×100.</div>
          </div>
        </div>
      </Card>

      {/* ══ ROW 2: MET + Practice Gauge + Rank & Bands ══ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '1.25rem' }}>

        {/* MET PERFORMANCE */}
        <Card hover onClick={() => onNavigate('Assess')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <span style={{ fontSize: 13, color: T.text2 }}>MET Performance</span>
            <span style={{ fontSize: 11, padding: '3px 9px', background: T.purpleLt, color: T.purpleDk, borderRadius: 99, fontWeight: 500 }}>Best + latest</span>
          </div>
          <p style={{ fontSize: 11, color: T.text3, lineHeight: 1.45, margin: '0 0 0.85rem' }}>
            Placement benchmarks use your <strong style={{ color: T.text }}>best</strong> scores across every MET you've taken.
          </p>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: T.text3, marginBottom: '0.45rem' }}>Best MET — all attempts</div>
            <div style={{ fontSize: 34, fontWeight: 500 }}>71.2 <span style={{ fontSize: 15, color: T.text3, fontWeight: 400 }}>/100</span></div>
            <div style={{ fontSize: 13, color: T.text3, marginTop: 2 }}>Band D · 4–5 LPA</div>
            <p style={{ fontSize: 12, color: T.text2, margin: '0.65rem 0 0.85rem', paddingBottom: '0.5rem', borderBottom: `0.5px solid ${T.border}` }}>
              <strong style={{ fontWeight: 500, color: T.text }}>3</strong> METs completed · section highs below
            </p>
            <ScoreRow label="Aptitude" pct={62} color={T.purpleMid} flag="best" />
            <ScoreRow label="English" pct={75} color="#1D9E75" flag="best" />
            <ScoreRow label="Coding" pct={85} color={T.greenMid} flag="best" />
          </div>
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: `0.5px solid ${T.border}` }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: T.text3, marginBottom: '0.45rem' }}>Latest attempt — Apr 2026</div>
            <div style={{ fontSize: 26, fontWeight: 500 }}>67.4 <span style={{ fontSize: 15, color: T.text3, fontWeight: 400 }}>/100</span></div>
            <ScoreRow label="Aptitude" pct={58} color={T.purpleMid} flag="latest" />
            <ScoreRow label="English" pct={71} color="#1D9E75" flag="latest" />
            <ScoreRow label="Coding" pct={82} color={T.greenMid} flag="latest" />
          </div>
          <a href="#" onClick={e => { e.preventDefault(); onNavigate('Assess'); }}
            style={{ display: 'inline-flex', alignItems: 'center', marginTop: 12, fontSize: 12, color: T.purple, textDecoration: 'none' }}>
            Prepare for next MET<Chev />
          </a>
        </Card>

        {/* QUESTIONS SOLVED + JOBS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Card>
            <div style={{ fontSize: 11, color: T.text3, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>Questions solved</div>
            {/* Gauge */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(0,1fr)', gap: '1rem 1.35rem', alignItems: 'start' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: 180, margin: '0 auto', aspectRatio: '1' }}>
                <svg viewBox="0 0 200 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
                  <g transform="translate(100,100) rotate(-135)">
                    <circle cx="0" cy="0" r="68" fill="none" stroke={T.surface2} strokeWidth="13" pathLength="100" strokeLinecap="round" />
                    <circle cx="0" cy="0" r="68" fill="none" stroke="#B8A9E8" strokeWidth="13" pathLength="100" strokeLinecap="round" strokeDasharray="32 68" />
                    <circle cx="0" cy="0" r="68" fill="none" stroke="#E8B87A" strokeWidth="13" pathLength="100" strokeLinecap="round" strokeDasharray="32 68" strokeDashoffset="-34" />
                    <circle cx="0" cy="0" r="68" fill="none" stroke="#8FB86A" strokeWidth="13" pathLength="100" strokeLinecap="round" strokeDasharray="32 68" strokeDashoffset="-68" />
                    <circle cx="0" cy="0" r="68" fill="none" stroke={T.purpleMid} strokeWidth="13" pathLength="100" strokeLinecap="round" strokeDasharray="1.49 98.51" />
                    <circle cx="0" cy="0" r="68" fill="none" stroke={T.amberMid} strokeWidth="13" pathLength="100" strokeLinecap="round" strokeDashoffset="-34" strokeDasharray="0.86 99.14" />
                    <circle cx="0" cy="0" r="68" fill="none" stroke={T.greenMid} strokeWidth="13" pathLength="100" strokeLinecap="round" strokeDashoffset="-68" strokeDasharray="0.35 99.65" />
                  </g>
                </svg>
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', lineHeight: 1.1 }}>
                  <span style={{ fontSize: 26, fontWeight: 600, color: T.text, letterSpacing: '-0.02em' }}>312</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: T.text3 }}>/10161</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', paddingTop: 4 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem 1.5rem' }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.05em', color: T.text3 }}>Accuracy</div>
                    <div style={{ fontSize: 20, fontWeight: 600, color: T.text, lineHeight: 1.2, marginTop: 2 }}>78%</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.05em', color: T.text3 }}>College rank</div>
                    <div style={{ fontSize: 20, fontWeight: 600, color: T.text, lineHeight: 1.2, marginTop: 2 }}>#14</div>
                    <div style={{ fontSize: 10, color: T.text3, marginTop: 2 }}>in practice</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 11, color: T.text2 }}>
                  <span style={{ fontSize: 10, color: T.text3, lineHeight: 1.35 }}>Pastel = full pool; bright = your completion</span>
                  {[{ color: T.purpleMid, label: 'Easy 187/4018' }, { color: T.amberMid, label: 'Med 98/3643' }, { color: T.greenMid, label: 'Hard 27/2500' }].map(l => (
                    <span key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: l.color, flexShrink: 0 }} />
                      {l.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <a href="#" onClick={e => { e.preventDefault(); onNavigate('Assess'); }}
              style={{ marginTop: 6, display: 'inline-flex', alignItems: 'center', fontSize: 12, color: T.purple, textDecoration: 'none', alignSelf: 'flex-start' }}>
              View full breakdown<Chev />
            </a>
          </Card>

          {/* JOBS CARD */}
          <Card hover onClick={() => onNavigate('Job Posts')} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: T.text3, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 2 }}>Jobs Applied</div>
              <div style={{ fontSize: 28, fontWeight: 500 }}>3</div>
              <div style={{ fontSize: 11, color: T.text3, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 2, marginTop: 6 }}>Shortlisted</div>
              <div style={{ fontSize: 28, fontWeight: 500 }}>5</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 6, fontSize: 11, background: T.tealLt, color: T.teal, padding: '3px 9px', borderRadius: 99 }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                Shortlisted: 1
              </div>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: T.tealLt, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="6" width="16" height="12" rx="2" stroke={T.teal} strokeWidth="1.5" />
                <path d="M6 6V5a4 4 0 018 0v1" stroke={T.teal} strokeWidth="1.5" />
              </svg>
            </div>
          </Card>
        </div>

        {/* RANK + MET BANDS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Card hover style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: T.purpleLt, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3l1.8 5.5H17l-4.6 3.3 1.7 5.4L10 14l-4.1 3.2 1.7-5.4L3 8.5h5.2z" fill={T.purple} />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: T.text3 }}>MET RANK</div>
              <div style={{ fontSize: 22, fontWeight: 500 }}>216</div>
              <div style={{ fontSize: 12, color: T.text3 }}>State rank</div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: 12, color: T.text3 }}>#1 College</div>
          </Card>

          <Card>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem 1rem', marginBottom: '0.75rem' }}>
              <div style={{ fontSize: 11, color: T.text3, textTransform: 'uppercase', letterSpacing: '.05em' }}>MET Bands</div>
              <button onClick={() => {}} style={{
                fontSize: 12, color: T.purple, background: 'none', border: 'none', padding: 0,
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 2,
              }}>View all<Chev /></button>
            </div>
            {[
              { name: 'Band F', label: '3 LPA', cls: 'f' },
              { name: 'Band E', label: '3–4 LPA', cls: 'f' },
              { name: 'Current — Band D', label: '4–5 LPA', cls: 'b', current: true },
              { name: 'Band C', label: '5–7 LPA', cls: 'c', next: true },
            ].map((b, i) => {
              const chipStyles = {
                f: { background: T.redLt, color: T.red },
                b: { background: T.purpleLt, color: T.purpleDk },
                c: { background: T.coralLt, color: '#633806' },
                a: { background: T.greenLt, color: T.green },
              }[b.cls];
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: b.current ? '7px 1.5rem' : '7px 0',
                  margin: b.current ? '0 -1.5rem' : 0,
                  borderBottom: i < 3 ? `0.5px solid ${T.border}` : 'none',
                  background: b.current ? T.purpleLt : 'transparent',
                  borderRadius: b.current ? 6 : 0,
                }}>
                  <span style={{ fontSize: 12, color: b.current ? T.purpleDk : T.text2, fontWeight: b.current ? 500 : 400 }}>
                    {b.name}
                    {b.next && <span style={{ fontSize: 10, color: T.amber, marginLeft: 4 }}>next target</span>}
                  </span>
                  <span style={{ fontSize: 11, padding: '2px 9px', borderRadius: 99, fontWeight: 500, ...chipStyles }}>{b.label}</span>
                </div>
              );
            })}
            <div style={{ marginTop: 10, fontSize: 11, color: T.text3, lineHeight: 1.5 }}>
              Score above <strong style={{ color: T.text }}>75</strong> on your next MET to reach Band C and unlock IBM & Wipro Elite.
            </div>
          </Card>
        </div>
      </div>

      {/* ══ COMPANY SCREENING PROBABILITY ══ */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Probability of clearing company screening</div>
            <div style={{ fontSize: 11, color: T.text3, marginTop: 2 }}>* Subject to eligibility criteria based on your academic percentages and current vacancies</div>
          </div>
          <a href="#" onClick={e => { e.preventDefault(); onNavigate('Job Posts'); }}
            style={{ display: 'inline-flex', alignItems: 'center', fontSize: 12, color: T.purple, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            View all<Chev />
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0,1fr))', gap: 10 }}>
          {[
            { abbr: 'CG', name: 'Cognizant', sub: 'GenC', pct: 72, level: 'High', bgL: T.blueLt, fgL: T.blueDk, barC: T.greenMid, pillBg: T.greenLt, pillFg: T.green },
            { abbr: 'TC', name: 'TCS', sub: 'NQT', pct: 48, level: 'Moderate', bgL: T.amberLt, fgL: '#633806', barC: T.amberMid, pillBg: T.amberLt, pillFg: T.amber },
            { abbr: 'WI', name: 'Wipro', sub: 'Elite/Turbo', pct: 41, level: 'Moderate', bgL: T.purpleLt, fgL: T.purpleDk, barC: T.purpleMid, pillBg: T.amberLt, pillFg: T.amber },
            { abbr: 'HC', name: 'HCL', sub: 'Tech Bee', pct: 22, level: 'Low', bgL: T.tealLt, fgL: '#085041', barC: '#E24B4A', pillBg: T.redLt, pillFg: T.red, note: 'CGPA below cutoff' },
            { abbr: 'TM', name: 'Tech Mahindra', sub: 'Smart Hire', pct: 0, level: 'Ineligible', bgL: T.greenLt, fgL: '#27500A', barC: T.greenMid, pillBg: T.surface2, pillFg: T.text3, opacity: 0.65, note: 'Backlogs detected', dash: true },
            { abbr: 'IB', name: 'IBM', sub: 'Off Campus', pct: 18, level: 'Low', bgL: T.blueLt, fgL: T.blueDk, barC: '#185FA5', pillBg: T.redLt, pillFg: T.red, note: 'Band too low' },
          ].map((c, i) => (
            <div key={i} style={{
              border: `0.5px solid ${T.border}`, borderRadius: 8, padding: '.875rem',
              cursor: 'pointer', transition: 'border-color .15s, transform .15s',
              display: 'flex', flexDirection: 'column', gap: 8,
              opacity: c.opacity || 1,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.purpleMid; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: c.bgL, color: c.fgL, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 500 }}>{c.abbr}</div>
                <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 99, fontWeight: 500, background: c.pillBg, color: c.pillFg }}>{c.level}</span>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{c.name}</div>
                <div style={{ fontSize: 10, color: T.text3 }}>{c.sub}</div>
              </div>
              <div style={{ fontSize: 20, fontWeight: 500, color: c.dash ? T.text3 : c.pillFg }}>{c.dash ? '—' : `${c.pct}%`}</div>
              <div style={{ height: 4, background: T.surface2, borderRadius: 99 }}>
                <div style={{ width: `${c.pct}%`, height: '100%', borderRadius: 99, background: c.barC }} />
              </div>
              <div style={{ fontSize: 10, color: T.text3 }}>{c.note || `Eligible · ${Math.floor(Math.random() * 5 + 1)} openings`}</div>
            </div>
          ))}
        </div>

        {/* How it's calculated */}
        <div style={{ marginTop: '1rem', padding: '.75rem 1rem', background: T.surface2, borderRadius: 8, border: `0.5px solid ${T.border}` }}>
          <div style={{ fontSize: 12, fontWeight: 500, marginBottom: '.5rem' }}>How probability is calculated</div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { color: T.purpleMid, label: 'MET score & band' },
              { color: T.amberMid, label: 'Academic CGPA / %' },
              { color: T.greenMid, label: 'Active job vacancies' },
              { color: '#E24B4A', label: 'Backlog status' },
            ].map(f => (
              <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: T.text2 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: f.color }} />
                {f.label}
              </div>
            ))}
            <a href="#" onClick={e => { e.preventDefault(); onNavigate('Assess'); }}
              style={{ fontSize: 11, color: T.purple, marginLeft: 'auto', fontWeight: 500, display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
              Improve my score<Chev />
            </a>
          </div>
        </div>
      </Card>

      {/* ══ CHALLENGE OF THE DAY ══ */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Challenge of the day</span>
            <span style={{ fontSize: 12, color: T.text3 }}>{today}</span>
          </div>
          <a href="#" style={{ display: 'inline-flex', alignItems: 'center', fontSize: 12, color: T.purple, textDecoration: 'none' }}>View all<Chev /></a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '1.25rem' }}>
          {[
            {
              type: 'Coding', typeBg: T.purpleLt, typeColor: T.purple, diff: 'Medium', diffBg: T.amberLt, diffColor: T.amber,
              q: todayGame?.title || 'Longest Substring Without Repeating Characters',
              tags: ['Sliding Window', 'Strings'], attempts: 0,
              icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5 4L2 8l3 4M11 4l3 4-3 4M9 3l-2 10" stroke={T.purple} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>,
              onSolve: () => onLaunchGame(todayGame?.gameId || 'maze')
            },
            {
              type: 'Aptitude', typeBg: T.amberLt, typeColor: T.amber, diff: 'Easy', diffBg: T.greenLt, diffColor: T.green,
              q: 'A train covers 360 km in 4 hours. What is its speed in m/s?',
              tags: ['Speed & Distance', 'Units'], attempts: 2,
              icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" stroke="#854F0B" strokeWidth="1.3" /><rect x="9" y="2" width="5" height="5" rx="1" stroke="#854F0B" strokeWidth="1.3" /><rect x="2" y="9" width="5" height="5" rx="1" stroke="#854F0B" strokeWidth="1.3" /><path d="M9 11.5h5M11.5 9v5" stroke="#854F0B" strokeWidth="1.3" strokeLinecap="round" /></svg>,
              onSolve: () => onNavigate('Assess')
            },
            {
              type: 'Verbal', typeBg: T.tealLt, typeColor: T.teal, diff: 'Hard', diffBg: T.redLt, diffColor: T.red,
              q: 'Identify the error: "Neither the manager nor the employees was present."',
              tags: ['Grammar', 'Subject-Verb'], attempts: 1,
              icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 4h10M3 8h7M3 12h5" stroke={T.teal} strokeWidth="1.4" strokeLinecap="round" /></svg>,
              onSolve: () => onNavigate('Assess')
            },
          ].map((c, i) => (
            <Card key={i} hover style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: c.typeBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {c.icon}
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.05em', color: T.text3 }}>{c.type}</span>
                </div>
                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 99, fontWeight: 500, background: c.diffBg, color: c.diffColor }}>{c.diff}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4 }}>{c.q}</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {c.tags.map(t => (
                  <span key={t} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 99, background: T.surface2, color: T.text2 }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: `0.5px solid ${T.border}` }}>
                <span style={{ fontSize: 11, color: T.text3 }}>Attempts: <span style={{ fontWeight: 500, color: T.text }}>{c.attempts}</span></span>
                {solvedCount[c.type.toLowerCase()] ? (
                  <span style={{ fontSize: 11, fontWeight: 500, color: T.green, background: T.greenLt, borderRadius: 99, padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                    Done
                  </span>
                ) : (
                  <BtnPurple onClick={() => { setSolvedCount(p => ({ ...p, [c.type.toLowerCase()]: true })); c.onSolve(); }} style={{ padding: '6px 14px', fontSize: 12 }}>
                    Solve<Chev />
                  </BtnPurple>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* ══ TACTICAL TERMINALS (GAMES) ══ */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: T.purpleLt, color: T.purple, padding: 8, borderRadius: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M6 12h4M8 10v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="15" cy="12" r="1" fill="currentColor" /><circle cx="18" cy="12" r="1" fill="currentColor" /></svg>
            </div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Tactical Terminals</div>
          </div>
          <a href="#" onClick={e => { e.preventDefault(); onNavigate('Games'); }}
            style={{ display: 'inline-flex', alignItems: 'center', fontSize: 12, color: T.purple, textDecoration: 'none' }}>
            View all<Chev />
          </a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { id: 'maze', title: 'Maze Escape', sub: 'Logic sequences · 30s per node', active: '2.4k', color: T.purple, bg: T.purpleLt },
            { id: 'survival', title: 'Endurance', sub: 'Live Python · Core Life Support', active: '1.1k', color: T.coral, bg: T.coralLt },
            { id: 'runner', title: 'Code Runner', sub: 'Deploy script executions · Bypass logic firewalls', active: '4.8k', color: T.teal, bg: T.tealLt },
          ].map(g => (
            <div key={g.id}
              onClick={() => onLaunchGame(g.id)}
              style={{
                background: T.surface2, borderRadius: 12, padding: '14px 16px',
                border: `0.5px solid ${T.border}`, display: 'flex', alignItems: 'center',
                gap: 16, cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = g.color; e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.surface2; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 10, background: g.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: g.color }}>
                  <polygon points="5,3 19,12 5,21" fill="currentColor" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: T.text, lineHeight: 1.25 }}>{g.title}</div>
                <div style={{ fontSize: 11, color: T.text2, lineHeight: 1.35, marginTop: 2 }}>{g.sub}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <span style={{ fontSize: 11, color: T.text3 }}>{g.active} active</span>
                <BtnPurple style={{ padding: '5px 14px', fontSize: 12 }}>Play</BtnPurple>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Inject Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400&display=swap');`}</style>
    </div>
  );
};

export default DashboardView;
