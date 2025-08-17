// App.jsx
import React, { useState, useEffect, useRef } from 'react'
import resumePdf from './assets/resume.pdf'
import emailjs from '@emailjs/browser'

/* -------------------------
  Config - update via env
   - SERVICE & TEMPLATE are from your screenshots
   - PUBLIC_KEY should be stored in env: REACT_APP_EMAILJS_PUBLIC_KEY
---------------------------*/
const EMAILJS_SERVICE_ID = 'service_4z33hi3'
const EMAILJS_TEMPLATE_ID = 'template_0dzqbif'
const EMAILJS_PUBLIC_KEY = 'vD1FQ2paQhZ92PXCg'

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
    'Java'
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
    'Adobe Certified Expert - Adobe Analytics Developer',
    'Adobe Certified Expert - Adobe Analytics Business Practitioner',
    'Oracle Certified Java Professional (OCA)',
    'Virtusa Certified GenAI Assisted Engineer'
  ],
  awards: [
    'Extra Mile Award - Virtusa (01/2024 - 04/2024): Recognized with the prestigious \'Extra Mile Award\' for consistently exceeding expectations and delivering outstanding performance within my team.',
    'Gold badge from Hackerrank: Have got a Gold badge from Hackerrank by solved 100+ problems.'
  ]
}

function Nav({ data, theme, toggleTheme }) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100/50 dark:border-gray-800/50">
      <nav className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between text-base font-medium">
        <div className="tracking-wide text-gray-900 dark:text-gray-100">
          {data.name}
        </div>
        <div className="flex gap-8 items-center">
          <a href="#projects" className="hover:opacity-60 transition-opacity text-gray-900 dark:text-gray-100">Projects</a>
          <a href="#experience" className="hover:opacity-60 transition-opacity text-gray-900 dark:text-gray-100">Experience</a>
          <a href="#contact" className="px-4 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-opacity">Contact</a>
          <button onClick={toggleTheme} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>
    </header>
  )
}

