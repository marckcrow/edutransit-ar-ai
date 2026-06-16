'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Star, CheckCircle2, Lock, Zap, Trophy, ChevronRight, RotateCcw, X } from 'lucide-react';
import { missions } from '@/data/missions';
import { quizzes } from '@/data/quizzes';
import { Mission } from '@/types';

const DIFFICULTY_CONFIG = {
  beginner: { label: 'Iniciante', color: '#22C55E', bg: 'bg-green-500/20' },
  intermediate: { label: 'Intermediário', color: '#FACC15', bg: 'bg-yellow-500/20' },
  advanced: { label: 'Avançado', color: '#EF4444', bg: 'bg-red-500/20' },
};

const TYPE_CONFIG = {
  find: { label: 'Encontre', icon: '🔍', color: '#2563EB' },
  identify: { label: 'Identifique', icon: '🎯', color: '#8B5CF6' },
  quiz: { label: 'Quiz', icon: '❓', color: '#F97316' },
  safety: { label: 'Segurança', icon: '🛡️', color: '#22C55E' },
};

const BADGES = [
  { id: 'iniciante', name: 'Primeiro Passo', icon: '🌟', desc: 'Complete sua primeira missão' },
  { id: 'parar-e-pensar', name: 'Parar e Pensar', icon: '🛑', desc: 'Domine a placa PARE' },
  { id: 'amigo-ciclista', name: 'Amigo do Ciclista', icon: '🚴', desc: 'Aprenda a compartilhar a via' },
  { id: 'guardiao-escolar', name: 'Guardião Escolar', icon: '🏫', desc: 'Proteja as crianças no trânsito' },
  { id: 'mestre-rotatoria', name: 'Mestre da Rotatória', icon: '🌀', desc: 'Domine a circulação em rotatórias' },
  { id: 'desconectado', name: 'Desconectado', icon: '📵', desc: 'Conheça os perigos do celular' },
  { id: 'super-protetor', name: 'Super Protetor', icon: '🦸', desc: 'Segurança de crianças no carro' },
  { id: 'mestre-ctb', name: 'Mestre do CTB', icon: '📖', desc: 'Quiz Master do CTB' },
  { id: 'expert-placas', name: 'Expert em Placas', icon: '🏆', desc: 'Todas as categorias dominadas' },
];

