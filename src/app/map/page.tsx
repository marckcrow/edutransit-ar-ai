'use client';

import { useState } from 'react';
import { MapPin, X, ChevronRight, Navigation, ExternalLink } from 'lucide-react';
import { MapPoint } from '@/types';

const POINTS: MapPoint[] = [
  { id: '1', name: 'EMEF José Alencar',     type: 'escola',       lat: -3.7172, lng: -38.5433, description: 'Escola municipal com área escolar sinalizada. Atenção: limite 30 km/h.', imageUrl: '' },
  { id: '2', name: 'Av. Beira-Mar — Faixa Elevada', type: 'faixa-elevada', lat: -3.7272, lng: -38.5333, description: 'Faixa de pedestres elevada com solar. Melhora a segurança de travessia.', imageUrl: '' },
  { id: '3', name: 'Ciclovia da Av. Dom Luís', type: 'ciclovia',    lat: -3.7372, lng: -38.5233, description: 'Ciclovia segregada com 4km de extensão. Conecta o Centro ao Bairro.', imageUrl: '' },
  { id: '4', name: 'Rotatória da Aldeota',     type: 'rotatoria',   lat: -3.7472, lng: -38.5133, description: 'Rotatória de 4 ramos. Preferência: veículos dentro do anel.', imageUrl: '' },
  { id: '5', name: 'Colégio Militar — Área Escolar', type: 'area-escolar', lat: -3.7272, lng: -38.5533, description: 'Área escolar com zona 30 km/h. Período: 6h-18h.', imageUrl: '' },
];

const TCFG: Record<string, { icon: string; label: string; color: string }> = {
  'escola':       { icon: '🏫', label: 'Escola',         color: '#2563EB' },
  'area-escolar': { icon: '🏫', label: 'Área Escolar',   color: '#8B5CF6' },
  'faixa-elevada':{ icon: '♿', label: 'Faixa Elevada', color: '#22C55E' },
  'ciclovia':     { icon: '🚴', label: 'Ciclovia',       color: '#F97316' },
  'rotatoria':    { icon: '🌀', label: 'Rotatória',      color: '#FACC15' },
};

const MARKER_POS = [
  { left: '18%', top: '25%' }, { left: '58%', top: '35%' },
  { left: '35%', top: '55%' }, { left: '70%', top: '65%' },
  { left: '45%', top: '20%' },
];

export default function MapPage() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<MapPoint | null>(null);

  const points = filter === 'all' ? POINTS : POINTS.filter(p => p.type === filter);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <header className="bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🗺️</span>
            <div><h1 className="font-bold text-sm">Mapa Educativo</h1><p className="text-xs text-blue-400">{points.length} pontos de interesse</p></div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button onClick={() => setFilter('all')} className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white/10 text-slate-400'}`}>🌐 Todos</button>
            {Object.entries(TCFG).map(([type, cfg]) => (
              <button key={type} onClick={() => setFilter(type)} className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${filter === type ? 'text-white' : 'bg-white/10 text-slate-400'}`} style={filter === type ? { background: cfg.color } : {}}>
                {cfg.icon} {cfg.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 pt-4">
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-slate-800 to-slate-900" style={{ height: '420px' }}>
          {/* Map background */}
          <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden="true">
            {[...Array(10)].map((_, i) => (<line key={`h${i}`} x1="0" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} stroke="white" strokeWidth="0.5" />))}
            {[...Array(10)].map((_, i) => (<line key={`v${i}`} x1={`${i * 10}%`} y1="0" x2={`${i * 10}%`} y2="100%" stroke="white" strokeWidth="0.5" />))}
            <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#94A3B8" strokeWidth="6" />
            <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#94A3B8" strokeWidth="6" />
            <line x1="60%" y1="0" x2="60%" y2="100%" stroke="#94A3B8" strokeWidth="4" />
            <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#94A3B8" strokeWidth="3" />
          </svg>

          {/* Markers */}
          {points.map((p, i) => {
            const pos = MARKER_POS[i % MARKER_POS.length];
            const cfg = TCFG[p.type];
            const sel = selected?.id === p.id;
            return (
              <button
                key={p.id}
                style={{ left: pos.left, top: pos.top }}
                onClick={() => setSelected(sel ? null : p)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${sel ? 'z-20 scale-125' : 'z-10 hover:scale-110'}`}
                aria-label={`Ponto: ${p.name}`}
              >
                <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg shadow-lg" style={{ background: cfg.color, borderColor: 'white' }}>
                  {cfg.icon}
                </div>
                {sel && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-b-2 border-r-2" style={{ borderColor: cfg.color, background: '#1E293B' }} aria-hidden="true" />
                )}
              </button>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur rounded-xl p-3">
            <p className="text-xs text-slate-400 mb-2">Toque em um ponto para ver detalhes</p>
            <div className="flex gap-2 flex-wrap">
              {Object.values(TCFG).map(cfg => (
                <span key={cfg.label} className="text-xs flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full">
                  <span>{cfg.icon}</span> <span className="text-slate-300">{cfg.label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* List */}
        <div className="mt-4 space-y-2 pb-8">
          {points.map((p, i) => {
            const cfg = TCFG[p.type];
            return (
              <button key={p.id} onClick={() => setSelected(p)} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 flex items-center gap-3 text-left transition-all animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${cfg.color}20` }}>{cfg.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{p.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{cfg.label}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Point detail */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center" onClick={() => setSelected(null)}>
          <div className="bg-[#1E293B] border-t border-white/10 rounded-t-3xl w-full max-w-xl animate-drop-in" onClick={e => e.stopPropagation()}>
            <div className="p-5">
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${TCFG[selected.type].color}20` }}>{TCFG[selected.type].icon}</div>
                <div className="flex-1">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${TCFG[selected.type].color}20`, color: TCFG[selected.type].color }}>{TCFG[selected.type].label}</span>
                  <h2 className="font-black text-lg mt-1">{selected.name}</h2>
                </div>
                <button onClick={() => setSelected(null)} className="p-2 bg-white/5 rounded-lg" aria-label="Fechar"><X className="w-4 h-4 text-slate-400" /></button>
              </div>
              <p className="mt-4 text-sm text-slate-300 leading-relaxed">{selected.description}</p>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2">
                  <Navigation className="w-4 h-4" aria-hidden="true" /> Como chegar
                </button>
                <button className="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold py-3 px-4 rounded-xl transition-all text-sm">
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
