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
