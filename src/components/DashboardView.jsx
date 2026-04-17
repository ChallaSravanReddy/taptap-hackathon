import React from 'react';

const DashboardView = ({ user, onNavigate, onLaunchGame }) => {
  const initial = user?.handle ? user.handle.charAt(0).toUpperCase() : 'U';
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Top Banner */}
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderLeft: '4px solid #ef4444',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '1.1rem' }}>Profile just started</span>
            <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>Started</span>
          </div>
          <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>Complete basic details to begin building your profile.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '1.75rem', fontWeight: 500 }}>17%</span>
          <button style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
            Update Profile
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        
        {/* Profile Card */}
        <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', color: '#333' }}>My Profile</h3>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* Circular Progress Mock */}
            <div style={{ position: 'relative', width: '160px', height: '160px', borderRadius: '50%', border: '6px solid #f1f5f9', borderTopColor: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', transform: 'rotate(-45deg)' }}>
              <div style={{ transform: 'rotate(45deg)', background: '#be123c', width: '120px', height: '120px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '4rem', fontWeight: 'bold' }}>
                {initial}
              </div>
              <div style={{ position: 'absolute', top: '10px', right: '-10px', background: '#6366f1', color: '#fff', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', transform: 'rotate(45deg)' }}>
                17%
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#111', textTransform: 'uppercase' }}>{user?.handle || '2451-23-737-313 CHALLA'}</div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#111', textTransform: 'uppercase' }}>{user?.handle ? '' : 'SRAVAN REDDY'}</div>
            </div>
          </div>
        </div>

        {/* Badges & Metrics Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Badges Card */}
          <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', flex: 1 }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '1.1rem', color: '#333', borderBottom: '1px solid #f0f0f0', paddingBottom: '15px' }}>My Badges</h3>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
              <div style={{ background: '#111', padding: '15px', borderRadius: '8px', position: 'relative', textAlign: 'center', border: '2px solid #333' }}>
                <div style={{ color: '#fbbf24', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '5px' }}>HELLO WORLD</div>
                <div style={{ color: '#10b981', fontSize: '2rem' }}>★</div>
                <div style={{ color: '#10b981', fontSize: '0.6rem', marginTop: '5px', letterSpacing: '0.5px' }}>SUCCESSFULLY LOGIN</div>
                <div style={{ position: 'absolute', bottom: '-5px', left: '-10px', right: '-10px', height: '10px', background: '#333', clipPath: 'polygon(10px 0, calc(100% - 10px) 0, 100% 100%, 0 100%)' }} />
              </div>
            </div>
          </div>

          {/* Learning Metrics Card */}
          <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', flex: 1, backgroundColor: '#fafafa' }}>
             <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', color: '#333' }}>My Learning Metrics</h3>
             <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#333', marginBottom: '4px' }}>Hour Spent</div>
                  <div style={{ color: '#666', fontSize: '0.9rem' }}>8 minutes</div>
                </div>
                <select style={{ padding: '6px 12px', borderRadius: '20px', border: '1px solid #ddd', background: '#fff', outline: 'none', fontSize: '0.8rem' }}>
                  <option>Last 7 Days</option>
                </select>
             </div>
          </div>

        </div>

        {/* Smart Interview Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', border: '1px solid #f8e8ff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', color: '#333' }}>Smart Interview</h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>Valid for 1 Interview • No Renewal</p>
              </div>
              <div style={{ background: '#f5f3ff', color: '#8b5cf6', fontSize: '0.7rem', padding: '4px 10px', borderRadius: '12px', fontWeight: 600 }}>
                FREE PLAN
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>0</span><span style={{ color: '#999', fontSize: '0.9rem' }}>/1</span>
                <div style={{ fontSize: '0.75rem', color: '#666' }}>Credits</div>
              </div>
              <div style={{ flex: 2, background: '#fafafa', padding: '10px', borderRadius: '8px', border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#666', display: 'flex', alignItems: 'center', gap: '4px' }}>⟳ Rollover</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>Not Applicable</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ flex: 1, background: '#8b5cf6', color: '#fff', border: 'none', padding: '12px', borderRadius: '24px', fontWeight: 600, cursor: 'pointer' }}>
                Start Interview
              </button>
              <button style={{ background: '#fff', color: '#8b5cf6', border: '1px solid #e9d5ff', padding: '12px 20px', borderRadius: '24px', fontWeight: 600, cursor: 'pointer' }}>
                View Plan
              </button>
            </div>
          </div>
          
          {/* Metadata Card (MET Score) */}
           <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
             <div style={{ background: '#8b5cf6', borderRadius: '8px', padding: '20px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ background: '#fff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#8b5cf6', fontWeight: 'bold' }}>↗</span>
                  </div>
                  <span style={{ fontWeight: 600 }}>MET Score</span>
                </div>
                <div>
                   <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>NA</span><span style={{ opacity: 0.7 }}>/100</span>
                </div>
             </div>
           </div>

           {/* Games / Puzzles Card (LinkedIn Style) */}
           <div style={{ background: '#fff', borderRadius: '12px', padding: '20px 24px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#111' }}>Today's games</h3>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Game Item 1 */}
                <div onClick={() => onLaunchGame && onLaunchGame('maze')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '8px', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #333' }}>
                      <span style={{ color: '#00f0ff', fontSize: '1.5rem' }}>▣</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#191919', fontSize: '0.95rem' }}>Maze Escape #112</div>
                      <div style={{ color: '#666', fontSize: '0.8rem' }}>Node Logic Sequences</div>
                    </div>
                  </div>
                  <div style={{ color: '#666', fontSize: '1.2rem', fontWeight: 'bold', marginRight: '5px' }}>›</div>
                </div>

                {/* Game Item 2 */}
                <div onClick={() => onLaunchGame && onLaunchGame('survival')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '8px', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #333' }}>
                      <span style={{ color: '#ff2d55', fontSize: '1.5rem' }}>⚡</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#191919', fontSize: '0.95rem' }}>Endurance #44</div>
                      <div style={{ color: '#666', fontSize: '0.8rem' }}>Live Python Survival</div>
                    </div>
                  </div>
                  <div style={{ color: '#666', fontSize: '1.2rem', fontWeight: 'bold', marginRight: '5px' }}>›</div>
                </div>

                {/* Game Item 3 */}
                <div onClick={() => { if(onNavigate) onNavigate('Prepare'); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '8px', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #333' }}>
                      <span style={{ color: '#8b5cf6', fontSize: '1.5rem' }}>❖</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#191919', fontSize: '0.95rem' }}>Code Runner</div>
                      <div style={{ color: '#666', fontSize: '0.8rem' }}>2,410 players active</div>
                    </div>
                  </div>
                  <div style={{ color: '#666', fontSize: '1.2rem', fontWeight: 'bold', marginRight: '5px' }}>›</div>
                </div>

              </div>
           </div>
        </div>
        
      </div>
    </div>
  );
};

export default DashboardView;
