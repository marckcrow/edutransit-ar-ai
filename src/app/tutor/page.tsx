'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Lightbulb, Volume2, BookOpen, ShieldCheck } from 'lucide-react';
import { ChatMessage } from '@/types';

const QUICK_QUESTIONS = [
  'O que significa esta placa?',
  'Posso estacionar aqui?',
  'Como funciona uma rotatória?',
  'Quem tem preferência neste cruzamento?',
  'O que é faixa contínua?',
  'Qual a velocidade máxima na via?',
  'Posso usar celular dirigindo?',
  'Quando usar o pisca-alerta?',
];

const AI_RESPONSES: Record<string, string> = {
  'O que significa esta placa?': 'Para te ajudar melhor, descreva a placa: qual a cor, formato e símbolo?\n\n🔴 Placa vermelha circular → geralmente PROIBIÇÃO\n🟡 Placa amarela triangular → ADVERTÊNCIA\n🔵 Placa azul circular → OBRIGAÇÃO\n🟢 Placa verde retangular → INDICAÇÃO\n\nOu me diga o nome: &quot;Identifique a placa PARE&quot; e eu explico!',
  'Posso estacionar aqui?': 'Para saber se pode estacionar, observe:\n\n✅ **Pode estacionar** se:\n- Não há placa de proibido\n- Não há faixa amarela\n- Não é mão contrária\n- Distância mínima de 5m de cruzamentos\n\n❌ **Não pode estacionar** se:\n- Placa &quot;Proibido Estacionar&quot;\n- Sobre faixa de pedestres\n- Menos de 5m de cruzamento\n- Em fila dupla',
  'Como funciona uma rotatória?': '🌀 **Rotatória — Passo a passo:**\n\n1️⃣ Reduza a velocidade ao se aproximar\n2️⃣ Circule à **esquerda** no sentido horário\n3️⃣ 🚗 Veículos **dentro** da rotatória têm **preferência**\n4️⃣ Sempre dê seta para indicar sua saída\n5️⃣ Saia pela **direita** do anel\n\n📌 Lembrete: Quem está dentro, tem vez!',
  'Quem tem preferência neste cruzamento?': 'A preferência em cruzamentos:\n\n🛑 **Com semáforo:** siga as luzes\n\n🚦 **Sem semáforo:**\n1. Pedestres na faixa SEMPRE têm preferência\n2. Veículos que vêm pela **direita** (regra geral)\n3. Mas: se houver placa PARE, esses veículos têm prioridade\n4. Veículos já no cruzamento têm preferência\n\n⚠️ Na dúvida, **pare** e avalie com calma.',
  'O que é faixa contínua?': '📏 **Faixa Contínua** — Sinalização Horizontal\n\n🟡 **Amarela:** Separa fluxos de sentidos opostos.\n→ Não pode atravessar ou ultrapassar!\n\n⚪ **Branca:** Separa faixas do mesmo sentido.\n→ Também não pode atravessar!\n\n🔴 **Dupla amarela:** Proibição total dos dois lados.',
  'Qual a velocidade máxima na via?': '📊 **Limites de velocidade no Brasil:**\n\n🏙️ **Área urbana:**\n- Via local: 30 km/h\n- Via coletora: 40 km/h\n- Via arterial: 60 km/h\n- Via de trânsito rápido: 80 km/h\n\n🛣️ **Rodovia:**\n- Carros e motos: 110 km/h\n- Ônibus: 90 km/h\n- Caminhões: 80 km/h\n\n⚠️ Observe sempre as placas!',
  'Posso usar celular dirigindo?': '❌ **NÃO!** Desde 2016, é **proibido** manusear celular enquanto dirige.\n\n📋 **Infração:** Grave — 7 pontos na CNH + multa R$ 293,47\n\n✅ **Alternativas seguras:**\n- Use suporte de celular com viva-voz\n- Pare em local seguro para atender\n- Ative o &quot;Não perturbe&quot; ao dirigir\n\n📵 Celular = 5x mais risco de acidente!',
  'Quando usar o pisca-alerta?': '💡 **Pisca-alerta — Quando usar:**\n\n✅ **CORRETO:**\n- Veículo parado ou em emergência\n- Velocidade reduzida (máx. 60 km/h)\n- Chuva forte, neblina\n- Indicando saída de rotatória\n\n❌ **PROIBIDO:**\n- Com veículo em movimento normal\n- Para agradecer outro motorista\n\n⚠️ Multa média: 4 pontos + R$ 130,16',
};

