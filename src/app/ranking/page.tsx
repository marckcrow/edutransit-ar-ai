'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Users, TrendingUp } from 'lucide-react';

const MOCK_RANKINGS = [
  { rank: 1, name: 'Carlos Silva', avatar: '👨‍💻', school: 'Autoescola Velocity', xp: 4850, badges: 9, level: 10, trend: '+120' },
  { rank: 2, name: 'Ana Beatriz', avatar: '👩‍🎓', school: 'DETRAN-CE', xp: 4320, badges: 8, level: 9, trend: '+80' },
  { rank: 3, name: 'Miguel Costa', avatar: '🧑‍🚀', school: 'EMEF José Alencar', xp: 3980, badges: 7, level: 9, trend: '+200' },
  { rank: 4, name: 'João Pedro', avatar: '👨', school: 'Autoescola Express', xp: 3450, badges: 6, level: 8, trend: '+50' },
  { rank: 5, name: 'Marcos Vinícius', avatar: '🏃', school: 'Autoescola Express', xp: 3120, badges: 6, level: 8, trend: '+90' },
  { rank: 6, name: 'Lucia Ferreira', avatar: '👩‍🔧', school: 'DETRAN-CE', xp: 2890, badges: 5, level: 7, trend: '+30' },
  { rank: 7, name: 'Rafael Santos', avatar: '🧑‍💼', school: 'Autoescola Velocity', xp: 2540, badges: 5, level: 7, trend: '+110' },
  { rank: 8, name: 'Mariana Oliveira', avatar: '👩‍🏫', school: 'EMEF José Alencar', xp: 2210, badges: 4, level: 6, trend: '+60' },
  { rank: 9, name: 'Paulo Roberto', avatar: '👨‍🍳', school: 'Autoescola Express', xp: 1980, badges: 4, level: 6, trend: '+40' },
  { rank: 10, name: 'Fernanda Lima', avatar: '👩‍⚕️', school: 'DETRAN-CE', xp: 1650, badges: 3, level: 5, trend: '+25' },
  { rank: 11, name: 'Carlos Eduardo', avatar: '🧑‍🎨', school: 'EMEF José Alencar', xp: 1420, badges: 3, level: 5, trend: '+15' },
  { rank: 12, name: 'Patrícia Souza', avatar: '👩‍💻', school: 'DETRAN-CE', xp: 1100, badges: 2, level: 4, trend: '+5' },
];

const VIEWS = [
  { id: 'all', label: 'Geral', icon: Users },
  { id: 'school', label: 'Por Escola', icon: Trophy },
  { id: 'city', label: 'Por Cidade', icon: TrendingUp },
];

export default function RankingPage() {
  const [activeView, setActiveView] = useState('all');
  const [myRank] = useState({ rank: 23, name: 'Marcondes Jr.', xp: 340, level: 4 });

  const getRankIcon = (rank: number) => {
    if (rank === 1) return { icon: '🥇', bg: 'bg-yellow-500/20', color: '#FACC15' };
    if (rank === 2) return { icon: '🥈', bg: 'bg-slate-400/20', color: '#94A3B8' };
    if (rank === 3) return { icon: '🥉', bg: 'bg-orange-400/20', color: '#F97316' };
    return { icon: `#${rank}`, bg: 'bg-white/5', color: '#94A3B8' };
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Header */}
      <header className="bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🏆</span>
            <div>
              <h1 className="font-bold text-sm">Ranking</h1>
              <p className="text-xs text-blue-400">Os melhores do EduTransit</p>
            </div>
          </div>
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            {VIEWS.map(v => (
              <button
                key={v.id}
                onClick={() => setActiveView(v.id)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${activeView === v.id ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
              >
                <v.icon className="w-3.5 h-3.5" /> {v.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-4">
        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-2 mb-6">
          {/* 2nd */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center">
            <div className="w-16 h-16 rounded-full bg-slate-400/20 border-2 border-slate-400 flex items-center justify-center text-2xl mx-auto mb-2">
              {MOCK_RANKINGS[1].avatar}
            </div>
            <p className="text-xs text-slate-400">2º</p>
            <p className="font-bold text-sm truncate max-w-[80px]">{MOCK_RANKINGS[1].name.split(' ')[0]}</p>
            <p className="text-xs text-slate-400">{MOCK_RANKINGS[1].xp.toLocaleString()} XP</p>
            <div className="w-16 h-16 bg-slate-600/20 rounded-t-xl rounded-b-sm flex items-center justify-center text-2xl">🥈</div>
          </motion.div>

          {/* 1st */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }} className="text-center">
            <div className="w-20 h-20 rounded-full bg-yellow-500/20 border-2 border-yellow-500 flex items-center justify-center text-3xl mx-auto mb-2 glow-effect">
              {MOCK_RANKINGS[0].avatar}
            </div>
            <p className="text-xs text-yellow-400">🥇 1º</p>
            <p className="font-bold text-sm">{MOCK_RANKINGS[0].name.split(' ')[0]}</p>
            <p className="text-xs text-yellow-300">{MOCK_RANKINGS[0].xp.toLocaleString()} XP</p>
            <div className="w-20 h-24 bg-yellow-600/20 rounded-t-xl rounded-b-sm flex items-center justify-center text-3xl border border-yellow-500/30">🏆</div>
          </motion.div>

          {/* 3rd */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
            <div className="w-16 h-16 rounded-full bg-orange-400/20 border-2 border-orange-400 flex items-center justify-center text-2xl mx-auto mb-2">
              {MOCK_RANKINGS[2].avatar}
            </div>
            <p className="text-xs text-orange-400">3º</p>
            <p className="font-bold text-sm truncate max-w-[80px]">{MOCK_RANKINGS[2].name.split(' ')[0]}</p>
            <p className="text-xs text-slate-400">{MOCK_RANKINGS[2].xp.toLocaleString()} XP</p>
            <div className="w-16 h-44 bg-orange-600/20 rounded-t-xl rounded-b-sm flex items-center justify-center text-2xl">🥉</div>
          </motion.div>
        </div>

        {/* Full Ranking */}
        <div className="space-y-2">
          {MOCK_RANKINGS.slice(3).map((user, i) => {
            const rankConfig = getRankIcon(user.rank);
            return (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.04 }}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 flex items-center gap-3"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${rankConfig.bg}`} style={{ color: rankConfig.color }}>
                  {rankConfig.icon}
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg">
                  {user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{user.name}</p>
                  <p className="text-xs text-slate-400">{user.school}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-yellow-400">{user.xp.toLocaleString()} XP</p>
                  <p className="text-xs text-green-400">{user.trend}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-400">Nível</p>
                  <p className="font-bold text-sm text-blue-400">{user.level}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* My rank */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-blue-600/10 border border-blue-500/30 rounded-2xl p-4"
        >
          <p className="text-xs text-blue-400 font-semibold mb-2">🏅 Sua posição</p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-600/30 flex items-center justify-center text-xl font-bold">
              {myRank.rank}º
            </div>
            <div className="flex-1">
              <p className="font-bold">{myRank.name}</p>
              <p className="text-xs text-slate-400">Nível {myRank.level} • {myRank.xp} XP</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Faltam</p>
              <p className="font-bold text-sm text-blue-400">{660 - myRank.xp} XP</p>
            </div>
          </div>
          <div className="mt-3 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: `${(myRank.xp / 660) * 100}%` }} />
          </div>
        </motion.div>
      </div>

      <div className="h-24" />
    </div>
  );
}
