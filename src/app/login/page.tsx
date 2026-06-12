'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Redirect to admin dashboard
        router.push('/admin');
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || 'Invalid email or password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        background: '#FAF7F1',
        color: '#1A1815',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      {/* Background Graphic elements */}
      <div style={{ position: 'fixed', top: '10%', left: '5%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(181,83,42,0.04)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '15%', right: '8%', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(59,130,246,0.03)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: '#FFFFFF',
          border: '1px solid #E7E1D7',
          borderRadius: '16px',
          boxShadow: '0 10px 30px -5px rgba(26,24,21,0.05)',
          padding: '40px 32px',
          zIndex: 10,
          position: 'relative',
        }}
      >
        {/* Header/Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '28px', fontWeight: 700, color: '#1A1815', letterSpacing: '-0.02em' }}>RIDLDI</span>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#B5532A' }}>Admin Portal</span>
          </Link>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '20px', fontWeight: 600, color: '#1A1815', margin: '0 0 6px' }}>Welcome Back</h2>
          <p style={{ margin: 0, fontSize: '14px', color: '#6B7280' }}>Please log in to manage applications and program settings.</p>
        </div>

        {/* Error Notification */}
        {error && (
          <div
            style={{
              background: '#FEE2E2',
              border: '1px solid #FCA5A5',
              borderRadius: '8px',
              padding: '12px 16px',
              color: '#991B1B',
              fontSize: '13.5px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              marginBottom: '24px',
              animation: 'ridFade 0.2s ease',
            }}
          >
            <ShieldAlert size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="email-input" style={{ fontSize: '13px', fontWeight: 600, color: '#4A4540' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}>
                <Mail size={16} />
              </div>
              <input
                id="email-input"
                type="email"
                required
                placeholder="admin@ridldi.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  background: '#FFFFFF',
                  border: '1.5px solid #DDD8CF',
                  borderRadius: '8px',
                  padding: '12px 14px 12px 42px',
                  fontSize: '14.5px',
                  color: '#1A1815',
                  outline: 'none',
                  transition: 'border-color 0.15s',
                }}
                className="focus:border-[#B5532A]"
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="password-input" style={{ fontSize: '13px', fontWeight: 600, color: '#4A4540' }}>Password</label>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}>
                <Lock size={16} />
              </div>
              <input
                id="password-input"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  background: '#FFFFFF',
                  border: '1.5px solid #DDD8CF',
                  borderRadius: '8px',
                  padding: '12px 14px 12px 42px',
                  fontSize: '14.5px',
                  color: '#1A1815',
                  outline: 'none',
                  transition: 'border-color 0.15s',
                }}
                className="focus:border-[#B5532A]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              marginTop: '10px',
              padding: '13px',
              background: submitting ? '#CDA795' : '#B5532A',
              color: '#FAF7F1',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: submitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(181,83,42,0.25)',
              transition: 'background 0.2s',
            }}
            className="hover:bg-[#9E4420]"
          >
            {submitting ? 'Authenticating...' : 'Sign In'}
            {!submitting && <ArrowRight size={16} />}
          </button>

        </form>

        <div style={{ textAlign: 'center', marginTop: '28px', borderTop: '1px solid #F3F4F6', paddingTop: '20px' }}>
          <Link href="/" style={{ fontSize: '13.5px', color: '#6B7280', textDecoration: 'none', fontWeight: 500 }} className="hover:text-gray-900">
            ← Back to Public Website
          </Link>
        </div>

      </div>
    </div>
  );
}
