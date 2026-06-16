'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, ChevronRight, ExternalLink, Navigation } from 'lucide-react';
import { MapPoint } from '@/types';

const MOCK_POINTS: MapPoint[] = [
  { id: '1', name: 'EMEF José Alencar', type: 'escola', lat: -3.7172, lng: -38.5433, description: 'Escola municipal com área escolar sinalizada. Atenção: limite 30 km/h.', imageUrl: '', },
  { id: '2', name: 'Avenida Beira-Mar — Faixa Elevada', type: 'faixa-elevada', lat: -3.7272, lng: -38.5333, description: 'Faixa de pedestres elevada com solar светильники. Melhora a segurança.', imageUrl: '', },
  { id: '3', name: 'Ciclovia da Avenida Dom Luís', type: 'ciclovia', lat: -3.7372, lng: -38.5233, description: 'Ciclovia segregada com 4km de extensão. Conecta o Centro ao Bairro.', imageUrl: '', },
  { id: '4', name: 'Rotatória da Aldeota', type: 'rotatoria', lat: -3.7472, lng: -38.5133, description: 'Rotatória de 4 ramos. Preference sempre aos veículos dentro do anel.', imageUrl: '', },
  { id: '5', name: 'Colégio Militar — Área Escolar', type: 'area-escolar', lat: -3.7272, lng: -38.5533, description: 'Área escolar com zone 30 km/h. Período: 6h-18h.', imageUrl: '', },
];

const TYPE_CONFIG: Record<string, { icon: string; label: string; color: string }> = {
  'escola': { icon: '🏫', label: 'Escola', color: '#2563EB' },
  'area-escolar': { icon: '🏫', label: 'Área Escolar', color: '#8B5CF6' },
  'faixa-elevada': { icon: '♿', label: 'Faixa Elevada', color: '#22C55E' },
  'ciclovia': { icon: '🚴', label: 'Ciclovia', color: '#F97316' },
  'rotatoria': { icon: '🌀', label: 'Rotatória', color: '#FACC15' },
};

export default function MapPage() {
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredPoints = activeFilter === 'all' ? MOCK_POINTS : MOCK_POINTS.filter(p => p.type === activeFilter);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Header */}
      <header className="bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🗺️</span>
            <div>
              <h1 className="font-bold text-sm">Mapa Educativo</h1>
              <p className="text-xs text-blue-400">Pontos de interesse no trânsito</p>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button onClick={() => setActiveFilter('all')} className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${activeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-white/10 text-slate-400'}`}>
              🌐 Todos
            </button>
            {Object.entries(TYPE_CONFIG).map(([type, cfg]) => (
              <button key={type} onClick={() => setActiveFilter(type)} className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${activeFilter === type ? 'bg-white text-white' : 'bg-white/10 text-slate-400'}`}>
                {cfg.icon} {cfg.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Map visualization */}
      <div className="max-w-xl mx-auto px-4 pt-4">
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-slate-800 to-slate-900" style={{ height: '420px' }}>
          {/* Simulated map background */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              {[...Array(10)].map((_, i) => (
                <line key={`h${i}`} x1="0" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} stroke="white" strokeWidth="0.5" />
              ))}
              {[...Array(10)].map((_, i) => (
                <line key={`v${i}`} x1={`${i * 10}%`} y1="0" x2={`${i * 10}%`} y2="100%" stroke="white" strokeWidth="0.5" />
              ))}
              {/* Main roads */}
              <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#94A3B8" strokeWidth="6" />
              <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#94A3B8" strokeWidth="6" />
              <line x1="60%" y1="0" x2="60%" y2="100%" stroke="#94A3B8" strokeWidth="4" />
              <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#94A3B8" strokeWidth="3" />
            </svg>
          </div>

          {/* Map markers */}
          {filteredPoints.map((point, i) => {
            const positions = [
              { left: '18%', top: '25%' }, { left: '58%', top: '35%' },
              { left: '35%', top: '55%' }, { left: '70%', top: '65%' },
              { left: '45%', top: '20%' },
            ];
            const pos = positions[i % positions.length];
            const cfg = TYPE_CONFIG[point.type];
            const isSelected = selectedPoint?.id === point.id;

            return (
              <motion.button
                key={point.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                style={{ left: pos.left, top: pos.top }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${isSelected ? 'z-20 scale-125' : 'z-10 hover:scale-110'}`}
                onClick={() => setSelectedPoint(isSelected ? null : point)}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg shadow-lg" style={{ background: cfg.color, borderColor: 'white' }}>
                    {cfg.icon}
                  </div>
                  {isSelected && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-b-2 border-r-2" style={{ borderColor: cfg.color, background: '#1E293B' }} />
                  )}
                </div>
              </motion.button>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur rounded-xl p-3">
            <p className="text-xs text-slate-400 mb-2">Toque em um ponto para ver detalhes</p>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(TYPE_CONFIG).map(([type, cfg]) => (
                <span key={type} className="text-xs flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full">
                  <span>{cfg.icon}</span> <span className="text-slate-300">{cfg.label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Point List */}
        <div className="mt-4 space-y-2 pb-8">
          {filteredPoints.map(point => {
            const cfg = TYPE_CONFIG[point.type];
            return (
              <button
                key={point.id}
                onClick={() => setSelectedPoint(point)}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 flex items-center gap-3 text-left transition-all"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${cfg.color}20` }}>
                  {cfg.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{point.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{cfg.label}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Point Detail */}
      <AnimatePresence>
        {selectedPoint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center"
            onClick={() => setSelectedPoint(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onClick={e => e.stopPropagation()}
              className="bg-[#1E293B] border-t border-white/10 rounded-t-3xl w-full max-w-xl"
            >
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${TYPE_CONFIG[selectedPoint.type].color}20` }}>
                    {TYPE_CONFIG[selectedPoint.type].icon}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${TYPE_CONFIG[selectedPoint.type].color}20`, color: TYPE_CONFIG[selectedPoint.type].color }}>
                      {TYPE_CONFIG[selectedPoint.type].label}
                    </span>
                    <h2 className="font-black text-lg mt-1">{selectedPoint.name}</h2>
                  </div>
                  <button onClick={() => setSelectedPoint(null)} className="p-2 bg-white/5 rounded-lg">
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                </div>

                <p className="mt-4 text-sm text-slate-300 leading-relaxed">{selectedPoint.description}</p>

                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2">
                    <Navigation className="w-4 h-4" /> Como chegar
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold py-3 px-4 rounded-xl transition-all text-sm">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