export default function MissionsPage() {
  const [activeTab, setActiveTab] = useState<'missions' | 'badges'>('missions');
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [completedMissions, setCompletedMissions] = useState<string[]>(['m1', 'm3']);
  const [earnedBadges, setEarnedBadges] = useState<string[]>(['iniciante', 'amigo-ciclista']);
  const [missionXP, setMissionXP] = useState(0);
  const [quizResult, setQuizResult] = useState<{ correct: boolean; message: string } | null>(null);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const startMission = (mission: Mission) => {
    setSelectedMission(mission);
    setActiveStep(0);
    setQuizResult(null);
    setSelectedQuizAnswer(null);
  };

  const completeMission = () => {
    if (!selectedMission) return;
    setCompletedMissions(prev => [...new Set([...prev, selectedMission.id])]);
    setMissionXP(prev => prev + selectedMission.xpReward);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setSelectedMission(null);
    }, 2500);
  };

  const handleQuizAnswer = (index: number, correctIndex: number) => {
    setSelectedQuizAnswer(index);
    const isCorrect = index === correctIndex;
    setQuizResult({
      correct: isCorrect,
      message: isCorrect ? '✅ Correto! Muito bem!' : `❌ Incorreto. A resposta certa era: ${quizzes.find(q => q.correctIndex === correctIndex)?.options[correctIndex]}`
    });
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{ top: '-5%', left: `${Math.random() * 100}%`, opacity: 1 }}
              animate={{ top: '110%', opacity: 0 }}
              transition={{ duration: 2.5, delay: Math.random() * 0.5 }}
            >
              {['🎉', '⭐', '🎊', '✅', '🌟'][i % 5]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Header */}
      <header className="bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎮</span>
              <div>
                <h1 className="font-bold text-sm">Missões</h1>
                <p className="text-xs text-blue-400">{missions.length} missões disponíveis</p>
              </div>
            </div>
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl px-3 py-1.5 text-center">
              <p className="text-xs text-yellow-400">XP Total</p>
              <p className="font-black text-sm text-yellow-300">+{missionXP}</p>
            </div>
          </div>

          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            <button
              onClick={() => setActiveTab('missions')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'missions' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
            >
              <Target className="w-4 h-4" /> Missões
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'badges' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
            >
              <Star className="w-4 h-4" /> Medalhas
            </button>
          </div>
        </div>
      </header>

      {activeTab === 'missions' ? (
        <div className="max-w-xl mx-auto px-4 py-4">
          {/* Progress */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold">Progresso Geral</p>
              <p className="text-sm text-blue-400">{completedMissions.length}/{missions.length}</p>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                style={{ width: `${(completedMissions.length / missions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {missions.map((mission, i) => {
              const isCompleted = completedMissions.includes(mission.id);
              const diffConfig = DIFFICULTY_CONFIG[mission.difficulty];
              const typeConfig = TYPE_CONFIG[mission.type];

              return (
                <motion.div
                  key={mission.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <button
                    onClick={() => !isCompleted && startMission(mission)}
                    className={`w-full text-left rounded-2xl p-4 transition-all flex items-center gap-4 ${isCompleted ? 'bg-green-500/5 border border-green-500/20' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}
                    disabled={isCompleted}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${isCompleted ? 'bg-green-500/20' : mission.difficulty === 'beginner' ? 'bg-green-500/20' : mission.difficulty === 'intermediate' ? 'bg-yellow-500/20' : 'bg-red-500/20'}`}>
                      {isCompleted ? '✅' : typeConfig.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm">{mission.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{mission.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${diffConfig.bg}`} style={{ color: diffConfig.color }}>
                          {diffConfig.label}
                        </span>
                        <span className="text-xs text-yellow-400 font-semibold flex items-center gap-0.5">
                          <Star className="w-3 h-3" /> {mission.xpReward} XP
                        </span>
                        {mission.badge && (
                          <span className="text-xs text-slate-400">🏅 {mission.badge}</span>
                        )}
                      </div>
                    </div>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-500 flex-shrink-0" />
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Badges */
        <div className="max-w-xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            {BADGES.map((badge, i) => {
              const isEarned = earnedBadges.includes(badge.id);
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`rounded-2xl p-4 text-center ${isEarned ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-white/5 border border-white/10 opacity-50'}`}
                >
                  <div className={`text-4xl mb-2 ${!isEarned && 'grayscale'}`}>{badge.icon}</div>
                  <p className="font-bold text-sm">{badge.name}</p>
                  <p className="text-xs text-slate-400 mt-1">{badge.desc}</p>
                  {isEarned && (
                    <p className="text-xs text-yellow-400 mt-2 font-semibold">✅ Conquistada!</p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mission Modal */}
      {selectedMission && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="bg-[#1E293B] border-t border-white/10 rounded-t-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#1E293B] border-b border-white/5 p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-400 font-semibold">{TYPE_CONFIG[selectedMission.type].icon} {TYPE_CONFIG[selectedMission.type].label}</p>
                <h2 className="font-bold">{selectedMission.title}</h2>
              </div>
              <button onClick={() => setSelectedMission(null)} className="p-2 bg-white/5 rounded-lg">
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Mission description */}
              <p className="text-sm text-slate-300">{selectedMission.description}</p>

              {/* Steps */}
              {selectedMission.steps.map((step, idx) => {
                const isActive = idx === activeStep;
                const isPast = idx < activeStep;
                const isQuiz = step.type === 'quiz';
                const relatedQuiz = isQuiz && step.quizId ? quizzes.find(q => q.id === step.quizId) : null;

                return (
                  <div key={idx} className={`rounded-xl p-4 ${isActive ? 'bg-blue-500/10 border border-blue-500/30' : isPast ? 'bg-green-500/5 border border-green-500/20' : 'bg-white/5 border border-white/10'}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${isPast ? 'bg-green-500 text-white' : isActive ? 'bg-blue-600 text-white' : 'bg-white/10 text-slate-400'}`}>
                        {isPast ? '✓' : idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${isPast ? 'text-green-400' : isActive ? 'text-white' : 'text-slate-500'}`}>
                          {step.instruction}
                        </p>

                        {/* Quiz step */}
                        {isActive && relatedQuiz && (
                          <div className="mt-3 space-y-2">
                            {relatedQuiz.options.map((opt, oi) => (
                              <button
                                key={oi}
                                onClick={() => handleQuizAnswer(oi, relatedQuiz.correctIndex)}
                                disabled={selectedQuizAnswer !== null}
                                className={`w-full text-left text-sm px-3 py-2.5 rounded-lg border transition-all ${selectedQuizAnswer === oi && oi === relatedQuiz.correctIndex ? 'bg-green-500/20 border-green-500/40 text-green-300' : selectedQuizAnswer === oi ? 'bg-red-500/20 border-red-500/40 text-red-300' : 'bg-white/5 border-white/10 hover:border-white/30'}`}
                              >
                                {opt}
                              </button>
                            ))}
                            {quizResult && (
                              <div className={`mt-2 p-2.5 rounded-lg text-sm ${quizResult.correct ? 'bg-green-500/10 text-green-300' : 'bg-red-500/10 text-red-300'}`}>
                                {quizResult.message}
                                {quizResult.correct && (
                                  <p className="mt-1 text-xs opacity-70">{relatedQuiz.explanation}</p>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                {activeStep > 0 && (
                  <button
                    onClick={() => { setActiveStep(prev => prev - 1); setQuizResult(null); setSelectedQuizAnswer(null); }}
                    className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Voltar
                  </button>
                )}
                {quizResult?.correct && (
                  <button
                    onClick={() => {
                      if (activeStep < selectedMission.steps.length - 1) {
                        setActiveStep(prev => prev + 1);
                        setQuizResult(null);
                        setSelectedQuizAnswer(null);
                      } else {
                        completeMission();
                      }
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
                  >
                    {activeStep < selectedMission.steps.length - 1 ? 'Próximo passo' : '🏆 Concluir Missão!'} <ChevronRight className="w-4 h-4" />
                  </button>
                )}
                {!selectedMission.steps[activeStep]?.quizId && (
                  <button
                    onClick={() => {
                      if (activeStep < selectedMission.steps.length - 1) {
                        setActiveStep(prev => prev + 1);
                      } else {
                        completeMission();
                      }
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
                  >
                    {activeStep < selectedMission.steps.length - 1 ? 'Próximo' : '🏆 Concluir!'} <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div className="h-24" />
    </div>
  );
}