const WELCOME = `Olá! Sou seu tutor de trânsito 🚦

Posso ajudar com:
• Significado de placas
• Regras do CTB
• Situações de trânsito
• Segurança no trânsito

O que você quer saber hoje?`;

export default function TutorPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'assistant', content: WELCOME, timestamp: new Date().toISOString() },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text.trim(), timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 800 + Math.random() * 800));

    const answer = AI_RESPONSES[text] ||
      `Ótima pergunta sobre &quot;${text}&quot;!\n\nNo contexto do trânsito brasileiro (CTB), essa é uma questão muito importante para a segurança de todos.\n\nPara te dar uma resposta mais precisa, me diga:\n• Qual é a situação específica?\n• É em via urbana ou rodovia?\n• Há alguma placa no local?\n\nOu explore a **Biblioteca de Placas** para ver informações detalhadas sobre cada sinalização! 📚`;

    const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: answer, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col" style={{ height: '100dvh' }}>
      {/* Header */}
      <header className="bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40 px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <h1 className="font-bold text-sm">Tutor IA de Trânsito</h1>
          <p className="text-xs text-green-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block" aria-hidden="true" /> Online — CTB atualizado
          </p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" role="log" aria-label="Conversa com o tutor IA" aria-live="polite">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-2.5 animate-slide-up ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'assistant' ? 'bg-blue-600/30' : 'bg-purple-600/30'}`}>
              {msg.role === 'assistant' ? <Bot className="w-4 h-4 text-blue-400" aria-hidden="true" /> : <User className="w-4 h-4 text-purple-400" aria-hidden="true" />}
            </div>
            <div className={`max-w-[80%] ${msg.role === 'user' ? 'text-right' : ''}`}>
              <div className={`inline-block rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'assistant' ? 'bg-white/10 border border-white/10' : 'bg-blue-600 text-white'}`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-2.5 animate-slide-up">
            <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-blue-400" aria-hidden="true" />
            </div>
            <div className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 flex gap-1">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-2 h-2 bg-blue-400 rounded-full animate-pulse-dot"
                  style={{ animationDelay: `${i * 200}ms` }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        )}

        {/* Quick questions */}
        {!isTyping && messages.length === 1 && (
          <div className="animate-slide-up">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5" aria-hidden="true" /> Perguntas rápidas
            </p>
            <div className="flex flex-wrap gap-2">
              {QUICK_QUESTIONS.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs px-3 py-2 rounded-full transition-all hover:border-blue-500/50"
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-1 gap-2">
              {[
                { icon: BookOpen, text: 'Consulte a Biblioteca de Placas', color: '#22C55E' },
                { icon: ShieldCheck, text: 'Veja as regras do CTB',         color: '#2563EB' },
              ].map(item => (
                <div key={item.text} className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                  <item.icon className="w-5 h-5" style={{ color: item.color }} aria-hidden="true" />
                  <span className="text-sm text-slate-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 pb-4 pt-2 border-t border-white/5 bg-[#0F172A]/80">
        <div className="flex gap-2 items-end max-w-xl mx-auto">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              placeholder="Pergunte sobre trânsito, placas, CTB..."
              rows={1}
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 pr-12 text-sm text-white placeholder:text-slate-500 resize-none focus:outline-none focus:border-blue-500/50"
              style={{ maxHeight: '120px' }}
              aria-label="Digite sua pergunta"
            />
            {input && (
              <button onClick={() => setInput('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs" aria-label="Limpar">
                ✕
              </button>
            )}
          </div>
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all flex-shrink-0"
            aria-label="Enviar mensagem"
          >
            <Send className="w-4 h-4 text-white" aria-hidden="true" />
          </button>
        </div>
        <p className="text-center text-xs text-slate-500 mt-2">Tutor IA — respostas com base no CTB brasileiro</p>
      </div>
    </div>
  );
}
