'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle2, XCircle, Lightbulb, ArrowRight } from 'lucide-react';
import { SimulatorScenario } from '@/types';

const SCENARIOS: SimulatorScenario[] = [
  {
    id: 's1',
    title: 'Cruzamento sem semáforo',
    description: 'Você está chegando a um cruzamento sem semáforo. O que você faz?',
    imageUrl: '',
    situation: 'Você dirige um carro azul e está no cruzamento. Um pedestre começa a atravessar na faixa. Outro veículo vem pela direita.',
    question: 'O que você deve fazer neste cruzamento?',
    options: [
      'Acelerar e atravessar antes do pedestre',
      'Parar e dar preferência ao pedestre na faixa',
      'Buzinar para o pedestre sair da frente',
      'Parar, verificar os dois lados e avançar com segurança',
    ],
    correctIndex: 3,
    explanation: 'Em cruzamentos sem semáforo: 1) Pedestres na faixa SEMPRE têm preferência. 2) Quem vem pela direita tem preferência entre veículos. A resposta correta é parar, verificar os dois lados, ceder ao pedestre e ao veículo da direita, e só então avançar.',
  },
  {
    id: 's2',
    title: 'Entrando em uma rotatória',
    description: 'Você vai entrar em uma rotatória. Qual a regra principal?',
    imageUrl: '',
    situation: 'Uma rotatória de 3 ramos. Você quer seguir em frente (2º ramo). Um caminhão está circulando dentro da rotatória.',
    question: 'Qual a regra de preferência na rotatória?',
    options: [
      'Você tem preferência, pois está entrando',
      'O caminhão tem preferência, pois já está na rotatória',
      'Ambos têm o mesmo direito, acelere!',
      'Use o pisca-alerta e entre',
    ],
    correctIndex: 1,
    explanation: 'A regra de ouro das rotatórias: VEÍCULOS DENTRO TÊM PREFERÊNCIA. Sempre pare na entrada, deixe o veículo que está circulando passar, e só então entre com segurança.',
  },
  {
    id: 's3',
    title: 'Ultrapssagem proibida',
    description: 'Você quer ultrapassar. Mas há uma faixa contínua no asfalto.',
    imageUrl: '',
    situation: 'Você está em uma via de mão dupla. À frente há uma linha amarela contínua (dupla) no meio da rua.',
    question: 'O que você deve fazer?',
    options: [
      'Ultrapssar, pois ninguém vai ver',
      'Aguardar até a faixa seccionar (ficar tracejada)',
      'Buzinar para o veículo à frente se afastar',
      'Ultrapssar pela esquerda, pois a direita é mais segura',
    ],
    correctIndex: 1,
    explanation: 'Faixa contínua AMARELA (simples ou dupla) separa fluxos de sentidos opostos. crossing is PROHIBITED. Você deve aguardar até que a faixa seccione (ficar tracejada) para poder ultrapasssar com segurança.',
  },
  {
    id: 's4',
    title: 'Criança no veículo',
    description: 'Você vai viajar com seu sobrinho de 8 anos. Ele pode ir no banco dianteiro?',
    imageUrl: '',
    situation: 'Seu sobrinho de 8 anos vai passear com você. Ele está animado para sentar na frente.',
    question: 'Qual é a regra para crianças no banco dianteiro?',
    options: [
      'Sim, a partir dos 7 anos pode sentar na frente',
      'Sim, crianças podem sentar na frente sem restrição',
      'Não, menores de 10 anos devem ir no banco traseiro',
      'Depende do tamanho da criança, não da idade',
    ],
    correctIndex: 2,
    explanation: 'O CTB é claro: crianças menores de 10 anos DEVEM viajar no banco traseiro, com equipamento adequado (bebê-conforto, cadeirinha ou assento de elevação). No banco dianteiro, só é permitido a partir dos 10 anos ou 1,45m de altura.',
  },
  {
    id: 's5',
    title: 'Celular ao volante',
    description: 'Seu celular toca. O que você faz?',
    imageUrl: '',
    situation: 'Você está dirigindo em uma avenida movimentada. Seu celular começa a tocar.',
    question: 'Qual a atitude correta?',
    options: [
      'Atender rapidamente só para saber quem é',
      'Atender com o viva-voz ativado',
      'Parar em local seguro para atender',
      'Ignorar, pois dar answer é mais perigoso',
    ],
    correctIndex: 2,
    explanation: 'Manusear o celular enquanto dirige é PROIBIDO — infração grave com 7 pontos na CNH e multa de R$ 293,47. A única opção segura é PARAR EM LOCAL SEGURO antes de atender. O viva-voz também é proibido se você precisar segurar o celular.',
  },
];

