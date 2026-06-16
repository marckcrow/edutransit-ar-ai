'use client';

import { useState } from 'react';
import { Trophy, Users, TrendingUp } from 'lucide-react';

const TOP = [
  { rank: 1, name: 'Carlos Silva',    avatar: '👨‍💻', school: 'Autoescola Velocity', xp: 4850, badges: 9, level: 10, trend: '+120' },
  { rank: 2, name: 'Ana Beatriz',    avatar: '👩‍🎓', school: 'DETRAN-CE',            xp: 4320, badges: 8, level: 9,  trend: '+80'  },
  { rank: 3, name: 'Miguel Costa',   avatar: '🧑‍🚀', school: 'EMEF José Alencar',     xp: 3980, badges: 7, level: 9,  trend: '+200' },
  { rank: 4, name: 'João Pedro',     avatar: '👨',   school: 'Autoescola Express',    xp: 3450, badges: 6, level: 8,  trend: '+50'  },
  { rank: 5, name: 'Marcos Vinícius',avatar: '🏃', school: 'Autoescola Express',    xp: 3120, badges: 6, level: 8,  trend: '+90'  },
  { rank: 6, name: 'Lucia Ferreira', avatar: '👩‍🔧', school: 'DETRAN-CE',            xp: 2890, badges: 5, level: 7,  trend: '+30'  },
  { rank: 7, name: 'Rafael Santos',  avatar: '🧑‍💼', school: 'Autoescola Velocity',   xp: 2540, badges: 5, level: 7,  trend: '+110' },
  { rank: 8, name: 'Mariana Oliveira',avatar: '👩‍🏫', school: 'EMEF José Alencar',    xp: 2210, badges: 4, level: 6,  trend: '+60'  },
  { rank: 9, name: 'Paulo Roberto',  avatar: '👨‍🍳', school: 'Autoescola Express',    xp: 1980, badges: 4, level: 6,  trend: '+40'  },
  { rank: 10, name: 'Fernanda Lima', avatar: '👩‍⚕️', school: 'DETRAN-CE',            xp: 1650, badges: 3, level: 5,  trend: '+25'  },
];

const VIEWS = [
  { id: 'all',   label: 'Geral',     icon: Users },
  { id: 'school',label: 'Por Escola', icon: Trophy },
  { id: 'city',  label: 'Por Cidade',icon: TrendingUp },
];

export default function RankingPage() {
  const [view, setView] = useState('all');

  const podium = [TOP[1], TOP[0], TOP[2]];
  const rest = TOP.slice(3);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <header className="bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🏆</span>
            <div><h1 className="font-bold text-sm">Ranking</h1><p className="text-xs text-blue-400">Os melhores do EduTransit</p></div>
          </div>
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            {VIEWS.map(v => (
              <button key={v.id} onClick={() => setView(v.id)} className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${view === v.id ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>
                <v.icon className="w-3.5 h-3.5" aria-hidden="true" /> {v.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-4">
        {/* Podium */}
        <div className="flex items-end justify-center gap-2 mb-6">
          {podium.map((u, i) => {
            const heights = ['h-16', 'h-24', 'h-10'];
            const tclasses = ['w-16', 'w-20', 'w-16'];
            const medals = ['🥈', '🏆', '🥉'];
            return (
              <div key={u.rank} className="text-center animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-12 h-12 rounded-full border-2 mx-auto mb-2 flex items-center justify-center text-xl" style={{ borderColor: i === 0 ? '#94A3B8' : i === 1 ? '#FACC15' : '#F97316', background: i === 0 ? '#94A3B820' : i === 1 ? '#FACC1520' : '#F9731620' }}>
                  {u.avatar}
                </div>
                <p className="text-xs text-slate-400">{i === 0 ? '2º' : i === 1 ? '🥇 1º' : '3º'}</p>
                <p className="font-bold text-sm">{u.name.split(' ')[0]}</p>
                <p className="text-xs text-yellow-400">{u.xp.toLocaleString()} XP</p>
                <div className={`${tclasses[i]} ${heights[i]} ${i === 0 ? 'bg-slate-600/20' : i === 1 ? 'bg-yellow-600/20 border border-yellow-500/30' : 'bg-orange-600/20'} rounded-t-xl flex items-center justify-center text-xl`}>
                  {medals[i]}
                </div>
              </div>
            );
          })}
        </div>

        {/* List */}
        <div className="space-y-2">
          {rest.map((u, i) => (
            <div key={u.rank} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 flex items-center gap-3 animate-slide-up" style={{ animationDelay: `${300 + i * 60}ms` }}>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-slate-400 flex-shrink-0">#{u.rank}</div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg flex-shrink-0">{u.avatar}</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{u.name}</p>
                <p className="text-xs text-slate-400">{u.school}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm text-yellow-400">{u.xp.toLocaleString()} XP</p>
                <p className="text-xs text-green-400">{u.trend}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-400">Nível</p>
                <p className="font-bold text-sm text-blue-400">{u.level}</p>
              </div>
            </div>
          ))}
        </div>

        {/* My rank */}
        <div className="mt-6 bg-blue-600/10 border border-blue-500/30 rounded-2xl p-4 animate-slide-up" style={{ animationDelay: '800ms' }}>
          <p className="text-xs text-blue-400 font-semibold mb-2">🏅 Sua posição</p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-600/30 flex items-center justify-center text-xl font-bold">23º</div>
            <div className="flex-1">
              <p className="font-bold">Marcondes Jr.</p>
              <p className="text-xs text-slate-400">Nível 4 • 340 XP</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Faltam</p>
              <p className="font-bold text-sm text-blue-400">660 XP</p>
            </div>
          </div>
          <div className="mt-3 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-progress-fill" style={{ width: '34%' }} />
          </div>
        </div>
      </div>
      <div className="h-24" />
    </div>
  );
}
