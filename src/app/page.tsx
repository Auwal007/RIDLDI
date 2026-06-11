'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { ArrowRight, Mail, MapPin, Menu, X } from 'lucide-react';

/* --- Reduced-motion hook ----------------------- */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

/* --- Scroll-reveal wrapper --------------------- */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      animate={inView || reduced ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* --- Jos programme photos
     Replace each src value with your real Hamzury Innovation / Jos photos.
     The layout and captions are ready - just swap in the actual URLs.
--- */
const JOS_PHOTOS = [
  {
    id: 'wide',
    src: 'https://raw.createusercontent.com/2d27dc08-5a35-4385-9dbe-3b95ca2012fc/',
    caption:
      'Participants at the RIDLDI-Hamzury Innovation training hub - Jos, Plateau State - May 2025',
    alt: 'Wide establishing shot of the Jos innovation programme venue packed with participants',
  },
  {
    id: 'hands',
    src: 'https://raw.createusercontent.com/2d27dc08-5a35-4385-9dbe-3b95ca2012fc/',
    caption:
      'Participant learning hardware basics - Jos, Plateau State - In collaboration with Hamzury Innovation',
    alt: 'Close-up of hands working with equipment at the Jos programme',
  },
  {
    id: 'session',
    src: 'https://raw.createusercontent.com/2d27dc08-5a35-4385-9dbe-3b95ca2012fc/',
    caption:
      'Group session in progress - Over 60 participants across two days - Jos, Plateau State - May 2025',
    alt: 'Group session at the Jos innovation programme',
  },
];

/* --- Stat block -------------------------------- */
function Stat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div style={{ borderTop: '1px solid #DDD8CF', paddingTop: 24 }}>
      <div
        className="font-fraunces text-4xl md:text-5xl font-bold leading-none mb-2"
        style={{ color }}
      >
        {value}
      </div>
      <div className="text-xs uppercase tracking-widest font-medium" style={{ color: '#7A7570' }}>
        {label}
      </div>
    </div>
  );
}

/* --- Contact form ------------------------------ */
function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [fields, setFields] = useState({ name: '', email: '', org: '', message: '' });

  const set =
    (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('sending');
    await new Promise((r) => setTimeout(r, 1200));
    setState('sent');
  };

  const baseInput: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#FAF7F1',
    border: '1.5px solid #DDD8CF',
    color: '#1A1815',
    borderRadius: 10,
    padding: '14px 16px',
    fontSize: 14,
    outline: 'none',
    fontFamily: 'inherit',
  };

  if (state === 'sent') {
    return (
      <div
        className="rounded-2xl p-10 text-center"
        style={{ backgroundColor: '#F0EBE3', border: '1.5px solid #DDD8CF' }}
      >
        <p className="font-fraunces text-2xl font-bold mb-3" style={{ color: '#1A1815' }}>
          Message received.
        </p>
        <p className="text-sm" style={{ color: '#4A4540' }}>
          We read every message. You&apos;ll hear from us soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl p-8 md:p-10"
      style={{ backgroundColor: '#F0EBE3', border: '1.5px solid #DDD8CF' }}
      noValidate
    >
      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: '#7A7570' }}
          >
            Name
          </label>
          <input
            id="name"
            required
            type="text"
            value={fields.name}
            onChange={set('name')}
            placeholder="Your name"
            style={baseInput}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: '#7A7570' }}
          >
            Email
          </label>
          <input
            id="email"
            required
            type="email"
            value={fields.email}
            onChange={set('email')}
            placeholder="your@email.com"
            style={baseInput}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5 mb-5">
        <label
          htmlFor="org"
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: '#7A7570' }}
        >
          Organisation (optional)
        </label>
        <input
          id="org"
          type="text"
          value={fields.org}
          onChange={set('org')}
          placeholder="Your company or NGO"
          style={baseInput}
        />
      </div>
      <div className="flex flex-col gap-1.5 mb-6">
        <label
          htmlFor="message"
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: '#7A7570' }}
        >
          Message
        </label>
        <textarea
          id="message"
          required
          value={fields.message}
          onChange={set('message')}
          rows={5}
          placeholder="How can we work together?"
          style={{ ...baseInput, resize: 'none' }}
        />
      </div>
      <button
        type="submit"
        disabled={state === 'sending'}
        className="w-full py-4 rounded-xl text-sm font-semibold transition-opacity hover:opacity-85 disabled:opacity-50"
        style={{
          backgroundColor: '#1A1815',
          color: '#FAF7F1',
          cursor: state === 'sending' ? 'wait' : 'pointer',
          fontFamily: 'inherit',
        }}
      >
        {state === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}

