'use client';

import { useState } from 'react';
import { ChevronRight, CheckCircle2, XCircle, Lightbulb, ArrowRight } from 'lucide-react';
import { SimulatorScenario } from '@/types';

const SCENARIOS: SimulatorScenario[] = [
  {
    id: 's1', title: 'Cruzamento sem semáforo', description: 'Você está chegando a um cruzamento sem semáforo. O que você faz?', imageUrl: '',
    situation: 'Você dirige um carro azul e está no cruzamento. Um pedestre começa a atravessar na faixa. Outro veículo vem pela direita.',
    question: 'O que você deve fazer neste cruzamento?',
    options: ['Acelerar e atravessar antes do pedestre', 'Parar e dar preferência ao pedestre na faixa', 'Buzinar para o pedestre sair da frente', 'Parar, verificar os dois lados e avançar com segurança'],
    correctIndex: 3,
    explanation: 'Em cruzamentos sem semáforo: 1) Pedestres na faixa SEMPRE têm preferência. 2) Quem vem pela direita tem preferência entre veículos. A resposta correta é parar, verificar os dois lados, ceder ao pedestre e ao veículo da direita, e só então avançar com segurança.',
  },
  {
    id: 's2', title: 'Entrando em uma rotatória', description: 'Você vai entrar em uma rotatória. Qual a regra principal?', imageUrl: '',
    situation: 'Uma rotatória de 3 ramos. Você quer seguir em frente (2º ramo). Um caminhão está circulando dentro da rotatória.',
    question: 'Qual a regra de preferência na rotatória?',
    options: ['Você tem preferência, pois está entrando', 'O caminhão tem preferência, pois já está na rotatória', 'Ambos têm o mesmo direito, acelere!', 'Use o pisca-alerta e entre'],
    correctIndex: 1,
    explanation: 'A regra de ouro das rotatórias: VEÍCULOS DENTRO TÊM PREFERÊNCIA. Sempre pare na entrada, deixe o veículo que está circulando passar, e só então entrar com segurança.',
  },
  {
    id: 's3', title: 'Ultrapssagem proibida', description: 'Você quer ultrapassar. Mas há uma faixa contínua no asfalto.', imageUrl: '',
    situation: 'Você está em uma via de mão dupla. À frente há uma linha amarela contínua (dupla) no meio da rua.',
    question: 'O que você deve fazer?',
    options: ['Ultrapssar, pois ninguém vai ver', 'Aguardar até a faixa seccionar (ficar tracejada)', 'Buzinar para o veículo à frente se afastar', 'Ultrapssar pela esquerda, pois a direita é mais segura'],
    correctIndex: 1,
    explanation: 'Faixa contínua AMARELA (simples ou dupla) separa fluxos de sentidos opostos. crossing is PROHIBITED. Aguarde até que a faixa seccione para ultrapasssar com segurança.',
  },
  {
    id: 's4', title: 'Criança no veículo', description: 'Você vai viajar com seu sobrinho de 8 anos. Ele pode ir no banco dianteiro?', imageUrl: '',
    situation: 'Seu sobrinho de 8 anos vai passear com você. Ele está animado para sentar na frente.',
    question: 'Qual é a regra para crianças no banco dianteiro?',
    options: ['Sim, a partir dos 7 anos pode sentar na frente', 'Sim, crianças podem sentar na frente sem restrição', 'Não, menores de 10 anos devem ir no banco traseiro', 'Depende do tamanho da criança, não da idade'],
    correctIndex: 2,
    explanation: 'O CTB é claro: crianças menores de 10 anos DEVEM viajar no banco traseiro, com equipamento adequado. No banco dianteiro, só é permitido a partir dos 10 anos ou 1,45m de altura.',
  },
  {
    id: 's5', title: 'Celular ao volante', description: 'Seu celular toca. O que você faz?', imageUrl: '',
    situation: 'Você está dirigindo em uma avenida movimentada. Seu celular começa a tocar.',
    question: 'Qual a atitude correta?',
    options: ['Atender rapidamente só para saber quem é', 'Atender com o viva-voz ativado', 'Parar em local seguro para atender', 'Ignorar, pois dar answer é mais perigoso'],
    correctIndex: 2,
    explanation: 'Manusear o celular enquanto dirige é PROIBIDO — infração grave com 7 pontos na CNH e multa de R$ 293,47. A única opção segura é PARAR EM LOCAL SEGURO antes de atender.',
  },
];

