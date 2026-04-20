import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Save, Trash2, ShieldAlert, Loader2, Check } from 'lucide-react';
import { GameConfigService } from '../data/GameConfigService';

const availableGames = [
  { id: 'maze', title: 'Maze Escape', desc: 'Navigate the nodes and maintain logic sequences.' },
  { id: 'survival', title: 'Endurance', desc: 'Secure the core before system failure.' },
  { id: 'runner', title: 'Code Runner', desc: 'Test logic and syntax in high-pressure environment.' }
];

const AdminView = () => {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form State
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedGameId, setSelectedGameId] = useState('runner');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    setIsLoading(true);
    const { data } = await GameConfigService.getAllSchedules();
    setSchedules(data || []);
    setIsLoading(false);
  };

  const handleSaveSchedule = async () => {
    if (!selectedDate || !selectedGameId) return;
    
    setIsSaving(true);
    const gameInfo = availableGames.find(g => g.id === selectedGameId);
    
    await GameConfigService.upsertSchedule({
      date: selectedDate,
      gameId: selectedGameId,
      title: gameInfo.title,
      desc: gameInfo.desc
    });
    
    await fetchSchedules();
    setIsSaving(false);
  };

  const handleDelete = async (dateStr) => {
    if (!window.confirm('Are you sure you want to remove the game for this date?')) return;
    setIsLoading(true);
    await GameConfigService.deleteSchedule(dateStr);
    await fetchSchedules();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '40px', fontFamily: 'Sora, sans-serif' }}>
      
      {/* Header section */}
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fee2e2', color: '#ef4444', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '16px' }}>
          <ShieldAlert size={16} /> ADMIN ACCESS GRANTED
        </div>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '2.2rem', color: '#111827', fontWeight: 800 }}>Game Scheduler</h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>Set the "Game of the Day" globally for all students.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '32px' }}>
        
        {/* LEFT COLUMN: ASSIGN GAME FORM */}
        <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', alignSelf: 'start' }}>
          <h3 style={{ margin: '0 0 24px 0', fontSize: '1.3rem', color: '#1e293b', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CalendarIcon size={24} /> New Schedule
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Target Date</label>
              <input 
                type="date" 
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', fontFamily: 'monospace', fontSize: '1rem', outline: 'none' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Select Game Module</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {availableGames.map(game => (
                  <button 
                    key={game.id}
                    onClick={() => setSelectedGameId(game.id)}
                    style={{ 
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                      background: selectedGameId === game.id ? '#f5f3ff' : '#fff', 
                      border: `1px solid ${selectedGameId === game.id ? '#8b5cf6' : '#e2e8f0'}`,
                      color: selectedGameId === game.id ? '#6d28d9' : '#1e293b',
                      padding: '16px', borderRadius: '12px', cursor: 'pointer', textAlign: 'left', fontWeight: 700, transition: 'all 0.2s'
                    }}
                  >
                    <span>{game.title}</span>
                    {selectedGameId === game.id && <Check size={18} />}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleSaveSchedule}
              disabled={isSaving}
              style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: 800, fontSize: '1rem', cursor: isSaving ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '12px' }}
            >
              {isSaving ? <><Loader2 size={18} className="spin" /> Syncing</> : <><Save size={18} /> Publish Schedule</>}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: CALENDAR VIEW */}
        <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 24px 0', fontSize: '1.3rem', color: '#1e293b', fontWeight: 800 }}>Master Calendar</h3>
          
          {isLoading ? (
             <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0', color: '#94a3b8' }}>
                <Loader2 size={32} className="spin" />
             </div>
          ) : schedules.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8', background: '#f8fafc', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
              <CalendarIcon size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
              <p style={{ margin: 0, fontWeight: 600 }}>No games scheduled yet.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {schedules.map(schedule => (
                <div key={schedule.date} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '24px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  
                  {/* Date Badge */}
                  <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '12px', minWidth: '90px', textAlign: 'center' }}>
                     <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>
                       {new Date(schedule.date).toLocaleDateString('en-US', { month: 'short' })}
                     </div>
                     <div style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 900, lineHeight: 1 }}>
                       {new Date(schedule.date).getDate()}
                     </div>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 800, color: '#8b5cf6', background: '#f5f3ff', padding: '4px 10px', borderRadius: '8px', marginBottom: '8px' }}>
                      {schedule.gameId.toUpperCase()}
                    </div>
                    <h4 style={{ margin: '0 0 6px 0', fontSize: '1.2rem', color: '#1e293b', fontWeight: 800 }}>{schedule.title}</h4>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5 }}>{schedule.desc}</p>
                  </div>

                  {/* Actions */}
                  <button 
                    onClick={() => handleDelete(schedule.date)}
                    style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#ef4444', width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
                    onMouseLeave={e => e.currentTarget.style.background = '#fef2f2'}
                    title="Remove from schedule"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
};

export default AdminView;
