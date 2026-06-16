'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Camera, BookOpen, Trophy, Map, Gamepad2,
  Award, Shield, GraduationCap, Zap, ArrowRight,
  Star, Target, TrendingUp, Users
} from 'lucide-react';

const features = [
  { icon: Camera, label: 'AR na Rua', desc: 'Identifique placas com a câmera', color: '#2563EB', href: '/ar' },
  { icon: BookOpen, label: 'Biblioteca', desc: 'Todas as placas e sinalizações', color: '#22C55E', href: '/library' },
  { icon: Gamepad2, label: 'Missões', desc: 'Gamificação educativa', color: '#8B5CF6', href: '/missions' },
  { icon: Map, label: 'Mapa Educativo', desc: 'Pontos de interesse no mapa', color: '#F97316', href: '/map' },
  { icon: Star, label: 'Tutor IA', desc: 'Pergunte qualquer dúvida', color: '#FACC15', href: '/tutor' },
  { icon: Shield, label: 'Simulador', desc: 'Teste situações reais', color: '#06B6D4', href: '/simulator' },
  { icon: Trophy, label: 'Ranking', desc: 'Compita com outros usuários', color: '#EC4899', href: '/ranking' },
  { icon: Award, label: 'Certificados', desc: 'Gere seu certificado', color: '#22C55E', href: '/certificates' },
];

const stats = [
  { label: 'Placas catalogadas', value: '180+', icon: Target },
  { label: 'Missões disponíveis', value: '50+', icon: Gamepad2 },
  { label: 'Usuários ativos', value: '5.000+', icon: Users },
  { label: 'Horas de conteúdo', value: '120h', icon: TrendingUp },
];

const testimonials = [
  { name: 'Ana Clara, 16 anos', text: 'Estudei para minha Primeira Habilitação e tirei 38/40 na prova! 😍', avatar: '👧' },
  { name: 'Carlos, instrutor autoescola', text: 'Uso o app com meus alunos. O modo AR é incrível para fixar o conteúdo.', avatar: '👨‍🏫' },
  { name: 'Marcos, agente DETRAN-CE', text: 'Ferramenta excelente para educação no trânsito. Parabéns pelo projeto!', avatar: '🛡️' },
];

export default function Home() {
  const [xp, setXp] = useState(340);
  const [level, setLevel] = useState(4);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');
  }, []);

  const xpForNextLevel = [100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5500][level - 1] || 5500;
  const xpForCurrentLevel = [0, 100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5500][level - 1] || 0;
  const progressPercent = Math.min(100, ((xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Header */}
      <header className="bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-xl">
              🚦
            </div>
            <div>
              <h1 className="font-bold text-sm">EduTransit AR AI</h1>
              <p className="text-xs text-blue-400">Educação para o Trânsito</p>
            </div>
          </div>
          <Link href="/profile">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center font-bold text-sm">
              M
            </div>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 pt-8 pb-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-blue-400 text-sm font-medium mb-1">{greeting} 👋</p>
            <h2 className="text-2xl font-black mb-2">
              Transforme a cidade na sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400">sala de aula</span>
            </h2>
            <p className="text-slate-400 text-sm mb-5">Aprenda trânsito com AR, IA e gamificação. É gratis!</p>

            {/* XP Progress */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">Nível {level}</span>
                  <span className="text-xs bg-blue-600/30 text-blue-300 px-2 py-0.5 rounded-full">Motorista Estagiário</span>
                </div>
                <span className="text-xs text-slate-400">{xp} / {xpForNextLevel} XP</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #2563EB, #FACC15)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <Link href="/ar" className="flex-1">
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30">
                  <Camera className="w-5 h-5" />
                  AR na Rua
                </button>
              </Link>
              <Link href="/missions">
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3.5 px-5 rounded-xl transition-all">
                  Missões
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Funcionalidades</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={f.href}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all cursor-pointer group h-full">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${f.color}20`, border: `1px solid ${f.color}40` }}
                  >
                    <f.icon className="w-5 h-5" style={{ color: f.color }} />
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{f.label}</h4>
                  <p className="text-xs text-slate-400">{f.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <s.icon className="w-5 h-5 mx-auto mb-2 text-blue-400" />
              <p className="text-xl font-black">{s.value}</p>
              <p className="text-xs text-slate-400">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Depoimentos</h3>
        <div className="space-y-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{t.avatar}</span>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-sm text-slate-300 mt-1">{t.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTB Quick Reference */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold">Código de Trânsito — Resumo Rápido</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { k: 'Limite urbano', v: '60 km/h' },
              { k: 'Área escolar', v: '30 km/h' },
              { k: 'Rodovia', v: '110 km/h' },
              { k: 'Suspensão CNH', v: '20 pontos' },
              { k: 'Alcool (crime)', v: '0,3 mg/L' },
              { k: 'Faixa de pedestre', v: 'R$ 293,47' },
            ].map(item => (
              <div key={item.k} className="bg-white/5 rounded-lg px-3 py-2">
                <p className="text-xs text-slate-400">{item.k}</p>
                <p className="font-bold text-sm">{item.v}</p>
              </div>
            ))}
          </div>
          <Link href="/library">
            <button className="mt-4 w-full bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-blue-300 font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
              Ver biblioteca completa
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="h-24" />
    </div>
  );
}
