'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, GraduationCap, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Application, ApplicationStatus } from '@/lib/db';

interface StarRatingProps {
  value: number;
  onChange: (v: number) => void;
  disabled: boolean;
}

function StarRating({ value, onChange, disabled }: StarRatingProps) {
  return (
    <div style={{ display: 'flex', gap: '6px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          disabled={disabled}
          onClick={() => onChange(star)}
          style={{
            background: 'none',
            border: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            padding: 0,
            fontSize: '22px',
            color: star <= value ? '#F59E0B' : '#E5E7EB',
            transition: 'transform 0.15s, color 0.15s'
          }}
          className="hover:scale-110"
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function ApplicationDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [notes, setNotes] = useState('');
  const [scorecard, setScorecard] = useState({ motivation: 0, readiness: 0, education: 0, fit: 0 });
  const [notesSaved, setNotesSaved] = useState(false);
  const [scorecardSaved, setScorecardSaved] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await fetch(`/api/applications/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setApplication(data);
          setNotes(data.notes || '');
          setScorecard(data.scorecard || { motivation: 0, readiness: 0, education: 0, fit: 0 });
        } else {
          router.push('/admin/applications');
        }
      } catch (error) {
        console.error('Failed to fetch application:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchApplication();
  }, [params.id, router]);

  const handleSaveNotes = async () => {
    if (!application) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/applications/${application.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });
      if (res.ok) {
        const updated = await res.json();
        setApplication(updated);
        setNotesSaved(true);
        setTimeout(() => setNotesSaved(false), 2000);
      }
    } catch (error) {
      console.error('Failed to update notes:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleSaveScorecard = async () => {
    if (!application) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/applications/${application.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scorecard }),
      });
      if (res.ok) {
        const updated = await res.json();
        setApplication(updated);
        setScorecardSaved(true);
        setTimeout(() => setScorecardSaved(false), 2000);
      }
    } catch (error) {
      console.error('Failed to update scorecard:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleScorecardChange = (key: string, val: number) => {
    setScorecard(prev => ({ ...prev, [key]: val }));
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!application) return;
    setUpdating(true);

    try {
      const res = await fetch(`/api/applications/${application.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updated = await res.json();
        setApplication(updated);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading application details...</div>;
  }

  if (!application) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Application not found.</div>;
  }

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'approved': return { bg: '#D1FAE5', color: '#065F46', icon: CheckCircle };
      case 'rejected': return { bg: '#FEE2E2', color: '#991B1B', icon: XCircle };
      case 'reviewing': return { bg: '#DBEAFE', color: '#1E40AF', icon: Clock };
      case 'pending': default: return { bg: '#FEF3C7', color: '#92400E', icon: Clock };
    }
  };

  const statusStyle = getStatusStyle(application.status);
  const StatusIcon = statusStyle.icon;

  const timelineEvents = application.timeline && application.timeline.length > 0
    ? application.timeline
    : [
        { status: 'pending', timestamp: application.createdAt }
      ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '60px' }}>
      {/* Header & Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Link
          href="/admin/applications"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500, color: '#6B7280', textDecoration: 'none' }}
          className="hover:text-gray-900"
        >
          <ArrowLeft size={16} /> Back to Applications
        </Link>

        <div className="admin-details-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '32px', fontWeight: 600, color: '#111827', margin: 0 }}>
                {application.fullName}
              </h1>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 600,
                background: statusStyle.bg,
                color: statusStyle.color,
                textTransform: 'capitalize'
              }}>
                <StatusIcon size={14} />
                {application.status}
              </span>
            </div>
            <p style={{ color: '#6B7280', margin: 0, fontSize: '15px' }}>
              Applied on {new Date(application.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="admin-details-actions" style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => handleStatusChange('reviewing')}
              disabled={updating || application.status === 'reviewing'}
              style={{ padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, background: '#FFFFFF', border: '1px solid #D1D5DB', color: '#374151', cursor: (updating || application.status === 'reviewing') ? 'not-allowed' : 'pointer', opacity: (updating || application.status === 'reviewing') ? 0.6 : 1 }}
              className="hover:bg-gray-50"
            >
              Mark as Reviewing
            </button>
            <button
              onClick={() => handleStatusChange('rejected')}
              disabled={updating || application.status === 'rejected'}
              style={{ padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#991B1B', cursor: (updating || application.status === 'rejected') ? 'not-allowed' : 'pointer', opacity: (updating || application.status === 'rejected') ? 0.6 : 1 }}
              className="hover:bg-red-100"
            >
              Reject
            </button>
            <button
              onClick={() => handleStatusChange('approved')}
              disabled={updating || application.status === 'approved'}
              style={{ padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, background: '#10B981', border: 'none', color: '#FFFFFF', cursor: (updating || application.status === 'approved') ? 'not-allowed' : 'pointer', opacity: (updating || application.status === 'approved') ? 0.6 : 1, boxShadow: '0 2px 4px rgba(16,185,129,0.2)' }}
              className="hover:bg-emerald-600"
            >
              Approve
            </button>
          </div>
        </div>
      </div>

      <div className="admin-details-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.9fr', gap: '24px', alignItems: 'start' }}>

        {/* Left Column - Applicant Info & Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Contact & Basic Info */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Contact Information
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ color: '#9CA3AF', marginTop: '2px' }}><Mail size={18} /></div>
                <div>
                  <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '2px' }}>Email Address</div>
                  <a href={`mailto:${application.email}`} style={{ fontSize: '15px', fontWeight: 500, color: '#2563EB', textDecoration: 'none' }}>{application.email}</a>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ color: '#9CA3AF', marginTop: '2px' }}><Phone size={18} /></div>
                <div>
                  <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '2px' }}>Phone Number</div>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: '#111827' }}>{application.phone}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ color: '#9CA3AF', marginTop: '2px' }}><MapPin size={18} /></div>
                <div>
                  <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '2px' }}>Location</div>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: '#111827' }}>{application.location}</div>
                </div>
              </div>
            </div>

            <hr style={{ border: 0, borderTop: '1px solid #E5E7EB', margin: '24px 0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>Gender</div>
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#111827', textTransform: 'capitalize' }}>{application.gender || 'Not specified'}</div>
              </div>
              <div>
                <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>Date of Birth</div>
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#111827' }}>{application.dob ? new Date(application.dob).toLocaleDateString() : 'Not specified'}</div>
              </div>
            </div>
          </div>

          {/* Background */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: '0 0 20px' }}>Background</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ color: '#9CA3AF', marginTop: '2px' }}><GraduationCap size={18} /></div>
                <div>
                  <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '2px' }}>Education Level</div>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: '#111827', textTransform: 'capitalize' }}>{application.education.replace('-', ' ')}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ color: '#9CA3AF', marginTop: '2px' }}><Briefcase size={18} /></div>
                <div>
                  <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '2px' }}>Employment Status</div>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: '#111827', textTransform: 'capitalize' }}>{application.employment.replace('-', ' ')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Activity Timeline */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: '0 0 20px' }}>Activity Timeline</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', position: 'relative', paddingLeft: '20px' }}>
              <div style={{ position: 'absolute', left: '4px', top: '8px', bottom: '8px', width: '2px', background: '#E5E7EB' }} />
              {timelineEvents.map((evt, idx) => {
                const stepStyle = getStatusStyle(evt.status);
                return (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '2px', position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '-20px',
                      top: '6px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      border: `2.5px solid ${stepStyle.color}`,
                      zIndex: 2
                    }} />
                    <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#111827', textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {evt.status}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#6B7280' }}>
                      {new Date(evt.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Track, Scorecard, Motivation & Reviewer Notes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Fellowship Track */}
          <div style={{ background: '#FAF1EB', borderRadius: '12px', border: '1px solid #F0D9C8', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#8A4423', margin: '0 0 16px' }}>Applied Track</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '13px', color: '#B5532A', marginBottom: '4px', fontWeight: 500 }}>Selected Track</div>
                <div style={{ fontSize: '20px', fontWeight: 600, color: '#1A1815' }}>{application.track}</div>
              </div>
              <div>
                <div style={{ fontSize: '13px', color: '#B5532A', marginBottom: '4px', fontWeight: 500 }}>Experience Level</div>
                <div style={{ display: 'inline-block', padding: '4px 12px', background: '#FFFFFF', borderRadius: '6px', fontSize: '14px', fontWeight: 600, color: '#1A1815', border: '1px solid #E7E1D7' }}>
                  {application.skill}
                </div>
              </div>
            </div>
          </div>

          {/* Candidate Assessment Scorecard */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: 0 }}>Candidate Assessment</h3>
              {scorecardSaved && <span style={{ fontSize: '12.5px', color: '#10B981', fontWeight: 600, animation: 'ridFade 0.2s ease' }}>✓ Saved!</span>}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
              {[
                { key: 'motivation', label: 'Motivation Quality', desc: 'Alignment with fellowship goals and drive' },
                { key: 'readiness', label: 'Technical Readiness', desc: 'Pre-existing digital exposure or capacity' },
                { key: 'education', label: 'Educational Fit', desc: 'Suitability of background matching target track' },
                { key: 'fit', label: 'Community & Climate Fit', desc: 'Alignment with rural/urban community values' }
              ].map((criteria) => (
                <div key={criteria.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>{criteria.label}</div>
                    <div style={{ fontSize: '12px', color: '#6B7280' }}>{criteria.desc}</div>
                  </div>
                  <StarRating 
                    value={scorecard[criteria.key as keyof typeof scorecard]} 
                    onChange={(val) => handleScorecardChange(criteria.key, val)}
                    disabled={updating}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleSaveScorecard}
              disabled={updating}
              style={{
                width: '100%',
                padding: '11px',
                background: '#1A1815',
                color: '#FAF7F1',
                borderRadius: '8px',
                border: 'none',
                fontSize: '14px',
                fontWeight: 600,
                cursor: updating ? 'not-allowed' : 'pointer',
                transition: 'opacity 0.2s'
              }}
              className="hover:opacity-95"
            >
              {updating ? 'Saving Scorecard...' : 'Save Assessment Scores'}
            </button>
          </div>

          {/* Motivation & Docs */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: '0 0 20px' }}>Motivation &amp; Documents</h3>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>Motivation Statement</div>
              <div style={{ background: '#F9FAFB', padding: '16px', borderRadius: '8px', border: '1px solid #F3F4F6', fontSize: '15px', lineHeight: 1.6, color: '#4B5563', whiteSpace: 'pre-wrap' }}>
                {application.motivation || 'No motivation statement provided.'}
              </div>
            </div>

            <div className="admin-docs-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>LinkedIn Profile</div>
                {application.linkedin ? (
                  <a href={application.linkedin.startsWith('http') ? application.linkedin : `https://${application.linkedin}`} target="_blank" rel="noreferrer" style={{ fontSize: '15px', color: '#2563EB', textDecoration: 'none', wordBreak: 'break-all' }}>
                    {application.linkedin}
                  </a>
                ) : (
                  <span style={{ color: '#9CA3AF', fontSize: '14px' }}>Not provided</span>
                )}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>CV / Résumé</div>
                {application.cv ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
                    <div style={{ background: '#E0E7FF', color: '#4F46E5', padding: '8px', borderRadius: '6px' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#374151', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {application.cv}
                    </span>
                  </div>
                ) : (
                  <span style={{ color: '#9CA3AF', fontSize: '14px' }}>Not provided</span>
                )}
              </div>
            </div>
          </div>

          {/* Reviewer Notes & Feedback */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: 0 }}>Reviewer Feedback Notes</h3>
              {notesSaved && <span style={{ fontSize: '12.5px', color: '#10B981', fontWeight: 600, animation: 'ridFade 0.2s ease' }}>✓ Saved!</span>}
            </div>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Add internal evaluation feedback, interview notes, or screening feedback..."
              style={{
                width: '100%',
                background: '#FFFFFF',
                border: '1.5px solid #DDD8CF',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14.5px',
                color: '#1A1815',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                lineHeight: 1.5,
                marginBottom: '16px'
              }}
              className="focus:border-[#B5532A]"
            />

            <button
              onClick={handleSaveNotes}
              disabled={updating}
              style={{
                width: '100%',
                padding: '11px',
                background: '#B5532A',
                color: '#FAF7F1',
                borderRadius: '8px',
                border: 'none',
                fontSize: '14px',
                fontWeight: 600,
                cursor: updating ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
                boxShadow: '0 2px 4px rgba(181,83,42,0.2)'
              }}
              className="hover:bg-[#9E4420]"
            >
              {updating ? 'Saving Notes...' : 'Save Notes & Feedback'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
