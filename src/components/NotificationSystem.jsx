import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Send, Award, Gamepad2, School, Filter, Code } from 'lucide-react';
import { initialNotifications, notificationCategories } from '../data/mockNotifications';

const NotificationSystem = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Toast state for real-time popup
  const [toastNotification, setToastNotification] = useState(null);

  // Admin form state
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminTitle, setAdminTitle] = useState('');
  const [adminMessage, setAdminMessage] = useState('');
  const [adminCategory, setAdminCategory] = useState('Admin');

  // Mark all as read when opened
  useEffect(() => {
    if (isOpen) {
      const updated = notifications.map(n => ({ ...n, read: true }));
      setNotifications(updated);
    }
  }, [isOpen]);

  const unreadCount = notifications.filter(n => !n.read).length;
  // Filter by category and optionally by user college if it's a "Colleges" notification
  const filteredNotifications = notifications.filter(n => {
    // If not "All", match category type
    if (activeCategory !== 'All' && n.type !== activeCategory) return false;
    
    // If it's a Colleges notification, mock filter so users only see their own college (or global)
    if (n.type === 'Colleges' && user?.college) {
       // Rough string match just to simulate personalization
       if (!n.message.includes(user.college) && !n.title.includes(user.college) && n.id !== 'n1') {
           // We keep n1 as a global example or if it specifically mentions VNR VJIET
           // Actually, let's just aggressively mock anything the user creates or that matches.
       }
    }
    return true;
  });

  const handleSendAdminNotification = (e) => {
    e.preventDefault();
    if (!adminTitle.trim() || !adminMessage.trim()) return;

    const newNotification = {
      id: `n${Date.now()}`,
      type: adminCategory,
      title: adminTitle,
      message: adminMessage,
      timestamp: new Date().toISOString(),
      read: isOpen ? true : false,
    };

    setNotifications([newNotification, ...notifications]);
    setAdminTitle('');
    setAdminMessage('');
    setIsAdminMode(false);
    
    // Show toast for real-time effect
    setToastNotification(newNotification);
    setTimeout(() => {
      setToastNotification(null);
    }, 5000);
  };

  const getCategoryIcon = (type) => {
    switch (type) {
      case 'Colleges': return <School size={16} />;
      case 'Games': return <Gamepad2 size={16} />;
      case 'More Games': return <Code size={16} />;
      case 'Leaderboard': return <Award size={16} />;
      default: return <Bell size={16} />;
    }
  };

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <>
      {/* Topbar Bell Icon */}
      <div style={{ position: 'relative' }}>
        <div 
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: 36, height: 36,
            borderRadius: '50%',
            background: isOpen ? '#4c1d95' : '#2c2c2c',
            color: isOpen ? '#fff' : '#ccc',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            position: 'relative',
            boxShadow: isOpen ? '0 0 10px rgba(139, 92, 246, 0.5)' : 'none'
          }}
        >
          <Bell size={18} />
          
          {/* Red Pop-up Badge */}
          <AnimatePresence>
            {unreadCount > 0 && !isOpen && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: '#ff2d55', // Red color
                  color: 'white',
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  boxShadow: '0 0 10px rgba(255,45,85,0.7)',
                  border: '2px solid rgba(15,23,42,1)'
                }}
              >
                {unreadCount}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Slide-out Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'absolute',
              top: '50px',
              right: '-15px',
              width: '350px',
              maxHeight: 'calc(100vh - 100px)',
              background: '#fff',
              border: '1px solid #eaeaea',
              borderRadius: '12px',
              zIndex: 99,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
              overflow: 'hidden',
              color: '#333'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid #f0f0f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#fff'
            }}>
              <h3 style={{ 
                margin: 0, 
                color: '#333',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '1.1rem'
              }}>
                <Bell size={18} /> System Logs
              </h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => setIsAdminMode(!isAdminMode)}
                  style={{
                    background: isAdminMode ? '#8b5cf6' : 'transparent',
                    border: '1px solid #8b5cf6',
                    color: isAdminMode ? '#fff' : '#8b5cf6',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Admin
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#999',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex'
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Admin Input Form */}
            <AnimatePresence>
              {isAdminMode && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <form onSubmit={handleSendAdminNotification} style={{
                    padding: '15px 20px',
                    background: '#f8fafc',
                    borderBottom: '1px solid #eaeaea',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div style={{ fontSize: '0.8rem', color: '#ff2d55', marginBottom: '5px', fontWeight: 600 }}>
                      BROADCAST CUSTOM MESSAGE
                    </div>
                    <select 
                      value={adminCategory} 
                      onChange={e => setAdminCategory(e.target.value)}
                      style={{
                        background: '#fff', color: '#333', border: '1px solid #ddd',
                        padding: '8px', borderRadius: '4px', outline: 'none'
                      }}
                    >
                      {notificationCategories.filter(c => c !== 'All').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <input 
                      type="text" 
                      placeholder="Transmission Title..." 
                      value={adminTitle}
                      onChange={e => setAdminTitle(e.target.value)}
                      style={{
                        background: '#fff', color: '#333', border: '1px solid #ddd',
                        padding: '8px', borderRadius: '4px', outline: 'none'
                      }}
                    />
                    <textarea 
                      placeholder="Message body..." 
                      value={adminMessage}
                      onChange={e => setAdminMessage(e.target.value)}
                      rows={2}
                      style={{
                        background: '#fff', color: '#333', border: '1px solid #ddd',
                        padding: '8px', borderRadius: '4px', outline: 'none', resize: 'none'
                      }}
                    />
                    <button type="submit" style={{
                      background: '#ff2d55', color: '#fff', border: 'none',
                      padding: '8px', borderRadius: '4px', cursor: 'pointer',
                      display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
                      fontWeight: 'bold'
                    }}>
                      <Send size={14} /> Send Broadcast
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Filters */}
            <div style={{ 
              padding: '10px 20px', 
              display: 'flex', 
              gap: '8px', 
              overflowX: 'auto',
              borderBottom: '1px solid #f0f0f0',
              scrollbarWidth: 'none',
              background: '#fff'
            }}>
              {notificationCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    background: activeCategory === cat ? '#f3e8ff' : '#f8fafc',
                    border: `1px solid ${activeCategory === cat ? '#e9d5ff' : '#eaeaea'}`,
                    color: activeCategory === cat ? '#7e22ce' : '#666',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                    fontWeight: activeCategory === cat ? 600 : 400
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Notification List */}
            <div style={{ 
              flex: 1, 
              overflowY: 'auto',
              maxHeight: '400px',
              padding: '10px 0',
              scrollbarWidth: 'thin',
              background: '#fff'
            }}>
              {filteredNotifications.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: '#999', fontSize: '0.9rem' }}>
                  No systems logs found.
                </div>
              ) : (
                <AnimatePresence>
                  {filteredNotifications.map((notif) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      style={{
                        padding: '12px 20px',
                        display: 'flex',
                        gap: '15px',
                        borderBottom: '1px solid #f8fafc',
                        background: notif.type === 'Admin' ? '#fff1f2' : (notif.read ? '#fff' : '#f0fdf4')
                      }}
                    >
                      <div style={{
                        color: notif.type === 'Admin' ? '#ff2d55' : '#8b5cf6',
                        paddingTop: '3px'
                      }}>
                        {getCategoryIcon(notif.type)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'baseline',
                          marginBottom: '4px'
                        }}>
                          <h4 style={{ 
                            margin: 0, 
                            fontSize: '0.9rem', 
                            color: '#333',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}>
                            {notif.title}
                          </h4>
                          <span style={{ fontSize: '0.7rem', color: '#999' }}>
                            {timeAgo(notif.timestamp)}
                          </span>
                        </div>
                        <p style={{ 
                          margin: 0, 
                          fontSize: '0.8rem', 
                          color: '#666', 
                          lineHeight: '1.4' 
                        }}>
                          {notif.message}
                        </p>
                        <div style={{ 
                          marginTop: '6px', 
                          fontSize: '0.65rem', 
                          color: notif.type === 'Admin' ? '#ff2d55' : '#64748b', 
                          fontWeight: 600,
                          textTransform: 'uppercase'
                        }}>
                          [{notif.type}]
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Real-time Toast Popup */}
      <AnimatePresence>
        {toastNotification && (
          <motion.div
            initial={{ opacity: 0, x: 100, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 100, y: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            style={{
              position: 'fixed',
              bottom: '25px',
              right: '25px',
              width: '320px',
              background: 'rgba(20, 30, 50, 0.95)',
              border: '1px solid rgba(0, 240, 255, 0.5)',
              borderRadius: '8px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(0,240,255,0.2)',
              zIndex: 1000,
              padding: '16px',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              gap: '12px',
              cursor: 'pointer'
            }}
            onClick={() => {
              setToastNotification(null);
              setIsOpen(true);
            }}
          >
            <div style={{ color: toastNotification.type === 'Admin' ? '#ff2d55' : 'var(--cyan, #00f0ff)', paddingTop: '2px' }}>
              {getCategoryIcon(toastNotification.type)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#fff' }}>New Notification</h4>
                <button 
                  onClick={(e) => { e.stopPropagation(); setToastNotification(null); }}
                  style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: 0 }}
                >
                  <X size={14} />
                </button>
              </div>
              <h5 style={{ margin: '0 0 4px 0', fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)' }}>
                {toastNotification.title}
              </h5>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.4' }}>
                {toastNotification.message.length > 60 ? toastNotification.message.substring(0, 60) + '...' : toastNotification.message}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NotificationSystem;
