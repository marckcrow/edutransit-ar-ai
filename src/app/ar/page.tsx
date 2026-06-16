'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, X, Volume2, AlertTriangle, Zap, ChevronRight, RotateCcw } from 'lucide-react';
import { trafficSigns } from '@/data/signs';
import { TrafficSign } from '@/types';
import {
  loadModel,
  runDetectionLoop,
  checkCameraSupport,
} from './TensorFlowService';

const MOCK_DETECTIONS = [
  'pare', 'velocidade_60', 'rotatoria', 'escola', 'lombada',
];

type DetectionResult = {
  sign: TrafficSign;
  confidence: number;
  timestamp: number;
};

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  regulamentacao: { label: 'Regulamentação', color: 'bg-red-500/20 text-red-400 border-red-500/40' },
  advertencia:   { label: 'Advertência',    color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' },
  indicacao:     { label: 'Indicação',      color: 'bg-blue-500/20 text-blue-400 border-blue-500/40' },
  horizontal:    { label: 'Horizontal',     color: 'bg-white/10 text-white border-white/30' },
  seguranca:     { label: 'Segurança',     color: 'bg-green-500/20 text-green-400 border-green-500/40' },
};

const SIGN_ICONS: Record<string, string> = {
  regulamentacao: '🛑',
  advertencia:   '⚠️',
  indicacao:     'ℹ️',
  horizontal:    '📏',
  seguranca:     '🛡️',
};