export default function SimulatorPage() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);

  const scenario = SCENARIOS[currentScenario];
  const isCorrect = selectedAnswer === scenario.correctIndex;

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === scenario.correctIndex) {
      setScore(prev => prev + 1);
      setCompletedScenarios(prev => [...new Set([...prev, scenario.id])]);
    }
  };

  const nextScenario = () => {
    if (currentScenario < SCENARIOS.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setCurrentScenario(999); // Finished
    }
  };

  const restart = () => {
    setCurrentScenario(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  // Finished screen
  if (currentScenario >= SCENARIOS.length) {
    const percentage = Math.round((score / SCENARIOS.length) * 100);
    return (
      <div className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-sm">
          <div className="text-7xl mb-4">{percentage >= 80 ? '🏆' : percentage >= 60 ? '👍' : '📚'}</div>
          <h2 className="text-2xl font-black mb-2">
            {percentage >= 80 ? 'Excelente!' : percentage >= 60 ? 'Bom trabalho!' : 'Continue estudando!'}
          </h2>
          <p className="text-slate-400 mb-6">
            Você acertou <span className="text-blue-400 font-bold">{score}/{SCENARIOS.length}</span> cenários ({percentage}%)
          </p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
            <p className="text-sm text-slate-300">💡 Dica: Revise as placas na Biblioteca e refaça os quizzes para melhorar sua pontuação!</p>
          </div>
          <button onClick={restart} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all">
            Refazer simulador
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Header */}
      <header className="bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎥</span>
              <div>
                <h1 className="font-bold text-sm">Simulador de Situações</h1>
                <p className="text-xs text-blue-400">Teste sua tomada de decisão</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-400">Questão</p>
              <p className="font-bold text-sm">{currentScenario + 1}/{SCENARIOS.length}</p>
            </div>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentScenario) / SCENARIOS.length) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-5">
        {/* Score */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Pontuação:</span>
            <span className="font-bold text-blue-400">{score} acertos</span>
          </div>
          {completedScenarios.includes(scenario.id) && (
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-semibold">
              ✅ Respondido
            </span>
          )}
        </div>

        {/* Scenario Card */}
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-5"
        >
          {/* Scenario visual */}
          <div className="h-40 bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center text-5xl relative">
            🚦
            <div className="absolute bottom-3 left-4 right-4">
              <span className="text-xs bg-black/50 backdrop-blur px-2 py-1 rounded-full">{scenario.title}</span>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <div>
              <p className="text-xs text-blue-400 font-semibold uppercase mb-1">Situação</p>
              <p className="text-sm text-slate-300 leading-relaxed">{scenario.situation}</p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-200 font-medium">{scenario.question}</p>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {scenario.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrectOption = idx === scenario.correctIndex;
                let bgClass = 'bg-white/5 border-white/10 hover:bg-white/10';
                if (showResult && isCorrectOption) bgClass = 'bg-green-500/20 border-green-500/40';
                if (showResult && isSelected && !isCorrectOption) bgClass = 'bg-red-500/20 border-red-500/40';

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={showResult}
                    className={`w-full text-left rounded-xl p-4 border transition-all text-sm font-medium ${bgClass} ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${showResult && isCorrectOption ? 'bg-green-500 text-white' : showResult && isSelected ? 'bg-red-500 text-white' : 'bg-white/10'}`}>
                        {showResult && isCorrectOption ? <CheckCircle2 className="w-4 h-4" /> : showResult && isSelected ? <XCircle className="w-4 h-4" /> : String.fromCharCode(65 + idx)}
                      </div>
                      <span className="flex-1">{opt}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4"
                >
                  <p className="text-xs text-blue-400 font-semibold uppercase mb-2">📖 Explicação</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{scenario.explanation}</p>
                  <button
                    onClick={nextScenario}
                    className="mt-3 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
                  >
                    {currentScenario < SCENARIOS.length - 1 ? 'Próximo cenário' : 'Ver resultado final'} <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <div className="h-24" />
    </div>
  );
}
