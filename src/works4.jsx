// App.jsx
import React, { useState, useEffect, useRef } from 'react';
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
  summary: 'Adobe-certified engineer driving data-driven solutions using Launch, AEP, Adobe Analytics, Customer Journey Analytics, Real-Time CDP, and Journey Optimizer — delivering clean, actionable insights across platforms.',
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
        'Recognition: Received appreciation from clients and stakeholders for delivering a successful end-to-end migration across web and mobile platforms.'
      ]
    },
    {
      title: 'Software Trainee - Internship',
      company: 'Granite River Labs Pvt Ltd.',
      location: 'Bangalore',
      period: '01/2020 - 03/2020',
      bullets: [
        'Engineered a dynamic network monitoring tool utilizing ping commands, precisely measuring data transfer rates for a designated domain. Implemented seamless data transmission and real-time updates, presented through an intuitive graphical interface. This project not only facilitated instant performance monitoring but also empowered detailed analysis, enhancing insights into network efficiency and potential optimizations.'
      ]
    }
  ],
  education: [
    {
      degree: 'BE CSE (Anna University)',
      institution: 'Knowledge Institute of Technology, Salem',
      period: '06/2016 - 10/2020'
    }
  ],
  tools: [
    'Adobe Launch', 'Adobe Experience Platform', 'Adobe Analytics', 'Real-Time Customer Data Platform', 'Customer Journey Analytics', 'Adobe Journey Optimizer', 'AEP XDM Schema Design', 'Adobe AEP: Data Ingestion & Config', 'JavaScript', 'JQuery', 'Python', 'Java'
  ],
  projects: [
    {
      title: 'Real-Time Device Monitor',
      desc: 'Developed a real-time USB device monitoring application using Python and Tkinter GUI, enabling dynamic detection of device insertion/removal events through system-level polling, with responsive UI updates and smooth user interaction. Implemented robust data parsing logic to track device metadata and status changes, offering live insights into connected peripherals.',
      repo: ['https://github.com/Jeevanantham-N/tkinter-live-updating-active-ports'],
      tech: ['Python', 'Tkinter GUI']
    },
    {
      title: 'PG Spotter',
      desc: 'Spearheaded the development of an online platform catering to personalized PG/hostel searches. Engineered the backend using Java and the Spring framework, orchestrating data processing and robust authentication mechanisms. The frontend, crafted with React JS, delivers a responsive and intuitive user interface. Leveraged MySQL for efficient data storage and retrieval, ensuring a seamless and efficient database infrastructure.',
      repo: ['https://github.com/Jeevanantham-N/findmypg-spring', 'https://github.com/Jeevanantham-N/findmypg-reactjs'],
      tech: ['Java/Spring', 'React JS', 'MySQL']
    }
  ],
  certifications: [
    'Adobe Certified Expert - Adobe Analytics Developer', 'Adobe Certified Expert - Adobe Analytics Business Practitioner', 'Oracle Certified Java Professional (OCA)', 'Virtusa Certified GenAI Assisted Engineer'
  ],
  awards: [
    { title: 'Extra Mile Award - Virtusa', date: '01/2024 - 04/2024', desc: "Recognized with the prestigious 'Extra Mile Award' for consistently exceeding expectations and delivering outstanding performance within my team." },
    { title: 'Gold badge from Hackerrank', desc: 'Have got a Gold badge from Hackerrank by solved 100+ problems.' }
  ]
};

// --- Reusable Components ---
const Bullet = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-5 h-5 text-gray-400">
    <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-3xl font-bold tracking-tight text-gray-100 mb-8">{children}</h2>
);

