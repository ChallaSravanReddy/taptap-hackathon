import React from 'react';
import { Target, Search, CheckCircle, BarChart, Shield, ArrowRight, Star, Award } from 'lucide-react';

const AssessView = () => {
  const categories = [
    { title: 'Technical Aptitude', count: 12, icon: <Shield size={24} />, color: '#6366f1', bg: '#f5f3ff' },
    { title: 'Coding Blocks', count: 8, icon: <Target size={24} />, color: '#ec4899', bg: '#fdf2f8' },
    { title: 'Core Subjects', count: 15, icon: <Shield size={24} />, color: '#10b981', bg: '#ecfdf5' },
    { title: 'Soft Skills', count: 5, icon: <CheckCircle size={24} />, color: '#f59e0b', bg: '#fffbeb' },
  ];

  const tests = [
    { id: 1, title: 'Python Proficiency Test', category: 'Coding', level: 'Intermediate', time: '45 mins', questions: 30, score: 85 },
    { id: 2, title: 'Cognitive Reasoning Assessment', category: 'Aptitude', level: 'Beginner', time: '30 mins', questions: 25, score: 0 },
    { id: 3, title: 'React Hooks Deep Dive', category: 'Technical', level: 'Advanced', time: '60 mins', questions: 40, score: 0 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '40px', fontFamily: 'Sora, sans-serif' }}>
      
      {/* Header section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '2.2rem', color: '#111827', fontWeight: 800 }}>Assessment Center</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>Validate your skills and get certified for your dream career.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
             <div style={{ background: '#fff', padding: '12px 24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <div style={{ width: '40px', height: '40px', background: '#f5f3ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}>
                   <BarChart size={20} />
                </div>
                <div>
                   <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Avg Score</div>
                   <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>72%</div>
                </div>
             </div>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        {categories.map(cat => (
          <div key={cat.title} style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = cat.color; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#f1f5f9'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: cat.bg, color: cat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               {cat.icon}
            </div>
            <div>
               <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', color: '#111827', fontWeight: 700 }}>{cat.title}</h4>
               <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>{cat.count} Assessments available</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Testing Table/List */}
      <div style={{ background: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        <div style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fbfcfe' }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#111827', fontWeight: 800 }}>Recent & Recommended Tests</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
             <button style={{ padding: '8px 16px', borderRadius: '10px', background: '#f5f3ff', color: '#6366f1', border: 'none', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>My History</button>
             <button style={{ padding: '8px 16px', borderRadius: '10px', background: '#fff', color: '#64748b', border: '1px solid #e2e8f0', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>Filters</button>
          </div>
        </div>
        
        <div style={{ padding: '8px 0' }}>
          {tests.map((test, i) => (
            <div key={test.id} style={{ 
              display: 'flex', alignItems: 'center', padding: '24px 32px', 
              borderBottom: i === tests.length - 1 ? 'none' : '1px solid #f1f5f9',
              transition: 'background 0.2s', cursor: 'pointer'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f8fafc'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                   <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#111827', fontWeight: 700 }}>{test.title}</h4>
                   <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '12px', background: '#f1f5f9', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>{test.level}</span>
                </div>
                <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem', color: '#64748b' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Test: {test.category}</div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Duration: {test.time}</div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>{test.questions} Questions</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                {test.score > 0 && (
                   <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>HIGH SCORE</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b' }}>{test.score}<span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>/100</span></div>
                   </div>
                )}
                <button style={{ 
                  background: test.score > 0 ? '#10b981' : '#6366f1', 
                  color: '#fff', border: 'none', padding: '12px 28px', 
                  borderRadius: '14px', fontWeight: 700, fontSize: '0.95rem',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  boxShadow: test.score > 0 ? '0 8px 15px -3px rgba(16,185,129,0.3)' : '0 8px 15px -3px rgba(99,102,241,0.3)',
                  cursor: 'pointer'
                }}>
                  {test.score > 0 ? 'Retake' : 'Start Assessment'}
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certification CTA */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
         <div style={{ background: '#0f172a', borderRadius: '24px', padding: '32px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
               <div style={{ color: '#fbbf24', display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  <Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" />
               </div>
               <h3 style={{ fontSize: '1.5rem', margin: '0 0 12px 0', fontWeight: 800 }}>Blackbucks Certified SDE-1</h3>
               <p style={{ margin: 0, opacity: 0.8, fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>Stand out from the crowd with our industry-recognized certification. Get direct access to top recruiters.</p>
               <button style={{ background: '#fff', color: '#0f172a', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>Apply for Test</button>
            </div>
            <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', opacity: 0.1 }}>
               <Award size={180} />
            </div>
         </div>

         <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', margin: '0 0 8px 0', color: '#1e293b', fontWeight: 800 }}>Need more practice?</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>Our AI-driven mock tests adapt to your skill level, helping you improve faster where it matters most.</p>
            <div style={{ display: 'flex', gap: '16px' }}>
               <button style={{ flex: 1, background: '#f5f3ff', color: '#6366f1', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>Mock Grid</button>
               <button style={{ flex: 1, background: '#fdf2f8', color: '#ec4899', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>Past Results</button>
            </div>
         </div>
      </div>

    </div>
  );
};

export default AssessView;
