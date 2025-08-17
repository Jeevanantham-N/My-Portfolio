// App.jsx
import React, { useState, useRef } from 'react';
import resumePdf from './assets/resume.pdf';
import emailjs from '@emailjs/browser';

/* -------------------------
  Config - update via env
   - SERVICE & TEMPLATE are from your emailjs account
   - PUBLIC_KEY should be stored in env: REACT_APP_EMAILJS_PUBLIC_KEY
---------------------------*/
const EMAILJS_SERVICE_ID = 'service_4z33hi3';
const EMAILJS_TEMPLATE_ID = 'template_0dzqbif';
const EMAILJS_PUBLIC_KEY = 'vD1FQ2paQhZ92PXCg';

const resumeData = {
  name: 'N Jeevanantham',
  email: 'jeevasatn@gmail.com',
  phone: '+91 98425 98260',
  location: 'Salem, India',
  linkedin: 'https://www.linkedin.com/in/jeevanantham001/',
  github: 'https://github.com/Jeevanantham-N',
  role: 'Adobe Experience Platform Developer',
  summary:
    'Adobe-certified engineer driving data-driven solutions using Launch, AEP, Adobe Analytics, Customer Journey Analytics, Real-Time CDP, and Journey Optimizer — delivering clean, actionable insights across platforms.',
  experiences: [
    {
      title: 'Engineer - Technology',
      company: 'Virtusa',
      location: 'Chennai - DLF',
      period: '04/2021 - Present',
      bullets: [
        'Adobe Launch & AEP Implementation: Implemented user behavior tracking by configuring Adobe Launch rules and setting up schemas, datasets, and dataflows in Adobe Experience Platform (AEP), ensuring accurate and consistent data collection.',
        'Data Validation & Analytics Insight: Validated data flow post-implementation and analyzed user behavior patterns using Adobe Analytics and Customer Journey Analytics to generate actionable insights for business decision-making.',
        'Adobe Experience Platform Implementation: Played a major role in migrating seven web properties to AEP with focus on Web SDK setup, Launch configuration, and end-to-end validation. Additionally, supported AEP Mobile SDK integration for iOS and Android through research-based troubleshooting and testing, ensuring tracking consistency and resolution of key issues.',
        'Internal Development Work: Built an internal intranet property from scratch with integrated analytics, improving internal process visibility and reporting.',
        'Team Collaboration: Guided a team of 2 associates — assigning tasks, resolving blockers, and ensuring timely delivery of project goals.',
        'Recognition: Received appreciation from clients and stakeholders for delivering a successful end-to-end migration across web and mobile platforms.',
      ],
    },
    {
      title: 'Software Trainee - Internship',
      company: 'Granite River Labs Pvt Ltd.',
      location: 'Bangalore',
      period: '01/2020 - 03/2020',
      bullets: [
        'Engineered a dynamic network monitoring tool utilizing ping commands, precisely measuring data transfer rates for a designated domain. Implemented seamless data transmission and real-time updates, presented through an intuitive graphical interface. This project not only facilitated instant performance monitoring but also empowered detailed analysis, enhancing insights into network efficiency and potential optimizations.',
      ],
    },
  ],
  education: [
    {
      degree: 'BE CSE (Anna University)',
      institution: 'Knowledge Institute of Technology, Salem',
      period: '06/2016 - 10/2020',
    },
  ],
  tools: [
    'Adobe Launch',
    'Adobe Experience Platform',
    'Adobe Analytics',
    'Real-Time Customer Data Platform',
    'Customer Journey Analytics',
    'Adobe Journey Optimizer',
    'AEP XDM Schema Design',
    'Adobe AEP: Data Ingestion & Config',
    'JavaScript',
    'JQuery',
    'Python',
    'Java',
  ],
  projects: [
    {
      title: 'Real-Time Device Monitor',
      desc: 'Developed a real-time USB device monitoring application using Python and Tkinter GUI, enabling dynamic detection of device insertion/removal events through system-level polling, with responsive UI updates and smooth user interaction. Implemented robust data parsing logic to track device metadata and status changes, offering live insights into connected peripherals.',
      repo: ['https://github.com/Jeevanantham-N/tkinter-live-updating-active-ports'],
      tech: ['Python', 'Tkinter GUI'],
    },
    {
      title: 'PG Spotter',
      desc: 'Spearheaded the development of an online platform catering to personalized PG/hostel searches. Engineered the backend using Java and the Spring framework, orchestrating data processing and robust authentication mechanisms. The frontend, crafted with React JS, delivers a responsive and intuitive user interface. Leveraged MySQL for efficient data storage and retrieval, ensuring a seamless and efficient database infrastructure.',
      repo: [
        'https://github.com/Jeevanantham-N/findmypg-spring',
        'https://github.com/Jeevanantham-N/findmypg-reactjs',
      ],
      tech: ['Java/Spring', 'React JS', 'MySQL'],
    },
  ],
  certifications: [
    'Adobe Certified Expert - Adobe Analytics Developer',
    'Adobe Certified Expert - Adobe Analytics Business Practitioner',
    'Oracle Certified Java Professional (OCA)',
    'Virtusa Certified GenAI Assisted Engineer',
  ],
  awards: [
    {
      title: 'Extra Mile Award - Virtusa',
      date: '01/2024 - 04/2024',
      desc: "Recognized with the prestigious 'Extra Mile Award' for consistently exceeding expectations and delivering outstanding performance within my team.",
    },
    { title: 'Gold badge from Hackerrank', desc: 'Have got a Gold badge from Hackerrank by solved 100+ problems.' },
  ],
};

