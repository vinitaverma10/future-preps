import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Clock, ExternalLink, PlusCircle, Sparkles, BookOpen, Layers } from 'lucide-react';

export default function RoadmapView({ onSelectExam }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedSteps, setCompletedSteps] = useState([1]); // step 1 checked by default
  const [selectedBranch, setSelectedBranch] = useState('CSE');
  const [showSuggestModal, setShowSuggestModal] = useState(false);
  const [newLink, setNewLink] = useState({ title: '', url: '', type: 'youtube' });
  const [suggestSuccess, setSuggestSuccess] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/api/roadmaps/engineer')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load roadmap:', err);
        setLoading(false);
      });
  }, []);

  const toggleStep = (id) => {
    if (completedSteps.includes(id)) {
      setCompletedSteps(completedSteps.filter(s => s !== id));
    } else {
      setCompletedSteps([...completedSteps, id]);
    }
  };

  const handleSuggest = (e) => {
    e.preventDefault();
    if (!newLink.title || !newLink.url) return;

    fetch('http://localhost:8080/api/resources/suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newLink.title,
        url: newLink.url,
        type: newLink.type,
        stepId: 3 // JEE step
      })
    })
      .then(res => res.json())
      .then(() => {
        setSuggestSuccess(true);
        setTimeout(() => {
          setSuggestSuccess(false);
          setShowSuggestModal(false);
          setNewLink({ title: '', url: '', type: 'youtube' });
        }, 1500);
      })
      .catch(err => console.error(err));
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 0', color: '#94a3b8' }}>
        <p>Loading roadmap from Spring Boot backend...</p>
      </div>
    );
  }

  const roadmap = data?.roadmap || { title: 'Engineer banne ka roadmap', description: '10th se job tak ka path' };
  const steps = data?.steps || [];
  const progressPercent = steps.length ? Math.round((completedSteps.length / steps.length) * 100) : 0;

  return (
    <section style={{ padding: '3rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Header */}
        <div className="glass" style={{ padding: '2rem', borderRadius: '20px', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-active" style={{ marginBottom: '0.5rem' }}>Career Path</span>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>{roadmap.title}</h1>
              <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '0.25rem' }}>{roadmap.description}</p>
            </div>
            
            {/* Progress Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border)',
              borderRadius: '14px',
              padding: '1rem 1.5rem',
              minWidth: '220px',
              textAlign: 'right'
            }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>Aapki Progress</span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#818cf8', margin: '0.2rem 0' }}>
                {progressPercent}%
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #22d3ee)', transition: 'width 0.3s ease' }} />
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginTop: '0.35rem' }}>
                {completedSteps.length} of {steps.length} steps complete
              </span>
            </div>
          </div>
        </div>

        {/* Steps Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
          {steps.map((st, idx) => {
            const isDone = completedSteps.includes(st.id);
            const isCurrent = !isDone && (idx === 0 || completedSteps.includes(steps[idx - 1]?.id));

            return (
              <div 
                key={st.id} 
                className="glass"
                style={{
                  padding: '1.75rem',
                  borderRadius: '18px',
                  borderLeft: isDone ? '4px solid #10b981' : isCurrent ? '4px solid #6366f1' : '4px solid #334155',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button 
                      onClick={() => toggleStep(st.id)}
                      style={{ background: 'transparent', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                      title={isDone ? 'Mark as incomplete' : 'Mark as done'}
                    >
                      {isDone ? (
                        <CheckCircle2 size={24} color="#10b981" />
                      ) : (
                        <Circle size={24} color={isCurrent ? '#818cf8' : '#64748b'} />
                      )}
                    </button>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                        Step {st.stepOrder}
                      </span>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: isDone ? '#94a3b8' : '#fff' }}>
                        {st.title}
                      </h3>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {st.duration && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: '#94a3b8', background: 'rgba(255, 255, 255, 0.05)', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                        <Clock size={14} /> {st.duration}
                      </span>
                    )}
                    {isDone && <span className="badge badge-govt">Done</span>}
                    {isCurrent && <span className="badge badge-active">Current Step</span>}
                  </div>
                </div>

                <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: '0.75rem 0 1rem', paddingLeft: '2.25rem' }}>
                  {st.description}
                </p>

                {/* Step specific interactive elements */}
                {st.title.includes('JEE') && (
                  <div style={{ marginLeft: '2.25rem', background: 'rgba(99, 102, 241, 0.07)', border: '1px solid rgba(99, 102, 241, 0.2)', padding: '1rem', borderRadius: '12px', marginTop: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <BookOpen size={18} color="#818cf8" />
                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Linked Entrance Exams:</span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => onSelectExam('jee-main')} className="badge badge-govt" style={{ cursor: 'pointer' }}>
                          JEE Main (NTA)
                        </button>
                        <button onClick={() => onSelectExam('bitsat')} className="badge badge-nongovt" style={{ cursor: 'pointer' }}>
                          BITSAT (BITS Pilani)
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {st.title.includes('branch') && (
                  <div style={{ marginLeft: '2.25rem', marginTop: '0.75rem' }}>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                      Select Branch to Explore:
                    </span>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
                      {[
                        { name: 'CSE', desc: 'Coding, AI, SDE' },
                        { name: 'ECE', desc: 'Chips, VLSI, Telecom' },
                        { name: 'Mechanical', desc: 'Robotics, Design' },
                        { name: 'Civil', desc: 'Infra, Structures' }
                      ].map(br => (
                        <div 
                          key={br.name}
                          onClick={() => setSelectedBranch(br.name)}
                          style={{
                            padding: '0.75rem',
                            borderRadius: '10px',
                            background: selectedBranch === br.name ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                            border: selectedBranch === br.name ? '1px solid #6366f1' : '1px solid var(--border)',
                            cursor: 'pointer',
                            textAlign: 'center'
                          }}
                        >
                          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: selectedBranch === br.name ? '#818cf8' : '#fff' }}>{br.name}</div>
                          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{br.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Community Resources CTA */}
        <div className="glass" style={{ marginTop: '2.5rem', padding: '1.75rem', borderRadius: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Free Study Resources Library</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
              Physics, Chemistry, Maths ke YouTube playlists aur previous year question papers.
            </p>
          </div>
          <button 
            onClick={() => setShowSuggestModal(true)} 
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem' }}
          >
            <PlusCircle size={16} /> Tutorial Link Suggest Karein
          </button>
        </div>

        {/* Suggest Modal */}
        {showSuggestModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}>
            <div className="glass animate-fade" style={{ background: '#121722', width: '100%', maxWidth: '450px', padding: '2rem', borderRadius: '20px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>Free Tutorial Link Suggest Karein</h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
                Aapke dwara suggest kiya gaya link admin review ke baad publish hoga.
              </p>

              {suggestSuccess ? (
                <div style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '12px', textAlign: 'center', color: '#34d399' }}>
                  ✓ Link successfully submit ho gaya! Dhanyawaad.
                </div>
              ) : (
                <form onSubmit={handleSuggest} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>Resource Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Physics Galaxy Mechanics Revision" 
                      value={newLink.title}
                      onChange={e => setNewLink({ ...newLink, title: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)', color: '#fff' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>URL Link</label>
                    <input 
                      type="url" 
                      placeholder="https://youtube.com/..." 
                      value={newLink.url}
                      onChange={e => setNewLink({ ...newLink, url: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)', color: '#fff' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>Resource Type</label>
                    <select 
                      value={newLink.type}
                      onChange={e => setNewLink({ ...newLink, type: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#1e293b', border: '1px solid var(--border)', color: '#fff' }}
                    >
                      <option value="youtube">YouTube Playlist / Video</option>
                      <option value="pdf">PDF Notes / Papers</option>
                      <option value="website">Official Website</option>
                      <option value="notes">Free Notes</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Submit Link</button>
                    <button type="button" onClick={() => setShowSuggestModal(false)} className="btn btn-secondary">Cancel</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
