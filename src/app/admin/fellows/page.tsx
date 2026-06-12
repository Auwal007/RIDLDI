'use client';

import React, { useEffect, useState } from 'react';
import { Search, Filter, Calendar, UserCheck, GraduationCap, Edit2, X, AlertCircle } from 'lucide-react';
import { Application } from '@/lib/db';

export default function FellowsPage() {
  const [fellows, setFellows] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [trackFilter, setTrackFilter] = useState('all');
  
  // Drawer / modal states
  const [selectedFellow, setSelectedFellow] = useState<Application | null>(null);
  const [startDate, setStartDate] = useState('');
  const [mentorName, setMentorName] = useState('');
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const fetchFellows = async () => {
    try {
      const res = await fetch('/api/applications');
      if (res.ok) {
        const data: Application[] = await res.json();
        // Fellows are candidates with status === 'approved'
        const approvedFellows = data.filter(app => app.status === 'approved');
        setFellows(approvedFellows);
      }
    } catch (error) {
      console.error('Failed to fetch fellows:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFellows();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleEditClick = (fellow: Application) => {
    setSelectedFellow(fellow);
    setStartDate(fellow.startDate || '');
    setMentorName(fellow.mentorName || '');
  };

  const handleCloseModal = () => {
    setSelectedFellow(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFellow) return;
    setSaving(true);

    try {
      const res = await fetch(`/api/applications/${selectedFellow.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startDate: startDate || undefined,
          mentorName: mentorName || undefined
        }),
      });

      if (res.ok) {
        showToast('Fellow program details updated successfully.');
        setSelectedFellow(null);
        fetchFellows(); // Refresh state
      } else {
        showToast('Failed to update program details.');
      }
    } catch (error) {
      console.error('Error saving program details:', error);
      showToast('An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  // Filter logic
  const filteredFellows = fellows.filter((f) => {
    const matchesSearch = f.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTrack = trackFilter === 'all' || f.track === trackFilter;
    return matchesSearch && matchesTrack;
  });

  // Extract unique tracks among fellows for filter dropdown
  const uniqueTracks = Array.from(new Set(fellows.map(f => f.track)));

  // Metrics
  const totalFellowsCount = fellows.length;
  const assignedMentorsCount = fellows.filter(f => f.mentorName && f.mentorName.trim() !== '').length;
  
  // Find earliest commencement date or default to 'July 1, 2026'
  const cohortCommencement = fellows.find(f => f.startDate)?.startDate || '2026-07-01';

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Fellows dashboard...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Title Header */}
      <div>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '28px', fontWeight: 600, color: '#1A1815', margin: '0 0 8px' }}>
          Fellows Directory
        </h2>
        <p style={{ color: '#6B7280', margin: 0, fontSize: '15px' }}>
          Manage approved candidates, assign mentors, and schedule cohort commencement dates.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: '#D1FAE5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <GraduationCap size={28} />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500, color: '#6B7280', marginBottom: '4px' }}>Total Fellows</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#111827', lineHeight: 1 }}>{totalFellowsCount}</div>
          </div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: '#EFF6FF', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserCheck size={28} />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500, color: '#6B7280', marginBottom: '4px' }}>Assigned Mentors</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#111827', lineHeight: 1 }}>{assignedMentorsCount} / {totalFellowsCount}</div>
          </div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: '#FEF3C7', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Calendar size={28} />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500, color: '#6B7280', marginBottom: '4px' }}>Next Commencement</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>
              {new Date(cohortCommencement).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </div>
      </div>

      {/* Directory Grid with Filters */}
      <div style={{ background: '#FFFFFF', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #F3F4F6' }}>
        
        {/* Filter Bar */}
        <div className="admin-filters-bar" style={{ padding: '20px 24px', borderBottom: '1px solid #E5E7EB', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '12px', flex: '1 1 300px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}>
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search fellow by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px 14px 10px 40px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                className="focus:border-[#B5532A] focus:ring-1 focus:ring-[#B5532A]"
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4B5563', fontSize: '14px' }}>
              <Filter size={16} /> Track:
            </div>
            <select
              value={trackFilter}
              onChange={(e) => setTrackFilter(e.target.value)}
              style={{ padding: '10px 36px 10px 14px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '14px', outline: 'none', background: '#fff', appearance: 'none' }}
              className="focus:border-[#B5532A] focus:ring-1 focus:ring-[#B5532A]"
            >
              <option value="all">All Tracks</option>
              {uniqueTracks.map((track) => (
                <option key={track} value={track}>{track}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Directory Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fellow Name</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Track / Skill</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Start Date</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Assigned Mentor</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFellows.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '48px 24px', textAlign: 'center', color: '#6B7280' }}>
                    No fellows currently enrolled or matching the filters.
                  </td>
                </tr>
              ) : (
                filteredFellows.map((fellow) => (
                  <tr key={fellow.id} style={{ borderBottom: '1px solid #E5E7EB' }} className="hover:bg-gray-50 transition-colors">
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontWeight: 600, color: '#111827', marginBottom: '4px' }}>{fellow.fullName}</div>
                      <div style={{ fontSize: '13px', color: '#6B7280' }}>{fellow.email}</div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>{fellow.track}</div>
                      <div style={{ fontSize: '12px', color: '#6B7280' }}>{fellow.skill}</div>
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: '14px', color: '#4B5563' }}>
                      {fellow.startDate ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#111827', fontWeight: 500 }}>
                          <Calendar size={14} className="text-[#B5532A]" />
                          {new Date(fellow.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      ) : (
                        <span style={{ color: '#9CA3AF', fontStyle: 'italic' }}>Not Scheduled</span>
                      )}
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: '14px', color: '#4B5563' }}>
                      {fellow.mentorName ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#111827', fontWeight: 500 }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
                          {fellow.mentorName}
                        </span>
                      ) : (
                        <span style={{ color: '#9CA3AF', fontStyle: 'italic', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <AlertCircle size={14} className="text-amber-500" />
                          Unassigned
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleEditClick(fellow)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 14px',
                          background: '#FFFFFF',
                          border: '1px solid #D1D5DB',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: 500,
                          color: '#374151',
                          cursor: 'pointer',
                          transition: 'all 0.15s'
                        }}
                        className="hover:bg-gray-50 hover:border-gray-400"
                      >
                        <Edit2 size={14} /> Assign/Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Edit Dialog */}
      {selectedFellow && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, animation: 'ridFade 0.2s ease' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '12px', width: '100%', maxWidth: '480px', border: '1px solid #E5E7EB', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            
            {/* Modal Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#111827' }}>Program Assignment</h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '13.5px', color: '#6B7280' }}>Fellow: {selectedFellow.fullName}</p>
              </div>
              <button onClick={handleCloseModal} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer' }} className="hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Track Assigned</label>
                <div style={{ padding: '10px 14px', background: '#FAF1EB', border: '1px solid #F0D9C8', borderRadius: '8px', color: '#8A4423', fontSize: '14.5px', fontWeight: 600 }}>
                  {selectedFellow.track}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="start-date-input" style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Fellowship Commencement Date</label>
                <input
                  id="start-date-input"
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '14.5px', outline: 'none' }}
                  className="focus:border-[#B5532A]"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="mentor-name-input" style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Assigned Fellowship Mentor</label>
                <input
                  id="mentor-name-input"
                  type="text"
                  required
                  placeholder="e.g. Dr. Sarah Alao"
                  value={mentorName}
                  onChange={(e) => setMentorName(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '14.5px', outline: 'none' }}
                  className="focus:border-[#B5532A]"
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px', borderTop: '1px solid #F3F4F6', paddingTop: '20px' }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{ padding: '10px 16px', background: '#FFFFFF', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '14px', fontWeight: 600, color: '#374151', cursor: 'pointer' }}
                  className="hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  style={{ padding: '10px 20px', background: '#B5532A', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, color: '#FFFFFF', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, boxShadow: '0 2px 4px rgba(181,83,42,0.2)' }}
                  className="hover:bg-[#9E4420]"
                >
                  {saving ? 'Saving...' : 'Save Assignments'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Persistent Toast Messages */}
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', background: '#1A1815', color: '#FAF7F1', padding: '12px 24px', borderRadius: '8px', zIndex: 100, fontSize: '14.5px', fontWeight: 500, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '8px', animation: 'ridFade 0.2s ease' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
          {toastMessage}
        </div>
      )}
    </div>
  );
}
