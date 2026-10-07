import React, { useState, useEffect } from 'react';
import { Search, Calendar, Globe, Award, ExternalLink, Filter, BookOpen } from 'lucide-react';

export default function ExamsHub({ selectedExamSlug, onSelectExam }) {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all'); // all, govt, non_govt, engineering
  const [search, setSearch] = useState('');
  const [activeModalExam, setActiveModalExam] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/exams')
      .then(res => res.json())
      .then(data => {
        setExams(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch exams:', err);
        setLoading(false);
      });
  }, []);

  const filteredExams = exams.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase()) || 
                          (ex.conductingBody && ex.conductingBody.toLowerCase().includes(search.toLowerCase()));
    if (!matchesSearch) return false;
    if (filterType === 'govt') return ex.govtType === 'govt';
    if (filterType === 'non_govt') return ex.govtType === 'non_govt';
    if (filterType === 'engineering') return ex.category?.toLowerCase() === 'engineering';
    return true;
  });

  return (
    <section style={{ padding: '3rem 0 5rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-active" style={{ marginBottom: '0.5rem' }}>Entrance & Jobs</span>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800 }}>Exams Hub</h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '0.25rem' }}>
            Govt aur Non-Govt exams ke dates, patterns, syllabus aur verified resources.
          </p>
        </div>

        {/* Filter bar */}
        <div className="glass" style={{
          padding: '1rem 1.5rem',
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {/* Filter buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Exams' },
              { id: 'engineering', label: 'Engineering' },
              { id: 'govt', label: 'Govt Only' },
              { id: 'non_govt', label: 'Private / Univ' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`btn ${filterType === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div style={{ position: 'relative', minWidth: '240px' }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search exam (JEE, BITSAT)..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 1rem 0.5rem 2.2rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border)',
                color: '#fff',
                fontSize: '0.85rem'
              }}
            />
          </div>
        </div>

        {/* Exam Cards Grid */}
        {loading ? (
          <p style={{ textAlign: 'center', color: '#94a3b8' }}>Loading exams from backend...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {filteredExams.map(ex => {
              const isGovt = ex.govtType === 'govt';
              return (
                <div 
                  key={ex.id}
                  className="glass"
                  style={{
                    padding: '1.75rem',
                    borderRadius: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'var(--transition)',
                    borderTop: isGovt ? '3px solid #10b981' : '3px solid #f59e0b'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span className={isGovt ? 'badge badge-govt' : 'badge badge-nongovt'}>
                        {isGovt ? 'Govt (NTA)' : 'Non-Govt'}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                        {ex.level || 'National'} Level
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.25rem' }}>{ex.name}</h3>
                    <span style={{ fontSize: '0.85rem', color: '#818cf8', display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>
                      Body: {ex.conductingBody}
                    </span>

                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                      {ex.name === 'JEE Main' 
                        ? 'Admission to NITs, IIITs, CFTIs aur JEE Advanced qualification.' 
                        : ex.name === 'BITSAT' 
                        ? 'BITS Pilani, Goa aur Hyderabad campuses me B.E. programs ke liye.' 
                        : `${ex.category} entrance exam for higher technical education.`}
                    </p>
                  </div>

                  <div>
                    {/* Countdown Banner */}
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border)',
                      padding: '0.6rem 0.8rem',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#cbd5e1' }}>
                        <Calendar size={14} color="#818cf8" />
                        <span>Next Session:</span>
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8' }}>
                        Upcoming 2027
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => setActiveModalExam(ex)}
                        className="btn btn-primary"
                        style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem', justifyContent: 'center' }}
                      >
                        <BookOpen size={15} /> Details & Syllabus
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Exam Detail Modal */}
        {activeModalExam && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}>
            <div className="glass animate-fade" style={{ background: '#121722', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', borderRadius: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div>
                  <span className={activeModalExam.govtType === 'govt' ? 'badge badge-govt' : 'badge badge-nongovt'} style={{ marginBottom: '0.4rem' }}>
                    {activeModalExam.govtType === 'govt' ? 'Government Exam' : 'Private University Exam'}
                  </span>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{activeModalExam.name}</h2>
                  <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Conducted by: {activeModalExam.conductingBody}</span>
                </div>
                <button 
                  onClick={() => setActiveModalExam(null)} 
                  style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '50%', width: '32px', height: '32px', color: '#fff', fontSize: '1rem' }}
                >
                  ✕
                </button>
              </div>

              {/* Tabs content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '12px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem', color: '#818cf8' }}>Exam Pattern</h4>
                  <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                    {activeModalExam.name === 'JEE Main' 
                      ? '300 Marks: Physics (100), Chemistry (100), Mathematics (100). MCQs + Numerical value questions with negative marking (-1).'
                      : '390 Marks: Physics, Chemistry, Math, English Proficiency & Logical Reasoning. 130 questions, 3 hours.'}
                  </p>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '12px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem', color: '#34d399' }}>Eligibility Criteria</h4>
                  <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                    Class 12th passed / appearing with Physics, Chemistry, Mathematics (PCM). Minimum 75% aggregate in 12th board for NIT/IIT admissions.
                  </p>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '12px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem', color: '#f59e0b' }}>Free Preparation Resources</h4>
                  <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                    <li>Official NTA Abhyas Mock Test App (Free)</li>
                    <li>NCERT Textbooks (Chemistry organic + inorganic priority)</li>
                    <li>Previous 10 Years Solved Question Papers (PDF)</li>
                  </ul>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                <button onClick={() => setActiveModalExam(null)} className="btn btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