export default function ARPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState<boolean | null>(null);
  const [selectedSign, setSelectedSign] = useState<TrafficSign | null>(null);
  const [currentDetection, setCurrentDetection] = useState<DetectionResult | null>(null);
  const [showTutorial, setShowTutorial] = useState(true);
  const [detectionHistory, setDetectionHistory] = useState<DetectionResult[]>([]);
  const [activeTab, setActiveTab] = useState<'camera' | 'simulate'>('simulate');
  const [selectedSignId, setSelectedSignId] = useState<string>('pare');
  const [tfLoaded, setTfLoaded] = useState(false);
  const [tfMode, setTfMode] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stopLoopRef = useRef<{ stop: () => void } | null>(null);

  // Load TF model on mount
  useEffect(() => {
    loadModel().then(ok => {
      setTfLoaded(ok);
      if (ok) setTfMode(true);
    });
    checkCameraSupport().then(setHasCamera);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => { stopLoopRef.current?.stop(); };
  }, []);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setHasCamera(true);
        setIsScanning(true);

        // Start TF detection loop
        if (tfLoaded) {
          stopLoopRef.current?.stop();
          stopLoopRef.current = runDetectionLoop(
            videoRef.current,
            (signId, confidence) => {
              const fullSign = trafficSigns.find(s => s.id === signId);
              if (fullSign) {
                const result: DetectionResult = { sign: fullSign, confidence, timestamp: Date.now() };
                setCurrentDetection(result);
                setSelectedSign(fullSign);
                setDetectionHistory(prev => [result, ...prev.slice(0, 9)]);
              }
            },
            err => console.warn('[AR]', err),
            1200,
          );
        }
      }
    } catch {
      setHasCamera(false);
      setActiveTab('simulate');
    }
  }, [tfLoaded]);

  const stopCamera = useCallback(() => {
    stopLoopRef.current?.stop();
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  }, []);

  const simulateDetection = useCallback(() => {
    const signId = MOCK_DETECTIONS[Math.floor(Math.random() * MOCK_DETECTIONS.length)];
    const fullSign = trafficSigns.find(s => s.id === signId)!;
    const confidence = 0.65 + Math.random() * 0.34;
    return { sign: fullSign, confidence: Math.round(confidence * 100) / 100, timestamp: Date.now() };
  }, []);

  const handleSimulate = () => {
    const result = simulateDetection();
    setCurrentDetection(result);
    setSelectedSign(result.sign);
    setDetectionHistory(prev => [result, ...prev.slice(0, 9)]);
  };

  const resetAR = () => {
    stopCamera();
    setCurrentDetection(null);
    setSelectedSign(null);
    setIsScanning(false);
  };

  const switchToSimulate = () => {
    stopCamera();
    setActiveTab('simulate');
    setCurrentDetection(null);
    setSelectedSign(null);
  };

  const confidenceColor = (c: number) =>
    c >= 0.85 ? 'text-green-400' : c >= 0.7 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Header */}
      <header className="bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
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
              {isScanning ? '🔴 Ao vivo' : tfMode && tfLoaded ? '🤖 ML Ready' : '⚡ Simulação'}
            </span>
            <button onClick={resetAR} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all" aria-label="Resetar">
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
            onClick={switchToSimulate}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'simulate' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
          >
            <Zap className="w-4 h-4" /> Simular AR
          </button>
        </div>
      </div>

      {/* Tutorial overlay */}
      {showTutorial && !currentDetection && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#1E293B] border border-white/10 rounded-3xl p-6 max-w-sm w-full text-center animate-scale-in">
            <div className="text-5xl mb-4 animate-float">🚦</div>
            <h2 className="text-xl font-black mb-2">Modo AR na Rua</h2>
            <p className="text-slate-400 text-sm mb-4">
              Apont a câmera para qualquer placa de trânsito e receba informações em tempo real com IA.
            </p>
            <div className="space-y-2 text-left mb-5">
              {['📸 Identificação automática de placas', '🔊 Áudio explicativo', '📖 Detalhes sobre o CTB', '🏆 Ganhe XP por detecções'].map(tip => (
                <p key={tip} className="text-sm text-slate-300 flex items-center gap-2">
                  <span className="text-green-400">✓</span> {tip}
                </p>
              ))}
            </div>
            <button
              onClick={() => setShowTutorial(false)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all animate-bounce-in"
            >
              Começar! 🚀
            </button>
          </div>
        </div>
      )}

      {/* Camera view or simulation */}
      <div className="max-w-xl mx-auto px-4 pt-4">
        {activeTab === 'camera' ? (
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black" style={{ aspectRatio: '4/3' }}>
            {hasCamera === false ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center p-6">
                <AlertTriangle className="w-12 h-12 text-yellow-400" />
                <p className="text-slate-300 font-medium">Câmera não disponível</p>
                <p className="text-slate-400 text-sm">Use o modo &quot;Simular AR&quot; para testar</p>
                <button onClick={switchToSimulate} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg text-sm">
                  Ir para Simular AR
                </button>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  playsInline
                  muted
                  autoPlay
                  aria-label="Câmera de realidade aumentada"
                />
                {/* Scanning frame overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                  <div className="relative w-44 h-44">
                    {/* Corner brackets */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-400 rounded-tl-2xl" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-400 rounded-tr-2xl" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-400 rounded-bl-2xl" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-400 rounded-br-2xl" />
                    {/* Scanning line animation */}
                    <div className="absolute left-2 right-2 h-0.5 bg-blue-400/60 animate-pulse" style={{ top: '50%' }} />
                  </div>
                </div>
                {/* TF mode badge */}
                {tfMode && tfLoaded && (
                  <div className="absolute top-3 left-3 bg-green-500/80 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded-full">
                    🤖 TensorFlow.js
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center" style={{ aspectRatio: '4/3' }}>
            <div className="text-6xl mb-4 animate-float">🚦</div>
            <p className="text-slate-300 font-medium mb-2">Simulação AR</p>
            <p className="text-slate-500 text-sm mb-4 text-center px-4">Selecione uma placa para simular a detecção</p>
            <select
              value={selectedSignId}
              onChange={e => setSelectedSignId(e.target.value)}
              className="bg-white/10 border border-white/20 text-white text-sm rounded-lg px-3 py-2 w-full max-w-xs mx-4 mb-3"
              aria-label="Selecionar placa para simulação"
            >
              <option value="">Selecione uma placa...</option>
              {trafficSigns.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <button
              onClick={handleSimulate}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-6 rounded-xl transition-all text-sm flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4" /> Simular Detecção
            </button>
          </div>
        )}
      </div>

      {/* Detection Result Card */}
      {selectedSign && currentDetection && (
        <div className="max-w-xl mx-auto px-4 pt-4 animate-slide-up" role="region" aria-label="Resultado da detecção">
          <div className="ar-card">
            {/* Confidence badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${CONFIDENCE_COLOR(currentDetection.confidence)}`}>
                  {Math.round(currentDetection.confidence * 100)}% confiança
                </span>
              </div>
              <button onClick={resetAR} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all" aria-label="Fechar">
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Sign info */}
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${SIGN_BG[selectedSign.category] ?? '#1E293B'}, ${SIGN_BG2[selectedSign.category] ?? '#1E40AF'})` }}
              >
                {SIGN_ICONS[selectedSign.category] || '📋'}
              </div>
              <div className="flex-1 min-w-0">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${CATEGORY_LABELS[selectedSign.category]?.color}`}>
                  {CATEGORY_LABELS[selectedSign.category]?.label}
                </span>
                <h2 className="font-black text-lg mt-1">{selectedSign.name}</h2>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{selectedSign.description}</p>
              </div>
            </div>

            {/* Meaning */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 mb-3">
              <p className="text-xs text-blue-400 font-semibold uppercase mb-1">Significado</p>
              <p className="text-sm text-slate-200">{selectedSign.meaning}</p>
            </div>

            {/* Usage */}
            {selectedSign.usage && (
              <div className="mb-3">
                <p className="text-xs text-slate-400 font-semibold uppercase mb-1">Onde é utilizada</p>
                <p className="text-sm text-slate-300">{selectedSign.usage}</p>
              </div>
            )}

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

            {/* CTB */}
            {selectedSign.ctbArticle && (
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                <Volume2 className="w-3.5 h-3.5" />
                Base legal: <span className="text-blue-400">{selectedSign.ctbArticle}</span> do CTB
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
        </div>
      )}

      {/* Detection History */}
      {!selectedSign && detectionHistory.length > 0 && (
        <div className="max-w-xl mx-auto px-4 pt-4 pb-8">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Histórico de Detecções</h3>
          <div className="space-y-2">
            {detectionHistory.map((d, i) => (
              <button
                key={d.timestamp}
                onClick={() => { setSelectedSign(d.sign); setCurrentDetection(d); }}
                className={`w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 flex items-center gap-3 text-left transition-all animate-slide-in-left`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                  {SIGN_ICONS[d.sign.category] || '📋'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{d.sign.name}</p>
                  <p className="text-xs text-slate-400">{CATEGORY_LABELS[d.sign.category]?.label}</p>
                </div>
                <span className={`text-xs font-bold ${confidenceColor(d.confidence)}`}>
                  {Math.round(d.confidence * 100)}%
                </span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!currentDetection && !selectedSign && detectionHistory.length === 0 && (
        <div className="max-w-xl mx-auto px-4 pt-8 pb-12 text-center">
          <div className="text-5xl mb-4 animate-float">📷</div>
          <h3 className="font-bold text-lg mb-2">Nenhuma placa detectada</h3>
          <p className="text-slate-400 text-sm mb-6">
            Apont a câmera para uma placa de trânsito ou use o modo simulação.
          </p>
          <button
            onClick={switchToSimulate}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-all inline-flex items-center gap-2"
          >
            <Zap className="w-4 h-4" /> Testar simulação
          </button>
        </div>
      )}

      <div className="h-24" />
    </div>
  );
}

// Helper color functions (avoid in JSX to prevent re-render issues)
function CONFIDENCE_COLOR(c: number): string {
  return c >= 0.85 ? 'bg-green-500/20 text-green-400 border-green-500/40' :
         c >= 0.7  ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' :
                     'bg-red-500/20 text-red-400 border-red-500/40';
}

const SIGN_BG: Record<string, string> = {
  regulamentacao: '#7F1D1D',
  advertencia:   '#78350F',
  indicacao:     '#1E3A5F',
  horizontal:    '#1E293B',
  seguranca:     '#14532D',
};

const SIGN_BG2: Record<string, string> = {
  regulamentacao: '#991B1B',
  advertencia:   '#92400E',
  indicacao:     '#1E40AF',
  horizontal:    '#334155',
  seguranca:     '#166534',
};
