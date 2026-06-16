'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Shield, AlertTriangle, Info, Tag, BookOpen, ChevronDown } from 'lucide-react';
import { trafficSigns, horizontalSignals } from '@/data/signs';
import { ctbChapters, ctbSummary } from '@/data/ctb';
import { TrafficSign } from '@/types';

const categories = [
  { id: 'all', label: 'Todas', icon: '🌐', color: 'bg-slate-600/30' },
  { id: 'regulamentacao', label: 'Regulamentação', icon: '🛑', color: 'bg-red-500/30' },
  { id: 'advertencia', label: 'Advertência', icon: '⚠️', color: 'bg-yellow-500/30' },
  { id: 'indicacao', label: 'Indicação', icon: 'ℹ️', color: 'bg-blue-500/30' },
  { id: 'horizontal', label: 'Horizontal', icon: '📏', color: 'bg-white/10' },
  { id: 'seguranca', label: 'Segurança', icon: '🛡️', color: 'bg-green-500/30' },
];

const CATEGORY_ICONS: Record<string, string> = {
  regulamentacao: '🛑',
  advertencia: '⚠️',
  indicacao: 'ℹ️',
  horizontal: '📏',
  seguranca: '🛡️',
};

export default function LibraryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSign, setSelectedSign] = useState<TrafficSign | null>(null);
  const [showCTB, setShowCTB] = useState(false);
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  const filteredSigns = trafficSigns.filter(sign => {
    const matchesCategory = activeCategory === 'all' || sign.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      sign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sign.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Header */}
      <header className="bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">📚</span>
              <div>
                <h1 className="font-bold text-sm">Biblioteca</h1>
                <p className="text-xs text-blue-400">Nossas placas e sinalizações</p>
              </div>
            </div>
            <button
              onClick={() => setShowCTB(!showCTB)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${showCTB ? 'bg-blue-600 text-white' : 'bg-white/10 text-slate-400'}`}
            >
              📖 CTB
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar placa, sinalização..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50"
            />
          </div>
        </div>
      </header>

      {showCTB ? (
        /* CTB Content */
        <div className="max-w-xl mx-auto px-4 py-4">
          <div className="text-center mb-6">
            <h2 className="text-xl font-black mb-1">Código de Trânsito Brasileiro</h2>
            <p className="text-slate-400 text-sm">Resumo do CTB — Lei 9.503/1997</p>
          </div>

          {/* Quick Summary */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Resumo Rápido</h3>
            <div className="grid grid-cols-2 gap-2">
              {ctbSummary.map(item => (
                <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <p className="text-xs text-slate-400">{item.label}</p>
                  <p className="font-bold text-sm mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chapters */}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Capítulos do CTB</h3>
            <div className="space-y-2">
              {ctbChapters.map(chapter => (
                <div key={chapter.chapter} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedChapter(expandedChapter === chapter.chapter ? null : chapter.chapter)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 transition-all"
                  >
                    <div>
                      <p className="text-xs text-blue-400 font-semibold">Capítulo {chapter.chapter}</p>
                      <p className="font-semibold text-sm">{chapter.title}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedChapter === chapter.chapter ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedChapter === chapter.chapter && (
                    <div className="px-4 pb-4 space-y-2">
                      {chapter.articles.map(art => (
                        <div key={art.article} className="bg-white/5 rounded-lg p-3">
                          <p className="text-xs text-blue-400 font-semibold mb-1">{art.article}</p>
                          <p className="text-sm text-slate-300">{art.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Horizontal signals */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Sinalização Horizontal</h3>
            <div className="space-y-2">
              {horizontalSignals.map(sig => (
                <div key={sig.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 mt-0.5">
                      📏
                    </div>
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
        /* Sign Library */
        <>
          {/* Categories */}
          <div className="max-w-xl mx-auto px-4 pt-3">
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${activeCategory === cat.id ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400'}`}
                >
                  <span>{cat.icon}</span> {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sign Grid */}
          <div className="max-w-xl mx-auto px-4 py-4">
            <p className="text-xs text-slate-400 mb-3">{filteredSigns.length} resultado{filteredSigns.length !== 1 ? 's' : ''}</p>
            <div className="grid grid-cols-1 gap-3">
              {filteredSigns.map((sign, i) => (
                <motion.button
                  key={sign.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => setSelectedSign(sign)}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 text-left transition-all flex items-center gap-4 group"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{
                      background: sign.category === 'regulamentacao' ? '#EF444420' :
                        sign.category === 'advertencia' ? '#FACC1520' :
                          sign.category === 'indicacao' ? '#2563EB20' : '#FFFFFF10'
                    }}
                  >
                    {CATEGORY_ICONS[sign.category] || '📋'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">{sign.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{sign.description}</p>
                    {sign.ctbArticle && (
                      <span className="text-xs text-blue-400 mt-1 block">{sign.ctbArticle}</span>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </motion.button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Sign Detail Modal */}
      {selectedSign && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="max-w-xl mx-auto px-4 py-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#1E293B] border border-white/10 rounded-3xl overflow-hidden"
            >
              {/* Header */}
              <div
                className="p-5 text-center"
                style={{
                  background: selectedSign.category === 'regulamentacao' ? 'linear-gradient(135deg, #7F1D1D, #991B1B)' :
                    selectedSign.category === 'advertencia' ? 'linear-gradient(135deg, #78350F, #92400E)' :
                      'linear-gradient(135deg, #1E3A5F, #1E40AF)'
                }}
              >
                <div className="text-5xl mb-2">{CATEGORY_ICONS[selectedSign.category]}</div>
                <h2 className="text-xl font-black">{selectedSign.name}</h2>
                <p className="text-sm opacity-70 mt-1 capitalize">{categories.find(c => c.id === selectedSign.category)?.label}</p>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <p className="text-xs text-blue-400 font-semibold uppercase mb-1">Descrição</p>
                  <p className="text-sm text-slate-300">{selectedSign.description}</p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
                  <p className="text-xs text-blue-400 font-semibold uppercase mb-1">Significado</p>
                  <p className="text-sm text-slate-200">{selectedSign.meaning}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase mb-1">Onde é utilizada</p>
                  <p className="text-sm text-slate-300">{selectedSign.usage}</p>
                </div>

                {selectedSign.tips && (
                  <div>
                    <p className="text-xs text-yellow-400 font-semibold uppercase mb-2">💡 Dicas de segurança</p>
                    <ul className="space-y-1.5">
                      {selectedSign.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                          <span className="text-yellow-400 flex-shrink-0">✓</span> {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedSign.penalty && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                    <p className="text-xs text-red-400 font-semibold uppercase mb-1">⚖️ Penalidade</p>
                    <p className="text-sm text-red-200">{selectedSign.penalty}</p>
                  </div>
                )}

                {selectedSign.curiosities && selectedSign.curiosities.length > 0 && (
                  <div>
                    <p className="text-xs text-purple-400 font-semibold uppercase mb-2">🤔 Curiosidades</p>
                    {selectedSign.curiosities.map((c, i) => (
                      <p key={i} className="text-sm text-slate-300 mb-1.5">• {c}</p>
                    ))}
                  </div>
                )}

                {selectedSign.ctbArticle && (
                  <div className="flex items-center gap-2 text-sm text-slate-400 bg-white/5 rounded-lg px-3 py-2">
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    Base legal: <span className="text-blue-400 font-semibold">{selectedSign.ctbArticle}</span> do CTB
                  </div>
                )}
              </div>

              <div className="px-5 pb-5">
                <button
                  onClick={() => setSelectedSign(null)}
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold py-3 rounded-xl transition-all text-sm"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      <div className="h-24" />
    </div>
  );
}