export default function SimulatorPage() {
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const scenario = SCENARIOS[idx];
  const isCorrect = answer === scenario.correctIndex;

  const handleAnswer = (i: number) => {
    if (showResult) return;
    setAnswer(i);
    setShowResult(true);
    if (i === scenario.correctIndex) setScore(s => s + 1);
  };

  const next = () => {
    if (idx < SCENARIOS.length - 1) { setIdx(i => i + 1); setAnswer(null); setShowResult(false); }
    else setDone(true);
  };

  const restart = () => { setIdx(0); setAnswer(null); setShowResult(false); setScore(0); setDone(false); };

  if (done) {
    const pct = Math.round((score / SCENARIOS.length) * 100);
    return (
      <div className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-sm animate-scale-in">
          <div className="text-7xl mb-4">{pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚'}</div>
          <h2 className="text-2xl font-black mb-2">{pct >= 80 ? 'Excelente!' : pct >= 60 ? 'Bom trabalho!' : 'Continue estudando!'}</h2>
          <p className="text-slate-400 mb-6">Você acertou <span className="text-blue-400 font-bold">{score}/{SCENARIOS.length}</span> cenários ({pct}%)</p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
            <p className="text-sm text-slate-300">💡 Revise as placas na Biblioteca e refaça os quizzes para melhorar!</p>
          </div>
          <button onClick={restart} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all text-sm">Refazer simulador</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <header className="bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎥</span>
              <div><h1 className="font-bold text-sm">Simulador</h1><p className="text-xs text-blue-400">Teste situações reais</p></div>
            </div>
            <div className="text-center"><p className="text-xs text-slate-400">Questão</p><p className="font-bold text-sm">{idx + 1}/{SCENARIOS.length}</p></div>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-progress-fill" style={{ width: `${((idx) / SCENARIOS.length) * 100}%` }} />
          </div>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">Pontuação: <span className="text-blue-400 font-bold">{score} acertos</span></span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden animate-slide-up" key={scenario.id}>
          <div className="h-36 bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center text-5xl relative">
            🚦
            <div className="absolute bottom-3 left-4 right-4"><span className="text-xs bg-black/50 backdrop-blur px-2 py-1 rounded-full">{scenario.title}</span></div>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <p className="text-xs text-blue-400 font-semibold uppercase mb-1">Situação</p>
              <p className="text-sm text-slate-300">{scenario.situation}</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-sm text-yellow-200 font-medium">{scenario.question}</p>
              </div>
            </div>
            <div className="space-y-2">
              {scenario.options.map((opt, oi) => {
                const correctOpt = oi === scenario.correctIndex;
                let cls = 'bg-white/5 border-white/10 hover:bg-white/10';
                if (showResult && correctOpt) cls = 'bg-green-500/20 border-green-500/40';
                if (showResult && oi === answer && !correctOpt) cls = 'bg-red-500/20 border-red-500/40';
                return (
                  <button key={oi} onClick={() => handleAnswer(oi)} disabled={showResult} className={`w-full text-left rounded-xl p-4 border transition-all text-sm font-medium ${cls} ${showResult ? 'cursor-default' : 'cursor-pointer'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${showResult && correctOpt ? 'bg-green-500 text-white' : showResult && oi === answer ? 'bg-red-500 text-white' : 'bg-white/10'}`} aria-hidden="true">
                        {showResult && correctOpt ? <CheckCircle2 className="w-4 h-4" /> : showResult ? <XCircle className="w-4 h-4" /> : String.fromCharCode(65 + oi)}
                      </div>
                      <span className="flex-1">{opt}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {showResult && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 animate-slide-up">
                <p className="text-xs text-blue-400 font-semibold uppercase mb-2">📖 Explicação</p>
                <p className="text-sm text-slate-300 leading-relaxed mb-3">{scenario.explanation}</p>
                <button onClick={next} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2">
                  {idx < SCENARIOS.length - 1 ? 'Próximo cenário' : 'Ver resultado final'} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-24" />
    </div>
  );
}
