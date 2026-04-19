import PrintingPress from './components/PrintingPress';
import Masthead from './components/Masthead';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      {/* Fixed editorial background — printing press */}
      <PrintingPress />

      {/* All content above the background */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Masthead />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
