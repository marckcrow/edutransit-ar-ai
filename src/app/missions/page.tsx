'use client';

import { useState } from 'react';
import { Target, Star, CheckCircle2, Zap, Trophy, ChevronRight, RotateCcw, X } from 'lucide-react';
import { missions } from '@/data/missions';
import { quizzes } from '@/data/quizzes';
import { Mission } from '@/types';

const DIFF = {
  beginner:     { label: 'Iniciante',     color: '#22C55E' },
  intermediate: { label: 'Intermediário', color: '#FACC15' },
  advanced:     { label: 'Avançado',       color: '#EF4444' },
};
const TYPE_ICONS: Record<string, { icon: string; color: string }> = {
  find:    { icon: '🔍', color: '#2563EB' },
  identify:{ icon: '🎯', color: '#8B5CF6' },
  quiz:   { icon: '❓', color: '#F97316' },
  safety: { icon: '🛡️', color: '#22C55E' },
};
const BADGES = [
  { id: 'iniciante',         name: 'Primeiro Passo',      icon: '🌟' },
  { id: 'parar-e-pensar',    name: 'Parar e Pensar',     icon: '🛑' },
  { id: 'amigo-ciclista',    name: 'Amigo do Ciclista',   icon: '🚴' },
  { id: 'guardiao-escolar',  name: 'Guardião Escolar',    icon: '🏫' },
  { id: 'mestre-rotatoria', name: 'Mestre da Rotatória', icon: '🌀' },
  { id: 'desconectado',      name: 'Desconectado',        icon: '📵' },
  { id: 'super-protetor',    name: 'Super Protetor',      icon: '🦸' },
  { id: 'mestre-ctb',       name: 'Mestre do CTB',      icon: '📖' },
  { id: 'expert-placas',     name: 'Expert em Placas',    icon: '🏆' },
];

