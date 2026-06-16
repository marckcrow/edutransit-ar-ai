'use client';

import { useState } from 'react';
import { Search, ChevronRight, ChevronDown, BookOpen } from 'lucide-react';
import { trafficSigns, horizontalSignals } from '@/data/signs';
import { ctbChapters, ctbSummary } from '@/data/ctb';
import { TrafficSign } from '@/types';

const CATS = [
  { id: 'all', label: 'Todas', icon: '🌐' },
  { id: 'regulamentacao', label: 'Regulamentação', icon: '🛑' },
  { id: 'advertencia',   label: 'Advertência',    icon: '⚠️' },
  { id: 'indicacao',    label: 'Indicação',       icon: 'ℹ️' },
  { id: 'horizontal',   label: 'Horizontal',       icon: '📏' },
  { id: 'seguranca',    label: 'Segurança',       icon: '🛡️' },
];

const SIGN_ICONS: Record<string, string> = {
  regulamentacao: '🛑', advertencia: '⚠️', indicacao: 'ℹ️', horizontal: '📏', seguranca: '🛡️',
};

export default function LibraryPage() {
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const [sign, setSign] = useState<TrafficSign | null>(null);
  const [showCTB, setShowCTB] = useState(false);
  const [chapter, setChapter] = useState<string | null>(null);

  const filtered = trafficSigns.filter(s =>
    (cat === 'all' || s.category === cat) &&
    (q === '' || s.name.toLowerCase().includes(q.toLowerCase()) || s.description.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Header */}
      <header className="bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">📚</span>
              <div>
                <h1 className="font-bold text-sm">Biblioteca</h1>
                <p className="text-xs text-blue-400">{trafficSigns.length} placas catalogadas</p>
              </div>
            </div>
            <button onClick={() => setShowCTB(!showCTB)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${showCTB ? 'bg-blue-600 text-white' : 'bg-white/10 text-slate-400'}`}>
              📖 CTB
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
            <input type="text" placeholder="Buscar placa..." value={q} onChange={e => setQ(e.target.value)} className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50" aria-label="Buscar placa" />
          </div>
        </div>
      </header>

      {showCTB ? (
        <div className="max-w-xl mx-auto px-4 py-4 space-y-4">
          <div className="text-center mb-2">
            <h2 className="text-xl font-black">Código de Trânsito Brasileiro</h2>
            <p className="text-slate-400 text-sm">Lei 9.503/1997</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {ctbSummary.map(item => (
              <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl p-3">
                <p className="text-xs text-slate-400">{item.label}</p>
                <p className="font-bold text-sm mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
          {ctbChapters.map(ch => (
            <div key={ch.chapter} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <button onClick={() => setChapter(chapter === ch.chapter ? null : ch.chapter)} className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 transition-all">
                <div>
                  <p className="text-xs text-blue-400 font-semibold">Capítulo {ch.chapter}</p>
                  <p className="font-semibold text-sm">{ch.title}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${chapter === ch.chapter ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              {chapter === ch.chapter && (
                <div className="px-4 pb-4 space-y-2">
                  {ch.articles.map(art => (
                    <div key={art.article} className="bg-white/5 rounded-lg p-3">
                      <p className="text-xs text-blue-400 font-semibold mb-1">{art.article}</p>
                      <p className="text-sm text-slate-300">{art.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Sinalização Horizontal</h3>
            <div className="space-y-2">
              {horizontalSignals.map(sig => (
                <div key={sig.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-lg flex-shrink-0">📏</div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{sig.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{sig.description}</p>
                      <p className="text-xs text-yellow-400 mt-1">→ {sig.meaning}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="max-w-xl mx-auto px-4 pt-3">
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {CATS.map(c => (
                <button key={c.id} onClick={() => setCat(c.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${cat === c.id ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400'}`}>
                  <span>{c.icon}</span> {c.label}
                </button>
              ))}
            </div>
          </div>
          <div className="max-w-xl mx-auto px-4 py-4">
            <p className="text-xs text-slate-400 mb-3">{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</p>
            <div className="space-y-3">
              {filtered.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setSign(s)}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 text-left transition-all flex items-center gap-4 animate-slide-up"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: s.category === 'regulamentacao' ? '#EF444420' : s.category === 'advertencia' ? '#FACC1520' : s.category === 'indicacao' ? '#2563EB20' : '#FFFFFF10' }}>
                    {SIGN_ICONS[s.category] || '📋'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">{s.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{s.description}</p>
                    {s.ctbArticle && <span className="text-xs text-blue-400 mt-1 block">{s.ctbArticle}</span>}
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Sign detail modal */}
      {sign && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto" onClick={() => setSign(null)}>
          <div className="max-w-xl mx-auto px-4 py-6" onClick={e => e.stopPropagation()}>
            <div className="bg-[#1E293B] border border-white/10 rounded-3xl overflow-hidden animate-scale-in">
              <div className="p-5 text-center" style={{ background: sign.category === 'regulamentacao' ? 'linear-gradient(135deg, #7F1D1D, #991B1B)' : sign.category === 'advertencia' ? 'linear-gradient(135deg, #78350F, #92400E)' : 'linear-gradient(135deg, #1E3A5F, #1E40AF)' }}>
                <div className="text-5xl mb-2">{SIGN_ICONS[sign.category] || '📋'}</div>
                <h2 className="text-xl font-black">{sign.name}</h2>
                <p className="text-sm opacity-70 mt-1 capitalize">{sign.category}</p>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-xs text-blue-400 font-semibold uppercase mb-1">Descrição</p>
                  <p className="text-sm text-slate-300">{sign.description}</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
                  <p className="text-xs text-blue-400 font-semibold uppercase mb-1">Significado</p>
                  <p className="text-sm text-slate-200">{sign.meaning}</p>
                </div>
                {sign.usage && <div><p className="text-xs text-slate-400 font-semibold uppercase mb-1">Onde é utilizada</p><p className="text-sm text-slate-300">{sign.usage}</p></div>}
                {sign.tips && <div><p className="text-xs text-yellow-400 font-semibold uppercase mb-2">💡 Dicas</p><ul className="space-y-1">{sign.tips.map((t, i) => <li key={i} className="flex items-start gap-2 text-sm text-slate-300"><span className="text-yellow-400 flex-shrink-0">✓</span> {t}</li>)}</ul></div>}
                {sign.penalty && <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3"><p className="text-xs text-red-400 font-semibold uppercase mb-1">⚖️ Penalidade</p><p className="text-sm text-red-200">{sign.penalty}</p></div>}
                {sign.curiosities && <div><p className="text-xs text-purple-400 font-semibold uppercase mb-2">🤔 Curiosidades</p>{sign.curiosities.map((c, i) => <p key={i} className="text-sm text-slate-300 mb-1">• {c}</p>)}</div>}
                {sign.ctbArticle && <div className="flex items-center gap-2 text-sm text-slate-400 bg-white/5 rounded-lg px-3 py-2"><BookOpen className="w-4 h-4 text-blue-400" aria-hidden="true" /> Base legal: <span className="text-blue-400 font-semibold">{sign.ctbArticle}</span></div>}
              </div>
              <div className="px-5 pb-5">
                <button onClick={() => setSign(null)} className="w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold py-3 rounded-xl transition-all text-sm">Fechar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-24" />
    </div>
  );
}
