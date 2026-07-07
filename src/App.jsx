// App.jsx
import React, { useState, useRef, useEffect } from 'react';
import resumePdf from './assets/resume.pdf';
import emailjs from '@emailjs/browser';

/* -------------------------
  Config - update via env if you want
---------------------------*/
const EMAILJS_SERVICE_ID = 'service_4z33hi3';
const EMAILJS_TEMPLATE_ID = 'template_0dzqbif';
const EMAILJS_PUBLIC_KEY = 'vD1FQ2paQhZ92PXCg';

const resumeData = {
  "name": "N Jeevanantham",
  "email": "jeevasatn@gmail.com",
  "phone": "+91 98425 98260",
  "location": "Salem, India",
  "linkedin": "https://www.linkedin.com/in/jeevanantham001/",
  "github": "https://github.com/Jeevanantham-N",
  "role": "Software Engineer",
  "summary": "Adobe-certified expert driving data-driven solutions and enterprise platform reliability using AEP, Customer Journey Analytics, Adobe Journey Optimizer, Adobe Orchestration Campaign, AEP Query Service — delivering clean actionable insights and automated, high-scale operations.",
  "experiences": [
    {
      "title": "Senior Associate Technology L1",
      "company": "Publicis Sapient",
      "location": "Bengaluru",
      "period": "12/2025 - Present",
      "bullets": [
        "Collaborating on enterprise AEP platform operations and reliability for a major healthcare client (UHG), governing multi-sandbox environments and helping manage 230+ live real-time customer journeys.",
        "Engineered an automated data recovery pipeline by writing complex AEP Query Service scripts to identify, categorize, and extract failed profiles from Adobe Journeys, routing them to Azure Blob Storage for upstream teams to reprocess.",
        "Developed SQL-based outcome monitoring to track the success rate of automated retries, validating if reprocessed profiles successfully completed their journeys or hit new errors.",
        "Acting as a production gatekeeper for AEP, AJO, and Adobe Campaign Orchestration deployments, assisting in root-cause analysis (RCA) to troubleshoot complex pipeline failures.",
        "Partnering with Adobe Enterprise Support and internal teams to identify core platform defects, log support tickets, and validate beta features."
      ]
    },
    {
      "title": "Engineer",
      "company": "Virtusa",
      "location": "Chennai",
      "period": "09/2021 - 11/2025",
      "bullets": [
        "Contributed to a multi-year Digital Marketing Services engagement for a US financial client, providing sustained support for Adobe Analytics and participating in a two-year migration of seven web properties to Adobe Experience Platform (AEP).",
        "Converted legacy Adobe Analytics tracking into AEP-compliant Web SDK implementations via Adobe Launch, following consistent event naming, data element mapping, and transformation rules to reduce downstream ETL effort.",
        "Designed AEP XDM schemas, supporting datasets, and dataflows to modernize the data supply chain and to enable Real-Time CDP profile unification; collaborated with stakeholders to map legacy variables to XDM types and to enforce schema validation.",
        "Built audiences and activation logic within AEP and contributed to orchestration in Adobe Journey Optimizer (AJO), implementing event-driven abandoned-loan re-targeting flows and a secure Inbox Messaging capability using Custom Actions with payload throttling to protect delivery performance.",
        "Implemented dataset-driven suppression and frequency-capping checks by querying AEP system datasets (e.g., 30-day suppression window) to ensure journeys respected contact limits and compliance requirements.",
        "Owned post-migration validation tasks: used AEP Query Service, Customer Journey Analytics, and Adobe Analytics to cross-reference events, reconcile profiles, and generate business-ready reports verifying tracking parity and data quality.",
        "Supported AEP Mobile SDK proofs-of-concept and iOS/Android integrations via research-driven troubleshooting: triaged event gaps, coordinated fixes with mobile engineers, and validated cross-platform consistency.",
        "Established tag-management governance using Adobe Launch—implemented rules, data elements, and extension configurations to standardize capture across properties and to minimize transformation work downstream.",
        "Built internal tooling (intranet property) with integrated analytics to improve operational visibility and mentored two associates by assigning tasks, removing blockers, and helping deliver migration milestones.",
        "Recognized with the 'Extra Mile Award' for sustained ownership of data quality and for contributing to successful analytics modernization across web and mobile platforms."
      ]
    },
    {
      "title": "Software Trainee - Internship",
      "company": "Granite River Labs Pvt Ltd.",
      "location": "Bangaluru",
      "period": "12/2020 - 03/2021",
      "bullets": [
        "Developed a Real-Time USB/Serial Device Monitor using Python, PySerial, and Tkinter to support lab validation: enumerated ports, parsed device metadata, normalized identifiers, and displayed connected devices with grouped summaries and live counts.",
        "Implemented OS-specific parsing and normalization flows for Windows and Linux to handle platform-dependent naming conventions and port formats, reducing false positives and improving device detection accuracy during plug/unplug verification.",
        "Built a responsive GUI dashboard with live updates and logging to accelerate hardware test cycles and provide immediate visibility into peripheral connectivity for QA and engineering teams.",
        "Engineered a Network Monitoring Tool using ping diagnostics and a lightweight data pipeline to capture latency and availability metrics for target domains; streamed results to a simple Flask endpoint and rendered dynamic graphs for real-time performance analysis and offline export."
      ]
    }
  ],
  "education": [
    {
      "degree": "BE CSE (Anna University)",
      "institution": "Knowledge Institute of Technology, Salem",
      "period": "06/2016 - 10/2020"
    }
  ],
  "tools": [
    "Adobe Experience Platform",
    "Adobe Journey Optimizer",
    "Customer Journey Analytics",
    "AEP Query Service",
    "Real-Time Customer Data Platform",
    "Adobe Campaign Orchestration",
    "Adobe Launch",
    "Adobe Analytics",
    "JavaScript",
    "JQuery",
    "HTML/CSS"
  ],
  "projects": [
    {
      "title": "Enterprise AEP Platform Operations & Reliability (UHG)",
      "desc": "Supported high-throughput data ingestion and journey monitoring for a major healthcare client. Built complex AEP Query Service SQL pipelines to scan daily journey events, identifying failed profiles based on AJO error codes and routing them to Azure Blob Storage for upstream teams to reprocess. Developed validation queries to track the outcome of automated retries, ensuring profiles successfully completed their journeys. Acted as a production gatekeeper for AEP, AJO, and Campaign deployments across multi-sandbox environments, and partnered with Adobe Support to report defects and test platform updates.",
      "repo": [],
      "tech": [
        "Adobe Experience Platform",
        "Adobe Journey Optimizer",
        "AEP Query Service",
        "Azure Blob Storage",
        "SQL"
      ]
    },
    {
      "title": "Digital Federal Credit Union Digital Marketing Solutions",
      "desc": "Part of a multi-year digital transformation engagement for a major US financial institution. Responsibilities included sustaining legacy Adobe Analytics operations and contributing to a two-year migration to Adobe Experience Platform (AEP). Converted legacy tracking into AEP Web SDK implementations via Adobe Launch, designed XDM schemas and supporting datasets to match Real-Time CDP event and profile models, and implemented dataflows to ingest, persist, and unify profile and event data. Built audiences for marketing activation and contributed to real-time orchestration in Adobe Journey Optimizer (AJO) — implementing abandoned-loan re-targeting and designing a secure inbox messaging capability using Custom Actions with payload throttling. Developed dataset-driven suppression checks and frequency-capping by querying system datasets to enforce a 30-day suppression window. Performed rigorous post-migration validation using AEP Query Service, Adobe Analytics, and Customer Journey Analytics to reconcile events, validate profile counts, and produce business-ready reporting. Supported AEP Mobile SDK POC and mobile telemetry parity checks, and documented implementation patterns, dataset mapping templates, and runbooks to institutionalize delivery practices.",
      "repo": [],
      "tech": [
        "Adobe Experience Platform",
        "Adobe Journey Optimizer",
        "Real-Time CDP",
        "Adobe Analytics",
        "Adobe Launch"
      ]
    },
    {
      "title": "Network Monitoring Tool",
      "desc": "Built a network monitoring utility that leverages ping-based diagnostics to capture latency and packet-loss metrics for configured domains. Implemented continuous sampling and streaming of metrics to a Flask endpoint, and rendered real-time graphs in a lightweight front-end view. Designed data export and logging to support post-hoc analysis and trend detection for network performance optimization.",
      "repo": [],
      "tech": [
        "JavaScript",
        "Python",
        "Flask"
      ]
    },
    {
      "title": "Real-Time Device Monitor",
      "desc": "Developed a desktop utility to monitor USB and serial device connectivity in real time. The tool enumerates available ports using PySerial, extracts and normalizes device metadata (VID/PID, serial identifiers), and displays connected devices in a Tkinter GUI with grouped summaries and counts. Implemented separate parsing and normalization flows for Windows and Linux to handle OS-specific naming conventions and port formats. The monitor provides immediate plug/unplug feedback, logs events for offline analysis, and serves as a lab validation aid for hardware testing.",
      "repo": [
        "https://github.com/Jeevanantham-N/tkinter-live-updating-active-ports"
      ],
      "tech": [
        "Python",
        "Tkinter GUI",
        "PySerial"
      ]
    },
    {
      "title": "Online PG/Hostel Finder",
      "desc": "PG Spotter — a full-stack platform to simplify PG/hostel discovery. Implemented backend REST services with Java and Spring for data processing, search, and authentication; built a responsive React.js frontend with filters, map integration, and session management; persisted data with MySQL and applied indexing and query optimization for responsive search results. Repositories include separate frontend and backend codebases demonstrating modular architecture.",
      "repo": [
        "https://github.com/Jeevanantham-N/findmypg-spring",
        "https://github.com/Jeevanantham-N/findmypg-reactjs"
      ],
      "tech": [
        "Java/Spring",
        "React JS",
        "MySQL"
      ]
    },
    {
      "title": "Salon System",
      "desc": "Developed a salon booking and seat-allocation system using Python/Flask with Firebase for real-time persistence. Implemented availability checks, booking workflows, and allocation logic to prevent double-booking and to optimize slot utilization. Built administrative interfaces for service and schedule management and designed the system for secure, scalable data storage and retrieval.",
      "repo": [],
      "tech": [
        "Firebase",
        "JavaScript",
        "Python",
        "Flask"
      ]
    }
  ],
  "certifications": [
    "Adobe Certified Expert - Adobe Analytics Developer",
    "Adobe Certified Expert - Adobe Analytics Business Practitioner",
    "Oracle Certified Java Professional (OCA)",
    "Virtusa Certified GenAI Assisted Engineer"
  ],
  "awards": [
    {
      "title": "Extra Mile Award - Virtusa",
      "date": "2024",
      "desc": "Recognized with the 'Extra Mile Award' for consistently exceeding expectations, maintaining high data quality, and delivering outstanding performance during the AEP migration and optimization phases."
    },
    {
      "title": "Gold badge from Hackerrank",
      "desc": "Awarded Gold badge on HackerRank after solving 100+ problems."
    }
  ]
};

