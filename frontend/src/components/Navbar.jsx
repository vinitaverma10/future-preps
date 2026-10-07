import React from 'react';
import { Compass, BookOpen, GraduationCap, Bot, User, LogOut } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, user, onOpenAuth, onLogout, onOpenAI }) {
  return (
    <nav className="glass-nav" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        {/* Brand */}
        <div 
          onClick={() => setActiveTab('home')} 
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)'
          }}>
            <Compass size={22} color="#fff" />
          </div>
          <div>
            <span className="brand-font" style={{ fontSize: '1.35rem', fontWeight: 800, background: 'linear-gradient(to right, #fff, #cbd5e1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Future<span style={{ color: '#6366f1', WebkitTextFillColor: '#6366f1' }}>Preps</span>
            </span>
            <span style={{ display: 'block', fontSize: '0.65rem', color: '#94a3b8', marginTop: '-4px', fontWeight: 600, letterSpacing: '0.05em' }}>
              GOVT + PRIVATE PATHWAYS
            </span>
          </div>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button 
            onClick={() => setActiveTab('home')}
            className={`btn ${activeTab === 'home' ? 'badge-active' : ''}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', color: activeTab === 'home' ? '#818cf8' : '#94a3b8', background: 'transparent' }}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveTab('roadmaps')}
            className={`btn ${activeTab === 'roadmaps' ? 'badge-active' : ''}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', color: activeTab === 'roadmaps' ? '#818cf8' : '#94a3b8', background: 'transparent' }}
          >
            <Compass size={16} /> Roadmaps
          </button>
          <button 
            onClick={() => setActiveTab('exams')}
            className={`btn ${activeTab === 'exams' ? 'badge-active' : ''}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', color: activeTab === 'exams' ? '#818cf8' : '#94a3b8', background: 'transparent' }}
          >
            <BookOpen size={16} /> Exams Hub
          </button>
          <button 
            onClick={onOpenAI}
            className="btn"
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              background: 'rgba(6, 182, 212, 0.12)',
              color: '#22d3ee',
              border: '1px solid rgba(6, 182, 212, 0.3)'
            }}
          >
            <Bot size={16} /> AI Counselor
          </button>
        </div>

        {/* User / Auth */}
        <div>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700 }}>{user.name}</span>
                <span style={{ display: 'block', fontSize: '0.7rem', color: '#10b981', textTransform: 'capitalize' }}>● {user.role}</span>
              </div>
              <button 
                onClick={onLogout}
                className="btn btn-secondary"
                style={{ padding: '0.5rem 0.8rem', borderRadius: '8px' }}
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="btn btn-primary"
              style={{ padding: '0.55rem 1.25rem', fontSize: '0.9rem' }}
            >
              <User size={16} /> Login / Register
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
