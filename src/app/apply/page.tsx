'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ApplyPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    location: '',
    education: '',
    employment: '',
    track: '',
    skill: '',
    motivation: '',
    linkedin: '',
    cv: '',
    agree: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const setField = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const setCvFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setField('cv', file ? file.name : '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agree) return;
    setSubmitting(true);
    // Simulate submission API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1300);
  };

  const trackTitles = [
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

  const skillLevels = [
    { v: 'Beginner', sub: 'New to it' },
    { v: 'Intermediate', sub: 'Some basics' },
    { v: 'Advanced', sub: 'Comfortable' },
    { v: 'Expert', sub: 'Professional' },
  ];

  const fellowshipSteps = [
    { n: '1', title: 'Apply online', sub: 'Complete the application form — 10 minutes' },
    { n: '2', title: 'Skills screening', sub: 'A short assessment of your track readiness' },
    { n: '3', title: 'Interview', sub: 'A conversation about your goals and motivation' },
    { n: '4', title: 'Onboarding', sub: 'Welcome to your cohort and mentor' },
  ];

  const asidePerks = [
    'Fully-funded training for those who qualify',
    '1:1 mentorship with an industry expert',
    'A real, portfolio-ready project',
    'Introductions to our hiring partner network',
  ];

  const navLinks = [
    { label: 'About', href: '/#about' },
    { label: 'Programs', href: '/#programs' },
    { label: 'Fellowship', href: '/#fellowship' },
    { label: 'Impact', href: '/#impact' },
    { label: 'Partners', href: '/#partners' },
    { label: 'Contact', href: '/#contact' },
  ];

  const socials = [
    {
      label: 'LinkedIn',
      href: '#',
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
        </svg>
      ),
    },
    {
      label: 'Twitter',
      href: '#',
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      ),
    },
    {
      label: 'Instagram',
      href: '#',
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 7a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM17.5 6.5h.01" />
        </svg>
      ),
    },
    {
      label: 'YouTube',
      href: '#',
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 8a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4zM10 9l5 3-5 3z" />
        </svg>
      ),
    },
  ];

  const footerCols = [
    { title: 'Explore', links: [ { label: 'About Us', href: '/#about' }, { label: 'Our Impact', href: '/#impact' }, { label: 'Programs', href: '/#programs' }, { label: 'Success Stories', href: '/#stories' } ] },
    { title: 'Get Involved', links: [ { label: 'Apply as a Fellow', href: '/apply' }, { label: 'Partner With Us', href: '/#partners' }, { label: 'Support Us', href: '/#support' }, { label: 'Events', href: '/#events' } ] },
    { title: 'Resources', links: [ { label: 'News & Blog', href: '/#contact' }, { label: 'FAQ', href: '/#faq' }, { label: 'Contact', href: '/#contact' }, { label: 'Annual Report', href: '/#support' } ] },
  ];

  const applicantFirstName = form.fullName.trim().split(' ')[0] || 'there';

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", background: '#FAF7F1', color: '#1A1815', minHeight: '100vh', WebkitFontSmoothing: 'antialiased', overflowX: 'hidden' }}>
      
      {/* HEADER */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          background: 'rgba(250,247,241,0.9)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid #E7E1D7',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '23px', fontWeight: 700, letterSpacing: '-0.01em', cursor: 'pointer', color: '#1A1815', display: 'flex', alignItems: 'baseline', gap: '8px', textDecoration: 'none' }}>
            RIDLDI
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#A39E96' }}>Initiative</span>
          </Link>
          <nav style={{ alignItems: 'center', gap: '34px' }} className="hidden md:flex">
            {navLinks.map((link, idx) => (
              <Link key={idx} href={link.href} style={{ fontSize: '14.5px', fontWeight: 500, cursor: 'pointer', transition: 'opacity 0.2s', color: '#1A1815', textDecoration: 'none' }} className="hover:opacity-60">{link.label}</Link>
            ))}
            <Link href="/apply" style={{ fontSize: '14px', fontWeight: 600, padding: '10px 20px', borderRadius: '999px', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.2s', background: '#B5532A', color: '#FAF7F1', boxShadow: '0 2px 14px rgba(181,83,42,0.32)', textDecoration: 'none' }} className="hover:translate-y-[-1px] hover:shadow-[0_6px_20px_rgba(181,83,42,0.42)]">Apply as a Fellow</Link>
          </nav>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: '#1A1815' }} className="block md:hidden">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </header>

      {/* MOBILE NAV MENU */}
      {menuOpen && (
        <div className="mobile-menu" style={{ position: 'fixed', inset: 0, zIndex: 99, background: '#FAF7F1', padding: '90px 28px 40px', display: 'flex', flexDirection: 'column', gap: '6px', animation: 'ridFade 0.2s ease' }}>
          {navLinks.map((link, idx) => (
            <Link key={idx} href={link.href} onClick={() => setMenuOpen(false)} style={{ fontFamily: "'Outfit', sans-serif", fontSize: '30px', fontWeight: 600, color: '#1A1815', padding: '12px 0', borderBottom: '1px solid #E7E1D7', cursor: 'pointer', textDecoration: 'none' }}>{link.label}</Link>
          ))}
          <Link href="/apply" onClick={() => setMenuOpen(false)} style={{ marginTop: '22px', display: 'block', textAlign: 'center', padding: '16px', borderRadius: '999px', background: '#B5532A', color: '#FAF7F1', fontWeight: 600, fontSize: '16px', cursor: 'pointer', textDecoration: 'none' }}>Apply as a Fellow</Link>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main style={{ background: '#FAF7F1', minHeight: '100vh' }}>
        
        {submitted ? (
          /* SUBMITTED SUCCESS STATE */
          <section style={{ padding: '160px 24px 120px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ maxWidth: '620px', textAlign: 'center' }}>
              <div style={{ width: '76px', height: '76px', borderRadius: '999px', background: '#1A8A5B', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px' }}><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4"><path d="M20 6 9 17l-5-5"/></svg></div>
              <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 'clamp(38px, 6vw, 60px)', lineHeight: 1.04, letterSpacing: '-0.025em', margin: '0 0 20px' }}>Application received.</h1>
              <p style={{ fontSize: '18px', lineHeight: 1.65, color: '#4A4540', margin: '0 0 14px' }}>Thank you for applying to the RIDLDI Fellowship, <strong style={{ color: '#1A1815' }}>{applicantFirstName}</strong>. We've sent a confirmation to your email.</p>
              <p style={{ fontSize: '16px', lineHeight: 1.65, color: '#7A7570', margin: '0 0 40px' }}>Our team reviews every application personally. You'll hear from us within 10 working days about the skills-screening stage.</p>
              <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', padding: '15px 30px', borderRadius: '999px', background: '#1A1815', color: '#FAF7F1', fontWeight: 600, fontSize: '15px', cursor: 'pointer', textDecoration: 'none' }}>Back to homepage</Link>
            </div>
          </section>
        ) : (
          /* FORM ENTRY STATE */
          <>
            <section style={{ padding: '124px 24px 56px', background: '#1A1815', color: '#FAF7F1' }}>
              <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '14px', fontWeight: 500, color: 'rgba(250,247,241,0.6)', cursor: 'pointer', marginBottom: '28px', textDecoration: 'none' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>Back to RIDLDI
                </Link>
                <p style={{ fontSize: '12.5px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, color: '#F0A06A', margin: '0 0 16px' }}>Fellowship application · Cohort 02</p>
                <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 'clamp(40px, 6vw, 68px)', lineHeight: 1.0, letterSpacing: '-0.025em', margin: '0 0 18px' }}>Apply as a Fellow</h1>
                <p style={{ fontSize: '18px', lineHeight: '1.6', color: 'rgba(250,247,241,0.78)', margin: 0, maxWidth: '560px' }}>It takes about 10 minutes. There are no application fees — we select on motivation and potential. Applications for Cohort 02 close 30 September 2026.</p>
              </div>
            </section>

            <section style={{ padding: '64px 24px 110px' }}>
              <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '48px', alignItems: 'start' }} className="apply-grid">
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '44px' }}>
                  
                  {/* SECTION 1: Personal Details */}
                  <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                    <legend style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '15px', fontWeight: 600, color: '#FAF7F1', background: '#B5532A', width: '30px', height: '30px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '23px', fontWeight: 600, color: '#1A1815' }}>Personal details</span>
                    </legend>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="apply-row">
                      <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#4A4540' }}>Full name <span style={{ color: '#B5532A' }}>*</span></span>
                        <input required value={form.fullName} onChange={(e) => setField('fullName', e.target.value)} placeholder="e.g. Amina Yusuf" style={{ width: '100%', background: '#FFFFFF', border: '1.5px solid #DDD8CF', borderRadius: '10px', padding: '14px 15px', fontSize: '15px', color: '#1A1815', outline: 'none' }} />
                      </label>
                      <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#4A4540' }}>Email address <span style={{ color: '#B5532A' }}>*</span></span>
                        <input required type="email" value={form.email} onChange={(e) => setField('email', e.target.value)} placeholder="your@email.com" style={{ width: '100%', background: '#FFFFFF', border: '1.5px solid #DDD8CF', borderRadius: '10px', padding: '14px 15px', fontSize: '15px', color: '#1A1815', outline: 'none' }} />
                      </label>
                      <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#4A4540' }}>Phone number <span style={{ color: '#B5532A' }}>*</span></span>
                        <input required value={form.phone} onChange={(e) => setField('phone', e.target.value)} placeholder="+234 ..." style={{ width: '100%', background: '#FFFFFF', border: '1.5px solid #DDD8CF', borderRadius: '10px', padding: '14px 15px', fontSize: '15px', color: '#1A1815', outline: 'none' }} />
                      </label>
                      <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#4A4540' }}>Gender</span>
                        <select value={form.gender} onChange={(e) => setField('gender', e.target.value)} style={{ width: '100%', background: '#FFFFFF', border: '1.5px solid #DDD8CF', borderRadius: '10px', padding: '14px 15px', fontSize: '15px', color: '#1A1815', outline: 'none' }}>
                          <option value="">Select…</option>
                          <option value="female">Female</option>
                          <option value="male">Male</option>
                          <option value="other">Other</option>
                          <option value="prefer-not">Prefer not to say</option>
                        </select>
                      </label>
                      <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#4A4540' }}>Date of birth <span style={{ color: '#B5532A' }}>*</span></span>
                        <input required type="date" value={form.dob} onChange={(e) => setField('dob', e.target.value)} style={{ width: '100%', background: '#FFFFFF', border: '1.5px solid #DDD8CF', borderRadius: '10px', padding: '13px 15px', fontSize: '15px', color: '#1A1815', outline: 'none' }} />
                      </label>
                      <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#4A4540' }}>Location (city, state) <span style={{ color: '#B5532A' }}>*</span></span>
                        <input required value={form.location} onChange={(e) => setField('location', e.target.value)} placeholder="e.g. Jos, Plateau" style={{ width: '100%', background: '#FFFFFF', border: '1.5px solid #DDD8CF', borderRadius: '10px', padding: '14px 15px', fontSize: '15px', color: '#1A1815', outline: 'none' }} />
                      </label>
                    </div>
                  </fieldset>

                  {/* SECTION 2: Background */}
                  <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                    <legend style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '15px', fontWeight: 600, color: '#FAF7F1', background: '#B5532A', width: '30px', height: '30px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '23px', fontWeight: 600, color: '#1A1815' }}>Background</span>
                    </legend>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="apply-row">
                      <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#4A4540' }}>Educational background <span style={{ color: '#B5532A' }}>*</span></span>
                        <select required value={form.education} onChange={(e) => setField('education', e.target.value)} style={{ width: '100%', background: '#FFFFFF', border: '1.5px solid #DDD8CF', borderRadius: '10px', padding: '14px 15px', fontSize: '15px', color: '#1A1815', outline: 'none' }}>
                          <option value="">Select…</option>
                          <option value="secondary">Secondary school</option>
                          <option value="diploma">Diploma / NCE</option>
                          <option value="undergrad">Undergraduate degree</option>
                          <option value="postgrad">Postgraduate degree</option>
                          <option value="self">Self-taught / other</option>
                        </select>
                      </label>
                      <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#4A4540' }}>Employment status <span style={{ color: '#B5532A' }}>*</span></span>
                        <select required value={form.employment} onChange={(e) => setField('employment', e.target.value)} style={{ width: '100%', background: '#FFFFFF', border: '1.5px solid #DDD8CF', borderRadius: '10px', padding: '14px 15px', fontSize: '15px', color: '#1A1815', outline: 'none' }}>
                          <option value="">Select…</option>
                          <option value="student">Student</option>
                          <option value="unemployed">Unemployed</option>
                          <option value="self-employed">Self-employed</option>
                          <option value="employed">Employed</option>
                          <option value="farmer">Farmer / agripreneur</option>
                        </select>
                      </label>
                    </div>
                  </fieldset>

                  {/* SECTION 3: Your Track */}
                  <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                    <legend style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '15px', fontWeight: 600, color: '#FAF7F1', background: '#B5532A', width: '30px', height: '30px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '23px', fontWeight: 600, color: '#1A1815' }}>Your track</span>
                    </legend>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '22px' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#4A4540' }}>Area of interest / training track <span style={{ color: '#B5532A' }}>*</span></span>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }} className="track-picker-grid">
                        {trackTitles.map((trackName, idx) => {
                          const isSelected = form.track === trackName;
                          return (
                            <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '13px 15px', border: '1.5px solid', borderColor: isSelected ? '#B5532A' : '#DDD8CF', background: isSelected ? '#FAF1EB' : '#FFFFFF', borderRadius: '10px', cursor: 'pointer', transition: 'border-color 0.15s, background 0.15s' }}>
                              <input type="radio" name="track" checked={isSelected} onChange={() => setField('track', trackName)} style={{ accentColor: '#B5532A', width: '16px', height: '16px' }} />
                              <span style={{ fontSize: '14px', fontWeight: 500, color: '#1A1815' }}>{trackName}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#4A4540' }}>Digital skills experience level <span style={{ color: '#B5532A' }}>*</span></span>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }} className="skill-picker-grid">
                        {skillLevels.map((s, idx) => {
                          const isSelected = form.skill === s.v;
                          return (
                            <label key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '13px 8px', textAlign: 'center', border: '1.5px solid', borderColor: isSelected ? '#B5532A' : '#DDD8CF', background: isSelected ? '#FAF1EB' : '#FFFFFF', borderRadius: '10px', cursor: 'pointer' }}>
                              <input type="radio" name="skill" checked={isSelected} onChange={() => setField('skill', s.v)} style={{ display: 'none' }} />
                              <span style={{ fontSize: '14px', fontWeight: 600, color: isSelected ? '#B5532A' : '#1A1815' }}>{s.v}</span>
                              <span style={{ fontSize: '11.5px', color: '#7A7570' }}>{s.sub}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </fieldset>

                  {/* SECTION 4: Motivation & Documents */}
                  <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                    <legend style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '15px', fontWeight: 600, color: '#FAF7F1', background: '#B5532A', width: '30px', height: '30px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>4</span>
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '23px', fontWeight: 600, color: '#1A1815' }}>Motivation &amp; documents</span>
                    </legend>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#4A4540' }}>Motivation statement <span style={{ color: '#B5532A' }}>*</span></span>
                        <textarea required value={form.motivation} onChange={(e) => setField('motivation', e.target.value)} rows={5} placeholder="Why do you want to join the Fellowship, and what will you do with the skills?" style={{ width: '100%', background: '#FFFFFF', border: '1.5px solid #DDD8CF', borderRadius: '10px', padding: '14px 15px', fontSize: '15px', color: '#1A1815', outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.6 }}></textarea>
                      </label>
                      <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#4A4540' }}>LinkedIn profile <span style={{ color: '#A39E96', fontWeight: 500 }}>(optional)</span></span>
                        <input value={form.linkedin} onChange={(e) => setField('linkedin', e.target.value)} placeholder="linkedin.com/in/you" style={{ width: '100%', background: '#FFFFFF', border: '1.5px solid #DDD8CF', borderRadius: '10px', padding: '14px 15px', fontSize: '15px', color: '#1A1815', outline: 'none' }} />
                      </label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#4A4540' }}>CV / résumé upload <span style={{ color: '#B5532A' }}>*</span></span>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px', border: '1.5px dashed #C9C2B6', borderRadius: '12px', cursor: 'pointer', background: '#FBF9F4', transition: 'border-color 0.2s' }} className="hover:border-[#B5532A]">
                          <span style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#FAF1EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B5532A' }}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg></span>
                          <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span style={{ fontSize: '14.5px', fontWeight: 600, color: '#1A1815' }}>{form.cv || 'Click to upload your CV'}</span>
                            <span style={{ fontSize: '12.5px', color: '#7A7570' }}>PDF, DOC, or DOCX — up to 5MB</span>
                          </span>
                          <input type="file" accept=".pdf,.doc,.docx" onChange={setCvFile} style={{ display: 'none' }} required={!form.cv} />
                        </label>
                      </div>
                    </div>
                  </fieldset>

                  <div style={{ borderTop: '1px solid #E7E1D7', paddingTop: '28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '13px', cursor: 'pointer' }}>
                      <input type="checkbox" checked={form.agree} onChange={(e) => setField('agree', e.target.checked)} style={{ width: '19px', height: '19px', accentColor: '#B5532A', marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ fontSize: '14.5px', lineHeight: 1.55, color: '#4A4540' }}>I confirm the information provided is accurate and I agree to RIDLDI's <a href="#" style={{ color: '#B5532A', fontWeight: 600 }}>terms of participation</a> and <a href="#" style={{ color: '#B5532A', fontWeight: 600 }}>privacy policy</a>.</span>
                    </label>
                    <button type="submit" disabled={!form.agree || submitting} style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '17px 38px', borderRadius: '999px', background: (!form.agree || submitting) ? '#CDA795' : '#B5532A', color: '#FAF7F1', fontWeight: 600, fontSize: '16px', border: 'none', cursor: !form.agree ? 'not-allowed' : (submitting ? 'wait' : 'pointer'), transition: 'transform 0.15s, box-shadow 0.2s', boxShadow: '0 4px 20px rgba(181,83,42,0.32)' }}>
                      {submitting ? 'Submitting…' : 'Submit application'}
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                    </button>
                  </div>
                </form>

                {/* SIDE ASIDE PANELS */}
                <aside style={{ position: 'sticky', top: '96px', display: 'flex', flexDirection: 'column', gap: '16px' }} className="apply-aside">
                  <div style={{ background: '#1A1815', color: '#FAF7F1', borderRadius: '20px', padding: '30px' }}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '22px', fontWeight: 600, marginBottom: '18px' }}>What fellows receive</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {asidePerks.map((p, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <span style={{ color: '#F0A06A', marginTop: '1px', flexShrink: 0 }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6 9 17l-5-5"/></svg></span>
                          <span style={{ fontSize: '14.5px', lineHeight: 1.5, color: 'rgba(250,247,241,0.86)' }}>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ border: '1.5px solid #E7E1D7', borderRadius: '20px', padding: '28px' }}>
                    <div style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: '#7A7570', marginBottom: '18px' }}>After you apply</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {fellowshipSteps.map((st, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', fontWeight: 600, color: '#1A1815', background: '#F0EBE3', width: '26px', height: '26px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{st.n}</span>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '14.5px', color: '#1A1815' }}>{st.title}</div>
                            <div style={{ fontSize: '13px', color: '#7A7570', marginTop: '2px' }}>{st.sub}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ backgroundColor: '#FAF1EB', border: '1.5px solid #F0D9C8', borderRadius: '20px', padding: '22px 24px' }}>
                    <div style={{ fontSize: '14px', lineHeight: 1.6, color: '#8A4423' }}>
                      <strong>Need help applying?</strong> Email <a href="mailto:apply@ridldi.org" style={{ color: '#B5532A', fontWeight: 600 }}>apply@ridldi.org</a> and our team will support you.
                    </div>
                  </div>
                </aside>

              </div>
            </section>
          </>
        )}

      </main>

      {/* FOOTER */}
      <footer style={{ background: '#1A1815', color: '#FAF7F1', padding: '96px 24px 52px', borderTop: '1px solid rgba(250,247,241,0.08)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr repeat(3, 1fr)', gap: '48px', marginBottom: '80px' }} className="footer-grid">
            <div>
              <Link href="/" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '26px', fontWeight: 700, letterSpacing: '-0.01em', cursor: 'pointer', color: '#FAF7F1', display: 'inline-flex', alignItems: 'baseline', gap: '8px', marginBottom: '20px', textDecoration: 'none' }}>
                RIDLDI
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,247,241,0.5)' }}>Initiative</span>
              </Link>
              <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'rgba(250,247,241,0.72)', maxWidth: '280px', margin: '0 0 28px' }}>Empowering communities across Nigeria through digital capability, entrepreneurship, and climate frontline action.</p>
              <div style={{ display: 'flex', gap: '14px' }}>
                {socials.map((s, idx) => (
                  <a key={idx} href={s.href} aria-label={s.label} style={{ width: '38px', height: '38px', borderRadius: '999px', border: '1px solid rgba(250,247,241,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(250,247,241,0.65)', transition: 'background 0.2s, color 0.2s' }} className="hover:bg-white/10 hover:text-white">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
            {footerCols.map((col, idx) => (
              <div key={idx}>
                <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(250,247,241,0.45)', marginBottom: '22px' }}>{col.title}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {col.links.map((link, lIdx) => (
                    <Link key={lIdx} href={link.href} style={{ fontSize: '14.5px', color: 'rgba(250,247,241,0.78)', cursor: 'pointer', transition: 'color 0.2s', textDecoration: 'none' }} className="hover:text-white">{link.label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(250,247,241,0.1)', paddingTop: '34px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px' }}>
            <span style={{ fontSize: '13px', color: 'rgba(250,247,241,0.5)' }}>© 2026 RIDLDI · CAC Registered · Abuja, FCT, Nigeria</span>
            <span style={{ fontSize: '13px', color: 'rgba(250,247,241,0.5)' }}>
              <a href="mailto:info@ridldi.org" style={{ color: 'inherit' }}>info@ridldi.org</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
