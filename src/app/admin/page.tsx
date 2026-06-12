'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, FileCheck, Clock, XCircle, ArrowRight } from 'lucide-react';
import { Application } from '@/lib/db';

export default function AdminDashboardPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch('/api/applications');
        if (res.ok) {
          const data = await res.json();
          setApplications(data);
        }
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading dashboard...</div>;
  }

  const stats = [
    {
      label: 'Total Applications',
      value: applications.length,
      icon: Users,
      color: '#3B82F6',
      bg: '#EFF6FF'
    },
    {
      label: 'Pending Review',
      value: applications.filter(a => a.status === 'pending').length,
      icon: Clock,
      color: '#F59E0B',
      bg: '#FEF3C7'
    },
    {
      label: 'Approved',
      value: applications.filter(a => a.status === 'approved').length,
      icon: FileCheck,
      color: '#10B981',
      bg: '#D1FAE5'
    },
    {
      label: 'Rejected',
      value: applications.filter(a => a.status === 'rejected').length,
      icon: XCircle,
      color: '#EF4444',
      bg: '#FEE2E2'
    },
  ];

  const recentApplications = applications.slice(0, 5);

  const approvedCount = applications.filter(a => a.status === 'approved').length;
  const reviewingCount = applications.filter(a => a.status === 'reviewing').length;
  const pendingCount = applications.filter(a => a.status === 'pending').length;
  const rejectedCount = applications.filter(a => a.status === 'rejected').length;
  const total = applications.length;

  const trackCounts: Record<string, number> = {};
  applications.forEach(app => {
    trackCounts[app.track] = (trackCounts[app.track] || 0) + 1;
  });
  const trackData = Object.entries(trackCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const getDoughnutSegments = () => {
    if (total === 0) return [];
    const segments = [
      { label: 'Approved', count: approvedCount, color: '#10B981' },
      { label: 'Reviewing', count: reviewingCount, color: '#3B82F6' },
      { label: 'Pending', count: pendingCount, color: '#F59E0B' },
      { label: 'Rejected', count: rejectedCount, color: '#EF4444' }
    ].filter(s => s.count > 0);

    let currentOffset = 0;
    const radius = 35;
    const circumference = 2 * Math.PI * radius;

    return segments.map(s => {
      const percentage = s.count / total;
      const strokeDashoffset = circumference - (percentage * circumference);
      const rotation = (currentOffset / total) * 360;
      currentOffset += s.count;

      return {
        ...s,
        strokeDasharray: circumference,
        strokeDashoffset,
        rotation,
        radius,
        percentage: Math.round(percentage * 100)
      };
    });
  };

  const segments = getDoughnutSegments();

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'approved': return { bg: '#D1FAE5', color: '#065F46' };
      case 'rejected': return { bg: '#FEE2E2', color: '#991B1B' };
      case 'reviewing': return { bg: '#DBEAFE', color: '#1E40AF' };
      case 'pending': default: return { bg: '#FEF3C7', color: '#92400E' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '28px', fontWeight: 600, color: '#1A1815', margin: '0 0 8px' }}>
          Dashboard Overview
        </h2>
        <p style={{ color: '#6B7280', margin: 0, fontSize: '15px' }}>
          Welcome back. Here's what's happening with the Fellowship applications today.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: stat.bg, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={28} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#6B7280', marginBottom: '4px' }}>{stat.label}</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#111827', lineHeight: 1 }}>{stat.value}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics & Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }} className="admin-analytics-grid">
        {/* Track distribution */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', border: '1px solid #F3F4F6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: 600, color: '#111827' }}>Applications by Training Track</h3>
          {trackData.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#6B7280' }}>No track data available.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {trackData.map((item, idx) => {
                const percentage = (item.count / total) * 100;
                return (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 500, color: '#374151' }}>
                      <span style={{ fontWeight: 600 }}>{item.name}</span>
                      <span>{item.count} {item.count === 1 ? 'applicant' : 'applicants'} ({Math.round(percentage)}%)</span>
                    </div>
                    <div style={{ height: '8px', background: '#F3F4F6', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${percentage}%`, height: '100%', background: '#B5532A', borderRadius: '4px' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Status distribution radial chart */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', border: '1px solid #F3F4F6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: 600, color: '#111827', alignSelf: 'flex-start' }}>Status Breakdown</h3>
          {total === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#6B7280' }}>No data available.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' }}>
              <div style={{ position: 'relative', width: '150px', height: '150px' }}>
                <svg width="150" height="150" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                  {segments.map((seg, idx) => (
                    <circle
                      key={idx}
                      cx="50"
                      cy="50"
                      r={seg.radius}
                      fill="transparent"
                      stroke={seg.color}
                      strokeWidth="10"
                      strokeDasharray={seg.strokeDasharray}
                      strokeDashoffset={seg.strokeDashoffset}
                      style={{
                        transformOrigin: '50px 50px',
                        transform: `rotate(${seg.rotation}deg)`,
                      }}
                    />
                  ))}
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                  <span style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>{total}</span>
                  <span style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 16px', width: '100%', borderTop: '1px solid #F3F4F6', paddingTop: '16px' }}>
                {[
                  { label: 'Approved', count: approvedCount, color: '#10B981' },
                  { label: 'Reviewing', count: reviewingCount, color: '#3B82F6' },
                  { label: 'Pending', count: pendingCount, color: '#F59E0B' },
                  { label: 'Rejected', count: rejectedCount, color: '#EF4444' }
                ].map((s, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: s.color }} />
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                      <span style={{ fontSize: '12px', color: '#6B7280' }}>{s.label}</span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{s.count} ({total > 0 ? Math.round(s.count / total * 100) : 0}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Applications */}
      <div style={{ background: '#FFFFFF', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #F3F4F6', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#111827' }}>Recent Applications</h3>
          <Link href="/admin/applications" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500, color: '#B5532A', textDecoration: 'none' }}>
            View all <ArrowRight size={16} />
          </Link>
        </div>

        {recentApplications.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
            No applications found.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                  <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Applicant</th>
                  <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Track</th>
                  <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</th>
                  <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app) => {
                  const statusStyle = getStatusStyle(app.status);
                  return (
                    <tr key={app.id} style={{ borderBottom: '1px solid #E5E7EB' }} className="hover:bg-gray-50">
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ fontWeight: 500, color: '#111827', marginBottom: '4px' }}>{app.fullName}</div>
                        <div style={{ fontSize: '13px', color: '#6B7280' }}>{app.email}</div>
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: '#4B5563' }}>{app.track}</td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: '#4B5563' }}>
                        {new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          fontSize: '12px',
                          fontWeight: 500,
                          background: statusStyle.bg,
                          color: statusStyle.color,
                          textTransform: 'capitalize'
                        }}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
