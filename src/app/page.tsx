'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Custom ImageSlot component to handle premium rendering and fallback mockups
interface ImageSlotProps {
  id: string;
  shape?: 'rounded' | 'circle' | 'rect';
  fit?: 'cover' | 'contain';
  radius?: string;
  placeholder?: string;
  style?: React.CSSProperties;
}

const FALLBACK_IMAGES: Record<string, string> = {
  'jos-hero': 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
  'jos-2': 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80',
  'jos-3': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
  'story-1': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
  'story-2': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  'story-3': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  'team-1': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
  'team-2': 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
  'team-3': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  'team-4': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
  'partner-1': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
  'partner-2': 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=150&q=80',
  'partner-3': 'https://images.unsplash.com/photo-1568205612837-017257d2310a?auto=format&fit=crop&w=150&q=80',
  'partner-4': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=150&q=80',
  'partner-5': 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=150&q=80',
};

function ImageSlot({ id, shape = 'rounded', fit = 'cover', radius, placeholder, style }: ImageSlotProps) {
  const imageUrl = FALLBACK_IMAGES[id];
  const borderRadius = shape === 'circle' ? '999px' : shape === 'rounded' ? (radius ? `${radius}px` : '18px') : '0px';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius,
        overflow: 'hidden',
        background: '#E7E1D7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        ...style,
      }}
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={placeholder || id}
          style={{
            width: '100%',
            height: '100%',
            objectFit: fit,
          }}
        />
      ) : (
        <span style={{ fontSize: '12px', color: '#7A7570', padding: '12px', textAlign: 'center' }}>
          {placeholder || id}
        </span>
      )}
    </div>
  );
}

