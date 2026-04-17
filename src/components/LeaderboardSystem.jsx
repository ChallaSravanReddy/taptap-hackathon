import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X, Medal, Activity, Map } from 'lucide-react';
import { mockLeaderboardData } from '../data/mockLeaderboard';

const LeaderboardSystem = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overall'); // 'overall', 'maze', 'survival'

  const tabs = [
    { id: 'overall', label: 'Overall', icon: <Medal size={14} /> },
    { id: 'maze', label: 'Maze Escape', icon: <Map size={14} /> },
    { id: 'survival', label: 'Endurance', icon: <Activity size={14} /> }
  ];

  const currentData = mockLeaderboardData[activeTab] || [];

  return (
    <>
      {/* Topbar Icon Button */}
      <div style={{ position: 'relative' }}>
        <div 
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: 36, height: 36, 
            borderRadius: '50%', 
            background: isOpen ? '#4c1d95' : '#2c2c2c', // Purple when active
            color: isOpen ? '#fff' : '#ccc',
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: isOpen ? '0 0 10px rgba(139, 92, 246, 0.5)' : 'none'
          }}
        >
          <Trophy size={18} />
        </div>

        {/* Dropdown Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                top: '50px',
                right: '-40px', // Center align roughly relative to icon
                width: '350px',
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                border: '1px solid #eaeaea',
                zIndex: 100,
                color: '#333',
                overflow: 'hidden'
              }}
            >
              <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Trophy size={18} color="#8b5cf6" /> Live Leaderboard
                </h3>
                <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#999' }}>
                  <X size={18} />
                </button>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', borderBottom: '1px solid #f0f0f0' }}>
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      flex: 1,
                      background: activeTab === tab.id ? '#f8fafc' : '#fff',
                      border: 'none',
                      borderBottom: activeTab === tab.id ? '2px solid #8b5cf6' : '2px solid transparent',
                      padding: '10px 0',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: activeTab === tab.id ? 600 : 400,
                      color: activeTab === tab.id ? '#8b5cf6' : '#666',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.2s'
                    }}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              {/* List */}
              <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '10px 0' }}>
                {currentData.map((item, idx) => (
                  <div 
                    key={idx}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      padding: '10px 16px',
                      background: item.handle === user?.handle ? 'rgba(139, 92, 246, 0.05)' : 'transparent',
                      borderLeft: item.handle === user?.handle ? '3px solid #8b5cf6' : '3px solid transparent'
                    }}
                  >
                    <div style={{ 
                      width: '28px', 
                      fontSize: '0.9rem', 
                      fontWeight: 'bold', 
                      color: item.rank <= 3 ? '#8b5cf6' : '#999' 
                    }}>
                      #{item.rank}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: item.handle === user?.handle ? 600 : 400 }}>{item.handle}</div>
                      <div style={{ fontSize: '0.75rem', color: '#888' }}>{item.college}</div>
                    </div>
                    <div style={{ fontWeight: 'bold', color: '#333', fontSize: '0.9rem' }}>
                      {item.score.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ padding: '12px', background: '#f8fafc', borderTop: '1px solid #f0f0f0', textAlign: 'center', fontSize: '0.8rem', color: '#666' }}>
                Compete to see your name here!
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default LeaderboardSystem;