/* ===============================================
   MAIN PAGE
=============================================== */
export default function RidldiPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F1', color: '#1A1815' }}>
      {/* --- NAVIGATION --------------------------- */}
      <header
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(250,247,241,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid #DDD8CF' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <a
            href="#"
            className="font-fraunces text-xl font-bold tracking-tight focus:outline-none focus-visible:underline"
            style={{ color: scrolled ? '#1A1815' : '#FAF7F1' }}
            aria-label="RIDLDI — return to top"
          >
            RIDLDI
          </a>

          <nav className="hidden md:flex items-center gap-10" aria-label="Primary navigation">
            {[
              { label: 'Missions', href: '#missions' },
              { label: 'The Programme', href: '#programme' },
              { label: 'Manifesto', href: '#manifesto' },
              { label: 'Contact', href: '#contact' },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-sm font-medium transition-opacity hover:opacity-60 focus:outline-none focus-visible:underline"
                style={{ color: scrolled ? '#1A1815' : 'rgba(250,247,241,0.82)' }}
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              className="text-sm font-semibold px-5 py-2.5 rounded-full transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ backgroundColor: '#B5532A', color: '#FAF7F1' }}
            >
              Join the Movement
            </a>
          </nav>

          <button
            className="md:hidden p-2 rounded focus:outline-none focus-visible:ring-2"
            style={{ color: scrolled ? '#1A1815' : '#FAF7F1' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden px-6 pb-10 pt-4 flex flex-col gap-7"
            style={{ backgroundColor: '#FAF7F1', borderTop: '1px solid #DDD8CF' }}
          >
            {[
              { label: 'Missions', href: '#missions' },
              { label: 'The Programme', href: '#programme' },
              { label: 'Manifesto', href: '#manifesto' },
              { label: 'Contact', href: '#contact' },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="font-fraunces text-2xl font-bold"
                style={{ color: '#1A1815' }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 px-7 py-3.5 rounded-full text-sm font-semibold text-center"
              style={{ backgroundColor: '#B5532A', color: '#FAF7F1' }}
              onClick={() => setMenuOpen(false)}
            >
              Join the Movement
            </a>
          </motion.div>
        )}
      </header>

      {/* --- HERO ------------------------------------- */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{ height: '100svh', minHeight: 600 }}
        aria-label="Hero"
      >
        {/* Full-bleed photo with parallax */}
        <motion.div
          className="absolute inset-0 w-full"
          style={{ y: reduced ? 0 : heroY, height: '120%', top: '-10%' }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                'url(https://raw.createusercontent.com/2d27dc08-5a35-4385-9dbe-3b95ca2012fc/)',
            }}
            role="img"
            aria-label="Participants at the RIDLDI–Hamzury Innovation programme in Jos, Plateau State, 2025"
          />
          {/* Asymmetric gradient — denser on left where headline lives */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(108deg, rgba(26,24,21,0.90) 0%, rgba(26,24,21,0.60) 52%, rgba(26,24,21,0.24) 100%)',
            }}
          />
        </motion.div>

        {/* Headline — editorial bottom-left position */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-28 px-6 md:px-16 max-w-7xl mx-auto">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="max-w-3xl"
          >
            <p
              className="text-xs uppercase tracking-widest font-semibold mb-7"
              style={{ color: '#B5532A' }}
            >
              Rural Innovation &amp; Digital Literacy Development Initiative - Abuja, Nigeria - Est.&nbsp;2026
            </p>
            <h1
              className="font-fraunces font-bold leading-none mb-8"
              style={{
                fontSize: 'clamp(64px, 10vw, 104px)',
                color: '#FAF7F1',
                letterSpacing: '-0.02em',
                lineHeight: 0.94,
              }}
            >
              Not saving.
              <br />
              <span style={{ color: '#F0A06A' }}>Unlocking.</span>
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed mb-10 font-normal max-w-xl"
              style={{ color: 'rgba(250,247,241,0.78)' }}
            >
              From rural villages to urban neighbourhoods across Nigeria — building digital
              capacity, backing entrepreneurs, and defending communities on the climate frontline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#programme"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 group"
                style={{ backgroundColor: '#B5532A', color: '#FAF7F1' }}
              >
                See our programme
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </a>
              <a
                href="#manifesto"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border transition-all hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{ borderColor: 'rgba(250,247,241,0.38)', color: '#FAF7F1' }}
              >
                Read the manifesto
              </a>
            </div>
          </motion.div>

          {/* Photo credit */}
          <p
            className="absolute bottom-5 right-6 text-xs hidden md:block"
            style={{ color: 'rgba(250,247,241,0.36)', letterSpacing: '0.04em' }}
          >
            Jos, Plateau State - Hamzury Innovation - 2025
          </p>
        </div>
      </section>

      {/* --- TWO MISSIONS ----------------------------- */}
      <section id="missions" aria-label="Our two missions">
        <div className="grid md:grid-cols-2">
          {/* Earth — Human Potential */}
          <div className="px-8 md:px-16 py-20 md:py-28" style={{ backgroundColor: '#B5532A' }}>
            <Reveal>
              <p
                className="text-xs uppercase tracking-widest font-semibold mb-8"
                style={{ color: 'rgba(250,247,241,0.52)' }}
              >
                Mission one - The Earth
              </p>
              <h2
                className="font-fraunces font-bold mb-6 leading-tight"
                style={{
                  fontSize: 'clamp(34px, 4.5vw, 52px)',
                  color: '#FAF7F1',
                  letterSpacing: '-0.02em',
                }}
              >
                Human
                <br />
                Potential
              </h2>
              <p
                className="text-base md:text-lg leading-relaxed mb-10"
                style={{ color: 'rgba(250,247,241,0.76)', maxWidth: 400 }}
              >
                Digital skills, entrepreneurship, and talent development — reaching communities
                across rural farmlands and urban neighbourhoods. Innovation has no postcode.
              </p>
              <ul className="space-y-3.5 mb-12">
                {[
                  'Digital literacy and software skills',
                  'Entrepreneurship incubators',
                  'Youth and women-led talent programmes',
                  'Community innovation hubs',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: 'rgba(250,247,241,0.80)' }}
                  >
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: 'rgba(250,247,241,0.4)' }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#programme"
                className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4 hover:no-underline focus:outline-none group"
                style={{ color: '#FAF7F1' }}
              >
                See the Jos programme
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </a>
            </Reveal>
          </div>

          {/* Sky — Climate Action */}
          <div className="px-8 md:px-16 py-20 md:py-28" style={{ backgroundColor: '#3A5A78' }}>
            <Reveal delay={0.08}>
              <p
                className="text-xs uppercase tracking-widest font-semibold mb-8"
                style={{ color: 'rgba(250,247,241,0.52)' }}
              >
                Mission two · The Sky
              </p>
              <h2
                className="font-fraunces font-bold mb-6 leading-tight"
                style={{
                  fontSize: 'clamp(34px, 4.5vw, 52px)',
                  color: '#FAF7F1',
                  letterSpacing: '-0.02em',
                }}
              >
                Climate
                <br />
                Action
              </h2>
              <p
                className="text-base md:text-lg leading-relaxed mb-10"
                style={{ color: 'rgba(250,247,241,0.76)', maxWidth: 400 }}
              >
                Defending communities on the frontline of the climate crisis — farmers, fisherfolk,
                urban residents. They did not create this crisis, but they absorb it first.
              </p>
              <ul className="space-y-3.5 mb-12">
                {[
                  'Climate-resilient farming practices',
                  'Environmental awareness and advocacy',
                  'Sustainable livelihood transitions',
                  'Community-led adaptation planning',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: 'rgba(250,247,241,0.80)' }}
                  >
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: 'rgba(250,247,241,0.4)' }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#manifesto"
                className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4 hover:no-underline focus:outline-none group"
                style={{ color: '#FAF7F1' }}
              >
                Our climate position
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- JOS PROGRAMME PHOTO ESSAY ---------------- */}
      <section
        id="programme"
        className="py-24 md:py-36"
        style={{ backgroundColor: '#FAF7F1' }}
        aria-label="The Jos Innovation Programme"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <Reveal>
            <div className="max-w-2xl mb-16 md:mb-24">
              <p
                className="text-xs uppercase tracking-widest font-semibold mb-5"
                style={{ color: '#B5532A' }}
              >
                On the ground - Jos, Plateau State - 2025
              </p>
              <h2
                className="font-fraunces font-bold mb-6 leading-tight"
                style={{
                  fontSize: 'clamp(34px, 5vw, 56px)',
                  color: '#1A1815',
                  letterSpacing: '-0.025em',
                }}
              >
                The Jos Innovation
                <br />
                Programme
              </h2>
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: '#4A4540', maxWidth: 500 }}
              >
                In partnership with{' '}
                <strong className="font-semibold" style={{ color: '#1A1815' }}>
                  Hamzury Innovation
                </strong>
                , RIDLDI delivered its first major training programme in Jos, Plateau State —
                equipping participants from both rural and urban communities with practical digital
                skills and entrepreneurship tools.
              </p>
            </div>
          </Reveal>

          {/* Primary hero photo */}
          <Reveal className="mb-4 md:mb-5">
            <figure>
              <div
                className="w-full overflow-hidden"
                style={{ aspectRatio: '16/7', backgroundColor: '#DDD8CF' }}
              >
                <img
                  src={JOS_PHOTOS[0].src}
                  alt={JOS_PHOTOS[0].alt}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <figcaption
                className="mt-3 text-xs leading-relaxed"
                style={{ color: '#7A7570', letterSpacing: '0.02em' }}
              >
                {JOS_PHOTOS[0].caption}
              </figcaption>
            </figure>
          </Reveal>

          {/* Two secondary photos */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-5 mb-20 md:mb-28">
            {JOS_PHOTOS.slice(1).map((photo, i) => (
              <Reveal key={photo.id} delay={i * 0.07}>
                <figure>
                  <div
                    className="w-full overflow-hidden"
                    style={{ aspectRatio: '4/3', backgroundColor: '#DDD8CF' }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <figcaption
                    className="mt-3 text-xs leading-relaxed"
                    style={{ color: '#7A7570', letterSpacing: '0.02em' }}
                  >
                    {photo.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          {/* Stats bar */}
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
              <div className="md:pr-10">
                <Stat value="60+" label="Participants trained" color="#B5532A" />
              </div>
              <div className="md:px-10" style={{ borderLeft: '1px solid #DDD8CF' }}>
                <Stat value="2" label="Communities reached" color="#B5532A" />
              </div>
              <div className="md:px-10" style={{ borderLeft: '1px solid #DDD8CF' }}>
                <Stat value="Jos" label="Plateau State, 2025" color="#3A5A78" />
              </div>
              <div className="md:pl-10" style={{ borderLeft: '1px solid #DDD8CF' }}>
                <Stat value="Hamzury" label="Innovation partner" color="#3A5A78" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- MANIFESTO -------------------------------- */}
      <section
        id="manifesto"
        className="py-24 md:py-36"
        style={{ backgroundColor: '#1A1815', color: '#FAF7F1' }}
        aria-label="Our manifesto"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12">
            {/* Side label */}
            <div className="md:col-span-3">
              <Reveal>
                <p
                  className="text-xs uppercase tracking-widest font-semibold"
                  style={{ color: 'rgba(250,247,241,0.32)' }}
                >
                  A declaration
                </p>
              </Reveal>
            </div>

            {/* Content */}
            <div className="md:col-span-9">
              <Reveal>
                <h2
                  className="font-fraunces font-bold mb-16 md:mb-20 leading-none"
                  style={{
                    fontSize: 'clamp(42px, 6.5vw, 80px)',
                    color: '#FAF7F1',
                    letterSpacing: '-0.025em',
                  }}
                >
                  Community
                  <br />
                  <span style={{ color: '#B5532A' }}>sovereignty.</span>
                </h2>
              </Reveal>

              <div className="space-y-12 md:space-y-16">
                {[
                  {
                    quote:
                      'Nigerians — whether in a Plateau State village or a Lagos suburb — do not need saving. They need unlocking. Innovation does not live only in tech hubs; it lives wherever there are people with the right tools and the will to use them.',
                    accent: '#B5532A',
                  },
                  {
                    quote:
                      'The harmattan wind carries resilience built over centuries. From the red laterite roads of the North to the coastal communities of the South, the climate crisis arrives at their door first. We stand there too — not as observers, but as defenders.',
                    accent: '#3A5A78',
                  },
                  {
                    quote:
                      "RIDLDI is the bridge. Between the farmer's hoe and the coder's keyboard. Between the market stall and the startup. Registered in Abuja in 2026 — built for the long work.",
                    accent: 'rgba(250,247,241,0.25)',
                  },
                ].map(({ quote, accent }, i) => (
                  <Reveal key={i} delay={i * 0.07}>
                    <div className="flex gap-6 md:gap-10">
                      <div
                        className="w-0.5 shrink-0 self-stretch rounded-full"
                        style={{ backgroundColor: accent }}
                      />
                      <p
                        className="font-fraunces text-xl md:text-2xl leading-relaxed italic font-normal"
                        style={{ color: 'rgba(250,247,241,0.80)' }}
                      >
                        &ldquo;{quote}&rdquo;
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.1}>
                <div
                  className="mt-20 pt-10 grid grid-cols-2 sm:grid-cols-3 gap-8"
                  style={{ borderTop: '1px solid rgba(250,247,241,0.1)' }}
                >
                  {[
                    { value: '2026', label: 'CAC Registered' },
                    { value: 'Abuja', label: 'FCT, Nigeria' },
                    { value: 'Dual', label: 'Human + Climate missions' },
                  ].map(({ value, label }) => (
                    <div key={label}>
                      <div
                        className="font-fraunces text-3xl md:text-4xl font-bold mb-1.5 tracking-tight"
                        style={{ color: '#FAF7F1' }}
                      >
                        {value}
                      </div>
                      <div
                        className="text-xs uppercase tracking-widest"
                        style={{ color: 'rgba(250,247,241,0.32)' }}
                      >
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT ---------------------------------- */}
      <section
        id="contact"
        className="py-24 md:py-36"
        style={{ backgroundColor: '#FAF7F1' }}
        aria-label="Contact"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-16">
            {/* Left — copy */}
            <div className="md:col-span-5">
              <Reveal>
                <p
                  className="text-xs uppercase tracking-widest font-semibold mb-6"
                  style={{ color: '#B5532A' }}
                >
                  Work with us
                </p>
                <h2
                  className="font-fraunces font-bold mb-8 leading-tight"
                  style={{
                    fontSize: 'clamp(34px, 4vw, 50px)',
                    color: '#1A1815',
                    letterSpacing: '-0.025em',
                  }}
                >
                  Partners,
                  <br />
                  participants,
                  <br />
                  changemakers.
                </h2>
                <p
                  className="text-base leading-relaxed mb-10"
                  style={{ color: '#4A4540', maxWidth: 360 }}
                >
                  Whether you&apos;re a funding partner, a community organisation, or someone who
                  wants to join the programme — we want to hear from you. Specifically and soon.
                </p>
                <div className="space-y-5">
                  <a
                    href="mailto:ridldinitiative@gmail.com"
                    className="flex items-center gap-4 group focus:outline-none focus-visible:underline"
                    style={{ color: '#1A1815' }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all group-hover:bg-[#B5532A] group-hover:text-white"
                      style={{ border: '1.5px solid #DDD8CF' }}
                    >
                      <Mail size={15} />
                    </div>
                    <span className="text-sm font-medium">ridldinitiative@gmail.com</span>
                  </a>
                  <div className="flex items-center gap-4" style={{ color: '#1A1815' }}>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{ border: '1.5px solid #DDD8CF' }}
                    >
                      <MapPin size={15} />
                    </div>
                    <span className="text-sm font-medium">Abuja, FCT, Nigeria</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right — form */}
            <div className="md:col-span-7">
              <Reveal delay={0.08}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER ----------------------------------- */}
      <footer
        className="py-8 px-6 md:px-12"
        style={{ borderTop: '1px solid #DDD8CF', backgroundColor: '#FAF7F1' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="font-fraunces font-bold text-lg" style={{ color: '#1A1815' }}>
              RIDLDI
            </span>
            <span className="text-xs" style={{ color: '#7A7570' }}>
              Rural Innovation &amp; Digital Literacy Development Initiative
            </span>
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            <span className="text-xs" style={{ color: '#7A7570' }}>
              © 2026 - CAC Registered - Abuja, Nigeria
            </span>
            <a
              href="mailto:ridldinitiative@gmail.com"
              className="text-xs font-semibold hover:underline focus:outline-none focus-visible:underline"
              style={{ color: '#B5532A' }}
            >
              ridldinitiative@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