export default function RidldiPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [contact, setContact] = useState({ name: '', email: '', org: '', role: '', message: '' });
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const s = window.scrollY > 40;
      setScrolled(s);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navTo = (hash: string) => {
    setMenuOpen(false);
    const el = document.getElementById(hash);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterDone(true);
    }
  };

  const submitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
  };

  const solid = scrolled || menuOpen;
  const navBg = solid ? 'rgba(250,247,241,0.9)' : 'transparent';
  const navBlur = solid ? 'blur(16px)' : 'none';
  const navBorder = solid ? '#E7E1D7' : 'transparent';
  const navInk = solid ? '#1A1815' : '#FAF7F1';
  const navMuted = solid ? '#A39E96' : 'rgba(250,247,241,0.55)';

  const navLinks = [
    { label: 'About', onClick: () => navTo('about') },
    { label: 'Programs', onClick: () => navTo('programs') },
    { label: 'Fellowship', onClick: () => navTo('fellowship') },
    { label: 'Impact', onClick: () => navTo('impact') },
    { label: 'Partners', onClick: () => navTo('partners') },
    { label: 'Contact', onClick: () => navTo('contact') },
  ];

  const earthList = [
    'Digital literacy & software skills',
    'Entrepreneurship incubators',
    'Youth & women-led talent programmes',
    'Community innovation hubs',
  ];

  const skyList = [
    'Climate-resilient farming practices',
    'Environmental awareness & advocacy',
    'Sustainable livelihood transitions',
    'Community-led adaptation planning',
  ];

  const heroStats = [
    { value: '60+', label: 'Fellows trained in our first cohort' },
    { value: '10', label: 'Digital training tracks' },
    { value: '2', label: 'Communities reached — rural & urban' },
    { value: '2', label: 'Missions: human potential & climate' },
  ];

  const bigStats = [
    { value: '60+', label: 'Fellows trained', sub: 'First cohort, Jos 2025', color: '#B5532A' },
    { value: '78%', label: 'Reported new digital income', sub: 'Within 6 months of training', color: '#B5532A' },
    { value: '12', label: 'Community projects launched', sub: 'Led by programme alumni', color: '#3A5A78' },
    { value: '2', label: 'States on the roadmap', sub: 'Plateau today, expanding 2026', color: '#3A5A78' },
  ];

  const tracks = [
    { num: '01', title: 'Software Development', level: 'Beginner–Adv', desc: 'Build web and mobile applications with modern, in-demand frameworks.', duration: '16 weeks', format: 'Hybrid' },
    { num: '02', title: 'Data Analytics & AI', level: 'Intermediate', desc: 'Turn raw data into decisions; foundations of machine learning.', duration: '14 weeks', format: 'Hybrid' },
    { num: '03', title: 'Cybersecurity', level: 'Intermediate', desc: 'Protect systems, networks, and people from real-world threats.', duration: '14 weeks', format: 'In-person' },
    { num: '04', title: 'UI/UX Design', level: 'Beginner', desc: 'Design intuitive, human-centred digital products people love.', duration: '12 weeks', format: 'Hybrid' },
    { num: '05', title: 'Cloud Computing', level: 'Intermediate', desc: 'Deploy and scale on AWS, Azure, and Google Cloud.', duration: '12 weeks', format: 'Online' },
    { num: '06', title: 'Digital Marketing', level: 'Beginner', desc: 'Grow brands with SEO, social, content, and paid media.', duration: '10 weeks', format: 'Hybrid' },
    { num: '07', title: 'Product Management', level: 'Intermediate', desc: 'Lead products from idea to launch and beyond.', duration: '12 weeks', format: 'Hybrid' },
    { num: '08', title: 'Blockchain & Web3', level: 'Advanced', desc: 'Build decentralised apps and smart contracts.', duration: '12 weeks', format: 'Online' },
    { num: '09', title: 'Digital Content & Media', level: 'Beginner', desc: 'Create video, audio, and stories that move people.', duration: '10 weeks', format: 'In-person' },
    { num: '10', title: 'No-Code & Automation', level: 'Beginner', desc: 'Ship tools and automate workflows without writing code.', duration: '8 weeks', format: 'Online' },
  ];

  const fellowshipPerks = [
    {
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2 2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
      title: 'Practitioner-led training',
      sub: 'Taught by people who do the work',
    },
    {
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" />
        </svg>
      ),
      title: '1:1 mentorship',
      sub: 'Paired with an industry mentor',
    },
    {
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 15l2 2 4-4" />
        </svg>
      ),
      title: 'Project portfolio',
      sub: 'Real work to show employers',
    },
    {
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      title: 'Partner network',
      sub: 'Direct line to hiring partners',
    },
  ];

  const fellowshipSteps = [
    { n: '1', title: 'Apply online', sub: 'Complete the application form — 10 minutes' },
    { n: '2', title: 'Skills screening', sub: 'A short assessment of your track readiness' },
    { n: '3', title: 'Interview', sub: 'A conversation about your goals and motivation' },
    { n: '4', title: 'Onboarding', sub: 'Welcome to your cohort and mentor' },
  ];

  const testimonials = [
    { quote: 'I walked in able to use a phone and walked out building websites. Three months later I had my first paying client. RIDLDI didn’t hand me anything — they unlocked what was already there.', name: 'Amina Yusuf', role: 'Web Developer · Jos cohort', slotId: 'story-1' },
    { quote: 'The entrepreneurship track changed how I think about my farm. I now sell produce online and track everything digitally. My income has nearly doubled in a year.', name: 'Daniel Okeke', role: 'Agripreneur · Plateau State', slotId: 'story-2' },
    { quote: 'As a woman in a rural community, I never imagined a career in tech. The mentorship made it real. I am now a junior data analyst working remotely.', name: 'Grace Bature', role: 'Data Analyst · Jos cohort', slotId: 'story-3' },
  ];

  const team = [
    { name: 'Founder / Director', role: 'Executive Lead', bio: 'Sets vision across both missions and stewards partnerships.', slotId: 'team-1' },
    { name: 'Programmes Lead', role: 'Training & Curriculum', bio: 'Designs the track curricula and runs each cohort end to end.', slotId: 'team-2' },
    { name: 'Climate Lead', role: 'Adaptation & Advocacy', bio: 'Leads community-led climate resilience and field projects.', slotId: 'team-3' },
    { name: 'Partnerships Lead', role: 'Growth & Sponsorship', bio: 'Builds the corporate, sponsor, and donor network.', slotId: 'team-4' },
  ];

  const events = [
    { day: '18', month: 'Jul', title: 'Digital Skills Open Day — Jos', meta: 'Free taster sessions across all ten tracks · Hamzury Hub, Jos', tag: 'Free' },
    { day: '06', month: 'Aug', title: 'Women in Tech Bootcamp', meta: 'Two-day intensive for women entering tech · Plateau State', tag: 'Apply' },
    { day: '21', month: 'Sep', title: 'Climate & Community Forum', meta: 'Farmers, fisherfolk & advocates on adaptation · Hybrid', tag: 'RSVP' },
  ];

  const supportTiers = [
    { amount: '₦25k', impact: 'Equips one fellow with learning materials for a cohort.' },
    { amount: '₦150k', impact: 'Sponsors a full scholarship seat in any track.' },
    { amount: '₦500k', impact: 'Funds a community innovation hub session series.' },
    { amount: 'Custom', impact: 'Corporate sponsorships & multi-year partnerships.' },
  ];

  const faqs = [
    { q: 'Who is eligible to apply for the Fellowship?', a: 'Anyone aged 16 and above living in Nigeria with a genuine interest in digital skills. No prior experience is required for beginner tracks — we select on motivation and potential, not pedigree.' },
    { q: 'How much does the programme cost?', a: 'Qualifying fellows train at no cost, underwritten by our partners and sponsors. Selected applicants are notified of their funded status during onboarding.' },
    { q: 'Are programmes in-person, online, or hybrid?', a: 'It depends on the track. Some run in-person at our Jos hub, others are fully online, and several are hybrid. Each track card on this page lists its format.' },
    { q: 'What support do fellows receive beyond training?', a: 'One-to-one mentorship, a real project portfolio, career guidance, and an introduction to our hiring partner network upon completion.' },
    { q: 'How can my organisation partner or sponsor?', a: 'Use the partnership inquiry form below or email us directly. We offer cohort sponsorships, equipment grants, mentorship partnerships, and climate-project co-funding.' },
    { q: 'Where does RIDLDI currently operate?', a: 'We are registered in Abuja and ran our first cohort in Jos, Plateau State, in 2025. We are expanding to additional states across 2026.' },
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
    { title: 'Explore', links: [ { label: 'About Us', onClick: () => navTo('about') }, { label: 'Our Impact', onClick: () => navTo('impact') }, { label: 'Programs', onClick: () => navTo('programs') }, { label: 'Success Stories', onClick: () => navTo('stories') } ] },
    { title: 'Get Involved', links: [ { label: 'Apply as a Fellow', href: '/apply' }, { label: 'Partner With Us', onClick: () => navTo('partners') }, { label: 'Support Us', onClick: () => navTo('support') }, { label: 'Events', onClick: () => navTo('events') } ] },
    { title: 'Resources', links: [ { label: 'News & Blog', onClick: () => navTo('contact') }, { label: 'FAQ', onClick: () => navTo('faq') }, { label: 'Contact', onClick: () => navTo('contact') }, { label: 'Annual Report', onClick: () => navTo('support') } ] },
  ];

  const partnerSlots = [
    { id: 'partner-1' }, { id: 'partner-2' }, { id: 'partner-3' }, { id: 'partner-4' }, { id: 'partner-5' },
  ];

  const mediaOutlets = ['The Guardian NG', 'Premium Times', 'TechCabal', 'Daily Trust', 'Channels TV'];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", background: '#FAF7F1', color: '#1A1815', minHeight: '100vh', WebkitFontSmoothing: 'antialiased', overflowX: 'hidden' }}>
      
      {/* NAVIGATION */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          transition: 'background 0.3s ease, border-color 0.3s ease',
          background: navBg,
          backdropFilter: navBlur,
          WebkitBackdropFilter: navBlur,
          borderBottom: `1px solid ${navBorder}`,
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ fontFamily: "'Outfit', sans-serif", fontSize: '23px', fontWeight: 700, letterSpacing: '-0.01em', cursor: 'pointer', color: navInk, display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            RIDLDI
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: navMuted }}>Initiative</span>
          </a>
          <nav style={{ alignItems: 'center', gap: '34px' }} className="hidden md:flex">
            {navLinks.map((link, idx) => (
              <a key={idx} onClick={link.onClick} style={{ fontSize: '14.5px', fontWeight: 500, cursor: 'pointer', transition: 'opacity 0.2s', color: navInk }} className="hover:opacity-60">{link.label}</a>
            ))}
            <Link href="/apply" style={{ fontSize: '14px', fontWeight: 600, padding: '10px 20px', borderRadius: '999px', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.2s', background: '#B5532A', color: '#FAF7F1', boxShadow: '0 2px 14px rgba(181,83,42,0.32)' }} className="hover:translate-y-[-1px] hover:shadow-[0_6px_20px_rgba(181,83,42,0.42)]">Apply as a Fellow</Link>
          </nav>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: navInk }} className="block md:hidden">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </header>

      {/* MOBILE NAV MENU */}
      {menuOpen && (
        <div className="mobile-menu" style={{ position: 'fixed', inset: 0, zIndex: 99, background: '#FAF7F1', padding: '90px 28px 40px', display: 'flex', flexDirection: 'column', gap: '6px', animation: 'ridFade 0.2s ease' }}>
          {navLinks.map((link, idx) => (
            <a key={idx} onClick={link.onClick} style={{ fontFamily: "'Outfit', sans-serif", fontSize: '30px', fontWeight: 600, color: '#1A1815', padding: '12px 0', borderBottom: '1px solid #E7E1D7', cursor: 'pointer' }}>{link.label}</a>
          ))}
          <Link href="/apply" onClick={() => setMenuOpen(false)} style={{ marginTop: '22px', display: 'block', textAlign: 'center', padding: '16px', borderRadius: '999px', background: '#B5532A', color: '#FAF7F1', fontWeight: 600, fontSize: '16px', cursor: 'pointer' }}>Apply as a Fellow</Link>
        </div>
      )}

      <main>
        {/* HERO SECTION */}
        <section style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/hero-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(106deg, rgba(26,24,21,0.92) 0%, rgba(26,24,21,0.62) 50%, rgba(26,24,21,0.20) 100%)' }}></div>
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '1240px', margin: '0 auto', padding: '150px 24px 88px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ maxWidth: '760px', animation: 'ridFadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both' }}>
              <p style={{ fontSize: '12.5px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: '#F0A06A', margin: '0 0 26px' }}>Rural Innovation &amp; Digital Literacy Development Initiative · Abuja, Nigeria</p>
              <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 'clamp(56px, 9vw, 108px)', lineHeight: 0.92, letterSpacing: '-0.025em', color: '#FAF7F1', margin: '0 0 28px' }}>Not saving.<br/><span style={{ color: '#F0A06A' }}>Unlocking.</span></h1>
              <p style={{ fontSize: 'clamp(17px, 2vw, 21px)', lineHeight: 1.6, color: 'rgba(250,247,241,0.82)', maxWidth: '560px', margin: '0 0 38px' }}>From rural villages to urban neighbourhoods across Nigeria — we build digital capacity, back entrepreneurs, and defend communities on the climate frontline.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                <Link href="/apply" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', padding: '15px 28px', borderRadius: '999px', background: '#B5532A', color: '#FAF7F1', fontWeight: 600, fontSize: '15px', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.2s', boxShadow: '0 4px 20px rgba(181,83,42,0.4)' }} className="hover:translate-y-[-2px] hover:shadow-[0_10px_28px_rgba(181,83,42,0.5)]">Apply as a Fellow
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </Link>
                <a onClick={() => navTo('partners')} style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', padding: '15px 28px', borderRadius: '999px', border: '1.5px solid rgba(250,247,241,0.4)', color: '#FAF7F1', fontWeight: 600, fontSize: '15px', cursor: 'pointer', transition: 'background 0.2s, border-color 0.2s' }} className="hover:bg-[rgba(250,247,241,0.1)] hover:border-[rgba(250,247,241,0.7)]">Partner with us</a>
              </div>
            </div>
          </div>
        </section>

        {/* HERO STATS STRIP */}
        <section style={{ background: '#1A1815', padding: 0 }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '52px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '28px' }} className="stats-strip-grid">
            {heroStats.map((s, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(34px, 4vw, 46px)', fontWeight: 600, lineHeight: 1, color: '#F0A06A' }}>{s.value}</div>
                <div style={{ fontSize: '12.5px', letterSpacing: '0.06em', color: 'rgba(250,247,241,0.62)', lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" style={{ scrollMarginTop: '80px', padding: '100px 24px' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: '72px', alignItems: 'start' }} className="about-grid">
            <div>
              <p style={{ fontSize: '12.5px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, color: '#B5532A', margin: '0 0 18px' }}>Who we are</p>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 'clamp(34px, 4.4vw, 54px)', lineHeight: 1.04, letterSpacing: '-0.025em', margin: 0 }}>Innovation has no postcode.</h2>
            </div>
            <div>
              <p style={{ fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: 1.6, color: '#2A2723', margin: '0 0 26px', fontWeight: 500 }}>RIDLDI is a Nigerian non-profit equipping people — from Plateau State farmlands to Lagos suburbs — with the digital skills, entrepreneurial backing, and climate resilience to author their own futures.</p>
              <p style={{ fontSize: '16.5px', lineHeight: 1.75, color: '#4A4540', margin: '0 0 32px' }}>We don't believe communities need saving. We believe they need unlocking. Registered with the Corporate Affairs Commission in Abuja in 2026, we run hands-on training programmes, entrepreneurship incubators, and community-led climate adaptation — meeting people where they are, with tools that work.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '22px', paddingTop: '30px', borderTop: '1px solid #E7E1D7' }}>
                <div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '30px', fontWeight: 600, color: '#B5532A', lineHeight: 1 }}>2026</div>
                  <div style={{ fontSize: '13px', color: '#7A7570', marginTop: '6px' }}>CAC Registered, Abuja</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '30px', fontWeight: 600, color: '#B5532A', lineHeight: 1 }}>Dual</div>
                  <div style={{ fontSize: '13px', color: '#7A7570', marginTop: '6px' }}>Human + climate missions</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '30px', fontWeight: 600, color: '#B5532A', lineHeight: 1 }}>Hamzury</div>
                  <div style={{ fontSize: '13px', color: '#7A7570', marginTop: '6px' }}>Founding innovation partner</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MISSIONS SECTION */}
        <section style={{ padding: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="missions-grid">
            <div style={{ background: '#B5532A', color: '#FAF7F1', padding: '84px 56px' }}>
              <p style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, color: 'rgba(250,247,241,0.6)', margin: '0 0 24px' }}>Mission one — The Earth</p>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 'clamp(32px, 3.6vw, 46px)', lineHeight: 1.02, letterSpacing: '-0.02em', margin: '0 0 22px' }}>Human Potential</h3>
              <p style={{ fontSize: '17px', lineHeight: 1.65, color: 'rgba(250,247,241,0.84)', maxWidth: '420px', margin: '0 0 30px' }}>Digital skills, entrepreneurship, and talent development — reaching communities across rural farmlands and urban neighbourhoods alike.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '34px' }}>
                {earthList.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', color: 'rgba(250,247,241,0.92)' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '999px', background: '#F0A06A', flexShrink: 0 }}></span>{item}
                  </div>
                ))}
              </div>
              <a onClick={() => navTo('programs')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 600, color: '#FAF7F1', cursor: 'pointer', borderBottom: '1.5px solid rgba(250,247,241,0.5)', paddingBottom: '3px' }}>Explore the programmes →</a>
            </div>
            <div style={{ background: '#3A5A78', color: '#FAF7F1', padding: '84px 56px' }}>
              <p style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, color: 'rgba(250,247,241,0.6)', margin: '0 0 24px' }}>Mission two — The Sky</p>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 'clamp(32px, 3.6vw, 46px)', lineHeight: 1.02, letterSpacing: '-0.02em', margin: '0 0 22px' }}>Climate Action</h3>
              <p style={{ fontSize: '17px', lineHeight: 1.65, color: 'rgba(250,247,241,0.84)', maxWidth: '420px', margin: '0 0 30px' }}>Defending communities on the frontline of the climate crisis — farmers, fisherfolk, urban residents. They didn't create this crisis, but they absorb it first.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '34px' }}>
                {skyList.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', color: 'rgba(250,247,241,0.92)' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '999px', background: '#9DC3E6', flexShrink: 0 }}></span>{item}
                  </div>
                ))}
              </div>
              <a onClick={() => navTo('about')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 600, color: '#FAF7F1', cursor: 'pointer', borderBottom: '1.5px solid rgba(250,247,241,0.5)', paddingBottom: '3px' }}>Our climate position →</a>
            </div>
          </div>
        </section>

        {/* IMPACT SECTION */}
        <section id="impact" style={{ scrollMarginTop: '80px', padding: '100px 24px', background: '#F0EBE3' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <div style={{ maxWidth: '640px', marginBottom: '56px' }}>
              <p style={{ fontSize: '12.5px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, color: '#B5532A', margin: '0 0 18px' }}>Our impact</p>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 'clamp(34px, 4.4vw, 54px)', lineHeight: 1.04, letterSpacing: '-0.025em', margin: '0 0 18px' }}>Measured in people, not promises.</h2>
              <p style={{ fontSize: '17px', lineHeight: '1.7', color: '#4A4540', margin: 0 }}>Every number here is a person who walked into a training room and walked out with a new skill, a new income stream, or a new way to protect their community.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#DDD8CF', border: '1px solid #DDD8CF' }} className="impact-grid">
              {bigStats.map((s, idx) => (
                <div key={idx} style={{ background: '#F0EBE3', padding: '34px 28px' }}>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(40px, 5vw, 60px)', fontWeight: 600, lineHeight: 1, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#1A1815', marginTop: '16px' }}>{s.label}</div>
                  <div style={{ fontSize: '13.5px', lineHeight: 1.55, color: '#7A7570', marginTop: '6px' }}>{s.sub}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '12.5px', color: '#A39E96', marginTop: '18px', fontStyle: 'italic' }}>Figures reflect our Jos 2025 pilot cohort and are indicative placeholders — swap in verified numbers as the programme scales.</p>
          </div>
        </section>

        {/* PROGRAMS SECTION */}
        <section id="programs" style={{ scrollMarginTop: '80px', padding: '100px 24px' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '52px' }}>
              <div style={{ maxWidth: '620px' }}>
                <p style={{ fontSize: '12.5px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, color: '#B5532A', margin: '0 0 18px' }}>Programs &amp; trainings</p>
                <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 'clamp(34px, 4.4vw, 54px)', lineHeight: 1.04, letterSpacing: '-0.025em', margin: '0 0 18px' }}>Ten tracks. One launchpad.</h2>
                <p style={{ fontSize: '17px', lineHeight: '1.7', color: '#4A4540', margin: 0 }}>Industry-aligned, project-based curricula taught by practitioners. Choose the track that fits your ambition — every cohort blends technical skill with entrepreneurship.</p>
              </div>
              <Link href="/apply" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', padding: '14px 26px', borderRadius: '999px', background: '#1A1815', color: '#FAF7F1', fontWeight: 600, fontSize: '15px', cursor: 'pointer', transition: 'transform 0.15s', flexShrink: 0 }} className="hover:translate-y-[-2px]">Apply for a track
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
            </div>
            {/* 
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }} className="tracks-grid">
              {tracks.map((t, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '22px', alignItems: 'flex-start', padding: '28px 30px', border: '1px solid #E7E1D7', borderRadius: '18px', background: '#FFFFFF', transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s' }} className="hover:border-[#B5532A] hover:translate-y-[-3px] hover:shadow-[0_14px_34px_rgba(26,24,21,0.08)]">
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '19px', fontWeight: 600, color: '#B5532A', width: '40px', height: '40px', borderRadius: '999px', background: '#FAF1EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{t.num}</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
                      <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '21px', fontWeight: 600, margin: 0, letterSpacing: '-0.01em' }}>{t.title}</h4>
                      <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#B5532A', background: '#FAF1EB', padding: '4px 9px', borderRadius: '999px' }}>{t.level}</span>
                    </div>
                    <p style={{ fontSize: '14.5px', lineHeight: '1.6', color: '#4A4540', margin: '0 0 14px' }}>{t.desc}</p>
                    <div style={{ fontSize: '12.5px', color: '#7A7570', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      <span>⏱ {t.duration}</span>
                      <span>● {t.format}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            */}
          </div>
        </section>

        {/* FELLOWSHIP SECTION */}
        <section id="fellowship" style={{ scrollMarginTop: '80px', padding: 0 }}>
          <div style={{ background: '#1A1815', color: '#FAF7F1' }}>
            <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '96px 24px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '64px', alignItems: 'center' }} className="fellowship-grid">
              <div>
                <p style={{ fontSize: '12.5px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, color: '#F0A06A', margin: '0 0 20px' }}>The RIDLDI Fellowship</p>
                <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.02, letterSpacing: '-0.025em', margin: '0 0 24px' }}>A fully-supported path into the digital economy.</h2>
                <p style={{ fontSize: '18px', lineHeight: 1.65, color: 'rgba(250,247,241,0.78)', margin: '0 0 36px', maxWidth: '520px' }}>The Fellowship is our flagship cohort programme. Selected fellows receive hands-on training, mentorship, a project portfolio, and a direct line to our partner network — at no cost to those who qualify.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '26px', marginBottom: '40px', maxWidth: '520px' }} className="fellowship-perks-grid">
                  {fellowshipPerks.map((p, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '13px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#F0A06A', marginTop: '2px', flexShrink: 0 }}>{p.icon}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '15.5px', marginBottom: '3px' }}>{p.title}</div>
                        <div style={{ fontSize: '13.5px', lineHeight: 1.5, color: 'rgba(250,247,241,0.6)' }}>{p.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/apply" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', padding: '16px 30px', borderRadius: '999px', background: '#B5532A', color: '#FAF7F1', fontWeight: 600, fontSize: '16px', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.2s', boxShadow: '0 4px 20px rgba(181,83,42,0.4)' }} className="hover:translate-y-[-2px] hover:shadow-[0_10px_28px_rgba(181,83,42,0.5)]">Start your application
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ border: '1px solid rgba(250,247,241,0.16)', borderRadius: '20px', padding: '30px' }}>
                  <div style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(250,247,241,0.5)', marginBottom: '22px', fontWeight: 600 }}>How selection works</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {fellowshipSteps.map((st, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '16px', fontWeight: 600, color: '#1A1815', background: '#F0A06A', width: '30px', height: '30px', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{st.n}</div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '15.5px', marginBottom: '3px' }}>{st.title}</div>
                          <div style={{ fontSize: '13.5px', lineHeight: 1.5, color: 'rgba(250,247,241,0.62)' }}>{st.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ borderRadius: '20px', padding: '24px 30px', background: '#B5532A', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                  <div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 600 }}>Cohort 02 — now open</div>
                    <div style={{ fontSize: '13.5px', color: 'rgba(250,247,241,0.78)', marginTop: '3px' }}>Applications close 30 September 2026</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORK GROUND WORK ESSAY */}
        <section style={{ scrollMarginTop: '80px', padding: '100px 24px', background: '#FAF7F1' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <div style={{ maxWidth: '640px', marginBottom: '48px' }}>
              <p style={{ fontSize: '12.5px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, color: '#B5532A', margin: '0 0 18px' }}>On the ground · Jos, Plateau State · 2025</p>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 'clamp(34px, 4.4vw, 54px)', lineHeight: 1.04, letterSpacing: '-0.025em', margin: '0 0 18px' }}>Where the work happens.</h2>
              <p style={{ fontSize: '17px', lineHeight: '1.7', color: '#4A4540', margin: 0 }}>In partnership with <strong style={{ color: '#1A1815' }}>Hamzury Innovation</strong>, RIDLDI delivered its first major training programme in Jos — equipping over 60 participants from rural and urban communities with practical digital skills.</p>
            </div>
            <figure style={{ margin: '0 0 16px' }}>
              <div style={{ width: '100%', aspectRatio: '16/7', background: '#E7E1D7', borderRadius: '20px' }}>
                <ImageSlot id="jos-hero" placeholder="Jos wide 16:7 photo" radius="20" />
              </div>
              <figcaption style={{ marginTop: '12px', fontSize: '13px', color: '#7A7570', letterSpacing: '0.01em' }}>Participants at the RIDLDI–Hamzury Innovation training hub — Jos, Plateau State, May 2025.</figcaption>
            </figure>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="photo-grid">
              <figure style={{ margin: 0 }}>
                <div style={{ width: '100%', aspectRatio: '4/3', background: '#E7E1D7', borderRadius: '18px' }}>
                  <ImageSlot id="jos-2" placeholder="Hardware photo (4:3)" radius="18" />
                </div>
                <figcaption style={{ marginTop: '12px', fontSize: '13px', color: '#7A7570' }}>Hands-on hardware session — in collaboration with Hamzury Innovation.</figcaption>
              </figure>
              <figure style={{ margin: 0 }}>
                <div style={{ width: '100%', aspectRatio: '4/3', background: '#E7E1D7', borderRadius: '18px' }}>
                  <ImageSlot id="jos-3" placeholder="Group photo (4:3)" radius="18" />
                </div>
                <figcaption style={{ marginTop: '12px', fontSize: '13px', color: '#7A7570' }}>Group session in progress — over 60 participants across two days.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section id="stories" style={{ scrollMarginTop: '80px', padding: '100px 24px', background: '#F0EBE3' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '52px' }}>
              <div style={{ maxWidth: '620px' }}>
                <p style={{ fontSize: '12.5px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, color: '#B5532A', margin: '0 0 18px' }}>Success stories</p>
                <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 'clamp(34px, 4.4vw, 54px)', lineHeight: 1.04, letterSpacing: '-0.025em', margin: 0 }}>Lives, in their own words.</h2>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="stories-grid">
              {testimonials.map((t, idx) => (
                <figure key={idx} style={{ margin: 0, background: '#FFFFFF', border: '1px solid #E7E1D7', borderRadius: '20px', padding: '34px 30px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ color: '#F0A06A', fontFamily: "'Outfit', sans-serif", fontSize: '52px', lineHeight: 0.6, height: '28px' }}>“</div>
                  <blockquote style={{ margin: '0 0 26px', fontSize: '16.5px', lineHeight: 1.6, color: '#2A2723', flex: 1 }}>{t.quote}</blockquote>
                  <figcaption style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '22px', borderTop: '1px solid #E7E1D7' }}>
                    <div style={{ width: '50px', height: '50px', flexShrink: 0 }}>
                      <ImageSlot id={t.slotId} shape="circle" placeholder="Photo" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '15px', color: '#1A1815' }}>{t.name}</div>
                      <div style={{ fontSize: '13px', color: '#7A7570' }}>{t.role}</div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* PARTNERS SECTION */}
        <section id="partners" style={{ scrollMarginTop: '80px', padding: '96px 24px', background: '#FAF7F1' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 52px' }}>
              <p style={{ fontSize: '12.5px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, color: '#B5532A', margin: '0 0 18px' }}>Partners &amp; sponsors</p>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 'clamp(32px, 4.2vw, 50px)', lineHeight: 1.05, letterSpacing: '-0.025em', margin: '0 0 16px' }}>Built with allies who believe in unlocking.</h2>
              <p style={{ fontSize: '16.5px', lineHeight: '1.7', color: '#4A4540', margin: 0 }}>From innovation hubs to corporate sponsors, our partners make the work possible. Yours could be next.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1px', background: '#E7E1D7', border: '1px solid #E7E1D7', borderRadius: '16px', overflow: 'hidden' }} className="partners-grid">
              <div style={{ background: '#FFFFFF', padding: '32px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '18px', fontWeight: 600, color: '#1A1815', textAlign: 'center', lineHeight: 1.1 }}>Hamzury<br/><span style={{ fontSize: '12px', fontWeight: 500, color: '#7A7570', letterSpacing: '0.04em' }}>Innovation</span></span>
              </div>
              {partnerSlots.map((p, idx) => (
                <div key={idx} style={{ background: '#FFFFFF', height: '100%', minHeight: '96px' }}>
                  <ImageSlot id={p.id} shape="rect" fit="contain" placeholder="Logo" />
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <a onClick={() => navTo('contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', padding: '14px 28px', borderRadius: '999px', border: '1.5px solid #1A1815', color: '#1A1815', fontWeight: 600, fontSize: '15px', cursor: 'pointer', transition: 'background 0.2s, color 0.2s' }} className="hover:bg-[#1A1815] hover:color-[#FAF7F1] hover:text-[#FAF7F1]">Become a partner
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
            </div>
          </div>
        </section>

        {/* MEDIA SECTION */}
        <section style={{ padding: '76px 24px', background: '#1A1815', color: '#FAF7F1' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <p style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, color: 'rgba(250,247,241,0.45)', margin: '0 0 36px', textAlign: 'center' }}>Media coverage &amp; recognition</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '36px', alignItems: 'center' }} className="media-grid">
              {mediaOutlets.map((m, idx) => (
                <div key={idx} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(17px, 1.8vw, 22px)', fontWeight: 600, color: 'rgba(250,247,241,0.7)', textAlign: 'center', letterSpacing: '-0.01em' }}>{m}</div>
              ))}
            </div>
          </div>
        </section>

        {/* LEADERSHIP / TEAM SECTION */}
        <section id="team" style={{ scrollMarginTop: '80px', padding: '100px 24px', background: '#FAF7F1' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <div style={{ maxWidth: '640px', marginBottom: '52px' }}>
              <p style={{ fontSize: '12.5px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, color: '#B5532A', margin: '0 0 18px' }}>Leadership</p>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 'clamp(34px, 4.4vw, 54px)', lineHeight: 1.04, letterSpacing: '-0.025em', margin: '0 0 18px' }}>The people behind the mission.</h2>
              <p style={{ fontSize: '17px', lineHeight: '1.7', color: '#4A4540', margin: 0 }}>A team of technologists, educators, and community organisers who believe Nigeria's next breakthrough is already living in a village or a city street.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="team-grid">
              {team.map((m, idx) => (
                <div key={idx}>
                  <div style={{ width: '100%', aspectRatio: '3/3.4', marginBottom: '16px' }}>
                    <ImageSlot id={m.slotId} shape="rounded" radius="18" placeholder="Portrait" />
                  </div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '20px', fontWeight: 600, letterSpacing: '-0.01em' }}>{m.name}</div>
                  <div style={{ fontSize: '13.5px', color: '#B5532A', fontWeight: 600, marginTop: '3px' }}>{m.role}</div>
                  <div style={{ fontSize: '13.5px', lineHeight: 1.55, color: '#7A7570', marginTop: '8px' }}>{m.bio}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EVENTS SECTION */}
        <section id="events" style={{ scrollMarginTop: '80px', padding: '100px 24px', background: '#3A5A78', color: '#FAF7F1' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '48px' }}>
              <div style={{ maxWidth: '620px' }}>
                <p style={{ fontSize: '12.5px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, color: '#9DC3E6', margin: '0 0 18px' }}>Events &amp; workshops</p>
                <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 'clamp(34px, 4.4vw, 54px)', lineHeight: 1.04, letterSpacing: '-0.025em', margin: 0 }}>Come build with us.</h2>
              </div>
              <a onClick={() => navTo('contact')} style={{ fontSize: '15px', fontWeight: 600, color: '#FAF7F1', cursor: 'pointer', borderBottom: '1.5px solid rgba(250,247,241,0.5)', paddingBottom: '3px' }}>Get event updates →</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }} className="events-list">
              {events.map((e, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '130px 1fr auto', gap: '28px', alignItems: 'center', padding: '26px 0', borderTop: '1px solid rgba(250,247,241,0.16)' }}>
                  <div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '30px', fontWeight: 600, lineHeight: 1 }}>{e.day}</div>
                    <div style={{ fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9DC3E6', marginTop: '4px' }}>{e.month}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '21px', fontWeight: 600, marginBottom: '6px' }}>{e.title}</div>
                    <div style={{ fontSize: '14px', color: 'rgba(250,247,241,0.7)' }}>{e.meta}</div>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#1A1815', background: '#9DC3E6', padding: '7px 14px', borderRadius: '999px', whiteSpace: 'nowrap' }}>{e.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" style={{ scrollMarginTop: '80px', padding: '100px 24px', background: '#FAF7F1' }}>
          <div style={{ maxWidth: '920px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p style={{ fontSize: '12.5px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, color: '#B5532A', margin: '0 0 18px' }}>Frequently asked</p>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 'clamp(34px, 4.4vw, 54px)', lineHeight: 1.04, letterSpacing: '-0.025em', margin: 0 }}>Questions, answered.</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }} className="faq-list">
              {faqs.map((f, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} style={{ borderTop: '1px solid #E7E1D7' }}>
                    <button onClick={() => setOpenFaq(isOpen ? -1 : idx)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', padding: '26px 4px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(18px, 2.2vw, 23px)', fontWeight: 600, color: '#1A1815', lineHeight: 1.3 }}>{f.q}</span>
                      <span style={{ fontSize: '26px', color: '#B5532A', flexShrink: 0, lineHeight: 1, transition: 'transform 0.2s', transform: isOpen ? 'rotate(45deg)' : 'none' }}>+</span>
                    </button>
                    {isOpen && (
                      <p style={{ margin: 0, padding: '0 4px 28px', fontSize: '16px', lineHeight: 1.7, color: '#4A4540', maxWidth: '760px' }}>{f.a}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SUPPORT / DONATION SECTION */}
        <section id="support" style={{ scrollMarginTop: '80px', padding: '96px 24px', background: '#B5532A', color: '#FAF7F1' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center' }} className="support-grid">
            <div>
              <p style={{ fontSize: '12.5px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, color: 'rgba(250,247,241,0.6)', margin: '0 0 18px' }}>Support the work</p>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 'clamp(32px, 4.2vw, 50px)', lineHeight: 1.04, letterSpacing: '-0.025em', margin: '0 0 20px' }}>Fund a fellow. Back a community.</h2>
              <p style={{ fontSize: '17px', lineHeight: 1.65, color: 'rgba(250,247,241,0.85)', margin: '0 0 30px', maxWidth: '460px' }}>Sponsorships and grants underwrite training, equipment, and climate projects. Whether you're a corporate partner or an individual supporter, your contribution unlocks potential directly.</p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <a onClick={() => navTo('contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', padding: '15px 28px', borderRadius: '999px', background: '#FAF7F1', color: '#B5532A', fontStyle: 'normal', fontWeight: 600, fontSize: '15px', cursor: 'pointer', transition: 'transform 0.15s' }} className="hover:translate-y-[-2px]">Discuss sponsorship</a>
                <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', padding: '15px 28px', borderRadius: '999px', border: '1.5px solid rgba(250,247,241,0.5)', color: '#FAF7F1', fontWeight: 600, fontSize: '15px', cursor: 'pointer', transition: 'background 0.2s' }} className="hover:bg-[rgba(250,247,241,0.12)]">Download brochure (PDF)</a>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {supportTiers.map((s, idx) => (
                <div key={idx} style={{ background: 'rgba(250,247,241,0.1)', border: '1px solid rgba(250,247,241,0.18)', borderRadius: '16px', padding: '24px' }}>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '28px', fontWeight: 600 }}>{s.amount}</div>
                  <div style={{ fontSize: '14px', lineHeight: 1.5, color: 'rgba(250,247,241,0.82)', marginTop: '8px' }}>{s.impact}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT & NEWSLETTER SECTION */}
        <section id="contact" style={{ scrollMarginTop: '80px', padding: '100px 24px', background: '#FAF7F1' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: '64px' }} className="contact-grid">
            <div>
              <p style={{ fontSize: '12.5px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, color: '#B5532A', margin: '0 0 18px' }}>Partnership inquiries</p>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 'clamp(34px, 4.2vw, 52px)', lineHeight: 1.04, letterSpacing: '-0.025em', margin: '0 0 22px' }}>Let's build something together.</h2>
              <p style={{ fontSize: '16.5px', lineHeight: 1.7, color: '#4A4540', margin: '0 0 36px', maxWidth: '380px' }}>Funding partner, community organisation, sponsor, or prospective fellow — tell us how you'd like to work with us. We read every message.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <a href="mailto:info@ridldi.org" style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#1A1815' }}>
                  <span style={{ width: '44px', height: '44px', borderRadius: '999px', border: '1.5px solid #DDD8CF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg></span>
                  <span style={{ fontSize: '15px', fontWeight: 500 }}>info@ridldi.org</span>
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#1A1815' }}>
                  <span style={{ width: '44px', height: '44px', borderRadius: '999px', border: '1.5px solid #DDD8CF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg></span>
                  <span style={{ fontSize: '15px', fontWeight: 500 }}>Abuja, FCT, Nigeria</span>
                </div>
              </div>
              <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid #E7E1D7' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#7A7570', marginBottom: '14px' }}>Newsletter</div>
                {newsletterDone ? (
                  <p style={{ fontSize: '15px', color: '#1A8A5B', fontWeight: 600, margin: 0 }}>✓ You're subscribed. Welcome aboard.</p>
                ) : (
                  <form onSubmit={subscribe} style={{ display: 'flex', gap: '10px' }}>
                    <input required type="email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} placeholder="your@email.com" style={{ flex: 1, background: '#FFFFFF', border: '1.5px solid #DDD8CF', borderRadius: '10px', padding: '13px 15px', fontSize: '14.5px', color: '#1A1815', outline: 'none' }} />
                    <button type="submit" style={{ padding: '13px 22px', borderRadius: '10px', background: '#1A1815', color: '#FAF7F1', fontWeight: 600, fontSize: '14.5px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>Subscribe</button>
                  </form>
                )}
              </div>
            </div>
            <div>
              {contactSent ? (
                <div style={{ background: '#F0EBE3', border: '1.5px solid #DDD8CF', borderRadius: '22px', padding: '56px 40px', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '999px', background: '#1A8A5B', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '22px' }}><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4"><path d="M20 6 9 17l-5-5"/></svg></div>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '27px', fontWeight: 600, margin: '0 0 10px', color: '#1A1815' }}>Message received.</p>
                  <p style={{ fontSize: '15px', color: '#4A4540', margin: 0, maxWidth: '320px', lineHeight: 1.6 }}>Thank you for reaching out. Our partnerships team will be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={submitContact} style={{ background: '#F0EBE3', border: '1.5px solid #DDD8CF', borderRadius: '22px', padding: '36px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }} className="contact-row">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#7A7570' }}>Name</label>
                      <input required value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} placeholder="Your name" style={{ width: '100%', background: '#FFFFFF', border: '1.5px solid #DDD8CF', borderRadius: '10px', padding: '13px 15px', fontSize: '14.5px', color: '#1A1815', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#7A7570' }}>Email</label>
                      <input required type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} placeholder="your@email.com" style={{ width: '100%', background: '#FFFFFF', border: '1.5px solid #DDD8CF', borderRadius: '10px', padding: '13px 15px', fontSize: '14.5px', color: '#1A1815', outline: 'none' }} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }} className="contact-row">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#7A7570' }}>Organisation</label>
                      <input value={contact.org} onChange={(e) => setContact({ ...contact, org: e.target.value })} placeholder="Company or NGO" style={{ width: '100%', background: '#FFFFFF', border: '1.5px solid #DDD8CF', borderRadius: '10px', padding: '13px 15px', fontSize: '14.5px', color: '#1A1815', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#7A7570' }}>I'm reaching out as</label>
                      <select value={contact.role} onChange={(e) => setContact({ ...contact, role: e.target.value })} style={{ width: '100%', background: '#FFFFFF', border: '1.5px solid #DDD8CF', borderRadius: '10px', padding: '13px 15px', fontSize: '14.5px', color: '#1A1815', outline: 'none', appearance: 'none' }}>
                        <option value="">Select…</option>
                        <option value="partner">Funding Partner</option>
                        <option value="sponsor">Sponsor</option>
                        <option value="ngo">Community Org</option>
                        <option value="fellow">Fellow Candidate</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#7A7570' }}>Message</label>
                    <textarea required rows={5} value={contact.message} onChange={(e) => setContact({ ...contact, message: e.target.value })} placeholder="Tell us how you'd like to work with us..." style={{ width: '100%', background: '#FFFFFF', border: '1.5px solid #DDD8CF', borderRadius: '10px', padding: '13px 15px', fontSize: '14.5px', color: '#1A1815', outline: 'none', resize: 'none', fontFamily: 'inherit', lineHeight: 1.5 }}></textarea>
                  </div>
                  <button type="submit" style={{ width: '100%', padding: '15px', borderRadius: '10px', background: '#1A1815', color: '#FAF7F1', fontWeight: 600, fontSize: '14.5px', border: 'none', cursor: 'pointer', transition: 'opacity 0.2s' }} className="hover:opacity-90">Send message</button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER SECTION */}
      <footer style={{ background: '#1A1815', color: '#FAF7F1', padding: '96px 24px 52px', borderTop: '1px solid rgba(250,247,241,0.08)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr repeat(3, 1fr)', gap: '48px', marginBottom: '80px' }} className="footer-grid">
            <div>
              <a onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ fontFamily: "'Outfit', sans-serif", fontSize: '26px', fontWeight: 700, letterSpacing: '-0.01em', cursor: 'pointer', color: '#FAF7F1', display: 'inline-flex', alignItems: 'baseline', gap: '8px', marginBottom: '20px' }}>
                RIDLDI
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,247,241,0.5)' }}>Initiative</span>
              </a>
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
                  {col.links.map((link, lIdx) => 
                    link.href ? (
                      <Link key={lIdx} href={link.href} style={{ fontSize: '14.5px', color: 'rgba(250,247,241,0.78)', cursor: 'pointer', transition: 'color 0.2s' }} className="hover:text-white">{link.label}</Link>
                    ) : (
                      <a key={lIdx} onClick={link.onClick} style={{ fontSize: '14.5px', color: 'rgba(250,247,241,0.78)', cursor: 'pointer', transition: 'color 0.2s' }} className="hover:text-white">{link.label}</a>
                    )
                  )}
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
