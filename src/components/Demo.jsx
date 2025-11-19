import { useEffect, useMemo, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Demo() {
  const [topics, setTopics] = useState([]);
  const [transcript, setTranscript] = useState('My package is two weeks late and tracking stopped updating. Can I get a refund?');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const canAnalyze = useMemo(() => transcript.trim().length > 0, [transcript]);

  useEffect(() => {
    fetch(`${API_BASE}/api/topics`).then(r => r.json()).then(setTopics).catch(() => {});
    fetch(`${API_BASE}/api/suggestions?status=pending`).then(r => r.json()).then(setSuggestions).catch(() => {});
  }, []);

  async function analyze() {
    if (!canAnalyze) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${API_BASE}/api/conversations/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript })
      });
      const data = await res.json();
      setResult(data);
      // refresh suggestions list
      fetch(`${API_BASE}/api/suggestions?status=pending`).then(r => r.json()).then(setSuggestions).catch(() => {});
    } catch (e) {
      setResult({ error: 'Failed to analyze' });
    } finally {
      setLoading(false);
    }
  }

  async function seedTopic(name, parent = null) {
    await fetch(`${API_BASE}/api/topics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, parent })
    }).catch(() => {});
    const next = await fetch(`${API_BASE}/api/topics`).then(r => r.json()).catch(() => []);
    setTopics(next);
  }

  async function approveSuggestion(id, parent = null) {
    await fetch(`${API_BASE}/api/suggestions/${id}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ parent })
    });
    const next = await fetch(`${API_BASE}/api/suggestions?status=pending`).then(r => r.json());
    setSuggestions(next);
  }

  return (
    <section id="demo" className="relative py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-white font-semibold">Analyze a conversation</h3>
            <textarea
              value={transcript}
              onChange={e => setTranscript(e.target.value)}
              className="mt-3 w-full h-40 rounded-xl bg-black/30 border border-white/10 text-white p-3 outline-none focus:ring-2 focus:ring-white/30"
              placeholder="Paste a chat transcript here..."
            />
            <button onClick={analyze} disabled={!canAnalyze || loading} className="mt-3 px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold disabled:opacity-50">
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
            {result && (
              <div className="mt-4 text-white/80 text-sm">
                <pre className="whitespace-pre-wrap break-words">{JSON.stringify(result, null, 2)}</pre>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">Topics</h3>
                <button onClick={() => seedTopic('Shipping')} className="text-xs px-3 py-1 rounded-lg bg-white/10 text-white">Seed Shipping</button>
              </div>
              <ul className="mt-3 space-y-2">
                {topics.map(t => (
                  <li key={t.id} className="text-white/80 text-sm flex items-center justify-between">
                    <span>{t.name}{t.parent ? ` → ${t.parent}` : ''}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-white font-semibold">Pending suggestions</h3>
              <ul className="mt-3 space-y-3">
                {suggestions.length === 0 && (
                  <li className="text-white/60 text-sm">No pending suggestions</li>
                )}
                {suggestions.map(s => (
                  <li key={s.id} className="text-white/80 text-sm flex items-center justify-between gap-3">
                    <span className="truncate">{s.name} — <span className="text-white/50">{s.reason}</span></span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => approveSuggestion(s.id)} className="text-xs px-3 py-1 rounded-lg bg-white text-slate-900">Approve</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
