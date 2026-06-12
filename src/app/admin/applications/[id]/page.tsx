'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, GraduationCap, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Application } from '@/lib/db';

export default function ApplicationDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await fetch(`/api/applications/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setApplication(data);
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

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
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

          <div style={{ display: 'flex', gap: '12px' }}>
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', alignItems: 'start' }}>

        {/* Left Column - Applicant Info */}
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
        </div>

        {/* Right Column - Track & Motivation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 2 }}>

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

          {/* Motivation & Docs */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: '0 0 20px' }}>Motivation & Documents</h3>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>Motivation Statement</div>
              <div style={{ background: '#F9FAFB', padding: '16px', borderRadius: '8px', border: '1px solid #F3F4F6', fontSize: '15px', lineHeight: 1.6, color: '#4B5563', whiteSpace: 'pre-wrap' }}>
                {application.motivation || 'No motivation statement provided.'}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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

        </div>
      </div>
    </div>
  );
}