// --- Main Components ---
function Nav({ data }) {
  return (
    <header className="sticky top-0 z-40 bg-black/50 backdrop-blur-md border-b border-gray-800/50">
      <nav className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between text-base font-medium text-gray-200">
        <div className="tracking-wide">{data.name}</div>
        <div className="flex items-center gap-8">
          <a href="#projects" className="hover:opacity-60 transition-opacity">Projects</a>
          <a href="#experience" className="hover:opacity-60 transition-opacity">Experience</a>
          <a href="#contact" className="px-4 py-1.5 rounded-full bg-white text-black hover:opacity-80 transition-opacity">Contact</a>
        </div>
      </nav>
    </header>
  );
}

function Hero({ data }) {
  return (
    <section className="max-w-7xl mx-auto px-8 py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight text-white whitespace-nowrap overflow-hidden text-ellipsis">
            {data.name}
          </h1>
          <p className="text-2xl text-gray-200">{data.role}</p>
          <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">{data.summary}</p>
          <div className="flex gap-4">
            <a href="#contact" className="px-6 py-3 rounded-full border border-gray-700 text-base hover:bg-gray-800 transition-colors">Contact</a>
            <a href="#projects" className="px-6 py-3 rounded-full bg-white text-black text-base hover:opacity-90 transition-opacity">View Projects</a>
            <a href={resumePdf} download className="px-6 py-3 rounded-full border border-gray-700 text-base hover:bg-gray-800 transition-colors">Download CV</a>
          </div>
          <div className="text-base text-gray-500 flex gap-4">
            <span>{data.location}</span>
            <a href={data.linkedin} target="_blank" rel="noreferrer" className="underline hover:opacity-60 transition-opacity">LinkedIn</a>
            <a href={data.github} target="_blank" rel="noreferrer" className="underline hover:opacity-60 transition-opacity">GitHub</a>
          </div>
        </div>
        <div className="hidden lg:block sticky top-32">
          <div className="p-10 rounded-3xl bg-[#1d1d1f]/80 backdrop-blur-lg border border-gray-800/50">
            <div className="text-sm text-gray-500 uppercase tracking-wide">Role</div>
            <div className="mt-2 text-2xl font-bold text-white">{data.role}</div>
            <div className="mt-6 text-base text-gray-400 leading-relaxed">Certified Adobe Analytics Developer & AEP practitioner. Focused on tracking, schema design, data validation, and migration.</div>
            <div className="mt-8">
              <a href="#contact" className="px-5 py-2.5 rounded-full border border-gray-700 text-base hover:bg-gray-800 transition-colors">Email</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceTimeline({ experiences }) {
  return (
    <section id="experience" className="max-w-7xl mx-auto px-8 py-16">
      <SectionTitle>Experience</SectionTitle>
      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <article key={idx} className="p-8 rounded-3xl bg-[#1d1d1f]/80 backdrop-blur-lg border border-gray-800/50 hover:border-gray-700 transition-colors duration-300">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              <div>
                <div className="text-xl font-semibold text-white">{exp.title}</div>
                <div className="text-base text-gray-400">{exp.company} • {exp.location}</div>
              </div>
              <div className="text-base text-gray-500">{exp.period}</div>
            </div>
            <ul className="mt-6 space-y-4 text-gray-400 text-base leading-relaxed list-none">
              {exp.bullets.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <Bullet />
                  <span>{b}</span>
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
    <section id="education" className="max-w-7xl mx-auto px-8 py-16">
      <SectionTitle>Education</SectionTitle>
      <div className="space-y-8">
        {education.map((edu, idx) => (
          <article key={idx} className="p-8 rounded-3xl bg-[#1d1d1f]/80 backdrop-blur-lg border border-gray-800/50 hover:border-gray-700 transition-colors duration-300">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              <div>
                <div className="text-xl font-semibold text-white">{edu.degree}</div>
                <div className="text-base text-gray-400">{edu.institution}</div>
              </div>
              <div className="text-base text-gray-500">{edu.period}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Projects({ projects }) {
  return (
    <section id="projects" className="max-w-7xl mx-auto px-8 py-16">
      <SectionTitle>Projects</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <article key={i} className="p-8 rounded-3xl bg-[#1d1d1f]/80 backdrop-blur-lg border border-gray-800/50 hover:border-gray-700 transition-colors duration-300">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              <h3 className="text-xl font-semibold text-white">{p.title}</h3>
              <div className="text-base text-gray-500">{p.tech.join(' • ')}</div>
            </div>
            <p className="mt-4 text-gray-400 text-base leading-relaxed">{p.desc}</p>
            <div className="mt-6 flex gap-4">
              {p.repo.map((r, j) => (
                <a key={j} href={r} target="_blank" rel="noreferrer" className="text-base underline hover:opacity-60 transition-opacity">View repo {p.repo.length > 1 ? j + 1 : ''}</a>
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
    <section className="max-w-7xl mx-auto px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <SectionTitle>Tools & Technology</SectionTitle>
          <div className="flex flex-wrap gap-3">
            {tools.map((t, i) => (
              <span key={i} className="px-4 py-2 bg-gray-800 rounded-full text-sm font-medium text-gray-200">{t}</span>
            ))}
          </div>
        </div>
        <div>
          <SectionTitle>Certifications</SectionTitle>
          <ul className="space-y-4 text-gray-300 text-base leading-relaxed list-none">
            {certs.map((c, i) => (
              <li key={i} className="flex items-center gap-3">
                <Bullet />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionTitle>Awards</SectionTitle>
          <ul className="space-y-6 text-gray-300 text-base leading-relaxed list-none">
            {awards.map((a, i) => (
              <li key={i}>
                <div className="flex items-center gap-3 font-semibold text-white">
                  <Bullet />
                  <span>{a.title} {a.date ? `(${a.date})` : ''}</span>
                </div>
                <p className="pl-8 mt-1 text-gray-400">{a.desc}</p>
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
    <section id="contact" className="max-w-7xl mx-auto px-8 py-16">
      <SectionTitle>Contact</SectionTitle>
      <div className="p-6 rounded-3xl bg-[#1d1d1f]/80 backdrop-blur-lg border border-gray-800/50 max-w-xl">
        <form ref={form} className="space-y-3" onSubmit={sendEmail}>
          <input type="hidden" name="to_email" value={data.email} />
          <input type="hidden" name="title" value={subject} />
          <div>
            <label className="block text-sm text-gray-400 mb-1.5" htmlFor="name">Your name</label>
            <input id="name" name="name" className="w-full py-2 px-3 text-sm bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500 transition-colors" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5" htmlFor="email">Your email</label>
            <input id="email" name="email" type="email" className="w-full py-2 px-3 text-sm bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500 transition-colors" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5" htmlFor="subject">Subject</label>
            <input id="subject" name="subject_line" className="w-full py-2 px-3 text-sm bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500 transition-colors" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5" htmlFor="msg">Message</label>
            <textarea id="msg" name="message" className="w-full py-2 px-3 text-sm bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500 transition-colors" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <div className="flex items-center gap-4 pt-2">
            <button type="submit" disabled={isSending} className={`px-5 py-2.5 rounded-full text-sm transition-opacity ${isSending ? 'bg-gray-700 text-gray-400' : 'bg-white text-black hover:opacity-90'}`}>
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
            <div className="text-xs text-gray-500 ml-auto">Secure via EmailJS</div>
          </div>
        </form>
      </div>
      {toast && <div className="fixed bottom-8 right-8 bg-gray-200 text-black px-5 py-2.5 rounded-full shadow-lg text-sm">{toast}</div>}
    </section>
  );
}

function Footer({ data }) {
  return (
    <footer className="border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-8 py-8 text-base text-gray-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} {data.name}</div>
        <div className="flex gap-6">
          <a href={data.linkedin} target="_blank" rel="noreferrer" className="underline hover:opacity-60 transition-opacity">LinkedIn</a>
          <a href={data.github} target="_blank" rel="noreferrer" className="underline hover:opacity-60 transition-opacity">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-black text-gray-200 antialiased select-none" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
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