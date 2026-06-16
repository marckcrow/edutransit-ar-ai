'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Info, Volume2, AlertTriangle, CheckCircle, Zap, ChevronRight, RotateCcw, Mic } from 'lucide-react';
import { trafficSigns } from '@/data/signs';
import { TrafficSign } from '@/types';

const MOCK_DETECTIONS: Record<string, Partial<TrafficSign>> = {
  'pare': { id: 'pare', name: 'Placa Pare', category: 'regulamentacao' },
  'velocidade': { id: 'velocidade_60', name: 'Limite 60 km/h', category: 'regulamentacao' },
  'rotatoria': { id: 'rotatoria', name: 'Rotatória', category: 'advertencia' },
  'escola': { id: 'escola', name: 'Área Escolar', category: 'indicacao' },
  'lombada': { id: 'lombada', name: 'Lombada', category: 'advertencia' },
};

type DetectionResult = {
  sign: TrafficSign;
  confidence: number;
  timestamp: number;
};

export default function ARPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [selectedSign, setSelectedSign] = useState<TrafficSign | null>(null);
  const [currentDetection, setCurrentDetection] = useState<DetectionResult | null>(null);
  const [showTutorial, setShowTutorial] = useState(true);
  const [detectionHistory, setDetectionHistory] = useState<DetectionResult[]>([]);
  const [activeTab, setActiveTab] = useState<'camera' | 'simulate'>('simulate');
  const [simulatedSign, setSimulatedSign] = useState<string>('pare');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setHasPermission(true);
        setIsScanning(true);
      }
    } catch {
      setHasPermission(false);
      setActiveTab('simulate');
    }
  }, []);

  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  // Simulated AR detection (replaces TensorFlow in demo mode)
  const simulateDetection = useCallback(() => {
    const keys = Object.keys(MOCK_DETECTIONS);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const partial = MOCK_DETECTIONS[randomKey];
    const fullSign = trafficSigns.find(s => s.id === partial.id)!;
    const confidence = 0.65 + Math.random() * 0.35;
    return { sign: fullSign, confidence: Math.round(confidence * 100) / 100, timestamp: Date.now() };
  }, []);

  const handleSimulate = () => {
    const result = simulateDetection();
    setCurrentDetection(result);
    setSelectedSign(result.sign);
    setDetectionHistory(prev => [result, ...prev.slice(0, 9)]);
  };

  const resetAR = () => {
    setCurrentDetection(null);
    setSelectedSign(null);
    setIsScanning(true);
  };

  const getConfidenceColor = (c: number) => {
    if (c >= 0.85) return { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/40' };
    if (c >= 0.7) return { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/40' };
    return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/40' };
  };

  const getCategoryLabel = (cat: string) => {
    const map: Record<string, { label: string; color: string }> = {
      regulamentacao: { label: 'Regulamentação', color: 'bg-red-500/20 text-red-400 border-red-500/40' },
      advertencia: { label: 'Advertência', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' },
      indicacao: { label: 'Indicação', color: 'bg-blue-500/20 text-blue-400 border-blue-500/40' },
      horizontal: { label: 'Sinalização Horizontal', color: 'bg-white/10 text-white border-white/30' },
      seguranca: { label: 'Segurança', color: 'bg-green-500/20 text-green-400 border-green-500/40' },
    };
    return map[cat] || map.regulamentacao;
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Header */}
      <header className="bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">📷</span>
            <div>
              <h1 className="font-bold text-sm">AR na Rua</h1>
              <p className="text-xs text-blue-400">Realidade Aumentada</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
              {isScanning ? '🔴 Ao vivo' : '⏸️ Pausado'}
            </span>
            <button onClick={resetAR} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
              <RotateCcw className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Tab switcher */}
      <div className="max-w-xl mx-auto px-4 pt-3">
        <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
          <button
            onClick={() => { setActiveTab('camera'); startCamera(); }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'camera' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
          >
            <Camera className="w-4 h-4" /> Câmera Real
          </button>
          <button
            onClick={() => { setActiveTab('simulate'); setIsScanning(false); setCurrentDetection(null); setSelectedSign(null); }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'simulate' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
          >
            <Zap className="w-4 h-4" /> Simular AR
          </button>
        </div>
      </div>

      {/* Tutorial overlay */}
      <AnimatePresence>
        {showTutorial && !currentDetection && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-[#1E293B] border border-white/10 rounded-3xl p-6 max-w-sm w-full text-center">
              <div className="text-5xl mb-4">🚦</div>
              <h2 className="text-xl font-black mb-2">Modo AR na Rua</h2>
              <p className="text-slate-400 text-sm mb-4">
                Apont a câmera para qualquer placa de trânsito e receba informações em tempo real com IA.
              </p>
              <div className="space-y-2 text-left mb-5">
                {['📸 Identificação automática de placas', '🔊 Áudio explicativo', '📖 Detalhes sobre o CTB', '🏆 Ganhe XP por detecções'].map(tip => (
                  <p key={tip} className="text-sm text-slate-300 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /> {tip}
                  </p>
                ))}
              </div>
              <button
                onClick={() => setShowTutorial(false)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all"
              >
                Começar! 🚀
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Camera view or simulation */}
      <div className="max-w-xl mx-auto px-4 pt-4">
        {activeTab === 'camera' ? (
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black aspect-[4/3]">
            {hasPermission === false ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center p-6">
                <AlertTriangle className="w-12 h-12 text-yellow-400" />
                <p className="text-slate-300 font-medium">Camera não disponível</p>
                <p className="text-slate-400 text-sm">Use o modo "Simular AR" para testar</p>
                <button onClick={() => setActiveTab('simulate')} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg text-sm">
                  Ir para Simular AR
                </button>
              </div>
            ) : (
              <>
                <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
                <canvas ref={canvasRef} className="hidden" />
                {/* Scanning frame */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 border-2 border-blue-400/50 rounded-2xl relative">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-400 rounded-tl-lg" />
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-400 rounded-tr-lg" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-400 rounded-bl-lg" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-400 rounded-br-lg" />
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black aspect-[4/3] flex items-center justify-center">
            <div className="text-center p-6">
              <div className="text-6xl mb-4">🚦</div>
              <p className="text-slate-300 font-medium mb-2">Simulação AR</p>
              <p className="text-slate-500 text-sm mb-4">Selecione uma placa para simular</p>
              <select
                value={simulatedSign}
                onChange={e => setSimulatedSign(e.target.value)}
                className="bg-white/10 border border-white/20 text-white text-sm rounded-lg px-3 py-2 w-full max-w-xs"
              >
                <option value="">Selecione...</option>
                {trafficSigns.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              <button
                onClick={handleSimulate}
                className="mt-3 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-6 rounded-xl transition-all text-sm"
              >
                <Zap className="w-4 h-4 inline mr-1" /> Simular Detecção
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detection Result */}
      <AnimatePresence>
        {selectedSign && currentDetection && (
          <motion.div
            key={currentDetection.timestamp}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="max-w-xl mx-auto px-4 pt-4"
          >
            <div className="ar-card relative overflow-hidden">
              {/* Confidence badge */}
              <div className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full border ${getConfidenceColor(currentDetection.confidence).bg} ${getConfidenceColor(currentDetection.confidence).text} ${getConfidenceColor(currentDetection.confidence).border}`}>
                {Math.round(currentDetection.confidence * 100)}% confiança
              </div>

              {/* Sign info */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                  {selectedSign.category === 'regulamentacao' ? '🛑' :
                   selectedSign.category === 'advertencia' ? '⚠️' :
                   selectedSign.category === 'indicacao' ? 'ℹ️' : '🚧'}
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${getCategoryLabel(selectedSign.category).color}`}>
                    {getCategoryLabel(selectedSign.category).label}
                  </span>
                  <h2 className="font-black text-lg mt-1">{selectedSign.name}</h2>
                  <p className="text-slate-400 text-xs mt-1 line-clamp-2">{selectedSign.description}</p>
                </div>
              </div>

              {/* Meaning */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 mb-3">
                <p className="text-xs text-blue-400 font-semibold uppercase mb-1">Significado</p>
                <p className="text-sm text-slate-200">{selectedSign.meaning}</p>
              </div>

              {/* Usage */}
              <div className="mb-3">
                <p className="text-xs text-slate-400 font-semibold uppercase mb-1">Onde é utilizada</p>
                <p className="text-sm text-slate-300">{selectedSign.usage}</p>
              </div>

              {/* Tips */}
              {selectedSign.tips && (
                <div className="mb-3">
                  <p className="text-xs text-yellow-400 font-semibold uppercase mb-2">💡 Dicas de segurança</p>
                  <ul className="space-y-1">
                    {selectedSign.tips.slice(0, 3).map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-yellow-400 flex-shrink-0 mt-0.5">✓</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Penalty */}
              {selectedSign.penalty && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-3">
                  <p className="text-xs text-red-400 font-semibold uppercase mb-1">⚖️ Penalidade</p>
                  <p className="text-sm text-red-200">{selectedSign.penalty}</p>
                </div>
              )}

              {/* CTB Article */}
              {selectedSign.ctbArticle && (
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Base legal: <span className="text-blue-400">{selectedSign.ctbArticle}</span> do CTB</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 mt-2">
                <button className="flex-1 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-blue-300 font-semibold py-2.5 rounded-xl transition-all text-sm flex items-center justify-center gap-1.5">
                  <Volume2 className="w-4 h-4" /> Ouvir explicação
                </button>
                <button onClick={() => setSelectedSign(null)} className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 py-2.5 px-4 rounded-xl transition-all text-sm">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detection History */}
      {detectionHistory.length > 0 && !selectedSign && (
        <div className="max-w-xl mx-auto px-4 pt-4 pb-8">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Histórico de Detecções</h3>
          <div className="space-y-2">
            {detectionHistory.map((d, i) => (
              <motion.button
                key={d.timestamp}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => { setSelectedSign(d.sign); setCurrentDetection(d); }}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 flex items-center gap-3 text-left transition-all"
              >
                <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                  {d.sign.category === 'regulamentacao' ? '🛑' : d.sign.category === 'advertencia' ? '⚠️' : 'ℹ️'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{d.sign.name}</p>
                  <p className="text-xs text-slate-400">{d.sign.category}</p>
                </div>
                <span className={`text-xs font-bold ${d.confidence >= 0.85 ? 'text-green-400' : 'text-yellow-400'}`}>
                  {Math.round(d.confidence * 100)}%
                </span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!currentDetection && !selectedSign && detectionHistory.length === 0 && (
        <div className="max-w-xl mx-auto px-4 pt-8 pb-12 text-center">
          <div className="text-5xl mb-4">📷</div>
          <h3 className="font-bold text-lg mb-2">Nenhuma placa detectada</h3>
          <p className="text-slate-400 text-sm mb-6">
            Apont a câmera para uma placa de trânsito ou use o modo simulação para testar.
          </p>
          <button
            onClick={() => { setActiveTab('simulate'); setIsScanning(false); }}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-all"
          >
            <Zap className="w-4 h-4 inline mr-1" /> Testar simulação
          </button>
        </div>
      )}

      <div className="h-24" />
    </div>
  );
}
