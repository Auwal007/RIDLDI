'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FileText, Settings, Menu, X, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Applications', href: '/admin/applications', icon: FileText },
    { name: 'Fellows', href: '/admin/fellows', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F5F7F9', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }}
          onClick={closeSidebar}
          className="md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '260px',
          background: '#1A1815',
          color: '#FAF7F1',
          zIndex: 50,
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column'
        }}
        className="md:translate-x-0"
      >
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Link href="/" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 700, color: '#FAF7F1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            RIDLDI
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', background: '#B5532A', padding: '2px 6px', borderRadius: '4px' }}>Admin</span>
          </Link>
          <button
            className="md:hidden"
            style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#FAF7F1', cursor: 'pointer' }}
            onClick={closeSidebar}
          >
            <X size={24} />
          </button>
        </div>

        <nav style={{ padding: '24px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeSidebar}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  color: isActive ? '#FFFFFF' : 'rgba(250,247,241,0.6)',
                  background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                  textDecoration: 'none',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'all 0.2s'
                }}
                className="hover:bg-white/5 hover:text-white"
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'none', border: 'none', color: 'rgba(250,247,241,0.6)', cursor: 'pointer', fontWeight: 500, width: '100%', padding: '8px 0' }} className="hover:text-white">
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }} className="md:ml-[260px]">
        {/* Header */}
        <header style={{ height: '72px', background: '#FFFFFF', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', padding: '0 24px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              className="md:hidden"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1A1815' }}
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '20px', fontWeight: 600, color: '#1A1815', margin: 0 }}>
              RIDLDI Fellowship Admin
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F0EBE3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#B5532A' }}>
              AD
            </div>
            <span style={{ fontSize: '14px', fontWeight: 500, color: '#4A4540' }} className="hidden sm:inline">Admin User</span>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