// small circular bullet
// Removed mt-4 from the base string
const BulletIcon = ({ className = '' }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" className={`flex-shrink-0 w-3 h-3 ${className}`} xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <circle cx="6" cy="6" r="5" fill="currentColor" />
  </svg>
);

const SectionTitle = ({ children, dark }) => (
  <h2 className={`text-2xl md:text-3xl font-semibold mb-6 ${dark ? 'text-gray-200' : 'text-gray-800'}`}>{children}</h2>
);

function Nav({ data, dark }) {
  // Custom scroll function to fix the header overlap and keep the URL clean
  const scrollToSection = (e, id) => {
    e.preventDefault(); // This stops the URL from updating with #id
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // Height of your sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className={`sticky top-0 z-40 ${dark ? 'bg-black/80 border-b border-gray-800' : 'bg-white/80 border-b border-gray-200'} backdrop-blur-sm`}>
      <nav className={`max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between text-base font-medium ${dark ? 'text-gray-200' : 'text-gray-800'}`}>
        <div className="tracking-wide font-medium">{data.name}</div>
        <div className="flex items-center gap-6">
          <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hidden md:inline hover:opacity-80 transition-opacity cursor-pointer">Projects</a>
          <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="hidden md:inline hover:opacity-80 transition-opacity cursor-pointer">Experience</a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className={`${dark ? 'bg-white text-black' : 'bg-gray-900 text-white'} px-3 py-1.5 rounded-full hover:opacity-90 transition cursor-pointer`}>Contact</a>
        </div>
      </nav>
    </header>
  );
}

