import React from 'react';
import { Calendar, Users, Megaphone, MapPin, ExternalLink, MessageSquare, Heart, Share2 } from 'lucide-react';

const CollegeView = () => {
  const updates = [
    { 
      id: 1, type: 'Event', title: 'Annual Tech Hackathon 2026', date: 'April 25th - 27th', 
      desc: 'Join us for 48 hours of innovation and coding. Grand prizes worth ₹2L up for grabs!',
      attendees: 156, location: 'College Main Hall'
    },
    { 
      id: 2, type: 'Announcement', title: 'Placement Drive: Capgemini', date: 'May 2nd, 10:00 AM', 
      desc: 'Eligibility: 6.5 CGPA and above. No active backlogs. Registration closes on April 30th.',
      attendees: 420, location: 'Virtual / T&P Cell'
    },
    { 
      id: 3, type: 'Notice', title: 'Semester Exam Timetable Revised', date: 'April 15th', 
      desc: 'Please find the revised timetable for B.Tech Semester VI on the university portal.',
      attendees: 89, location: 'Notice Board'
    },
  ];

  return (
    <div style={{ display: 'flex', gap: '32px', paddingBottom: '40px', fontFamily: 'Sora, sans-serif' }}>
      
      {/* Left Column: Campus Feed */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '2.2rem', color: '#111827', fontWeight: 800 }}>Campus Buzz</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>Stay updated with everything happening at Blackbucks University.</p>
        </div>

        {/* Quick Post Box */}
        <div style={{ background: '#fff', borderRadius: '24px', padding: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
           <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#6366f1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>S</div>
              <input 
                type="text" 
                placeholder="Share something with your campus mates..." 
                style={{ flex: 1, padding: '14px 20px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #f1f5f9', outline: 'none' }} 
              />
              <button style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 700 }}>Post</button>
           </div>
        </div>

        {/* Feed List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {updates.map(update => (
            <div key={update.id} style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
               <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: update.type === 'Event' ? '#f5f3ff' : update.type === 'Announcement' ? '#fef2f2' : '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: update.type === 'Event' ? '#6366f1' : update.type === 'Announcement' ? '#ef4444' : '#10b981' }}>
                           {update.type === 'Event' ? <Calendar size={20} /> : update.type === 'Announcement' ? <Megaphone size={20} /> : <Users size={20} />}
                        </div>
                        <div>
                           <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>{update.type}</div>
                           <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#1e293b' }}>{update.title}</h3>
                        </div>
                     </div>
                     <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{update.date}</span>
                  </div>
                  
                  <p style={{ margin: '0 0 20px 0', color: '#4b5563', lineHeight: 1.6, fontSize: '1rem' }}>{update.desc}</p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '0.85rem', color: '#64748b', marginBottom: '20px' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} /> {update.location}</div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={16} /> {update.attendees} Interested</div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                     <div style={{ display: 'flex', gap: '16px' }}>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer' }}><Heart size={18} /> Like</button>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer' }}><MessageSquare size={18} /> Comment</button>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer' }}><Share2 size={18} /> Share</button>
                     </div>
                     <button style={{ color: '#6366f1', background: 'transparent', border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>Read More <ExternalLink size={14} /></button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Campus Sidebar */}
      <div style={{ width: '380px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
         <div style={{ background: '#fff', borderRadius: '24px', padding: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', fontWeight: 800, color: '#111827' }}>Campus Directory</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
               {['Student Council', 'T&P Cell', 'Alumni Association', 'Department HODs', 'University Office'].map(item => (
                 <a key={item} href="#" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none', color: '#4b5563', padding: '12px', borderRadius: '12px', background: '#f8fafc', transition: 'all 0.2s' }}
                 onMouseEnter={e => { e.currentTarget.style.background = '#f5f3ff'; e.currentTarget.style.color = '#6366f1'; }}
                 onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#4b5563'; }}
                 >
                    <span style={{ fontWeight: 600 }}>{item}</span>
                    <ExternalLink size={16} />
                 </a>
               ))}
            </div>
         </div>

         <div style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fae8ff 100%)', borderRadius: '24px', padding: '32px', border: '1px solid rgba(236,72,153,0.1)' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1.2rem', fontWeight: 800, color: '#ec4899' }}>Placement Statistics</h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '0.9rem', color: '#be185d', lineHeight: 1.6 }}>2025 Batch has seen a 15% increase in core placements compared to last year.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#be185d', fontWeight: 600 }}>Total Offers</span>
                  <span style={{ color: '#be185d', fontWeight: 800 }}>842</span>
               </div>
               <div style={{ width: '100%', height: '8px', background: '#fff', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '85%', height: '100%', background: '#ec4899' }} />
               </div>
            </div>
         </div>
      </div>

    </div>
  );
};

export default CollegeView;
