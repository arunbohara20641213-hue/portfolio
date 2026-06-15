import { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { LineWipe, ScrambleText, StaggerWords } from './TextAnimations';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
      console.error('Email submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: 'Name', name: 'name', type: 'text', placeholder: 'Your name' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'your@email.com' },
  ];

  return (
    <section
      id="contact"
      className="relative z-10"
      style={{ borderTop: '3px solid var(--ink)', paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <div className="flex items-center gap-4 mb-10">
            <span className="kicker">Contact</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--rule)' }} />
            <span className="byline"><ScrambleText text="§ 05" delay={0.2} /></span>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Left col */}
          <Reveal delay={0.05}>
            <LineWipe delay={0.05} style={{ marginBottom: '2rem' }}>
              <h2 className="headline-lg" style={{ maxWidth: '14ch' }}>Send a Dispatch</h2>
            </LineWipe>
            <StaggerWords
              text="Whether you have a job offer, a collaboration in mind, or just want to talk about a problem worth solving — the wire is open. Serious inquiries only."
              tag="p"
              className="byline"
              style={{ lineHeight: 1.9, maxWidth: '42ch', marginBottom: '2.5rem', display: 'block' }}
              delay={0.2}
            />
            {[
              { label: 'Based in', val: 'Kathmandu, Nepal · Remote worldwide' },
              { label: 'GitHub',   val: null },
            ].map((item, i) => (
              <div key={i} style={{ borderTop: '1px solid var(--rule)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
                <p className="kicker mb-2">
                  <ScrambleText text={item.label} delay={0.4 + i * 0.15} />
                </p>
                {item.val ? (
                  <p className="byline" style={{ lineHeight: 1.8 }}>{item.val}</p>
                ) : (
                  <a
                    href="https://github.com/arunbohara20641213-hue"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-hover byline"
                    style={{ display: 'inline-block' }}
                  >
                    github.com/arunbohara20641213-hue ↗
                  </a>
                )}
              </div>
            ))}
          </Reveal>

          {/* Right col — form */}
          <Reveal delay={0.15}>
            {sent ? (
              <div style={{ paddingTop: '2rem' }}>
                <LineWipe delay={0}>
                  <p className="headline-md" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', marginBottom: '1rem' }}>
                    Message received.
                  </p>
                </LineWipe>
                <StaggerWords
                  text="Thank you for reaching out. A response will follow if the matter is worth pursuing."
                  tag="p"
                  className="byline"
                  style={{ lineHeight: 1.8, display: 'block', marginBottom: '2rem' }}
                  delay={0.4}
                />
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: '', email: '', message: '' });
                  }}
                  className="press-btn"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      padding: '1rem',
                      backgroundColor: '#fee',
                      borderLeft: '3px solid #c00',
                      borderRadius: '4px',
                    }}
                  >
                    <p style={{ color: '#c00', fontSize: '0.95rem', margin: 0 }}>Error: {error}</p>
                  </motion.div>
                )}
                {fields.map((f, fi) => (
                  <motion.div
                    key={f.name}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + fi * 0.1 }}
                  >
                    <label className="kicker" style={{ display: 'block', marginBottom: '0.5rem' }}>{f.label}</label>
                    <input
                      className="press-input"
                      type={f.type}
                      name={f.name}
                      value={form[f.name]}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      required
                      disabled={loading}
                    />
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <label className="kicker" style={{ display: 'block', marginBottom: '0.5rem' }}>Message</label>
                  <textarea
                    className="press-input"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What's on your mind?"
                    rows={4}
                    required
                    disabled={loading}
                    style={{ resize: 'none' }}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <button type="submit" className="press-btn" disabled={loading}>
                    {loading ? 'Sending...' : 'Transmit Message'}
                  </button>
                </motion.div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