function Hero({ data, dark }) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <h1
            className={`font-extrabold tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontSize: 'clamp(2rem, 8vw, 4.5rem)', lineHeight: 1 }}
          >
            {data.name}
          </h1>

          <p className={`${dark ? 'text-gray-300' : 'text-gray-700'} text-lg md:text-xl`}>{data.role}</p>
          <p className={`${dark ? 'text-gray-400' : 'text-gray-600'} text-base max-w-2xl leading-relaxed`}>{data.summary}</p>

          <div className="flex gap-3">
            <a href="#contact"
               className={`hidden md:inline px-4 py-2 rounded-full border text-sm transition ${dark ? 'border-gray-700 text-gray-200 hover:bg-gray-900' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
              Contact
            </a>

            <a href="#projects"
               className={`hidden md:inline px-4 py-2 rounded-full text-sm transition ${dark ? 'bg-white text-black hover:opacity-95' : 'bg-gray-900 text-white hover:opacity-90'}`}>
              View Projects
            </a>

            <a href={resumePdf} download
               className={`px-4 py-2 rounded-full border text-sm transition ${dark ? 'border-gray-700 text-gray-200 hover:bg-gray-900' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
              Download CV
            </a>
          </div>

          <div className={`${dark ? 'text-gray-400' : 'text-gray-500'} text-sm flex gap-4 mt-4`}>
            <span>{data.location}</span>
            <a href={data.linkedin} target="_blank" rel="noreferrer" className="underline hover:opacity-80">LinkedIn</a>
            <a href={data.github} target="_blank" rel="noreferrer" className="underline hover:opacity-80">GitHub</a>
          </div>
        </div>

        <div className="hidden lg:block sticky top-24">
          <div className={`p-8 rounded-2xl ${dark ? 'bg-[#1d1d1f]/90 border border-gray-800 text-gray-200' : 'bg-white border border-gray-100 text-gray-900'} shadow-sm`}>
            <div className="text-xs text-gray-400 uppercase tracking-wide">Role</div>
            <div className={`mt-2 text-lg font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>{data.role}</div>
            <div className={`${dark ? 'text-gray-400' : 'text-gray-600'} mt-4 text-sm leading-relaxed`}>
              Certified Adobe Analytics Developer & AEP practitioner. Focused on tracking, schema design, data validation, and migration.
            </div>
            <div className="mt-6">
              <a href="#contact" className={`px-4 py-2 rounded-full border text-sm transition ${dark ? 'border-gray-700 text-gray-200 hover:bg-gray-900' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>Email</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceTimeline({ experiences, dark }) {
  return (
    <section id="experience" className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <SectionTitle dark={dark}>Experience</SectionTitle>
      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <article key={idx} className={`p-6 rounded-2xl shadow-sm transition ${dark ? 'bg-[#1d1d1f]/90 border border-gray-800 text-gray-200 hover:shadow-md' : 'bg-white border border-gray-100 text-gray-900 hover:shadow-md'}`}>
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold">{exp.title}</div>
                <div className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`}>{exp.company} • {exp.location}</div>
              </div>
              <div className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{exp.period}</div>
            </div>
            <ul className={`mt-4 space-y-3 text-sm leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
              {exp.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <BulletIcon className={`mt-1.5 ${dark ? 'text-gray-400' : 'text-gray-400'}`} />
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

function Education({ education, dark }) {
  return (
    <section id="education" className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <SectionTitle dark={dark}>Education</SectionTitle>
      <div className="space-y-6">
        {education.map((edu, idx) => (
          <article key={idx} className={`p-6 rounded-2xl shadow-sm transition ${dark ? 'bg-[#1d1d1f]/90 border border-gray-800 text-gray-200 hover:shadow-md' : 'bg-white border border-gray-100 text-gray-900 hover:shadow-md'}`}>
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold">{edu.degree}</div>
                <div className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`}>{edu.institution}</div>
              </div>
              <div className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{edu.period}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Projects({ projects, dark }) {
  return (
    <section id="projects" className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <SectionTitle dark={dark}>Projects</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <article key={i} className={`p-6 rounded-2xl shadow-sm transition ${dark ? 'bg-[#1d1d1f]/90 border border-gray-800 text-gray-200 hover:shadow-md' : 'bg-white border border-gray-100 text-gray-900 hover:shadow-md'}`}>
            <div className="flex flex-col md:flex-row items-start justify-between gap-3">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <div className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-500'}`}>{p.tech.join(' • ')}</div>
            </div>
            <p className={`mt-3 text-sm leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{p.desc}</p>
            <div className="mt-4 flex gap-3">
              {p.repo.map((r, j) => (
                <a key={j} href={r} target="_blank" rel="noreferrer" className={`text-sm underline hover:opacity-80 ${dark ? 'text-gray-200' : 'text-gray-700'}`}>View repo {p.repo.length > 1 ? j + 1 : ''}</a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ToolsAndCerts({ tools, certs, awards, dark }) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <SectionTitle dark={dark}>Tools & Technology</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {tools.map((t, i) => (
              <span key={i} className={`px-3 py-1 rounded-full text-sm font-medium border ${dark ? 'bg-[#0f1720] text-gray-200 border-gray-800' : 'bg-gray-50 text-gray-800 border-gray-100'}`}>{t}</span>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle dark={dark}>Certifications</SectionTitle>
          <ul className={`space-y-3 text-sm leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
            {certs.map((c, i) => (
              <li key={i} className="flex items-start gap-3">
                <BulletIcon className={`mt-1.5 ${dark ? 'text-gray-400' : 'text-gray-400'}`} />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SectionTitle dark={dark}>Awards</SectionTitle>
          <ul className={`space-y-4 text-sm leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
            {awards.map((a, i) => (
              <li key={i}>
                <div className="flex items-start gap-3 font-semibold">
                  <BulletIcon className={`mt-1.5 ${dark ? 'text-gray-400' : 'text-gray-400'}`} />
                  <span className={`${dark ? 'text-gray-100' : 'text-gray-900'}`}>{a.title} {a.date ? <span className={`font-normal ${dark ? 'text-gray-400' : 'text-gray-600'}`}>({a.date})</span> : null}</span>
                </div>
                <p className={`pl-6 mt-1 text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{a.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact({ data, dark }) {
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
    <section id="contact" className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <SectionTitle dark={dark}>Contact</SectionTitle>
      <div className={`p-6 rounded-2xl shadow-sm max-w-xl transition ${dark ? 'bg-[#1d1d1f]/90 border border-gray-800 text-gray-200' : 'bg-white border border-gray-100 text-gray-900'}`}>
        <form ref={form} className="space-y-3" onSubmit={sendEmail}>
          <input type="hidden" name="to_email" value={data.email} />
          <input type="hidden" name="title" value={subject} />

          <div>
            <label className={`block text-sm mb-1.5 ${dark ? 'text-gray-300' : 'text-gray-600'}`} htmlFor="name">Your name</label>
            <input id="name" name="name"
                   className={`w-full py-2 px-3 text-sm rounded-lg focus:outline-none transition ${dark ? 'bg-[#0b0b0b] border border-gray-700 text-gray-200 focus:ring-1 focus:ring-gray-600' : 'bg-white border border-gray-200 text-gray-900 focus:ring-1 focus:ring-gray-300'}`}
                   value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <label className={`block text-sm mb-1.5 ${dark ? 'text-gray-300' : 'text-gray-600'}`} htmlFor="email">Your email</label>
            <input id="email" name="email" type="email"
                   className={`w-full py-2 px-3 text-sm rounded-lg focus:outline-none transition ${dark ? 'bg-[#0b0b0b] border border-gray-700 text-gray-200 focus:ring-1 focus:ring-gray-600' : 'bg-white border border-gray-200 text-gray-900 focus:ring-1 focus:ring-gray-300'}`}
                   value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
          </div>

          <div>
            <label className={`block text-sm mb-1.5 ${dark ? 'text-gray-300' : 'text-gray-600'}`} htmlFor="subject">Subject</label>
            <input id="subject" name="subject_line"
                   className={`w-full py-2 px-3 text-sm rounded-lg focus:outline-none transition ${dark ? 'bg-[#0b0b0b] border border-gray-700 text-gray-200 focus:ring-1 focus:ring-gray-600' : 'bg-white border border-gray-200 text-gray-900 focus:ring-1 focus:ring-gray-300'}`}
                   value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>

          <div>
            <label className={`block text-sm mb-1.5 ${dark ? 'text-gray-300' : 'text-gray-600'}`} htmlFor="msg">Message</label>
            <textarea id="msg" name="message" rows={4}
                      className={`w-full py-2 px-3 text-sm rounded-lg focus:outline-none transition ${dark ? 'bg-[#0b0b0b] border border-gray-700 text-gray-200 focus:ring-1 focus:ring-gray-600' : 'bg-white border border-gray-200 text-gray-900 focus:ring-1 focus:ring-gray-300'}`}
                      value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button type="submit" disabled={isSending}
                    className={`px-4 py-2 rounded-full text-sm transition ${isSending ? (dark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500') : (dark ? 'bg-white text-black hover:opacity-95' : 'bg-gray-900 text-white hover:opacity-95')}`}>
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
            <div className={`text-xs ml-auto ${dark ? 'text-gray-300' : 'text-gray-500'}`}>Secure via EmailJS</div>
          </div>
        </form>
      </div>

      {toast && <div className={`fixed bottom-6 right-6 px-4 py-2 rounded-full shadow transition ${dark ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-900'}`}>{toast}</div>}
    </section>
  );
}

function Footer({ data, dark }) {
  return (
    <footer className={`border-t transition ${dark ? 'border-gray-800' : 'border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className={dark ? 'text-gray-400' : 'text-gray-600'}>© {new Date().getFullYear()} {data.name}</div>
        <div className={dark ? 'text-gray-300 flex gap-4' : 'text-gray-700 flex gap-4'}>
          <a href={data.linkedin} target="_blank" rel="noreferrer" className="underline hover:opacity-80">LinkedIn</a>
          <a href={data.github} target="_blank" rel="noreferrer" className="underline hover:opacity-80">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  // enable dark mode by default (matches your previous behavior)
  const [darkMode] = useState(true);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  // BLOCK SELECTION / COPY / CONTEXTMENU / CUT / DRAG / CTRL/CMD+C & CTRL/CMD+X
  useEffect(() => {
    const preventDefault = (e) => {
      // allow paste key (Ctrl/Cmd+V) - do not block it
      e.preventDefault();
    };

    const blockKeyboardCopy = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

      // Block Copy/Cut combinations (Ctrl/Cmd+C or Ctrl/Cmd+X)
      if (ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'x' || e.key === 'X')) {
        e.preventDefault();
      }
    };

    // Events to block
    document.addEventListener('copy', preventDefault);
    document.addEventListener('cut', preventDefault);
    document.addEventListener('selectstart', preventDefault);
    document.addEventListener('contextmenu', preventDefault);
    document.addEventListener('dragstart', preventDefault);
    document.addEventListener('keydown', blockKeyboardCopy, true);

    return () => {
      document.removeEventListener('copy', preventDefault);
      document.removeEventListener('cut', preventDefault);
      document.removeEventListener('selectstart', preventDefault);
      document.removeEventListener('contextmenu', preventDefault);
      document.removeEventListener('dragstart', preventDefault);
      document.removeEventListener('keydown', blockKeyboardCopy, true);
    };
  }, []);

  return (
    <div className={`${darkMode ? 'min-h-screen bg-black text-gray-200' : 'min-h-screen bg-white text-gray-900'} antialiased`} style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
      <Nav data={resumeData} dark={darkMode} />
      <main>
        <Hero data={resumeData} dark={darkMode} />
        <ExperienceTimeline experiences={resumeData.experiences} dark={darkMode} />
        <Education education={resumeData.education} dark={darkMode} />
        <Projects projects={resumeData.projects} dark={darkMode} />
        <ToolsAndCerts tools={resumeData.tools} certs={resumeData.certifications} awards={resumeData.awards} dark={darkMode} />
        <Contact data={resumeData} dark={darkMode} />
      </main>
      <Footer data={resumeData} dark={darkMode} />
    </div>
  );
}