export default function MissionsPage() {
  const [tab, setTab] = useState<'missions' | 'badges'>('missions');
  const [selected, setSelected] = useState<Mission | null>(null);
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState<string[]>(['m1', 'm3']);
  const [earned, setEarned] = useState<string[]>(['iniciante', 'amigo-ciclista']);
  const [xpTotal, setXpTotal] = useState(0);
  const [quizResult, setQuizResult] = useState<{ correct: boolean; msg: string } | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [confetti, setConfetti] = useState(false);

  const start = (m: Mission) => { setSelected(m); setStep(0); setQuizResult(null); setQuizAnswer(null); };
  const close  = () => { setSelected(null); };

  const complete = () => {
    if (!selected) return;
    setCompleted(prev => [...new Set([...prev, selected.id])]);
    if (selected.xpReward) setXpTotal(prev => prev + selected.xpReward);
    setConfetti(true);
    setTimeout(() => { setConfetti(false); setSelected(null); }, 2500);
  };

  const answer = (idx: number, correct: number) => {
    if (quizResult) return;
    setQuizAnswer(idx);
    const ok = idx === correct;
    setQuizResult({ correct: ok, msg: ok ? '✅ Correto! Muito bem!' : `❌ Incorreto. A resposta era: ${quizzes.find(q => q.correctIndex === correct)?.options[correct]}` });
  };

  const nextStep = () => {
    if (!selected) return;
    if (step < selected.steps.length - 1) { setStep(p => p + 1); setQuizResult(null); setQuizAnswer(null); }
    else complete();
  };

  const prevStep = () => { setStep(p => Math.max(0, p - 1)); setQuizResult(null); setQuizAnswer(null); };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Confetti */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-confetti"
              style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 0.5}s`, fontSize: `${14 + Math.random() * 14}px` }}
            >
              {['🎉', '⭐', '🎊', '✅', '🌟'][i % 5]}
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <header className="bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎮</span>
              <div>
                <h1 className="font-bold text-sm">Missões</h1>
                <p className="text-xs text-blue-400">{missions.length} missões</p>
              </div>
            </div>
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl px-3 py-1.5 text-center">
              <p className="text-xs text-yellow-400">XP Total</p>
              <p className="font-black text-sm text-yellow-300">+{xpTotal}</p>
            </div>
          </div>
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            <button onClick={() => setTab('missions')} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${tab === 'missions' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>
              <Target className="w-4 h-4" aria-hidden="true" /> Missões
            </button>
            <button onClick={() => setTab('badges')} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${tab === 'badges' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>
              <Star className="w-4 h-4" aria-hidden="true" /> Medalhas
            </button>
          </div>
        </div>
      </header>

      {tab === 'missions' ? (
        <div className="max-w-xl mx-auto px-4 py-4">
          {/* Progress */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold">Progresso Geral</p>
              <p className="text-sm text-blue-400">{completed.length}/{missions.length}</p>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-progress-fill" style={{ width: `${(completed.length / missions.length) * 100}%` }} />
            </div>
          </div>

          <div className="space-y-3">
            {missions.map((m, i) => {
              const ok = completed.includes(m.id);
              const cfg = DIFF[m.difficulty];
              return (
                <button
                  key={m.id}
                  onClick={() => !ok && start(m)}
                  disabled={ok}
                  className={`w-full text-left rounded-2xl p-4 transition-all flex items-center gap-4 animate-slide-up ${ok ? 'bg-green-500/5 border border-green-500/20' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${ok ? 'bg-green-500/20' : cfg.color === '#22C55E' ? 'bg-green-500/20' : cfg.color === '#FACC15' ? 'bg-yellow-500/20' : 'bg-red-500/20'}`}>
                    {ok ? '✅' : TYPE_ICONS[m.type]?.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">{m.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{m.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${cfg.color}20`, color: cfg.color }}>{cfg.label}</span>
                      <span className="text-xs text-yellow-400 font-semibold flex items-center gap-0.5"><Star className="w-3 h-3" aria-hidden="true" /> {m.xpReward} XP</span>
                    </div>
                  </div>
                  {ok ? <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" /> : <ChevronRight className="w-5 h-5 text-slate-500 flex-shrink-0" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            {BADGES.map((b, i) => {
              const has = earned.includes(b.id);
              return (
                <div
                  key={b.id}
                  className={`rounded-2xl p-4 text-center animate-slide-up ${has ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-white/5 border border-white/10 opacity-50'}`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className={`text-4xl mb-2 ${!has ? 'grayscale' : ''}`}>{b.icon}</div>
                  <p className="font-bold text-sm">{b.name}</p>
                  {has && <p className="text-xs text-yellow-400 mt-2 font-semibold">✅ Conquistada!</p>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mission Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center" onClick={close} role="dialog" aria-modal="true" aria-label={selected.title}>
          <div
            className="bg-[#1E293B] border-t border-white/10 rounded-t-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto animate-drop-in"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="sticky top-0 bg-[#1E293B] border-b border-white/5 p-4 flex items-center justify-between z-10">
              <div>
                <p className="text-xs text-blue-400 font-semibold">{TYPE_ICONS[selected.type]?.icon} {selected.type}</p>
                <h2 className="font-bold">{selected.title}</h2>
              </div>
              <button onClick={close} className="p-2 bg-white/5 rounded-lg" aria-label="Fechar"><X className="w-4 h-4 text-slate-400" /></button>
            </div>

            <div className="p-4 space-y-4">
              <p className="text-sm text-slate-300">{selected.description}</p>

              {selected.steps.map((s, idx) => {
                const isActive = idx === step;
                const isPast   = idx < step;
                const isQuiz   = s.type === 'quiz';
                const relatedQuiz = isQuiz && s.quizId ? quizzes.find(q => q.id === s.quizId) : null;

                return (
                  <div
                    key={idx}
                    className={`rounded-xl p-4 animate-slide-up ${isActive ? 'bg-blue-500/10 border border-blue-500/30' : isPast ? 'bg-green-500/5 border border-green-500/20' : 'bg-white/5 border border-white/10'}`}
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${isPast ? 'bg-green-500 text-white' : isActive ? 'bg-blue-600 text-white' : 'bg-white/10 text-slate-400'}`} aria-hidden="true">
                        {isPast ? '✓' : idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${isPast ? 'text-green-400' : isActive ? 'text-white' : 'text-slate-500'}`}>
                          {s.instruction}
                        </p>

                        {isActive && relatedQuiz && (
                          <div className="mt-3 space-y-2">
                            {relatedQuiz.options.map((opt, oi) => {
                              const correctOpt = oi === relatedQuiz.correctIndex;
                              const chosen = oi === quizAnswer;
                              let cls = 'bg-white/5 border-white/10 hover:border-white/30';
                              if (quizResult && correctOpt) cls = 'bg-green-500/20 border-green-500/40 text-green-300';
                              else if (quizResult && chosen) cls = 'bg-red-500/20 border-red-500/40 text-red-300';
                              return (
                                <button key={oi} onClick={() => answer(oi, relatedQuiz.correctIndex)} disabled={quizResult !== null} className={`w-full text-left text-sm px-3 py-2.5 rounded-lg border transition-all ${cls}`}>
                                  {opt}
                                </button>
                              );
                            })}
                            {quizResult && (
                              <div className={`mt-2 p-2.5 rounded-lg text-sm ${quizResult.correct ? 'bg-green-500/10 text-green-300' : 'bg-red-500/10 text-red-300'}`}>
                                {quizResult.msg}
                                {quizResult.correct && <p className="mt-1 text-xs opacity-70">{relatedQuiz.explanation}</p>}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="flex gap-2 pt-2">
                {step > 0 && (
                  <button onClick={prevStep} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2">
                    <RotateCcw className="w-4 h-4" aria-hidden="true" /> Voltar
                  </button>
                )}
                {quizResult?.correct ? (
                  <button onClick={nextStep} className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2 animate-bounce-in">
                    {step < selected.steps.length - 1 ? 'Próximo passo' : '🏆 Concluir!'} <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                ) : !selected.steps[step]?.quizId ? (
                  <button onClick={nextStep} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2">
                    {step < selected.steps.length - 1 ? 'Próximo' : '🏆 Concluir!'} <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-24" />
    </div>
  );
}
