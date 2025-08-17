// App.jsx
import React, { useState, useEffect, useRef } from 'react'
import resumePdf from './assets/resume.pdf'
import emailjs from '@emailjs/browser' // new

/* -------------------------
  Config - update via env
   - SERVICE & TEMPLATE are from your screenshots
   - PUBLIC_KEY should be stored in env: REACT_APP_EMAILJS_PUBLIC_KEY
---------------------------*/
const EMAILJS_SERVICE_ID = 'service_4z33hi3'
const EMAILJS_TEMPLATE_ID = 'template_0dzqbif'
const EMAILJS_PUBLIC_KEY = 'vD1FQ2paQhZ92PXCg'

/* ---------- rest of resumeData unchanged ---------- */
const resumeData = {
  name: 'N Jeevanantham',
  email: 'jeevasatn@gmail.com',
  phone: '+91 98425 98260',
  location: 'Salem, India',
  linkedin: 'https://www.linkedin.com/in/jeevanantham001/',
  github: 'https://github.com/Jeevanantham-N',
  role: 'Adobe Experience Platform Developer',
  summary: 'Adobe-certified engineer driving data-driven solutions using Launch, AEP, Adobe Analytics, Customer Journey Analytics, Real-Time CDP, and Journey Optimizer — delivering clean, actionable insights across platforms.',
  experiences: [ /* ... */ ],
  education: [ /* ... */ ],
  tools: [ /* ... */ ],
  projects: [ /* ... */ ],
  certifications: [ /* ... */ ],
  awards: [ /* ... */ ]
}

/* ----------------- small UI pieces (unchanged) ----------------- */
/* Nav, Hero, SectionTitle, ExperienceTimeline, Projects, ToolsAndCerts, Icons, MailModal, Toast ... */
/* For brevity I kept the previous components mostly identical. Replace or keep them as needed. */

function Nav({ data }) {
  return (
    <header className="sticky top-0 z-40 bg-white/60 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="text-sm font-medium tracking-wide">
          <span className="whitespace-nowrap">{data.name}</span>
        </div>
        <div className="flex gap-4 items-center text-sm">
          <a href="#projects" className="hover:underline">Projects</a>
          <a href="#experience" className="hover:underline">Experience</a>
          <a href="#contact" className="px-3 py-1 rounded-md bg-black text-white">Contact</a>
        </div>
      </nav>
    </header>
  )
}

