import Hero from './components/Hero';
import Features from './components/Features';
import Demo from './components/Demo';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Hero />
      <Features />
      <Demo />
      <footer className="py-10 text-center text-white/60 text-sm">Built with adaptive AI insight</footer>
    </div>
  );
}

export default App
