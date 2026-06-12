'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Eye, ArrowUpDown } from 'lucide-react';
import { Application } from '@/lib/db';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'approved': return { bg: '#D1FAE5', color: '#065F46' };
      case 'rejected': return { bg: '#FEE2E2', color: '#991B1B' };
      case 'reviewing': return { bg: '#DBEAFE', color: '#1E40AF' };
      case 'pending': default: return { bg: '#FEF3C7', color: '#92400E' };
    }
  };

  const filteredApps = applications.filter((app) => {
    const matchesSearch = app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportToCSV = () => {
    const headers = ['ID', 'Full Name', 'Email', 'Phone', 'Gender', 'DOB', 'Location', 'Education', 'Employment', 'Track', 'Skill Level', 'Status', 'Applied Date'];
    const rows = filteredApps.map(app => [
      app.id,
      `"${app.fullName.replace(/"/g, '""')}"`,
      app.email,
      app.phone,
      app.gender || '',
      app.dob || '',
      `"${app.location.replace(/"/g, '""')}"`,
      app.education,
      app.employment,
      `"${app.track.replace(/"/g, '""')}"`,
      app.skill,
      app.status,
      new Date(app.createdAt).toLocaleDateString()
    ]);
    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ridldi_applications_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading applications...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '28px', fontWeight: 600, color: '#1A1815', margin: '0 0 8px' }}>
            Applications
          </h2>
          <p style={{ color: '#6B7280', margin: 0, fontSize: '15px' }}>
            Manage and review all fellowship applications.
          </p>
        </div>
        <button
          onClick={exportToCSV}
          style={{
            padding: '10px 20px',
            background: '#B5532A',
            border: 'none',
            borderRadius: '8px',
            color: '#FFFFFF',
            fontSize: '14.5px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 4px rgba(181,83,42,0.2)'
          }}
          className="hover:bg-[#9E4420] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          Export to CSV
        </button>
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #F3F4F6' }}>
        {/* Filters and Actions */}
        <div className="admin-filters-bar" style={{ padding: '20px 24px', borderBottom: '1px solid #E5E7EB', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '12px', flex: '1 1 300px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}>
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px 14px 10px 40px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                className="focus:border-[#B5532A] focus:ring-1 focus:ring-[#B5532A]"
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4B5563', fontSize: '14px' }}>
              <Filter size={16} /> Filter:
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: '10px 36px 10px 14px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '14px', outline: 'none', background: '#fff', appearance: 'none' }}
              className="focus:border-[#B5532A] focus:ring-1 focus:ring-[#B5532A]"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="reviewing">Reviewing</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>Applicant <ArrowUpDown size={14} /></div>
                </th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Track / Skill</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>Date <ArrowUpDown size={14} /></div>
                </th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '48px 24px', textAlign: 'center', color: '#6B7280' }}>
                    No applications match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => {
                  const statusStyle = getStatusStyle(app.status);
                  return (
                    <tr key={app.id} style={{ borderBottom: '1px solid #E5E7EB' }} className="hover:bg-gray-50 transition-colors">
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ fontWeight: 600, color: '#111827', marginBottom: '4px' }}>{app.fullName}</div>
                        <div style={{ fontSize: '13px', color: '#6B7280', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span>{app.email}</span>
                          <span>{app.phone}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>{app.track}</div>
                        <div style={{ fontSize: '13px', color: '#6B7280' }}>{app.skill}</div>
                      </td>
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
                      <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                        <Link
                          href={`/admin/applications/${app.id}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 16px',
                            background: '#FFFFFF',
                            border: '1px solid #D1D5DB',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: 500,
                            color: '#374151',
                            textDecoration: 'none',
                            transition: 'all 0.15s'
                          }}
                          className="hover:bg-gray-50 hover:border-gray-400"
                        >
                          <Eye size={16} /> Review
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination (Mock UI) */}
        {filteredApps.length > 0 && (
          <div className="admin-pagination" style={{ padding: '16px 24px', borderTop: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', color: '#6B7280' }}>
              Showing <span style={{ fontWeight: 500, color: '#374151' }}>1</span> to <span style={{ fontWeight: 500, color: '#374151' }}>{filteredApps.length}</span> of <span style={{ fontWeight: 500, color: '#374151' }}>{filteredApps.length}</span> results
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button disabled style={{ padding: '8px 16px', border: '1px solid #E5E7EB', borderRadius: '6px', background: '#F9FAFB', color: '#9CA3AF', fontSize: '14px', fontWeight: 500, cursor: 'not-allowed' }}>Previous</button>
              <button disabled style={{ padding: '8px 16px', border: '1px solid #E5E7EB', borderRadius: '6px', background: '#F9FAFB', color: '#9CA3AF', fontSize: '14px', fontWeight: 500, cursor: 'not-allowed' }}>Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