function Hero({ data }) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
            <span className="whitespace-nowrap">{data.name}</span>
          </h1>
          <p className="mt-3 text-lg text-gray-700 max-w-xl">{data.role}</p>
          <p className="mt-6 text-base text-gray-600 max-w-xl">{data.summary}</p>
          <div className="mt-8 flex gap-3">
            <a href="#contact" className="inline-block px-4 py-2 rounded-md border border-gray-200 text-sm hover:shadow-sm">Contact</a>
            <a href="#projects" className="inline-block px-4 py-2 rounded-md bg-black text-white text-sm">View Projects</a>
            <a href={resumePdf} className="inline-block px-4 py-2 rounded-md border border-gray-200 text-sm" download>Download CV</a>
          </div>
          <div className="mt-6 text-sm text-gray-500">
            <span className="mr-4">{data.location}</span>
            <a className="mr-3 underline" href={data.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="underline" href={data.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="p-8 rounded-2xl border border-gray-100 shadow-sm bg-white">
            <div className="text-xs text-gray-400">Role</div>
            <div className="mt-2 text-xl font-semibold">{data.role}</div>
            <div className="mt-6 text-sm text-gray-600">Certified Adobe Analytics Developer & AEP practitioner. Focused on tracking, schema design, data validation, and migration.</div>
            <div className="mt-6">
              <a href="#contact" className="inline-block px-3 py-2 text-sm rounded-md border">Email</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionTitle({ children }) {
  return <h2 className="text-2xl font-semibold mt-6 mb-4">{children}</h2>
}

function ExperienceTimeline({ experiences }) {
  return (
    <section id="experience" className="max-w-5xl mx-auto px-6 py-8">
      <SectionTitle>Experience</SectionTitle>
      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <article key={idx} className="p-6 border rounded-lg bg-white shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-lg font-medium">{exp.title}</div>
                <div className="text-sm text-gray-500">{exp.company} • {exp.location}</div>
              </div>
              <div className="text-sm text-gray-400">{exp.period}</div>
            </div>
            <ul className="mt-3 list-disc list-inside text-gray-600 space-y-1">
              {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

function Projects({ projects }) {
  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-8">
      <SectionTitle>Projects</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <article key={i} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{p.title}</h3>
              <div className="text-sm text-gray-400">{p.tech.join(' • ')}</div>
            </div>
            <p className="mt-3 text-gray-600">{p.desc}</p>
            <div className="mt-4">
              <a href={p.repo} target="_blank" rel="noreferrer" className="text-sm underline">View repo</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ToolsAndCerts({ tools, certs, awards }) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <SectionTitle>Tools & Technology</SectionTitle>
          <ul className="space-y-1 text-gray-600">
            {tools.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
        <div>
          <SectionTitle>Certifications</SectionTitle>
          <ul className="space-y-1 text-gray-600">
            {certs.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
        <div>
          <SectionTitle>Awards</SectionTitle>
          <ul className="space-y-1 text-gray-600">
            {awards.map((a, i) => (
              <li key={i}>
                <strong>{a.title}</strong>
                <div className="text-sm text-gray-500">{a.org}{a.period ? ` — ${a.period}` : ''}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function MailIcon() {
  return (
    <svg className="w-5 h-5 inline" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 7.5v9A2.5 2.5 0 0 0 5.5 19h13a2.5 2.5 0 0 0 2.5-2.5v-9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 7.5l-9 6-9-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5 inline" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M22 16.92V21a1 1 0 0 1-1.08 1A19 19 0 0 1 3 5.08 1 1 0 0 1 4 4h4.09a1 1 0 0 1 1 .75c.12.7.32 1.37.6 2a1 1 0 0 1-.24 1.04l-1.5 1.5a16 16 0 0 0 6.6 6.6l1.5-1.5a1 1 0 0 1 1.04-.24c.64.28 1.32.48 2 .6a1 1 0 0 1 .75 1V21z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* Accessible fallback modal used in both EmailLink and Contact fallback */
function MailModal({ title, mailto, email, onClose, onCopy }) {
  const modalRef = useRef(null)
  useEffect(()=>{ if(modalRef.current) modalRef.current.focus() }, [])
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center px-4 pb-6 md:pb-0">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div ref={modalRef} tabIndex={-1} className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl ring-1 ring-gray-200">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="mt-2 text-sm text-gray-600">If automatic sending failed, copy the email or mailto below and paste it into your mail client.</p>
          </div>
          <button onClick={onClose} className="ml-4 text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="mt-4 space-y-3">
          <div className="text-sm text-gray-700 break-all">{email}</div>
          <div className="flex gap-3">
            <button className="px-3 py-2 rounded-full bg-gray-100 text-sm" onClick={()=>onCopy(email)}>Copy email</button>
            <button className="px-3 py-2 rounded-full bg-gray-100 text-sm" onClick={()=>onCopy(mailto)}>Copy mailto</button>
            <a href={mailto} className="ml-auto px-3 py-2 rounded-full bg-black text-white text-sm">Open mail app</a>
          </div>
        </div>
      </div>
    </div>
  )
}

function Toast({ message }) {
  if (!message) return null
  return (
    <div className="fixed right-6 bottom-6 bg-black text-white px-4 py-2 rounded-md shadow-lg text-sm">{message}</div>
  )
}

/* --------------------- CONTACT component with EmailJS --------------------- */
function Contact({ data }) {
  const [name, setName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [subject, setSubject] = useState('Portfolio Contact')
  const [message, setMessage] = useState('')
  const [toast, setToast] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [validationError, setValidationError] = useState(null)
  const [attempts, setAttempts] = useState(0)

  useEffect(()=>{
    // Initialize EmailJS if public key present
    if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY_HERE') {
      try {
        emailjs.init(EMAILJS_PUBLIC_KEY)
      } catch (err) {
        // ignore - init may already be done by send call
      }
    }
  }, [])

  function validEmail(e) {
    if (!e) return false
    // simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
  }

  function timeout(ms) {
    return new Promise((_, reject) => setTimeout(()=> reject(new Error('timeout')), ms))
  }

  async function sendWithRetry(templateParams, maxAttempts = 3) {
    let attempt = 0
    const timeoutMs = 10000 // 10s per attempt
    while (attempt < maxAttempts) {
      attempt++
      setAttempts(attempt)
      try {
        // race between emailjs send and timeout to avoid hanging
        await Promise.race([
          emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams),
          timeout(timeoutMs)
        ])
        return { ok: true, attempt }
      } catch (err) {
        // exponential backoff before retry
        if (attempt < maxAttempts) {
          const backoff = 800 * Math.pow(2, attempt - 1) // 800ms, 1600ms, ...
          await new Promise(res => setTimeout(res, backoff))
          continue
        } else {
          return { ok: false, attempt, error: err }
        }
      }
    }
  }

  async function sendEmail(e) {
    e && e.preventDefault()
    setValidationError(null)

    // validation
    if (!message.trim()) {
      setValidationError('Please enter a message.')
      setToast('Please enter a message.')
      setTimeout(()=>setToast(null), 2500)
      return
    }
    if (!name.trim()) {
      setValidationError('Please enter your name.')
      setToast('Please enter your name.')
      setTimeout(()=>setToast(null), 2500)
      return
    }
    if (!validEmail(userEmail)) {
      setValidationError('Please enter a valid email address.')
      setToast('Please enter a valid email address.')
      setTimeout(()=>setToast(null), 2500)
      return
    }

    setIsSending(true)
    setToast('Sending...')

    const templateParams = {
      name: name,
      email: userEmail,
      to_email: data.email, // if your template accepts
      title:subject,
      message
    }

    try {
      // If PUBLIC_KEY not set, short-circuit to fallback (avoid sending with missing key)
      if (!EMAILJS_PUBLIC_KEY || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY_HERE') {
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
        setTimeout(()=>setToast(null), 3500)
      } else {
        throw result.error || new Error('Failed to send after retries')
      }
    } catch (err) {
      // final fallback: present mailto modal with prefilled body for manual send
      const mailto = `mailto:${data.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${userEmail}\n\n${message}`)}`
      setToast('Automatic send failed — showing manual fallback.')
      setShowModal(true)
      setIsSending(false)
      setTimeout(()=>setToast(null), 3000)
      console.error('Email send error:', err)
    }
  }

  return (
    <section id="contact" className="max-w-5xl mx-auto px-6 py-12">
      <SectionTitle>Contact</SectionTitle>
      <div className="p-6 border rounded-lg max-w-xl bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <MailIcon />
          <a href={`mailto:${data.email}`} className="underline">{data.email}</a>
        </div>
        <div className="flex items-center gap-4 mt-3">
          <PhoneIcon />
          <a href={`tel:${data.phone}`} className="underline">{data.phone}</a>
        </div>

        <form className="mt-6" onSubmit={sendEmail}>
          <label className="block text-sm text-gray-700" htmlFor="name">Your name</label>
          <input id="name" className="w-full mt-2 p-3 border rounded-md" value={name} onChange={(e)=>{setName(e.target.value); setValidationError(null); setToast(null)}} />

          <label className="block text-sm text-gray-700 mt-3" htmlFor="email">Your email</label>
          <input id="email" type="email" className="w-full mt-2 p-3 border rounded-md" value={userEmail} onChange={(e)=>{setUserEmail(e.target.value); setValidationError(null); setToast(null)}} />

          <label className="block text-sm text-gray-700 mt-3" htmlFor="subject">Subject</label>
          <input id="subject" className="w-full mt-2 p-3 border rounded-md" value={subject} onChange={(e)=>setSubject(e.target.value)} />

          <label className="block text-sm text-gray-700 mt-3" htmlFor="msg">Message</label>
          <textarea id="msg" className="w-full mt-2 p-3 border rounded-md" rows={6} value={message} onChange={(e)=>{setMessage(e.target.value); setValidationError(null); setToast(null)}} />

          {validationError && <div className="text-sm text-red-600 mt-2">{validationError}</div>}

          <div className="mt-3 flex items-center gap-3">
            <button type="submit" disabled={isSending} className={`px-4 py-2 rounded-full ${isSending ? 'bg-gray-200 text-gray-500' : 'bg-black text-white'} shadow-sm`}>
              {isSending ? `Sending${attempts ? ` (attempt ${attempts})` : '...'}` : 'Send message'}
            </button>

            <button type="button" className="px-4 py-2 rounded-full bg-gray-100 text-sm" onClick={()=>{
              // quick copy of email address
              if (navigator.clipboard) {
                navigator.clipboard.writeText(data.email).then(()=> setToast('Email copied to clipboard'))
              } else {
                setToast('Copy not supported')
              }
              setTimeout(()=>setToast(null), 2000)
            }}>Copy email</button>

            <div className="text-sm text-gray-500 ml-auto">Secure via EmailJS</div>
          </div>
        </form>

        <Toast message={toast} />

        {showModal && (
          <MailModal
            title="Manual send — fallback"
            mailto={`mailto:${data.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${userEmail}\n\n${message}`)}`}
            email={data.email}
            onClose={() => setShowModal(false)}
            onCopy={(txt)=>{
              if (navigator.clipboard) navigator.clipboard.writeText(txt)
              setToast('Copied to clipboard')
              setTimeout(()=>setToast(null), 2000)
            }}
          />
        )}
      </div>
    </section>
  )
}

function Footer({ data }) {
  return (
    <footer className="mt-12 border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-6 text-sm text-gray-500 flex items-center justify-between">
        <div>© {new Date().getFullYear()} <span className="whitespace-nowrap">{data.name}</span></div>
        <div>
          <a className="mr-4 underline" href={data.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="underline" href={data.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const data = resumeData
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}>
      <Nav data={data} />
      <main>
        <Hero data={data} />
        <ExperienceTimeline experiences={data.experiences} />
        <Projects projects={data.projects} />
        <ToolsAndCerts tools={data.tools} certs={data.certifications} awards={data.awards} />
        <Contact data={data} />
      </main>
      <Footer data={data} />
    </div>
  )
}