// Bullet: a small circular bullet for certs/awards
const Bullet = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" className="flex-shrink-0 w-3 h-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <circle cx="6" cy="6" r="5" fill="currentColor" />
  </svg>
);

const SectionTitle = ({ children }) => <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">{children}</h2>;

function Nav({ data }) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between text-base font-medium text-gray-800">
        <div className="tracking-wide font-medium">{data.name}</div>

        {/* Mobile: only Contact visible; Projects & Experience shown from md+ */}
        <div className="flex items-center gap-6">
          <a href="#projects" className="hidden md:inline hover:opacity-80 transition-opacity text-gray-700">Projects</a>
          <a href="#experience" className="hidden md:inline hover:opacity-80 transition-opacity text-gray-700">Experience</a>
          <a
            href="#contact"
            className="px-3 py-1.5 rounded-full bg-gray-900 text-white hover:opacity-90 transition"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero({ data }) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          {/* responsive clamp ensures name stays on single line and scales */}
          <h1
            className="font-extrabold tracking-tight text-gray-900"
            style={{ fontSize: 'clamp(2rem, 8vw, 4.5rem)', lineHeight: 1 }}
          >
            {data.name}
          </h1>

          <p className="text-lg md:text-xl text-gray-700">{data.role}</p>
          <p className="text-base text-gray-600 max-w-2xl leading-relaxed">{data.summary}</p>

          {/* Buttons: Download CV always visible. Others hidden on small screens */}
          <div className="flex gap-3">
            <a
              href="#contact"
              className="hidden md:inline px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-50 transition"
            >
              Contact
            </a>

            <a
              href="#projects"
              className="hidden md:inline px-4 py-2 rounded-full bg-gray-900 text-white text-sm hover:opacity-90 transition"
            >
              View Projects
            </a>

            <a
              href={resumePdf}
              download
              className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-50 transition"
            >
              Download CV
            </a>
          </div>

          <div className="text-sm text-gray-500 flex gap-4 mt-4">
            <span>{data.location}</span>
            <a href={data.linkedin} target="_blank" rel="noreferrer" className="underline hover:opacity-80">
              LinkedIn
            </a>
            <a href={data.github} target="_blank" rel="noreferrer" className="underline hover:opacity-80">
              GitHub
            </a>
          </div>
        </div>

        {/* Right info card: show only on lg and above */}
        <div className="hidden lg:block sticky top-24">
          <div className="p-8 rounded-2xl bg-white shadow-sm border border-gray-100">
            <div className="text-xs text-gray-500 uppercase tracking-wide">Role</div>
            <div className="mt-2 text-lg font-semibold text-gray-900">{data.role}</div>
            <div className="mt-4 text-sm text-gray-600 leading-relaxed">
              Certified Adobe Analytics Developer & AEP practitioner. Focused on tracking, schema design, data validation, and migration.
            </div>
            <div className="mt-6">
              <a href="#contact" className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-50 transition">Email</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceTimeline({ experiences }) {
  return (
    <section id="experience" className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <SectionTitle>Experience</SectionTitle>
      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <article key={idx} className="p-6 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold text-gray-900">{exp.title}</div>
                <div className="text-sm text-gray-600">{exp.company} • {exp.location}</div>
              </div>
              <div className="text-sm text-gray-500">{exp.period}</div>
            </div>
            <ul className="mt-4 space-y-3 text-gray-700 text-sm list-none">
              {exp.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <Bullet />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Education({ education }) {
  return (
    <section id="education" className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <SectionTitle>Education</SectionTitle>
      <div className="space-y-6">
        {education.map((edu, idx) => (
          <article key={idx} className="p-6 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold text-gray-900">{edu.degree}</div>
                <div className="text-sm text-gray-600">{edu.institution}</div>
              </div>
              <div className="text-sm text-gray-500">{edu.period}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Projects({ projects }) {
  return (
    <section id="projects" className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <SectionTitle>Projects</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <article key={i} className="p-6 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex flex-col md:flex-row items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-gray-900">{p.title}</h3>
              <div className="text-sm text-gray-500">{p.tech.join(' • ')}</div>
            </div>
            <p className="mt-3 text-gray-700 text-sm leading-relaxed">{p.desc}</p>
            <div className="mt-4 flex gap-3">
              {p.repo.map((r, j) => (
                <a key={j} href={r} target="_blank" rel="noreferrer" className="text-sm underline hover:opacity-80">
                  View repo {p.repo.length > 1 ? j + 1 : ''}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ToolsAndCerts({ tools, certs, awards }) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <SectionTitle>Tools & Technology</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {tools.map((t, i) => (
              <span key={i} className="px-3 py-1 bg-gray-50 rounded-full text-sm font-medium text-gray-800 border border-gray-100">{t}</span>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle>Certifications</SectionTitle>
          <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
            {certs.map((c, i) => (
              <li key={i} className="flex items-start gap-3">
                <Bullet />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SectionTitle>Awards</SectionTitle>
          <ul className="space-y-4 text-gray-700 text-sm leading-relaxed">
            {awards.map((a, i) => (
              <li key={i}>
                <div className="flex items-start gap-3 font-semibold text-gray-900">
                  <Bullet />
                  <span>{a.title} {a.date ? <span className="font-normal text-gray-600">({a.date})</span> : null}</span>
                </div>
                <p className="pl-6 mt-1 text-gray-600 text-sm">{a.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact({ data }) {
  const form = useRef();
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('Portfolio Contact');
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    if (!name.trim() || !/\S+@\S+\.\S+/.test(userEmail)) {
      setToast('Please fill in all fields correctly.');
      setTimeout(() => setToast(null), 2500);
      return;
    }
    setIsSending(true);
    setToast('Sending...');
    // EmailJS functionality preserved as requested
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form.current, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setToast('Message sent — thank you!');
        setName('');
        setUserEmail('');
        setMessage('');
      }, () => {
        setToast('Automatic send failed. Please try again.');
      }).finally(() => {
        setIsSending(false);
        setTimeout(() => setToast(null), 3500);
      });
  };

  return (
    <section id="contact" className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <SectionTitle>Contact</SectionTitle>
      <div className="p-6 rounded-2xl bg-white shadow-sm border border-gray-100 max-w-xl">
        <form ref={form} className="space-y-3" onSubmit={sendEmail}>
          <input type="hidden" name="to_email" value={data.email} />
          <input type="hidden" name="title" value={subject} />
          <div>
            <label className="block text-sm text-gray-600 mb-1.5" htmlFor="name">Your name</label>
            <input id="name" name="name" className="w-full py-2 px-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 transition" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1.5" htmlFor="email">Your email</label>
            <input id="email" name="email" type="email" className="w-full py-2 px-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 transition" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1.5" htmlFor="subject">Subject</label>
            <input id="subject" name="subject_line" className="w-full py-2 px-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 transition" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1.5" htmlFor="msg">Message</label>
            <textarea id="msg" name="message" className="w-full py-2 px-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 transition" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <div className="flex items-center gap-4 pt-2">
            <button type="submit" disabled={isSending} className={`px-4 py-2 rounded-full text-sm transition ${isSending ? 'bg-gray-200 text-gray-500' : 'bg-gray-900 text-white hover:opacity-95'}`}>
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
            <div className="text-xs text-gray-500 ml-auto">Secure via EmailJS</div>
          </div>
        </form>
      </div>
      {toast && <div className="fixed bottom-6 right-6 bg-gray-100 text-gray-900 px-4 py-2 rounded-full shadow">{toast}</div>}
    </section>
  );
}

function Footer({ data }) {
  return (
    <footer className="border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} {data.name}</div>
        <div className="flex gap-4">
          <a href={data.linkedin} target="_blank" rel="noreferrer" className="underline hover:opacity-80">LinkedIn</a>
          <a href={data.github} target="_blank" rel="noreferrer" className="underline hover:opacity-80">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
      <Nav data={resumeData} />
      <main>
        <Hero data={resumeData} />
        <ExperienceTimeline experiences={resumeData.experiences} />
        <Education education={resumeData.education} />
        <Projects projects={resumeData.projects} />
        <ToolsAndCerts tools={resumeData.tools} certs={resumeData.certifications} awards={resumeData.awards} />
        <Contact data={resumeData} />
      </main>
      <Footer data={resumeData} />
    </div>
  );
}
