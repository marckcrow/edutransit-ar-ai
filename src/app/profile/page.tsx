'use client';

import { useState } from 'react';
import { Settings, Bell, Moon, Globe, Shield, ChevronRight, Star, Award, Target, BookOpen, LogOut } from 'lucide-react';

const STATS = [
  { label: 'Nível', value: '4', icon: Star,    color: '#FACC15' },
  { label: 'XP Total', value: '340', icon: Award,  color: '#2563EB' },
  { label: 'Missões', value: '3', icon: Target,  color: '#22C55E' },
  { label: 'Certificados', value: '1', icon: BookOpen, color: '#8B5CF6' },
];
const SETTINGS = [
  { icon: Bell,  label: 'Notificações', value: 'Ativas' },
  { icon: Moon,  label: 'Modo Escuro', value: 'Sempre' },
  { icon: Globe, label: 'Idioma',      value: 'Português (BR)' },
  { icon: Shield, label: 'Privacidade' },
  { icon: Settings, label: 'Configurações' },
];

export default function ProfilePage() {
  const [notif, setNotif] = useState(true);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <header className="bg-gradient-to-b from-blue-900/50 to-transparent pt-6 pb-4 px-4">
        <div className="max-w-xl mx-auto flex items-center justify-between mb-6">
          <h1 className="text-lg font-black">Meu Perfil</h1>
          <button className="p-2 bg-white/10 rounded-xl" aria-label="Configurações"><Settings className="w-5 h-5 text-slate-400" /></button>
        </div>
        <div className="max-w-xl mx-auto text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-4xl font-black mx-auto mb-3">M</div>
          <h2 className="text-xl font-black">Marcondes Rodrigues Jr.</h2>
          <p className="text-sm text-slate-400">@Marcondesjrti • Fortaleza, CE</p>
          <div className="mt-2"><span className="text-xs bg-blue-600/30 text-blue-300 px-3 py-1 rounded-full font-semibold">Nível 4 — Motorista Estagiário</span></div>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-5">
        <div className="grid grid-cols-4 gap-2 mb-6">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
                <Icon className="w-5 h-5 mx-auto mb-1" style={{ color: s.color }} aria-hidden="true" />
                <p className="font-black text-lg">{s.value}</p>
                <p className="text-xs text-slate-400">{s.label}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold">Progresso para Nível 5</p>
            <p className="text-xs text-slate-400">340 / 1500 XP</p>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-progress-fill" style={{ width: '22%' }} />
          </div>
          <p className="text-xs text-slate-500 mt-2">Faltam 1160 XP para o próximo nível</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <p className="text-sm font-semibold mb-3">Medalhas Conquistadas</p>
          <div className="flex gap-3 flex-wrap">
            {[{ icon: '🌟', name: 'Primeiro Passo' }, { icon: '🚴', name: 'Amigo do Ciclista' }].map(b => (
              <div key={b.name} className="text-center">
                <div className="w-14 h-14 bg-yellow-500/20 rounded-full flex items-center justify-center text-2xl mb-1 border border-yellow-500/30">{b.icon}</div>
                <p className="text-xs text-slate-400">{b.name}</p>
              </div>
            ))}
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="text-center opacity-20">
                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-2xl mb-1">🔒</div>
                <p className="text-xs text-slate-500">???</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden animate-slide-up" style={{ animationDelay: '500ms' }}>
          {SETTINGS.map((s, i) => {
            const Icon = s.icon;
            return (
              <button key={s.label} className={`w-full flex items-center gap-3 p-4 text-left hover:bg-white/5 transition-all ${i < SETTINGS.length - 1 ? 'border-b border-white/5' : ''}`}>
                <Icon className="w-5 h-5 text-slate-400 flex-shrink-0" aria-hidden="true" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{s.label}</p>
                  {s.value && <p className="text-xs text-slate-400">{s.value}</p>}
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" aria-hidden="true" />
              </button>
            );
          })}
        </div>

        <button className="w-full mt-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-semibold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2 animate-slide-up" style={{ animationDelay: '600ms' }}>
          <LogOut className="w-4 h-4" aria-hidden="true" /> Sair da conta
        </button>
        <p className="text-center text-xs text-slate-600 mt-6">EduTransit AR AI v1.0.0 — © 2026 Webstreet</p>
      </div>
      <div className="h-24" />
    </div>
  );
}
