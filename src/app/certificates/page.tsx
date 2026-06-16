'use client';

import { useState } from 'react';
import { Award, Download, Star, Calendar, ShieldCheck } from 'lucide-react';
import { Certificate } from '@/types';

const COURSES = [
  { id: 'c1', name: 'Curso de Placas de Trânsito',         desc: 'Aprenda todas as placas: regulamentação, advertência e indicação.', progress: 100, badge: '🏆', color: '#EF4444' },
  { id: 'c2', name: 'Curso de Pedestres',                   desc: 'Travessia segura, faixas, preferências e comportamentos.', progress: 75, badge: '👶', color: '#22C55E' },
  { id: 'c3', name: 'Curso de Ciclistas',                   desc: 'Ciclovia, respeito, segurança e legislação para ciclistas.', progress: 60, badge: '🚴', color: '#F97316' },
  { id: 'c4', name: 'Curso de Direção Defensiva',            desc: 'Técnicas para evitar acidentes e dirigir com segurança.',  progress: 30, badge: '🛡️', color: '#2563EB' },
  { id: 'c5', name: 'Curso de Primeiros Socorros',         desc: 'O que fazer em caso de acidentes de trânsito.',         progress: 0,  badge: '🚑', color: '#EC4899' },
  { id: 'c6', name: 'Curso de Educação para o Trânsito',    desc: 'Visão geral completa sobre educação no trânsito.',     progress: 45, badge: '📚', color: '#8B5CF6' },
];

export default function CertificatesPage() {
  const [certs, setCerts] = useState<Certificate[]>([
    { id: 'cert1', name: 'Certificado — Curso de Placas de Trânsito', course: 'EduTransit AR AI', issuedAt: '2026-06-10', score: 92 },
  ]);
  const [modal, setModal] = useState<typeof COURSES[0] | null>(null);

  const download = (cert: Certificate) => {
    alert(`📜 Gerando PDF:\n\n${cert.name}\nNota: ${cert.score}%\nData: ${new Date(cert.issuedAt).toLocaleDateString('pt-BR')}\n\n(Em produção, isso gerará um PDF real com QR Code de verificação)`);
  };

  const issue = () => {
    if (!modal) return;
    const cert: Certificate = {
      id: `cert_${Date.now()}`,
      name: `Certificado — ${modal.name}`,
      course: 'EduTransit AR AI',
      issuedAt: new Date().toISOString().split('T')[0],
      score: Math.round(75 + Math.random() * 25),
    };
    setCerts(prev => [cert, ...prev]);
    setModal(null);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <header className="bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center gap-2">
          <span className="text-xl">📜</span>
          <div><h1 className="font-bold text-sm">Certificados</h1><p className="text-xs text-blue-400">{certs.length} certificados</p></div>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-4">
        {certs.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2"><Award className="w-4 h-4" /> Certificados Conquistados</h3>
            <div className="space-y-3">
              {certs.map((cert, i) => (
                <div key={cert.id} className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-2xl p-4 animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-yellow-500/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">🏆</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm leading-tight">{cert.name}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(cert.issuedAt).toLocaleDateString('pt-BR')}</span>
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400" /> {cert.score}%</span>
                      </div>
                    </div>
                    <button onClick={() => download(cert)} className="bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 text-yellow-300 font-semibold py-2 px-3 rounded-xl transition-all text-xs flex items-center gap-1.5 flex-shrink-0">
                      <Download className="w-3.5 h-3.5" aria-hidden="true" /> PDF
                    </button>
                  </div>
                  <div className="mt-3 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/20 rounded-xl p-3 text-center">
                    <p className="text-xs text-slate-400">Certificado de Conclusão</p>
                    <p className="font-black text-lg text-yellow-300">EDU<span className="text-blue-400">TRANSIT</span> AR AI</p>
                    <div className="flex items-center justify-center gap-4 mt-2 text-xs">
                      <span>✅ Verificado</span><span>📅 {new Date(cert.issuedAt).toLocaleDateString('pt-BR')}</span><span>⭐ {cert.score}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Cursos Disponíveis</h3>
        <div className="space-y-3">
          {COURSES.map((course, i) => (
            <div key={course.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: `${course.color}20` }}>{course.badge}</div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{course.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{course.desc}</p>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-400">Progresso</span>
                  <span style={{ color: course.color }}>{course.progress}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full animate-progress-fill" style={{ width: `${course.progress}%`, background: course.color }} />
                </div>
              </div>
              <button
                onClick={() => course.progress >= 100 && setModal(course)}
                disabled={course.progress < 100}
                className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${course.progress >= 100 ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-white/5 text-slate-500 cursor-not-allowed'}`}
              >
                {course.progress >= 100 ? <><Award className="w-4 h-4" aria-hidden="true" /> Gerar Certificado</> : <><Star className="w-4 h-4" aria-hidden="true" /> Complete o curso para desbloquear</>}
              </button>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-[#1E293B] border border-white/10 rounded-3xl p-6 max-w-sm w-full text-center animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-xl font-black mb-2">Parabéns!</h2>
            <p className="text-slate-400 text-sm mb-6">Você completou o curso <strong className="text-white">{modal.name}</strong> com sucesso!</p>
            <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/30 rounded-xl p-4 mb-5">
              <p className="text-xs text-slate-400">Certificado de Conclusão</p>
              <p className="font-black text-lg text-yellow-300 my-1">EDU<span className="text-blue-400">TRANSIT</span></p>
              <p className="text-xs text-slate-400">EduTransit AR AI — {new Date().getFullYear()}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setModal(null)} className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-all text-sm">Cancelar</button>
              <button onClick={issue} className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2"><Award className="w-4 h-4" aria-hidden="true" /> Emitir!</button>
            </div>
          </div>
        </div>
      )}

      <div className="h-24" />
    </div>
  );
}
