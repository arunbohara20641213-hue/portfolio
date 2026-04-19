export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="relative z-10"
      style={{
        background: 'var(--ink)',
        color: 'var(--paper)',
        borderTop: '3px solid var(--ink)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-end">
          {/* Logotype */}
          <div>
            <p
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.5rem',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                color: 'var(--paper)',
                lineHeight: 1,
                marginBottom: '0.4rem',
              }}
            >
              Arun Bohara
            </p>
            <p className="byline" style={{ color: '#666' }}>
              Software Developer · Kathmandu, Nepal
            </p>
          </div>

          {/* Centre */}
          <div className="text-center">
            <p className="kicker" style={{ color: '#444', marginBottom: '0.3rem' }}>
              The Arun Bohara Chronicle
            </p>
            <p className="byline" style={{ color: '#444' }}>
              Vol. I · {year}
            </p>
          </div>

          {/* Right — links */}
          <div className="flex gap-8 md:justify-end">
            <a
              href="https://github.com/arunbohara20641213-hue"
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover kicker"
              style={{ color: '#888' }}
            >
              GitHub
            </a>
            <a href="#about" className="link-hover kicker" style={{ color: '#888' }}>About</a>
            <a href="#contact" className="link-hover kicker" style={{ color: '#888' }}>Contact</a>
          </div>
        </div>

        {/* Bottom rule */}
        <div style={{ borderTop: '1px solid #1a1a1a', marginTop: '2.5rem', paddingTop: '1.5rem' }}>
          <p className="byline" style={{ color: '#444', textAlign: 'center' }}>
            © {year} Arun Bohara · Built with React, Vite &amp; Framer Motion · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
