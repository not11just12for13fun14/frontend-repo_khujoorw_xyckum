import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-sm">
          Adaptive Topic Explorer
        </h1>
        <p className="mt-4 md:mt-6 text-base md:text-xl text-white/80 max-w-3xl mx-auto">
          Real-time, AI-powered insight into why customers reach out. Classify conversations, discover emerging topics, and steer your roadmap with confidence.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 md:gap-4">
          <a href="#demo" className="px-5 py-3 md:px-6 md:py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-200 transition-colors">Try a demo</a>
          <a href="#how" className="px-5 py-3 md:px-6 md:py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors border border-white/20">How it works</a>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.25),transparent_70%)]" />
    </section>
  );
}
