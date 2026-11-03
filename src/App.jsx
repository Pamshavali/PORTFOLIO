import React, { lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, BadgeCheck,
  BriefcaseBusiness, Code2, Database, Download, ExternalLink,
  Github, GraduationCap, Layers3, Linkedin, Mail, Menu, MoveUpRight,
  Phone, Send, Sparkles, X,
} from 'lucide-react';

const TechSphere = lazy(() => import('./TechSphere.jsx'));

const navItems = [
  ['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'],
  ['experience', 'Journey'], ['contact', 'Contact'],
];

const skills = [
  { title: 'Frontend', icon: Code2, items: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Responsive design'], note: 'Building thoughtful, accessible interfaces.' },
  { title: 'Backend', icon: Layers3, items: ['Python fundamentals', 'FastAPI', 'REST APIs', 'API integration'], note: 'Connecting interfaces with reliable APIs.' },
  { title: 'Database', icon: Database, items: ['MySQL', 'CRUD operations', 'Database management'], note: 'Working with structured data and workflows.' },
  { title: 'Developer tools', icon: BriefcaseBusiness, items: ['Git', 'GitHub', 'VS Code'], note: 'Keeping a practical, collaborative workflow.' },
];

const projects = [
  {
    number: '01', title: 'Student Learning Management System', type: 'FULL-STACK APPLICATION', theme: 'lms',
    description: 'A full-stack LMS for managing student, course, assignment, and grade-related workflows.',
    details: ['Built backend APIs using Python and FastAPI.', 'Integrated application functionality with MySQL database operations.'],
    stack: ['React', 'Python', 'FastAPI', 'MySQL'],
  },
  {
    number: '02', title: 'MovieDB', type: 'MOVIE DISCOVERY', theme: 'movie',
    description: 'A responsive movie discovery app powered by the TMDB API, designed to make browsing feel effortless.',
    details: ['Search, movie details, cast information, and pagination.', 'Reusable components, client-side routing, and dark/light themes.'],
    stack: ['React.js', 'JavaScript', 'REST API', 'CSS'],
  },
  {
    number: '03', title: 'ShannuVibe Music', type: 'MUSIC EXPERIENCE', theme: 'music',
    description: 'A responsive music player with interactive playback controls and an inviting music-browsing experience.',
    details: ['Interactive playback controls and music browsing.', 'Reusable UI components; deployed on Vercel.'],
    stack: ['React.js', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    number: '04', title: 'Calculator', type: 'INTERACTIVE UTILITY', theme: 'calc',
    description: 'A clean, interactive calculator built for quick everyday arithmetic.',
    details: ['Supports basic arithmetic operations.', 'Responsive interface built with the web platform.'],
    stack: ['JavaScript', 'HTML', 'CSS'],
  },
];

function SectionHeading({ eyebrow, title, highlight, description }) {
  return (
    <div className="section-heading">
      <span className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</span>
      <h2>{title} <span>{highlight}</span></h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function ProjectPreview({ theme, index }) {
  if (theme === 'calc') {
    return <div className="preview-calc"><div className="calc-display">2,024<span>READY</span></div><div className="calc-keys">{['AC', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '−', '1', '2', '3', '+', '0', '.', '='].map((key) => <i key={key} className={['÷', '×', '−', '+', '='].includes(key) ? 'key-accent' : ''}>{key}</i>)}</div></div>;
  }
  if (theme === 'music') {
    return <div className="preview-music"><div className="music-cover"><span>SV</span><i /><i /><i /><i /></div><div className="music-copy"><small>NOW PLAYING</small><b>Midnight city</b><span>Dreams in motion</span><div className="music-track"><i /></div><div className="music-controls">‹ <b>Ⅱ</b> ›</div></div><div className="music-orb orb-one" /><div className="music-orb orb-two" /></div>;
  }
  if (theme === 'movie') {
    return <div className="preview-movie"><div className="movie-top"><span>◉ movieDB</span><i>⌕</i></div><div className="movie-feature"><small>FEATURED THIS WEEK</small><strong>THE<br />LAST<br />FRONTIER</strong><span>Explore stories worth staying up for.</span><button>Explore titles <ArrowRight size={12} /></button></div><div className="movie-posters"><i /><i /><i /><i /></div></div>;
  }
  return <div className="preview-lms"><div className="lms-side"><b>learn<span>ly</span></b><i>◈ Overview</i><i>▤ Courses</i><i>◷ Assignments</i><i>♙ Students</i></div><div className="lms-main"><div className="lms-top"><span>Good morning, Alex <b>✦</b></span><i>⌕　◉</i></div><small>YOUR LEARNING AT A GLANCE</small><div className="lms-stats"><i><b>08</b><span>Enrolled courses</span></i><i><b>12</b><span>Assignments</span></i><i><b>94%</b><span>Average grade</span></i></div><div className="lms-course"><span>CONTINUE LEARNING</span><b>Introduction to Web Development</b><i><span /></i><small>72% complete</small></div></div></div>;
}

function ProjectCard({ project, index }) {
  const handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty('--tilt-x', `${y * -3}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${x * 3}deg`);
  };
  const resetPointer = (event) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <motion.article className={`project-card project-${project.theme}`} onPointerMove={handlePointerMove} onPointerLeave={resetPointer} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.55, delay: (index % 2) * 0.1 }}>
      <div className="project-preview">
        <div className="preview-browser"><div className="browser-dots"><i /><i /><i /></div><span>portfolio / {project.theme}</span><MoveUpRight size={14} /></div>
        <ProjectPreview theme={project.theme} index={index} />
        <div className="preview-overlay" aria-hidden="true"><span>PROJECT PREVIEW</span></div>
      </div>
      <div className="project-content">
        <div className="project-meta"><span>{project.type}</span><span>/{project.number}</span></div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul>{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
        <div className="project-bottom"><div className="tag-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div><span className="link-placeholder" title="Project links have not been provided">Links unavailable</span></div>
      </div>
    </motion.article>
  );
}

function LoadingScreen() {
  return <motion.div className="loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55 }}><div className="loader-mark">SPV<span>.</span></div><div className="loader-line"><i /></div><p>DESIGNING THE NEXT PIXEL</p></motion.div>;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 850);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('main section[id], header[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) {
      setFormStatus('Please complete every field before sending.');
      return;
    }
    const subject = encodeURIComponent(`Portfolio enquiry from ${formName.trim()}`);
    const body = encodeURIComponent(`From: ${formName.trim()} (${formEmail.trim()})\n\n${formMessage.trim()}`);
    setFormStatus('Your email draft is ready to send.');
    window.location.href = `mailto:shaikpamsha85@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      <div className="scroll-progress" aria-hidden="true" />
      <nav className="navbar" aria-label="Main navigation">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Shaik Pamsha Vali home">SPV<span>.</span></a>
        <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          {navItems.map(([id, label]) => <a key={id} href={`#${id}`} className={activeSection === id ? 'nav-active' : ''} onClick={closeMenu}>{label}</a>)}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Let&apos;s talk <ArrowUpRight size={14} /></a>
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>

      <main>
        <header className="hero section-shell" id="home">
          <div className="hero-copy">
            <motion.div className="availability" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}><span /> OPEN TO OPPORTUNITIES <span className="availability-dot">✳</span></motion.div>
            <motion.p className="hero-pretitle" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.02 }}>HELLO, I&apos;M</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.75 }}>Shaik Pamsha<br /><span>Vali<span className="hero-period">.</span></span></motion.h1>
            <motion.div className="hero-role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.38 }}><span /> Frontend Developer <i /> React.js Developer <i /> Full-Stack Enthusiast</motion.div>
            <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.52 }}>I build modern, responsive, and interactive web applications with a strong foundation in frontend development and hands-on experience integrating backend APIs and databases.</motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7 }}>
              <a className="button button-primary" href="#projects">View my projects <ArrowDownRight size={17} /></a>
              <a className="button button-quiet" href="/Shaik-Pamsha-Vali-Resume.pdf" download>Download resume <Download size={15} /></a>
            </motion.div>
            <motion.div className="hero-socials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}>
              <a href="https://github.com/Pamshavali" target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github size={17} /></a>
              <span className="social-divider" />
              <span className="social-placeholder" title="LinkedIn URL not provided" aria-label="LinkedIn URL not provided"><Linkedin size={17} /><small>LinkedIn link coming soon</small></span>
              <span className="social-note">BUILDING, LEARNING, REPEATING <ArrowDown size={12} /></span>
            </motion.div>
          </div>
          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.05, duration: 1 }}>
            <div className="visual-orbit orbit-outer" /><div className="visual-orbit orbit-inner" />
            <div className="visual-caption"><span>01 — CREATIVE CODE</span><span>45° 31&apos; 12.0&quot; N</span></div>
            <Suspense fallback={<div className="sphere-fallback"><div className="fallback-core">SPV</div></div>}><TechSphere /></Suspense>
            <div className="hero-photo-frame"><img src="/profile-placeholder.svg" alt="Temporary profile photo placeholder for Shaik Pamsha Vali" /><span className="photo-caption">REPLACE WITH YOUR PHOTO <ArrowUpRight size={11} /></span></div>
            <div className="visual-float visual-float-top"><Sparkles size={15} /><span>Curiosity-driven<br />development</span></div>
            <div className="visual-float visual-float-bottom"><span className="code-indicator" /><span>REACT.JS<br /><b>IN MY TOOLKIT</b></span></div>
          </motion.div>
          <a className="hero-scroll" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={13} /></a>
          <span className="hero-index">PORTFOLIO — 2025 / 26</span>
        </header>

        <section className="about section-shell" id="about">
          <SectionHeading eyebrow="A LITTLE ABOUT ME" title="Building for the" highlight="curious." />
          <div className="about-grid">
            <div className="about-intro"><span className="about-number">01<span>/04</span></span><h3>Good interfaces<br />start with <em>good questions.</em></h3><div className="about-decoration"><span /><span /><span /></div></div>
            <div className="about-body"><p className="about-lead">I&apos;m a computer science graduate who loves turning ideas into useful, thoughtful digital experiences.</p><p>Computer Science graduate with hands-on project experience in React.js, JavaScript, HTML, and CSS. Developed a Student Learning Management System using Python, MySQL, and React, gaining exposure to backend APIs and database integration. Familiar with Python fundamentals and basic SQL, with an interest in building reliable full-stack web applications and continuously improving technical skills.</p><a href="#contact" className="text-link">A project in mind? Let&apos;s connect <ArrowUpRight size={15} /></a></div>
          </div>
          <div className="about-stats"><div><span>01</span><small>FULL-STACK<br />PROJECT</small></div><div><span>04</span><small>SELECTED<br />PROJECTS</small></div><div><span>∞</span><small>THINGS LEFT<br />TO LEARN</small></div><div className="stat-note"><Sparkles size={15} /> Always learning,<br />always building.</div></div>
        </section>

        <section className="skills-section section-shell" id="skills">
          <SectionHeading eyebrow="MY TOOLKIT" title="Skills with" highlight="intention." description="A practical, growing toolkit — focused on understanding the fundamentals and using the right tool for the job." />
          <div className="skills-grid">{skills.map((skill, index) => {
            const Icon = skill.icon;
            return <motion.article key={skill.title} className="skill-card" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: index * 0.08 }}>
              <div className="skill-card-top"><span className="skill-icon"><Icon size={18} /></span><span className="skill-index">0{index + 1}</span></div><h3>{skill.title}</h3><p>{skill.note}</p><div className="skill-tags">{skill.items.map((item) => <span key={item}><i />{item}</span>)}</div><div className="skill-card-glow" />
            </motion.article>;
          })}</div>
        </section>

        <section className="projects-section section-shell" id="projects">
          <div className="projects-heading"><SectionHeading eyebrow="SELECTED WORK" title="Made to be" highlight="useful." description="A few things I&apos;ve designed, built, and learned from along the way." /><a href="#contact" className="text-link projects-contact">Have a project in mind? <ArrowUpRight size={15} /></a></div>
          <div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project.number} project={project} index={index} />)}</div>
          <p className="project-link-note"><ExternalLink size={13} /> Project repository and live-demo links will be added when available.</p>
        </section>

        <section className="journey-section section-shell" id="experience">
          <SectionHeading eyebrow="THE JOURNEY SO FAR" title="Learning by" highlight="building." description="A foundation in computer science, strengthened by hands-on projects and a habit of staying curious." />
          <div className="journey-grid"><div className="journey-column"><div className="journey-label"><GraduationCap size={17} /> EDUCATION</div>
            <article className="journey-card"><span className="journey-date">SEP 2022 — MAY 2026</span><h3>B.Tech — Computer Science and Engineering</h3><p>Bharath Institute of Science and Technology</p><div className="journey-badge"><BadgeCheck size={14} /> CGPA 7.4</div></article>
            <article className="journey-card compact"><span className="journey-date">2022</span><h3>12th Standard</h3><p>Sri Sai Siddharatha Junior College</p><div className="journey-badge">63%</div></article>
            <article className="journey-card compact"><span className="journey-date">2020</span><h3>10th Standard</h3><p>Nehru English Medium High School</p><div className="journey-badge">96%</div></article>
          </div><div className="journey-column journey-focus"><div className="journey-label"><Sparkles size={16} /> CURRENT FOCUS</div><div className="focus-card"><span className="focus-glow" /><div className="focus-icon"><Code2 size={21} /></div><span className="focus-kicker">GROWING ONE BUILD AT A TIME</span><h3>From frontend<br />to full-stack.</h3><p>Strengthening the fundamentals, exploring APIs and databases, and finding better ways to build reliable, human-friendly applications.</p><div className="focus-stack"><span>React</span><span>APIs</span><span>Python</span><span>MySQL</span></div></div></div></div>
        </section>

        <section className="contact-section section-shell" id="contact">
          <div className="contact-topline"><span className="eyebrow"><span className="eyebrow-dot" /> NEXT UP</span><span>GOOD THINGS START WITH A CONVERSATION</span></div>
          <div className="contact-grid"><div className="contact-copy"><h2>Let&apos;s make<br />something <span>matter.</span></h2><p>Have an opportunity, a project idea, or just want to say hello? My inbox is always open.</p><a className="contact-email" href="mailto:shaikpamsha85@gmail.com"><Mail size={17} /> shaikpamsha85@gmail.com <ArrowUpRight size={15} /></a><div className="contact-details"><a href="tel:+919182421516"><Phone size={15} /> +91 9182421516</a><a href="https://github.com/Pamshavali" target="_blank" rel="noreferrer"><Github size={15} /> github.com/Pamshavali <ArrowUpRight size={12} /></a><span title="LinkedIn profile link not provided"><Linkedin size={15} /> LinkedIn link coming soon</span></div></div>
            <form className="contact-form" onSubmit={handleSubmit}><div className="form-heading"><span>01 / SAY HELLO</span><span>ALL FIELDS REQUIRED</span></div><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" placeholder="How should I call you?" value={formName} onChange={(event) => setFormName(event.target.value)} required /><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={formEmail} onChange={(event) => setFormEmail(event.target.value)} required /><label htmlFor="contact-message">A little about your project</label><textarea id="contact-message" name="message" rows="3" placeholder="Tell me what you're working on..." value={formMessage} onChange={(event) => setFormMessage(event.target.value)} required /><div className="form-submit-row"><span aria-live="polite">{formStatus}</span><button type="submit" className="button button-primary">Send a message <Send size={14} /></button></div></form>
          </div>
        </section>
      </main>
      <footer className="footer section-shell"><a className="brand" href="#home">SPV<span>.</span></a><span>DESIGNED & BUILT WITH CARE</span><span>© {new Date().getFullYear()} SHAIK PAMSHA VALI</span><a className="back-top" href="#home">BACK TO TOP <ArrowUpRight size={13} /></a></footer>
    </>
  );
}
