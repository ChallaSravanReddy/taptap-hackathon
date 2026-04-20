import React from 'react';
import { BookOpen, Search, PlayCircle, Clock, Award, ChevronRight } from 'lucide-react';

const LearnView = () => {
  const courses = [
    { id: 1, title: 'AI & Machine Learning Foundations', category: 'Artificial Intelligence', duration: '12h 45m', students: '2,4k', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400', progress: 65, color: '#8b5cf6' },
    { id: 2, title: 'Full Stack Web Development with React', category: 'Web Development', duration: '24h 20m', students: '5,1k', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400', progress: 30, color: '#3b82f6' },
    { id: 3, title: 'Technical Interview Mastery', category: 'Placement Prep', duration: '8h 15m', students: '1,2k', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400', progress: 0, color: '#10b981' },
    { id: 4, title: 'Data Structures & Algorithms', category: 'Computer Science', duration: '32h 10m', students: '3,8k', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=400', progress: 10, color: '#f59e0b' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '40px', fontFamily: 'Sora, sans-serif' }}>
      
      {/* Header section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '2.2rem', color: '#111827', fontWeight: 800 }}>Learn Center</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>Upskill yourself with curated industry-standard courses.</p>
        </div>
        <div style={{ position: 'relative' }}>
          <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input 
            type="text" 
            placeholder="Search courses..." 
            style={{ 
              padding: '14px 14px 14px 48px', borderRadius: '14px', border: '1px solid #e2e8f0', 
              width: '320px', fontSize: '0.95rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              outline: 'none'
            }} 
          />
        </div>
      </div>

      {/* Featured category chips */}
      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
        {['All Courses', 'Artificial Intelligence', 'Web Development', 'Data Science', 'Soft Skills', 'Placement Prep'].map((cat, i) => (
          <button key={cat} style={{ 
            padding: '10px 20px', borderRadius: '12px', whiteSpace: 'nowrap',
            background: i === 0 ? '#6366f1' : '#fff',
            color: i === 0 ? '#fff' : '#64748b',
            border: `1px solid ${i === 0 ? '#6366f1' : '#e2e8f0'}`,
            fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
            boxShadow: i === 0 ? '0 10px 15px -3px rgba(99,102,241,0.2)' : 'none'
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
        {courses.map(course => (
          <div key={course.id} style={{ 
            background: '#fff', borderRadius: '24px', overflow: 'hidden', 
            border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)'; }}
          >
            <div style={{ position: 'relative', height: '200px' }}>
              <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(255,255,255,0.9)', padding: '6px 12px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 700, color: course.color }}>
                {course.category}
              </div>
              <div style={{ position: 'absolute', bottom: '16px', right: '16px', background: 'rgba(15,23,42,0.8)', color: '#fff', padding: '6px 10px', borderRadius: '8px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} /> {course.duration}
              </div>
            </div>
            <div style={{ padding: '24px' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', lineHeight: 1.4 }}>{course.title}</h3>
              
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>
                  <span>Progress</span>
                  <span style={{ fontWeight: 700, color: '#1e293b' }}>{course.progress}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${course.progress}%`, height: '100%', background: course.color, transition: 'width 0.5s ease' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '0.85rem' }}>
                      <PlayCircle size={16} /> 14 Lessons
                   </div>
                </div>
                <button style={{ background: '#fff', color: course.color, border: `1.5px solid ${course.color}`, padding: '8px 16px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {course.progress > 0 ? 'Continue' : 'Enroll Now'}
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended section */}
      <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', borderRadius: '24px', padding: '40px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.2)', width: 'fit-content', padding: '4px 12px', borderRadius: '12px', marginBottom: '16px', fontSize: '0.8rem', fontWeight: 600 }}>
             <Award size={16} /> Featured Certification
          </div>
          <h2 style={{ fontSize: '2rem', margin: '0 0 12px 0', fontWeight: 800 }}>Mastering LLMs and Prompt Engineering</h2>
          <p style={{ margin: 0, opacity: 0.9, fontSize: '1.1rem', maxWidth: '600px' }}>Join the elite club of AI practitioners. Get certified by top industry leaders in modern AI tech stacks.</p>
        </div>
        <button style={{ background: '#fff', color: '#4f46e5', border: 'none', padding: '16px 32px', borderRadius: '16px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>Explore Track</button>
      </div>

    </div>
  );
};

export default LearnView;
