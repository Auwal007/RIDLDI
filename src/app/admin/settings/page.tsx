'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, Users, List, Save, ShieldAlert, CheckCircle } from 'lucide-react';

const ALL_POSSIBLE_TRACKS = [
  'Software Development',
  'Data Analytics & AI',
  'Cybersecurity',
  'UI/UX Design',
  'Cloud Computing',
  'Digital Marketing',
  'Product Management',
  'Blockchain & Web3',
  'Digital Content & Media',
  'No-Code & Automation',
];

export default function SettingsPage() {
  const [deadline, setDeadline] = useState('');
  const [intakeLimit, setIntakeLimit] = useState(100);
  const [activeTracks, setActiveTracks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setDeadline(data.applicationDeadline || '');
        setIntakeLimit(data.intakeLimit || 100);
        setActiveTracks(data.activeTracks || []);
      }
    } catch (error) {
      console.error('Failed to fetch system settings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleTrackToggle = (track: string) => {
    setActiveTracks((prev) => {
      if (prev.includes(track)) {
        // Prevent disabling all tracks - must have at least one active
        if (prev.length === 1) {
          showToast('At least one track must remain active.');
          return prev;
        }
        return prev.filter((t) => t !== track);
      } else {
        return [...prev, track];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationDeadline: deadline,
          intakeLimit: Number(intakeLimit),
          activeTracks: activeTracks,
        }),
      });

      if (res.ok) {
        showToast('System configuration saved successfully.');
      } else {
        showToast('Failed to save configuration settings.');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      showToast('An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading system settings...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Title Header */}
      <div>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '28px', fontWeight: 600, color: '#1A1815', margin: '0 0 8px' }}>
          System Configuration
        </h2>
        <p style={{ color: '#6B7280', margin: 0, fontSize: '15px' }}>
          Manage global application parameters, intake controls, and training track availability.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
        
        {/* Settings Card 1: Deadlines and Limits */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#111827', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldAlert size={20} className="text-[#B5532A]" /> Intake & Deadlines
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="apply-row">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="deadline-input" style={{ fontSize: '13.5px', fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={16} className="text-gray-400" /> Application Deadline Date
              </label>
              <input
                id="deadline-input"
                type="date"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #DDD8CF', borderRadius: '8px', fontSize: '14.5px', outline: 'none' }}
                className="focus:border-[#B5532A]"
              />
              <span style={{ fontSize: '12px', color: '#6B7280' }}>Candidates will see this date in the application header.</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="limit-input" style={{ fontSize: '13.5px', fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Users size={16} className="text-gray-400" /> Max Cohort Intake Limit
              </label>
              <input
                id="limit-input"
                type="number"
                required
                min={1}
                max={1000}
                value={intakeLimit}
                onChange={(e) => setIntakeLimit(Number(e.target.value))}
                style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #DDD8CF', borderRadius: '8px', fontSize: '14.5px', outline: 'none' }}
                className="focus:border-[#B5532A]"
              />
              <span style={{ fontSize: '12px', color: '#6B7280' }}>Maximum number of approved fellows for Cohort 02.</span>
            </div>
          </div>
        </div>

        {/* Settings Card 2: Training Tracks Toggle */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#111827', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <List size={20} className="text-[#B5532A]" /> Training Track Availability
            </h3>
            <p style={{ margin: 0, fontSize: '13.5px', color: '#6B7280' }}>
              Toggle which tracks are open and accept submissions on the candidate intake form.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }} className="track-picker-grid">
            {ALL_POSSIBLE_TRACKS.map((track) => {
              const isActive = activeTracks.includes(track);
              return (
                <label
                  key={track}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 16px',
                    border: '1.5px solid',
                    borderColor: isActive ? '#B5532A' : '#DDD8CF',
                    background: isActive ? '#FAF1EB' : '#FFFFFF',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => handleTrackToggle(track)}
                    style={{ accentColor: '#B5532A', width: '16px', height: '16px' }}
                  />
                  <span style={{ fontSize: '14px', fontWeight: isActive ? 600 : 500, color: '#1A1815' }}>
                    {track}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '12px 28px',
              background: '#B5532A',
              color: '#FAF7F1',
              borderRadius: '8px',
              border: 'none',
              fontSize: '15px',
              fontWeight: 600,
              cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.7 : 1,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 4px 12px rgba(181,83,42,0.25)',
              transition: 'background 0.2s',
            }}
            className="hover:bg-[#9E4420]"
          >
            <Save size={18} />
            {saving ? 'Saving Settings...' : 'Save System Settings'}
          </button>
        </div>
      </form>

      {/* Persistent Success Toast */}
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', background: '#1A1815', color: '#FAF7F1', padding: '12px 24px', borderRadius: '8px', zIndex: 100, fontSize: '14.5px', fontWeight: 500, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '8px', animation: 'ridFade 0.2s ease' }}>
          <CheckCircle size={18} className="text-[#10B981]" />
          {toastMessage}
        </div>
      )}
    </div>
  );
}
