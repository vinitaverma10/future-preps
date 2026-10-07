import React, { useState } from 'react';
import { User, Lock, Mail, GraduationCap, MapPin, CheckCircle } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    classLevel: '12th',
    state: 'Maharashtra'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const url = isLogin 
      ? 'http://localhost:8080/api/auth/login' 
      : 'http://localhost:8080/api/auth/register';

    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : formData;

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Authentication failed');
        }
        return data;
      })
      .then(user => {
        setLoading(false);
        onAuthSuccess(user);
        onClose();
      })
      .catch(err => {
        setLoading(false);
        setError(err.message);
      });
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
        maxWidth: '460px',
        padding: '2.25rem',
        borderRadius: '24px',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{ position: 'absolute', right: '1.25rem', top: '1.25rem', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '50%', width: '32px', height: '32px', color: '#fff' }}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            {isLogin ? 'Login to FuturePreps' : 'Student Account Banayein'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.2rem' }}>
            {isLogin 
              ? 'Apna roadmap progress aur saved exams access karein.' 
              : 'Ek click me apna career path track karna shuru karein.'}
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', padding: '0.75rem', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {!isLogin && (
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  placeholder="e.g. Vinita Verma"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.2rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)', color: '#fff' }}
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                placeholder="name@gmail.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.2rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)', color: '#fff' }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.2rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)', color: '#fff' }}
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Class / Standard</label>
                <select
                  value={formData.classLevel}
                  onChange={e => setFormData({ ...formData, classLevel: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: '#1e293b', border: '1px solid var(--border)', color: '#fff' }}
                >
                  <option value="10th">Class 10th</option>
                  <option value="11th">Class 11th (PCM)</option>
                  <option value="12th">Class 12th (PCM)</option>
                  <option value="Dropper">Dropper / Target</option>
                  <option value="B.Tech">B.Tech Student</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Account Type</label>
                <select
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: '#1e293b', border: '1px solid var(--border)', color: '#fff' }}
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty / Teacher</option>
                </select>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', padding: '0.8rem' }}
            disabled={loading}
          >
            {loading ? 'Processing...' : isLogin ? 'Login Karein' : 'Register Account'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: '#94a3b8' }}>
          {isLogin ? (
            <>
              Naye user hain?{' '}
              <button 
                onClick={() => { setIsLogin(false); setError(''); }}
                style={{ background: 'transparent', color: '#818cf8', fontWeight: 700 }}
              >
                Create Account
              </button>
            </>
          ) : (
            <>
              Already account hai?{' '}
              <button 
                onClick={() => { setIsLogin(true); setError(''); }}
                style={{ background: 'transparent', color: '#818cf8', fontWeight: 700 }}
              >
                Login Karein
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
