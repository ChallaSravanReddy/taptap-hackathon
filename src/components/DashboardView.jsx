import React, { useState, useEffect } from 'react';
import { 
  Settings, CheckSquare, BookOpen, Target, 
  Briefcase, Globe, GraduationCap, X, Check, LayoutDashboard,
  ChevronUp, ChevronDown, AlertTriangle, Brain, Rocket, Zap, FileText, ArrowRight, Play, Clock, Award, ShieldCheck, Terminal, Flame, TrendingUp, Users, Medal
} from 'lucide-react';
import { GameConfigService } from '../data/GameConfigService';

const DashboardView = ({ user, onNavigate, onLaunchGame }) => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [todayGame, setTodayGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data } = await GameConfigService.getScheduleForDate(today);
      if (data) {
        setTodayGame(data);
      } else {
        setTodayGame({
          gameId: 'runner',
          title: 'Two Sum Problem',
          desc: 'Find two numbers that add up to a target value. Test your array skills!'
        });
      }
    };
    fetchGame();
  }, []);

  const [widgets, setWidgets] = useState([
    { id: 'goalBanner', visible: true, title: "Today's Goal & Streak", size: 2 },
    { id: 'quickActions', visible: true, title: "Quick Launch Actions", size: 2 },
    { id: 'challenge', visible: true, title: "Challenge of the Day", size: 2 },
    { id: 'radar', visible: true, title: "Skill Radar Analysis", size: 1 },
    { id: 'readiness', visible: true, title: "Placement Readiness", size: 1 },
    { id: 'statSolved', visible: true, title: "Problems Solved", icon: <CheckSquare size={24} />, color: '#8b5cf6', bg: '#f5f3ff', size: 1 },
    { id: 'statResumes', visible: true, title: "Resumes Sent", icon: <FileText size={24} />, color: '#6366f1', bg: '#eff6ff', size: 1 },
    { id: 'statBadges', visible: true, title: "Badges Earned", icon: <Medal size={24} />, color: '#f59e0b', bg: '#fffbeb', size: 1 },
    { id: 'statRank', visible: true, title: "Global Rank", icon: <TrendingUp size={24} />, color: '#0ea5e9', bg: '#f0f9ff', size: 1 },
    { id: 'games', visible: true, title: "Tactical Terminals", size: 2 },
    { id: 'learn', visible: true, title: "Learning Stats", icon: <BookOpen size={24} />, color: '#6366f1', bg: '#f5f3ff', size: 1 },
    { id: 'weakArea', visible: true, title: "Mission Critical: Coding", icon: <AlertTriangle size={24} />, color: '#f59e0b', bg: '#fff7ed', size: 1 },
  ]);

  const toggleWidget = (id) => {
    setWidgets(prev => prev.map(w => w.id === id ? { ...w, visible: !w.visible } : w));
  };

  const moveWidget = (id, direction) => {
    const index = widgets.findIndex(w => w.id === id);
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= widgets.length) return;
    const newWidgets = [...widgets];
    [newWidgets[index], newWidgets[newIndex]] = [newWidgets[newIndex], newWidgets[index]];
    setWidgets(newWidgets);
  };

  const updateSize = (id, newSize) => {
    setWidgets(prev => prev.map(w => w.id === id ? { ...w, size: newSize } : w));
  };

  const getWidgetAction = (id) => {
    switch(id) {
      case 'challenge': return () => onLaunchGame(todayGame?.gameId || 'runner');
      case 'learn': return () => onNavigate('Learn');
      case 'readiness': return () => onNavigate('Learn');
      case 'weakArea': return () => onNavigate('Assess');
      default: return () => {};
    }
  };

  const getSmallCardStyle = (w) => ({
    background: '#fff', 
    borderRadius: '32px', 
    padding: '24px', 
    border: '1px solid #f1f5f9', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '16px',
    gridColumn: w.size === 2 ? 'span 2' : 'span 1',
    aspectRatio: w.size === 1 ? '1 / 1' : 'auto',
    justifyContent: 'space-between',
    minHeight: w.size === 1 ? '0' : '260px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden'
  });

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '40px', fontFamily: 'Sora, sans-serif', padding: '0 0 80px 0' }}>
      
      {/* ── HEADER ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
        <div>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '2.4rem', color: '#0f172a', fontWeight: 800, letterSpacing: '-0.02em' }}>Command Center</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem', fontWeight: 500 }}>Global sync complete. All tactical units ready.</p>
        </div>
        <button onClick={() => setIsCustomizing(!isCustomizing)} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: isCustomizing ? '#0f172a' : '#fff', color: isCustomizing ? '#fff' : '#475569', border: `1px solid ${isCustomizing ? '#0f172a' : '#e2e8f0'}`, padding: '12px 24px', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          {isCustomizing ? <Check size={18} /> : <Settings size={18} />}
          {isCustomizing ? 'Lock Hub' : 'Custom Modes'}
        </button>
      </div>

      {isCustomizing && (
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '32px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', animation: 'slideDown 0.3s ease', marginBottom: '8px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.4rem', color: '#1e293b', fontWeight: 800 }}>Tactical Customization</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '1rem' }}>Adjust priority and module scale.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {widgets.map((w, idx) => (
              <div key={w.id} style={{ display: 'flex', alignItems: 'center', gap: '24px', background: w.visible ? '#f8fafc' : '#f1f5f9', padding: '16px 24px', borderRadius: '16px', border: `1px solid ${w.visible ? '#e2e8f0' : '#f1f5f9'}`, opacity: w.visible ? 1 : 0.6 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <button onClick={() => moveWidget(w.id, 'up')} disabled={idx === 0} style={{ background: 'none', border: 'none', color: idx === 0 ? '#cbd5e1' : '#0f172a', cursor: 'pointer' }}><ChevronUp size={22} /></button>
                  <button onClick={() => moveWidget(w.id, 'down')} disabled={idx === widgets.length - 1} style={{ background: 'none', border: 'none', color: idx === widgets.length - 1 ? '#cbd5e1' : '#0f172a', cursor: 'pointer' }}><ChevronDown size={22} /></button>
                </div>
                <div style={{ flex: 1, fontWeight: 800 }}>{w.title}</div>
                <div style={{ display: 'flex', gap: '8px', background: '#fff', padding: '4px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                   <button onClick={() => updateSize(w.id, 1)} style={{ padding: '6px 12px', border: 'none', borderRadius: '6px', background: w.size === 1 ? '#0f172a' : 'transparent', color: w.size === 1 ? '#fff' : '#64748b', cursor: 'pointer', fontWeight: 800, fontSize: '0.8rem' }}>S</button>
                   <button onClick={() => updateSize(w.id, 2)} style={{ padding: '6px 12px', border: 'none', borderRadius: '6px', background: w.size === 2 ? '#0f172a' : 'transparent', color: w.size === 2 ? '#fff' : '#64748b', cursor: 'pointer', fontWeight: 800, fontSize: '0.8rem' }}>W</button>
                </div>
                <input type="checkbox" checked={w.visible} onChange={() => toggleWidget(w.id)} style={{ width: '22px', height: '22px' }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── GRID ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gridAutoFlow: 'dense', gap: '24px' }}>
        {widgets.map(w => {
          if (!w.visible) return null;

          // 🆕 TODAY'S GOAL BANNER
          if (w.id === 'goalBanner') {
            return (
              <div key={w.id} style={{ ...getSmallCardStyle(w), gridColumn: '1 / -1', minHeight: 'auto', aspectRatio: 'auto', padding: '24px 32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>Today's Goal</h3>
                    <p style={{ margin: 0, color: '#64748b', fontWeight: 600 }}>Solve 1 problem to maintain your streak</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#fff7ed', border: '1px solid #ffedd5', padding: '8px 20px', borderRadius: '20px' }}>
                    <Flame size={20} color="#f97316" fill="#f97316" />
                    <span style={{ fontWeight: 900, color: '#c2410c', fontSize: '1.1rem' }}>7d</span>
                  </div>
                </div>
                <div style={{ marginTop: '16px', background: '#fef2f2', border: '1px solid #fee2e2', color: '#ef4444', padding: '12px 20px', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <AlertTriangle size={18} /> Your streak expires in 3h 24m
                </div>
              </div>
            );
          }

          // 🆕 QUICK ACTIONS
          if (w.id === 'quickActions') {
            return (
              <div key={w.id} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', gridColumn: '1 / -1' }}>
                {[
                  { id: 'resume', label: 'Resume Edit', icon: <FileText size={20} /> },
                  { id: 'assess', label: 'Continue Test', icon: <CheckSquare size={20} /> },
                  { id: 'cod', label: 'Practice COD', icon: <Terminal size={20} /> }
                ].map(action => (
                  <div key={action.id} style={{ background: '#fff', border: '1px solid #f1f5f9', padding: '24px', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#f1f5f9'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: '12px', background: '#f5f3ff', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{action.icon}</div>
                    <span style={{ fontWeight: 800, color: '#475569', fontSize: '0.9rem' }}>{action.label}</span>
                  </div>
                ))}
              </div>
            );
          }

          // 🎌 CHALLENGE (WIDE DARK)
          if (w.id === 'challenge') {
            return (
              <div key={w.id} style={{ ...getSmallCardStyle(w), background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)', color: '#fff', gridColumn: w.size === 2 ? '1 / -1' : 'span 1', aspectRatio: 'auto', minHeight: '340px' }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '8px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Zap size={20} fill="#fff" /></div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase' }}>Challenge of the Day</span>
                  </div>
                  <h2 style={{ fontSize: w.size === 2 ? '3.2rem' : '2rem', fontWeight: 900, margin: '0 0 16px 0' }}>{todayGame?.title || 'Loading...'}</h2>
                  <p style={{ opacity: 0.9, marginBottom: '40px', maxWidth: '600px' }}>{todayGame?.desc || '...'}</p>
                  <button onClick={getWidgetAction(w.id)} style={{ background: '#fff', color: '#6366f1', border: 'none', padding: '16px 40px', borderRadius: '16px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>Solve Now <ArrowRight size={20} /></button>
                </div>
              </div>
            );
          }

          // 🆕 SKILL RADAR
          if (w.id === 'radar') {
            return (
              <div key={w.id} style={{ ...getSmallCardStyle(w), gridColumn: w.size === 2 ? 'span 2' : 'span 1' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', fontWeight: 800, color: '#1e293b' }}>Skill Radar</h3>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="200" height="200" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                    <circle cx="100" cy="100" r="60" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                    <circle cx="100" cy="100" r="40" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                    {/* Simplified Radar Polygon */}
                    <polygon points="100,20 180,80 160,160 40,160 20,80" fill="rgba(99,102,241,0.15)" stroke="#6366f1" strokeWidth="2" />
                    <text x="100" y="15" textAnchor="middle" fontSize="10" fontWeight="800" fill="#94a3b8">Aptitude</text>
                    <text x="190" y="80" textAnchor="start" fontSize="10" fontWeight="800" fill="#94a3b8">Coding</text>
                    <text x="160" y="175" textAnchor="middle" fontSize="10" fontWeight="800" fill="#94a3b8">Comm.</text>
                    <text x="40" y="175" textAnchor="middle" fontSize="10" fontWeight="800" fill="#94a3b8">Resume</text>
                    <text x="10" y="80" textAnchor="end" fontSize="10" fontWeight="800" fill="#94a3b8">Interview</text>
                  </svg>
                </div>
              </div>
            );
          }

          // 🆕 PLACEMENT readiness
          if (w.id === 'readiness') {
            return (
              <div key={w.id} style={{ ...getSmallCardStyle(w) }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>
                  You are <span style={{ color: '#6366f1' }}>25%</span> placement ready
                </h3>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '25%', height: '100%', background: '#6366f1' }} />
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>25/100 Points</p>
                </div>
                <button onClick={() => onNavigate('Learn')} style={{ background: '#f5f3ff', color: '#6366f1', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', fontSize: '0.85rem' }}>Complete Profile</button>
              </div>
            );
          }

          // 🆕 PERFORMANCE STATS (Square)
          if (w.id.startsWith('stat')) {
            const data = {
              statSolved: { val: '42', sub: '+5 this week', icon: <CheckSquare size={20} />, col: '#8b5cf6' },
              statResumes: { val: '8', sub: '3 shortlisted', icon: <FileText size={20} />, col: '#6366f1' },
              statBadges: { val: '12', sub: '2 new', icon: <Medal size={20} />, col: '#f59e0b' },
              statRank: { val: '#156', sub: 'Top 15%', icon: <TrendingUp size={20} />, col: '#0ea5e9' }
            }[w.id];

            return (
              <div key={w.id} style={getSmallCardStyle(w)}>
                <div style={{ width: 44, height: 44, borderRadius: '14px', background: w.bg, color: w.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{data.icon}</div>
                <div>
                  <div style={{ fontWeight: 800, color: '#64748b', fontSize: '0.9rem', marginBottom: '4px' }}>{w.title}</div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#111827' }}>{data.val}</div>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>{data.sub}</div>
              </div>
            );
          }

          // 🆕 TACTICAL TERMINALS (GAMES)
          if (w.id === 'games') {
            const gameList = [
              { id: 'maze', title: 'Maze Escape', icon: '▣', color: '#00f0ff', active: '2.4k' },
              { id: 'survival', title: 'Endurance', icon: '⚡', color: '#ff2d55', active: '1.1k' },
              { id: 'runner', title: 'Code Runner', icon: '❖', color: '#8b5cf6', active: '4.8k' },
            ];

            return (
              <div key={w.id} style={{ ...getSmallCardStyle(w), gridColumn: w.size === 2 ? 'span 2' : 'span 1', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ background: '#0f172a', color: '#fff', padding: '10px', borderRadius: '10px' }}><Terminal size={20} /></div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>{w.title}</h3>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                  {gameList.map(game => (
                    <div 
                      key={game.id} 
                      onClick={() => onLaunchGame(game.id)}
                      style={{ 
                        background: '#f8fafc', borderRadius: '16px', padding: '16px', border: '1px solid #f1f5f9',
                        display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = game.color; e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#f1f5f9'; e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: game.color, fontSize: '1.5rem' }}>
                         {game.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                         <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 800, color: '#1e293b' }}>{game.title}</h4>
                         <p style={{ margin: 0, color: '#64748b', fontSize: '0.8rem' }}>{game.active} active players</p>
                      </div>
                      <div style={{ color: '#94a3b8' }}>
                         <Play size={16} fill="currentColor" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          // 🎌 DEFAULT MODULES (Learn, Weak Area, Games, etc.)
          return (
            <div key={w.id} style={getSmallCardStyle(w)}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ background: w.bg, color: w.color, padding: '10px', borderRadius: '10px' }}>{w.icon || <Terminal size={20} />}</div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>{w.title.split(':')[0]}</h3>
              </div>
              {w.id === 'weakArea' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b' }}>Score: <span style={{ color: '#0f172a' }}>65%</span></div>
                  <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}><div style={{ width: '65%', height: '100%', background: '#f59e0b' }} /></div>
                </div>
              )}
              <button onClick={getWidgetAction(w.id)} style={{ background: 'none', border: 'none', color: '#0f172a', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: 0 }}>Action <ArrowRight size={16} /></button>
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default DashboardView;
