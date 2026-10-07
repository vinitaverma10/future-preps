import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, ArrowRight } from 'lucide-react';

export default function AICounselorModal({ isOpen, onClose, onSelectRoadmap }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Namaste! Main aapka FuturePreps AI Career Counselor hoon. Aap kis class me hain aur aapko kya kaam pasand hai (Coding, Machines, Designing ya Govt Jobs)?'
    }
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    const newMessages = [...messages, { sender: 'user', text: userMsg }];
    setMessages(newMessages);
    setInput('');

    // Simulate thoughtful context-aware response based on student inputs
    setTimeout(() => {
      let reply = '';
      const lower = userMsg.toLowerCase();
      if (lower.includes('code') || lower.includes('software') || lower.includes('app') || lower.includes('math')) {
        reply = 'Agar aapko coding aur problem solving pasand hai, to **Computer Science Engineering (CSE)** ya **Data Science** aapke liye best option hai! Iske liye aapko 11th-12th PCM ke sath **JEE Main** target karna chahiye. Maine neeche Engineer roadmap ready kiya hua hai.';
      } else if (lower.includes('machine') || lower.includes('car') || lower.includes('robot')) {
        reply = 'Mechanical Engineering ya Mechatronics / Robotics me aapka future bright ho sakta hai. Top colleges ke liye JEE Main + BITSAT prepare karein.';
      } else if (lower.includes('govt') || lower.includes('officer')) {
        reply = 'Govt Services ke liye aap B.Tech ke baad **UPSC CSE**, **IES (Engineering Services)** ya **State PSC** exams de sakte hain. Engineering ka technical base aapko analytical advantage dega.';
      } else {
        reply = 'Bahut achha! Aapke interest ke hisaab se 10th ke baad PCM stream choose karke B.Tech karna sabse versatile path hai. Aap hamara 4-step Engineer roadmap dekh sakte hain.';
      }

      setMessages([...newMessages, { sender: 'ai', text: reply, hasAction: true }]);
    }, 600);
  };

  return (
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
      <div className="glass animate-fade" style={{
        background: '#121722',
        width: '100%',
        maxWidth: '560px',
        height: '620px',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          background: 'rgba(99, 102, 241, 0.12)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bot size={20} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>AI Career Counselor</h3>
              <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 600 }}>● Online & Ready to guide</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '50%', width: '32px', height: '32px', color: '#fff' }}
          >
            ✕
          </button>
        </div>

        {/* Message Area */}
        <div style={{
          flex: 1,
          padding: '1.5rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {messages.map((m, idx) => (
            <div 
              key={idx}
              style={{
                display: 'flex',
                gap: '0.75rem',
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%'
              }}
            >
              {m.sender === 'ai' && (
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'rgba(99, 102, 241, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Bot size={16} color="#818cf8" />
                </div>
              )}

              <div>
                <div style={{
                  padding: '0.85rem 1.15rem',
                  borderRadius: '16px',
                  background: m.sender === 'user' ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'rgba(255, 255, 255, 0.05)',
                  border: m.sender === 'user' ? 'none' : '1px solid var(--border)',
                  color: '#fff',
                  fontSize: '0.9rem',
                  lineHeight: 1.5
                }}>
                  {m.text}
                </div>

                {m.hasAction && (
                  <button 
                    onClick={() => {
                      onClose();
                      onSelectRoadmap();
                    }}
                    className="btn btn-primary"
                    style={{ marginTop: '0.5rem', padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}
                  >
                    Open Engineer Roadmap <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} style={{
          padding: '1rem 1.25rem',
          borderTop: '1px solid var(--border)',
          background: 'rgba(0, 0, 0, 0.2)',
          display: 'flex',
          gap: '0.5rem'
        }}>
          <input 
            type="text" 
            placeholder="Type your question (e.g. 'Mujhe coding me career banana hai')..."
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border)',
              color: '#fff',
              fontSize: '0.9rem'
            }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.1rem' }}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
