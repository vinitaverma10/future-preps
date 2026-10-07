import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FiveSteps from './components/FiveSteps';
import RoadmapView from './components/RoadmapView';
import ExamsHub from './components/ExamsHub';
import AICounselorModal from './components/AICounselorModal';
import AuthModal from './components/AuthModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'roadmaps', 'exams'
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fp_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('fp_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('fp_user');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenAI={() => setIsAIOpen(true)}
      />

      <main style={{ flex: 1 }}>
        {activeTab === 'home' && (
          <div className="animate-fade">
            <Hero 
              onExploreRoadmaps={() => setActiveTab('roadmaps')} 
              onExploreExams={() => setActiveTab('exams')}
              onOpenAI={() => setIsAIOpen(true)}
            />
            <FiveSteps onSelectStep={() => setActiveTab('roadmaps')} />
            
            {/* Quick Teaser of Live Backend Features */}
            <section style={{ padding: '3rem 0 5rem', borderTop: '1px solid var(--border)' }}>
              <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                  <span className="badge badge-active">Live Platform</span>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.4rem' }}>
                    Explore Core Modules
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                  <div 
                    className="glass" 
                    onClick={() => setActiveTab('roadmaps')}
                    style={{ padding: '2rem', borderRadius: '20px', cursor: 'pointer', transition: 'transform 0.2s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <span className="badge badge-govt" style={{ marginBottom: '0.75rem' }}>Core Roadmap</span>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                      Engineer Banne Ka Roadmap
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                      Class 10th ➔ 11-12th PCM ➔ JEE Main ➔ B.Tech (CSE, ECE, Mech). Checkpoint tracker ke saath.
                    </p>
                    <span style={{ color: '#818cf8', fontWeight: 700, fontSize: '0.9rem' }}>
                      Explore Roadmap →
                    </span>
                  </div>

                  <div 
                    className="glass" 
                    onClick={() => setActiveTab('exams')}
                    style={{ padding: '2rem', borderRadius: '20px', cursor: 'pointer', transition: 'transform 0.2s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <span className="badge badge-nongovt" style={{ marginBottom: '0.75rem' }}>Exams Hub</span>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                      Govt & Non-Govt Exams Hub
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                      JEE Main (NTA), BITSAT, NEET UG ke verified syllabus, marking patterns aur free resources.
                    </p>
                    <span style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.9rem' }}>
                      View All Exams →
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'roadmaps' && (
          <div className="animate-fade">
            <RoadmapView onSelectExam={() => setActiveTab('exams')} />
          </div>
        )}

        {activeTab === 'exams' && (
          <div className="animate-fade">
            <ExamsHub onSelectExam={() => {}} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '2.5rem 0', background: 'rgba(10, 13, 20, 0.95)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="brand-font" style={{ fontWeight: 800, fontSize: '1.15rem' }}>FuturePreps</span>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Apna Future Plan Karo, Step by Step. Connected with Java Spring Boot & MySQL.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
            <span style={{ color: '#10b981' }}>● Backend Connected: localhost:8080</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AICounselorModal 
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onSelectRoadmap={() => setActiveTab('roadmaps')}
      />

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
