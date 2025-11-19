import { Sparkles, Brain, GitMerge } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Automatic, Intelligent Classification',
    desc: 'As soon as a conversation ends, the AI understands context and maps it to your topics and subtopics.'
  },
  {
    icon: Brain,
    title: 'Dynamic Topic Discovery',
    desc: "If it doesn't fit, it flags and suggests new, relevant topic names to reveal emerging trends."
  },
  {
    icon: GitMerge,
    title: 'Full Programmatic Control',
    desc: 'Manage topics, merge duplicates, and moderate suggestions entirely via API.'
  }
];

export default function Features() {
  return (
    <section id="how" className="relative py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-sm">
              <Icon className="w-6 h-6 text-white" />
              <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-white/70 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