function Hero({ data }) {
  return (
    <section className="max-w-7xl mx-auto px-8 py-32 bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <h1 className="text-6xl lg:text-8xl font-bold leading-none tracking-tight">
            {data.name}
          </h1>
          <p className="text-2xl text-gray-800 dark:text-gray-200">{data.role}</p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">{data.summary}</p>
          <div className="flex gap-4">
            <a href="#contact" className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-base hover:shadow-md transition-shadow">Contact</a>
            <a href="#projects" className="px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black text-base hover:opacity-90 transition-opacity">View Projects</a>
            <a href={resumePdf} download className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-base hover:shadow-md transition-shadow">Download CV</a>
          </div>
          <div className="text-base text-gray-500 dark:text-gray-500 flex gap-4">
            <span>{data.location}</span>
            <a href={data.linkedin} target="_blank" rel="noreferrer" className="underline hover:opacity-60 transition-opacity">LinkedIn</a>
            <a href={data.github} target="_blank" rel="noreferrer" className="underline hover:opacity-60 transition-opacity">GitHub</a>
          </div>
        </div>
        <div className="hidden lg:block sticky top-32">
          <div className="p-10 rounded-3xl bg-white dark:bg-gray-900 shadow-lg border border-gray-100/50 dark:border-gray-800/50">
            <div className="text-sm text-gray-500 uppercase tracking-wide">Role</div>
            <div className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">{data.role}</div>
            <div className="mt-6 text-base text-gray-600 dark:text-gray-400 leading-relaxed">Certified Adobe Analytics Developer & AEP practitioner. Focused on tracking, schema design, data validation, and migration.</div>
            <div className="mt-8">
              <a href="#contact" className="px-5 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 text-base hover:shadow-md transition-shadow">Email</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionTitle({ children }) {
  return <h2 className="text-3xl font-bold tracking-tight mb-8 text-gray-900 dark:text-gray-100">{children}</h2>
}

function ExperienceTimeline({ experiences }) {
  return (
    <section id="experience" className="max-w-7xl mx-auto px-8 py-16 bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <SectionTitle>Experience</SectionTitle>
      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <article key={idx} className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              <div>
                <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">{exp.title}</div>
                <div className="text-base text-gray-500 dark:text-gray-400">{exp.company} • {exp.location}</div>
              </div>
              <div className="text-base text-gray-400 dark:text-gray-500">{exp.period}</div>
            </div>
            <ul className="mt-6 space-y-4 text-gray-600 dark:text-gray-300 text-base leading-relaxed list-disc pl-5">
              {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

function Education({ education }) {
  return (
    <section id="education" className="max-w-7xl mx-auto px-8 py-16 bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <SectionTitle>Education</SectionTitle>
      <div className="space-y-8">
        {education.map((edu, idx) => (
          <article key={idx} className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              <div>
                <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">{edu.degree}</div>
                <div className="text-base text-gray-500 dark:text-gray-400">{edu.institution}</div>
              </div>
              <div className="text-base text-gray-400 dark:text-gray-500">{edu.period}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Projects({ projects }) {
  return (
    <section id="projects" className="max-w-7xl mx-auto px-8 py-16 bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <SectionTitle>Projects</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <article key={i} className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{p.title}</h3>
              <div className="text-base text-gray-400 dark:text-gray-500">{p.tech.join(' • ')}</div>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-base leading-relaxed">{p.desc}</p>
            <div className="mt-6 flex gap-4">
              {p.repo.map((r, j) => (
                <a key={j} href={r} target="_blank" rel="noreferrer" className="text-base underline hover:opacity-60 transition-opacity">View repo {p.repo.length > 1 ? j + 1 : ''}</a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ToolsAndCerts({ tools, certs, awards }) {
  return (
    <section className="max-w-7xl mx-auto px-8 py-16 bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <SectionTitle>Tools & Technology</SectionTitle>
          <div className="flex flex-wrap gap-3">
            {tools.map((t, i) => (
              <span key={i} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-base font-medium text-gray-800 dark:text-gray-200">{t}</span>
            ))}
          </div>
        </div>
        <div>
          <SectionTitle>Certifications</SectionTitle>
          <ul className="space-y-4 text-gray-600 dark:text-gray-300 text-base leading-relaxed">
            {certs.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
        <div>
          <SectionTitle>Awards</SectionTitle>
          <ul className="space-y-4 text-gray-600 dark:text-gray-300 text-base leading-relaxed">
            {awards.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}

function MailIcon() {
  return <span className="text-xl">✉️</span>
}

function PhoneIcon() {
  return <span className="text-xl">📞</span>
}

function Toast({ message }) {
  if (!message) return null
  return <div className="fixed bottom-8 right-8 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-6 py-3 rounded-full shadow-lg">{message}</div>
}

function MailModal({ title, mailto, email, onClose, onCopy }) {
  const body = new URLSearchParams(mailto.split('?')[1]).get('body') || ''
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl max-w-md w-full shadow-2xl text-gray-900 dark:text-gray-100">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Click to open your email app, or copy the text below.</p>
        <a href={mailto} className="block mb-4 px-6 py-3 bg-blue-600 text-white rounded-full text-center hover:opacity-90 transition-opacity">Open Email</a>
        <button onClick={() => onCopy(decodeURIComponent(body))} className="block w-full mb-4 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-full hover:shadow-md transition-shadow">Copy Message</button>
        <button onClick={onClose} className="block w-full px-6 py-3 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Close</button>
      </div>
    </div>
  )
}

function Contact({ data }) {
  const form = useRef()
  const [name, setName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [message, setMessage] = useState('')
  const [subject, setSubject] = useState('Portfolio Contact')
  const [isSending, setIsSending] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [toast, setToast] = useState(null)
  const [validationError, setValidationError] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY)
  }, [])

  const validEmail = (email) => /\S+@\S+\.\S+/.test(email)
  const validName = (name) => name.trim().length > 0

  async function sendWithRetry(templateParams, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      setAttempts(attempt)
      try {
        const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        if (response.status === 200) {
          setAttempts(0)
          return { ok: true }
        }
      } catch (err) {
        console.warn(`Attempt ${attempt} failed:`, err)
        if (attempt === maxRetries) {
          setAttempts(0)
          return { ok: false, error: err }
        }
      }
    }
  }

  const sendEmail = async (e) => {
    e.preventDefault()
    if (!validName(name)) {
      setValidationError('Please enter your name.')
      setToast('Please enter your name.')
      setTimeout(() => setToast(null), 2500)
      return
    }
    if (!validEmail(userEmail)) {
      setValidationError('Please enter a valid email address.')
      setToast('Please enter a valid email address.')
      setTimeout(() => setToast(null), 2500)
      return
    }

    setIsSending(true)
    setToast('Sending...')

    const templateParams = {
      name: name,
      email: userEmail,
      to_email: data.email,
      title: subject,
      message
    }

    try {
      if (!EMAILJS_PUBLIC_KEY) {
        throw new Error('EmailJS public key not configured. Set REACT_APP_EMAILJS_PUBLIC_KEY in env.')
      }

      const result = await sendWithRetry(templateParams, 3)
      if (result.ok) {
        setToast('Message sent — thank you! I will reply soon.')
        setName('')
        setUserEmail('')
        setMessage('')
        setSubject('Portfolio Contact')
        setIsSending(false)
        setTimeout(() => setToast(null), 3500)
      } else {
        throw result.error || new Error('Failed to send after retries')
      }
    } catch (err) {
      const mailto = `mailto:${data.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${userEmail}\n\n${message}`)}`
      setToast('Automatic send failed — showing manual fallback.')
      setShowModal(true)
      setIsSending(false)
      setTimeout(() => setToast(null), 3000)
      console.error('Email send error:', err)
    }
  }

  return (
    <section id="contact" className="max-w-7xl mx-auto px-8 py-16 bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <SectionTitle>Contact</SectionTitle>
      <div className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 shadow-md max-w-2xl">
        <div className="flex items-center gap-4 mb-4">
          <MailIcon />
          <a href={`mailto:${data.email}`} className="text-base underline hover:opacity-60 transition-opacity">{data.email}</a>
        </div>
        <div className="flex items-center gap-4 mb-8">
          <PhoneIcon />
          <a href={`tel:${data.phone}`} className="text-base underline hover:opacity-60 transition-opacity">{data.phone}</a>
        </div>

        <form ref={form} className="space-y-6" onSubmit={sendEmail}>
          <div>
            <label className="block text-base text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">Your name</label>
            <input id="name" className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-black dark:focus:border-white bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors" value={name} onChange={(e) => { setName(e.target.value); setValidationError(null); setToast(null) }} />
          </div>
          <div>
            <label className="block text-base text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">Your email</label>
            <input id="email" type="email" className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-black dark:focus:border-white bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors" value={userEmail} onChange={(e) => { setUserEmail(e.target.value); setValidationError(null); setToast(null) }} />
          </div>
          <div>
            <label className="block text-base text-gray-700 dark:text-gray-300 mb-2" htmlFor="subject">Subject</label>
            <input id="subject" className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-black dark:focus:border-white bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div>
            <label className="block text-base text-gray-700 dark:text-gray-300 mb-2" htmlFor="msg">Message</label>
            <textarea id="msg" className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-black dark:focus:border-white bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors" rows={6} value={message} onChange={(e) => { setMessage(e.target.value); setValidationError(null); setToast(null) }} />
          </div>
          {validationError && <div className="text-base text-red-600 dark:text-red-400">{validationError}</div>}
          <div className="flex items-center gap-4">
            <button type="submit" disabled={isSending} className={`px-6 py-3 rounded-full text-base shadow-md transition-opacity ${isSending ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400' : 'bg-black text-white dark:bg-white dark:text-black hover:opacity-90'}`}>
              {isSending ? `Sending${attempts ? ` (attempt ${attempts})` : '...'}` : 'Send message'}
            </button>
            <button type="button" className="px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-base hover:shadow-md transition-shadow" onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(data.email).then(() => setToast('Email copied to clipboard'))
              } else {
                setToast('Copy not supported')
              }
              setTimeout(() => setToast(null), 2000)
            }}>Copy email</button>
            <div className="text-base text-gray-500 dark:text-gray-400 ml-auto">Secure via EmailJS</div>
          </div>
        </form>

        <Toast message={toast} />

        {showModal && (
          <MailModal
            title="Manual send — fallback"
            mailto={`mailto:${data.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${userEmail}\n\n${message}`)}`}
            email={data.email}
            onClose={() => setShowModal(false)}
            onCopy={(txt) => {
              if (navigator.clipboard) navigator.clipboard.writeText(txt)
              setToast('Copied to clipboard')
              setTimeout(() => setToast(null), 2000)
            }}
          />
        )}
      </div>
    </section>
  )
}

function Footer({ data }) {
  return (
    <footer className="border-t border-gray-100/50 dark:border-gray-800/50 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-8 py-8 text-base text-gray-500 dark:text-gray-400 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} {data.name}</div>
        <div className="flex gap-6">
          <a href={data.linkedin} target="_blank" rel="noreferrer" className="underline hover:opacity-60 transition-opacity">LinkedIn</a>
          <a href={data.github} target="_blank" rel="noreferrer" className="underline hover:opacity-60 transition-opacity">GitHub</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const data = resumeData
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 antialiased transition-colors duration-300" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
      <Nav data={data} theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero data={data} />
        <ExperienceTimeline experiences={data.experiences} />
        <Education education={data.education} />
        <Projects projects={data.projects} />
        <ToolsAndCerts tools={data.tools} certs={data.certifications} awards={data.awards} />
        <Contact data={data} />
      </main>
      <Footer data={data} />
    </div>
  )
}