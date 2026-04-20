import React from 'react';
import { Play, ArrowUpRight } from 'lucide-react';

const GamesView = ({ onLaunchGame }) => {
  const games = [
    { id: 'maze', title: 'Maze Escape', icon: '▣', color: '#00f0ff', active: '2.4k', desc: 'Navigate the nodes and maintain logic sequences.' },
    { id: 'survival', title: 'Endurance', icon: '⚡', color: '#ff2d55', active: '1.1k', desc: 'Secure the core before system failure.' },
    { id: 'runner', title: 'Code Runner', icon: '❖', color: '#8b5cf6', active: '4.8k', desc: 'Compete in high-intensity live coding sessions.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '40px', fontFamily: 'Sora, sans-serif' }}>
      
      <div>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '2.2rem', color: '#111827', fontWeight: 800 }}>Tactical Terminals</h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>Sharpen your coding syntax and logic under high pressure environments.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {games.map(game => (
          <div 
            key={game.id} 
            onClick={() => onLaunchGame && onLaunchGame(game.id)}
            style={{ 
              background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #f1f5f9',
              display: 'flex', flexDirection: 'column', gap: '20px', cursor: 'pointer', transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = game.color; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = '#f1f5f9'; }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
               <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: game.color, fontSize: '2rem' }}>
                  {game.icon}
               </div>
               <div style={{ padding: '6px 12px', borderRadius: '20px', background: '#f8fafc', fontSize: '0.85rem', fontWeight: 600, color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} /> {game.active} Playing
               </div>
            </div>
            
            <div style={{ flex: 1 }}>
               <h4 style={{ margin: '0 0 8px 0', fontSize: '1.4rem', fontWeight: 800, color: '#1e293b' }}>{game.title}</h4>
               <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5 }}>{game.desc}</p>
            </div>
            
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
               <span style={{ fontWeight: 700, color: '#475569', display: 'flex', alignItems: 'center', gap: '8px' }}>Launch Module <ArrowUpRight size={18} /></span>
               <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: game.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: `0 4px 12px ${game.color}60` }}>
                  <Play size={16} fill="currentColor" />
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesView;
