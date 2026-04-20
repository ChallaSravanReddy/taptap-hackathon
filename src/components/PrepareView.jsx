import React from 'react';
import { Layout, MessageSquare, Code, FileText, Play, ArrowUpRight, Cpu } from 'lucide-react';

const PrepareView = ({ onLaunchGame }) => {
  const tools = [
    { title: 'Resume Builder', icon: <FileText size={24} />, color: '#3b82f6', bg: '#eff6ff', desc: 'Create a professional, ATS-friendly resume in minutes.' },
    { title: 'AI Mock Interview', icon: <MessageSquare size={24} />, color: '#8b5cf6', bg: '#f5f3ff', desc: 'Practice with our AI bot and get real-time feedback.' },
    { title: 'Coding Challenges', icon: <Code size={24} />, color: '#10b981', bg: '#ecfdf5', desc: 'Master data structures and algorithms with 500+ problems.' },
    { title: 'Tech Roadmap', icon: <Layout size={24} />, color: '#f59e0b', bg: '#fffbeb', desc: 'Step-by-step guides for trending career paths.' },
  ];

  const games = [
    { id: 'maze', title: 'Maze Escape', icon: '▣', color: '#00f0ff', active: '2.4k' },
    { id: 'survival', title: 'Endurance', icon: '⚡', color: '#ff2d55', active: '1.1k' },
    { id: 'runner', title: 'Code Runner', icon: '❖', color: '#8b5cf6', active: '4.8k' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '40px', fontFamily: 'Sora, sans-serif' }}>
      
      {/* Header section */}
      <div>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '2.2rem', color: '#111827', fontWeight: 800 }}>Placement Preparation</h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>Everything you need to confidently ace your next big interview.</p>
      </div>

      {/* Hero: Interview Prep */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '32px', padding: '48px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '500px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, width: 'fit-content', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Cpu size={16} color="#8b5cf6" /> NEW: AI SESSIONS
          </div>
          <h2 style={{ fontSize: '2.5rem', margin: '0 0 16px 0', lineHeight: 1.2, fontWeight: 800 }}>Practice with our AI-driven Mock Interviews</h2>
          <p style={{ margin: '0 0 32px 0', opacity: 0.8, fontSize: '1.1rem', lineHeight: 1.6 }}>Simulate real interview environments with voice-enabled AI feedback on your performance, body language, and tech skills.</p>
          <div style={{ display: 'flex', gap: '16px' }}>
             <button style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '16px 32px', borderRadius: '16px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                Start Practice <Play size={20} fill="#fff" />
             </button>
             <button style={{ background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.2)', padding: '16px 32px', borderRadius: '16px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}>View Roadmap</button>
          </div>
        </div>
        
        <div style={{ position: 'absolute', right: '-40px', bottom: '-40px', opacity: 0.2, transform: 'rotate(-15deg)' }}>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {[...Array(9)].map((_, i) => (
                <div key={i} style={{ width: '80px', height: '100px', background: '#6366f1', borderRadius: '8px' }} />
              ))}
           </div>
        </div>
      </div>

      {/* Preparation Tools Grid */}
      <h3 style={{ margin: '0', fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>Preparation Toolkit</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        {tools.map(tool => (
          <div key={tool.title} style={{ 
            background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #f1f5f9',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', transition: 'all 0.3s ease', cursor: 'pointer'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)'; }}
          >
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: tool.bg, color: tool.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
               {tool.icon}
            </div>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '1.3rem', color: '#111827', fontWeight: 800 }}>{tool.title}</h4>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>{tool.desc}</p>
          </div>
        ))}
      </div>

      {/* Code Runner Game Modules */}
      <h3 style={{ margin: '0', fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>Gamified Learning</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {games.map(game => (
          <div 
            key={game.id} 
            onClick={() => onLaunchGame && onLaunchGame(game.id)}
            style={{ 
              background: '#fff', borderRadius: '24px', padding: '24px', border: '1px solid #f1f5f9',
              display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = game.color; e.currentTarget.style.background = '#fafafa'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#f1f5f9'; e.currentTarget.style.background = '#fff'; }}
          >
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: game.color, fontSize: '2rem' }}>
               {game.icon}
            </div>
            <div style={{ flex: 1 }}>
               <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>{game.title}</h4>
               <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>{game.active} active players</p>
            </div>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
               <ArrowUpRight size={18} />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default PrepareView;
