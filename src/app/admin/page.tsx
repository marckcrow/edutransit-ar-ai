'use client';

import { useState } from 'react';
import { Users, BarChart3, BookOpen, Target, TrendingUp, Plus, Pencil, Trash2, Eye, Download } from 'lucide-react';
import { trafficSigns } from '@/data/signs';
import { quizzes } from '@/data/quizzes';
import { missions } from '@/data/missions';

const TABS = [
  { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
  { id: 'signs',    label: 'Placas',      icon: BookOpen, count: trafficSigns.length },
  { id: 'quizzes',  label: 'Quizzes',    icon: Target,  count: quizzes.length },
  { id: 'missions', label: 'Missões',    icon: Target,  count: missions.length },
  { id: 'users',     label: 'Usuários',   icon: Users },
];

const KPI = [
  { label: 'Total de Usuários', value: '5.243', icon: Users,    color: '#2563EB', trend: '+12%' },
  { label: 'Ativos Hoje',       value: '312',   icon: TrendingUp, color: '#22C55E', trend: '+8%' },
  { label: 'Quizzes Feitos',     value: '18.920', icon: Target,   color: '#8B5CF6', trend: '+23%' },
  { label: 'Nota Média',         value: '76,4%', icon: BarChart3, color: '#FACC15', trend: '+3%' },
];

const ACTIVITY = [
  { day: 'Seg', users: 210, quizzes: 340 },
  { day: 'Ter', users: 245, quizzes: 420 },
  { day: 'Qua', users: 198, quizzes: 310 },
  { day: 'Qui', users: 267, quizzes: 480 },
  { day: 'Sex', users: 289, quizzes: 520 },
  { day: 'Sáb', users: 156, quizzes: 230 },
  { day: 'Dom', users: 98,  quizzes: 150 },
];
const MAX_ACT = Math.max(...ACTIVITY.map(a => a.users));

export default function AdminPage() {
  const [tab, setTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <header className="bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚙️</span>
              <div><h1 className="font-bold text-sm">Painel Administrativo</h1><p className="text-xs text-blue-400">EduTransit AR AI</p></div>
            </div>
            <div className="flex gap-2">
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" aria-hidden="true" /> Exportar
              </button>
              <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" aria-hidden="true" /> Novo
              </button>
            </div>
          </div>
          <div className="flex gap-1 mt-3 overflow-x-auto pb-1 no-scrollbar">
            {TABS.map(t => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${tab === t.id ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400'}`}
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" /> {t.label}
                  {t.count !== undefined && (
                    <span className={`text-xs px-1.5 rounded-full ${tab === t.id ? 'bg-blue-500/50' : 'bg-white/10'}`}>{t.count}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-5">
        {/* OVERVIEW */}
        {tab === 'overview' && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {KPI.map((k, i) => {
                const Icon = k.icon;
                return (
                  <div key={k.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-slate-400">{k.label}</p>
                      <Icon className="w-4 h-4" style={{ color: k.color }} aria-hidden="true" />
                    </div>
                    <p className="text-2xl font-black">{k.value}</p>
                    <p className="text-xs text-green-400 mt-1">{k.trend} esta semana</p>
                  </div>
                );
              })}
            </div>

            {/* Chart */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="font-bold mb-4">Atividade Semanal</h3>
              <div className="flex items-end gap-3 h-40">
                {ACTIVITY.map((day, i) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col items-center" style={{ height: '120px' }}>
                      <div
                        className="w-full bg-gradient-to-t from-blue-600/50 to-blue-400/50 rounded-t-lg transition-all animate-slide-up"
                        style={{
                          height: `${(day.users / MAX_ACT) * 100}%`,
                          animationDelay: `${i * 80}ms`,
                        }}
                      >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-400 whitespace-nowrap">
                          {day.users}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">{day.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-6 mt-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-blue-500" /> Usuários ativos</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-purple-500" /> Quizzes feitos</span>
              </div>
            </div>

            {/* Recent activity */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="font-bold mb-4">Atividade Recente</h3>
              <div className="space-y-3">
                {[
                  { user: 'Carlos S.',   action: 'Completou missão &quot;A Arte de Parar&quot;',       time: '2 min atrás', icon: '🎯' },
                  { user: 'Ana B.',      action: 'Respondeu 10 quizzes corretamente',        time: '5 min atrás', icon: '✅' },
                  { user: 'Miguel C.',   action: 'Emitiu certificado &quot;Curso de Placas&quot;',  time: '8 min atrás', icon: '🏆' },
                  { user: 'João P.',     action: 'Novo cadastro no aplicativo',                 time: '12 min atrás', icon: '👋' },
                  { user: 'Rafael S.',  action: 'Alcançou Nível 8',                           time: '15 min atrás', icon: '⭐' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0 animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
                    <span className="text-lg">{item.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.user}</p>
                      <p className="text-xs text-slate-400">{item.action}</p>
                    </div>
                    <span className="text-xs text-slate-500">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SIGNS */}
        {tab === 'signs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">{trafficSigns.length} placas cadastradas</p>
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl transition-all text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" aria-hidden="true" /> Nova Placa
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-400 border-b border-white/10">
                    <th className="pb-3 px-2">Nome</th>
                    <th className="pb-3 px-2">Categoria</th>
                    <th className="pb-3 px-2">CTB</th>
                    <th className="pb-3 px-2 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {trafficSigns.map(s => (
                    <tr key={s.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-2 font-medium">{s.name}</td>
                      <td className="py-3 px-2 capitalize text-slate-400">{s.category}</td>
                      <td className="py-3 px-2 text-blue-400 text-xs">{s.ctbArticle || '—'}</td>
                      <td className="py-3 px-2 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400" aria-label="Visualizar"><Eye className="w-3.5 h-3.5" /></button>
                          <button className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400" aria-label="Editar"><Pencil className="w-3.5 h-3.5" /></button>
                          <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400" aria-label="Excluir"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* QUIZZES */}
        {tab === 'quizzes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">{quizzes.length} quizzes cadastrados</p>
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl transition-all text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" aria-hidden="true" /> Novo Quiz
              </button>
            </div>
            <div className="space-y-3">
              {quizzes.map((q, i) => (
                <div key={q.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-4 animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${q.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' : q.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                    {q.difficulty.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{q.question.slice(0, 70)}...</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                      <span>{q.options.length} opções</span><span>{q.category}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400" aria-label="Visualizar"><Eye className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400" aria-label="Editar"><Pencil className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400" aria-label="Excluir"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MISSIONS */}
        {tab === 'missions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">{missions.length} missões cadastradas</p>
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl transition-all text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" aria-hidden="true" /> Nova Missão
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {missions.map((m, i) => (
                <div key={m.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-sm">{m.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{m.type} • {m.difficulty}</p>
                    </div>
                    <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full font-semibold">+{m.xpReward} XP</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">{m.description}</p>
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400" aria-label="Visualizar"><Eye className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400" aria-label="Editar"><Pencil className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400" aria-label="Excluir"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* USERS */}
        {tab === 'users' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input type="text" placeholder="Buscar usuário..." className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50" aria-label="Buscar usuário" />
              <select className="bg-white/10 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-400 focus:outline-none">
                <option>Todos os níveis</option><option>Nível 1-5</option><option>Nível 6-10</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-400 border-b border-white/10">
                    <th className="pb-3 px-2">Usuário</th><th className="pb-3 px-2">Nível</th><th className="pb-3 px-2">XP</th>
                    <th className="pb-3 px-2">Missões</th><th className="pb-3 px-2">Último acesso</th><th className="pb-3 px-2 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Carlos Silva',    email: 'carlos@email.com', level: 10, xp: 4850, missions: 12, last: 'Agora' },
                    { name: 'Ana Beatriz',     email: 'ana.b@email.com',  level: 9,  xp: 4320, missions: 10, last: '5 min' },
                    { name: 'Miguel Costa',    email: 'miguel@email.com',  level: 9,  xp: 3980, missions: 9,  last: '12 min' },
                    { name: 'João Pedro',     email: 'joao.p@email.com',  level: 8,  xp: 3450, missions: 8,  last: '1h' },
                  ].map((u, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
                      <td className="py-3 px-2"><div><p className="font-medium">{u.name}</p><p className="text-xs text-slate-500">{u.email}</p></div></td>
                      <td className="py-3 px-2 text-blue-400 font-bold">{u.level}</td>
                      <td className="py-3 px-2 text-yellow-400">{u.xp.toLocaleString()}</td>
                      <td className="py-3 px-2 text-slate-400">{u.missions}</td>
                      <td className="py-3 px-2 text-slate-400 text-xs">{u.last}</td>
                      <td className="py-3 px-2 text-right">
                        <button className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400" aria-label="Visualizar"><Eye className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400" aria-label="Excluir"><Trash2 className="w-3.5 h-3.5" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className="h-24" />
    </div>
  );
}
