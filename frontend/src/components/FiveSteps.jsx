import React from 'react';
import { BookMarked, GraduationCap, Trophy, School, Briefcase } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Class 10th',
    sub: 'Stream Selection',
    desc: 'Maths aur Science strong karo, PCM ya PCB target set karo.',
    icon: BookMarked,
    tag: 'Base'
  },
  {
    num: '02',
    title: 'Class 11-12th',
    sub: 'PCM + Board Prep',
    desc: 'Boards ke saath entrance exam foundation prepare karo.',
    icon: GraduationCap,
    tag: 'Foundation'
  },
  {
    num: '03',
    title: 'Entrance Exams',
    sub: 'JEE Main, BITSAT',
    desc: 'National level ranking aur cutoff score crack karo.',
    icon: Trophy,
    tag: 'Selection'
  },
  {
    num: '04',
    title: 'Degree & College',
    sub: 'B.Tech (CSE, ECE)',
    desc: 'Top Govt NIT/IIT ya Private University me branch chuno.',
    icon: School,
    tag: 'Skills'
  },
  {
    num: '05',
    title: 'Career & Jobs',
    sub: 'SDE, Govt Jobs',
    desc: 'Placement, Higher Studies ya Govt Officer banne ki taiyari.',
    icon: Briefcase,
    tag: 'Future'
  }
];

export default function FiveSteps({ onSelectStep }) {
  return (
    <section style={{ padding: '3.5rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-active" style={{ marginBottom: '0.75rem' }}>The Journey</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Your Path in 5 Steps</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '0.4rem' }}>
            Har step par sahi guidance aur free study links available hain.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          position: 'relative'
        }}>
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div 
                key={i} 
                className="glass"
                style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: i === 2 ? '2px solid #6366f1' : '1px solid var(--border)',
                  boxShadow: i === 2 ? '0 10px 30px -10px rgba(99, 102, 241, 0.3)' : 'none',
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer'
                }}
                onClick={onSelectStep}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: i === 2 ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: i === 2 ? '#818cf8' : '#cbd5e1'
                    }}>
                      <Icon size={20} />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b' }}>
                      {st.num}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.2rem' }}>{st.title}</h3>
                  <span style={{ fontSize: '0.8rem', color: '#818cf8', fontWeight: 600, display: 'block', marginBottom: '0.6rem' }}>
                    {st.sub}
                  </span>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>
                    {st.desc}
                  </p>
                </div>

                <div style={{ marginTop: '1.25rem' }}>
                  <span className={i === 2 ? 'badge badge-active' : 'badge'} style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#94a3b8' }}>
                    {st.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
