import React from 'react';
import { Globe, Plane, GraduationCap, Building2, Search, ArrowRight, BookOpen, Star } from 'lucide-react';

const StudyAbroadView = () => {
  const destinations = [
    { name: 'USA', flag: '🇺🇸', universities: 4500, ranking: '#1', desc: 'World leader in research and innovation with Silicon Valley proximity.', color: '#ef4444' },
    { name: 'UK', flag: '🇬🇧', universities: 160, ranking: '#2', desc: 'Home to historic institutions and diverse, multicultural student cities.', color: '#3b82f6' },
    { name: 'Canada', flag: '🇨🇦', universities: 96, ranking: '#3', desc: 'Renowned for high quality of life and easy post-study work permits.', color: '#f97316' },
    { name: 'Germany', flag: '🇩🇪', universities: 400, ranking: '#4', desc: 'Low tuition fees and powerhouse of engineering and technology.', color: '#10b981' },
  ];

  const services = [
    { title: 'University Shortlisting', icon: <Building2 size={24} />, desc: 'Get a list of 10+ universities tailored to your profile.' },
    { title: 'SOP & LOR Writing', icon: <BookOpen size={24} />, desc: 'Craft compelling essays with the help of industry experts.' },
    { title: 'Visa Assistance', icon: <Globe size={24} />, desc: 'End-to-end support for your visa documentation and interview.' },
    { title: 'Test Preparation', icon: <GraduationCap size={24} />, desc: 'Master GRE, GMAT, IELTS, or TOEFL with dedicated trainers.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '40px', fontFamily: 'Sora, sans-serif' }}>
      
      {/* Header section */}
      <div>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '2.2rem', color: '#111827', fontWeight: 800 }}>Global Education</h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>Your dreams of international education, made accessible and simple.</p>
      </div>

      {/* Hero: Destination Search */}
      <div style={{ background: '#fff', borderRadius: '32px', padding: '48px', border: '1px solid #e2e8f0', boxShadow: '0 20px 40px rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ maxWidth: '500px' }}>
          <h2 style={{ fontSize: '2.2rem', margin: '0 0 16px 0', fontWeight: 800, color: '#1e293b' }}>Where do you want to study?</h2>
          <p style={{ margin: '0 0 32px 0', color: '#64748b', fontSize: '1.1rem', lineHeight: 1.6 }}>Find the best universities, programs, and scholarships across 25+ countries with Blackbucks Global.</p>
          
          <div style={{ position: 'relative', marginBottom: '24px' }}>
             <Search size={22} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#6366f1' }} />
             <input 
               type="text" 
               placeholder="Search by country, city or university..." 
               style={{ 
                 width: '100%', padding: '18px 20px 18px 60px', borderRadius: '18px', 
                 border: '2px solid #f1f5f9', background: '#f8fafc', outline: 'none', fontSize: '1.1rem',
                 boxShadow: '0 5px 15px rgba(0,0,0,0.02)'
               }} 
             />
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
             <button style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '14px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 10px 20px rgba(99,102,241,0.3)' }}>Start Search</button>
             <button style={{ background: '#fff', color: '#6366f1', border: '2.5px solid #f5f3ff', padding: '14px 28px', borderRadius: '14px', fontWeight: 700, cursor: 'pointer' }}>Talk to Consultant</button>
          </div>
        </div>
        
        <div style={{ width: '400px', height: '300px', background: '#f5f3ff', borderRadius: '24px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <Globe size={180} style={{ color: '#8b5cf6', opacity: 0.15, position: 'absolute' }} />
           <Plane size={64} style={{ color: '#6366f1', transform: 'rotate(-45deg)' }} />
        </div>
      </div>

      {/* Destinations Grid */}
      <h3 style={{ margin: '0', fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>Top Destinations</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
        {destinations.map(dest => (
          <div key={dest.name} style={{ 
            background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #f1f5f9',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', transition: 'all 0.3s ease', cursor: 'pointer'
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = dest.color; e.currentTarget.style.transform = 'translateY(-6px)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#f1f5f9'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{dest.flag}</div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', color: '#111827', fontWeight: 800 }}>{dest.name}</h4>
            <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>
               <span style={{ fontWeight: 700, color: dest.color }}>{dest.ranking} Rank</span>
               <span>•</span>
               <span>{dest.universities}+ Universities</span>
            </div>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>{dest.desc}</p>
            <div style={{ display: 'flex', alignItems: 'center', color: dest.color, fontWeight: 700, fontSize: '0.9rem' }}>
               Exlpore <ArrowRight size={16} style={{ marginLeft: '4px' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Services Section */}
      <div style={{ background: '#f8fafc', borderRadius: '32px', padding: '48px', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px' }}>
        {services.map(service => (
          <div key={service.title}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fff', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
               {service.icon}
            </div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#1e293b', fontWeight: 800 }}>{service.title}</h4>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>{service.desc}</p>
          </div>
        ))}
      </div>

      {/* Testimonials or Success Stories */}
      <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '20px' }}>
         {[1, 2, 3].map(i => (
           <div key={i} style={{ minWidth: '350px', background: '#fff', borderRadius: '24px', padding: '24px', border: '1px solid #f1f5f9', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#f59e0b', marginBottom: '16px' }}>
                 {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#f59e0b" />)}
              </div>
              <p style={{ fontStyle: 'italic', color: '#4b5563', lineHeight: 1.6, marginBottom: '24px' }}>"The guidance for my SOP from Blackbucks was exceptional. I got into my dream university in Canada with a full scholarship!"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e2e8f0' }} />
                 <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1f2937' }}>Student Name {i}</div>
                    <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>McMaster University</div>
                 </div>
              </div>
           </div>
         ))}
      </div>

    </div>
  );
};

export default StudyAbroadView;
