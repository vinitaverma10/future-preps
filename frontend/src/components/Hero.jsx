import React from 'react';
import { Sparkles, ArrowRight, Compass, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Hero({ onExploreRoadmaps, onExploreExams, onOpenAI }) {
  return (
    <section style={{ padding: '4.5rem 0 3rem', textAlign: 'center', position: 'relative' }}>
      <div className="container">
        {/* Top Tag */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: '999px', padding: '0.35rem 1rem', marginBottom: '1.5rem' }}>
          <Sparkles size={16} color="#818cf8" />
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#c7d2fe' }}>
            Govt + Private Pathways in One Place
          </span>
        </div>

        {/* Main Title */}
        <h1 style={{ fontSize: '3.2rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem', maxWidth: '850px', margin: '0 auto 1.25rem' }}>
          Apna Future Plan Karo, <br />
          <span style={{
            background: 'linear-gradient(135deg, #818cf8, #22d3ee 50%, #34d399)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Step by Step
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: '1.15rem', color: '#94a3b8', maxWidth: '620px', margin: '0 auto 2.25rem', lineHeight: 1.6 }}>
          10th se career tak: verified exams, top colleges, branches, aur free curated tutorials—bina kisi confusion ke.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
          <button onClick={onExploreRoadmaps} className="btn btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
            <Compass size={18} /> Engineer Roadmap Dekho <ArrowRight size={18} />
          </button>
          <button onClick={onExploreExams} className="btn btn-secondary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
            Exams Hub (JEE, BITSAT)
          </button>
          <button onClick={onOpenAI} className="btn" style={{
            padding: '0.85rem 1.5rem',
            background: 'rgba(6, 182, 212, 0.15)',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            color: '#22d3ee'
          }}>
            AI Career Counselor
          </button>
        </div>

        {/* 3 Value Pillars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          maxWidth: '950px',
          margin: '0 auto',
          textAlign: 'left'
        }}>
          <div className="glass" style={{ padding: '1.25rem 1.5rem', borderRadius: '16px' }}>
            <div style={{ color: '#818cf8', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
              <CheckCircle2 size={18} /> Step-by-Step Path
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              10th se stream selection, entrance preparation se degree tak har mod par sahi rasta.
            </p>
          </div>
          <div className="glass" style={{ padding: '1.25rem 1.5rem', borderRadius: '16px' }}>
            <div style={{ color: '#34d399', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
              <ShieldCheck size={18} /> Verified Govt Data
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              NTA, UPSC, aur official bodies ke verified dates, patterns, aur free tutorial links.
            </p>
          </div>
          <div className="glass" style={{ padding: '1.25rem 1.5rem', borderRadius: '16px' }}>
            <div style={{ color: '#22d3ee', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
              <Sparkles size={18} /> AI Career Matching
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              Apne interests aur strengths ke hisaab se sahi engineering branch aur career select karo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
