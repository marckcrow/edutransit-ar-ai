'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Star, CheckCircle2, Calendar, ShieldCheck } from 'lucide-react';
import { Certificate } from '@/types';

const AVAILABLE_COURSES = [
  { id: 'c1', name: 'Curso de Placas de Trânsito', desc: 'Aprenda todas as placas: regulamentação, advertência e indicação.', progress: 100, badge: '🏆', color: '#EF4444' },
  { id: 'c2', name: 'Curso de Pedestres', desc: 'Travessia segura, faixas, preferências e comportamentos.', progress: 75, badge: '👶', color: '#22C55E' },
  { id: 'c3', name: 'Curso de Ciclistas', desc: 'Ciclovia, respeito, segurança e legislação para ciclistas.', progress: 60, badge: '🚴', color: '#F97316' },
  { id: 'c4', name: 'Curso de Direção Defensiva', desc: 'Técnicas para evitar acidentes e dirigir com segurança.', progress: 30, badge: '🛡️', color: '#2563EB' },
  { id: 'c5', name: 'Curso de Primeiros Socorros', desc: 'O que fazer em caso de acidentes de trânsito.', progress: 0, badge: '🚑', color: '#EC4899' },
  { id: 'c6', name: 'Curso de Educação para o Trânsito', desc: 'Visão geral completa sobre educação no trânsito.', progress: 45, badge: '📚', color: '#8B5CF6' },
];

const EARNED_CERTIFICATES: Certificate[] = [
  {
    id: 'cert1',
    name: 'Certificado — Curso de Placas de Trânsito',
    course: 'EduTransit AR AI',
    issuedAt: '2026-06-10',
    score: 92,
  },
];

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>(EARNED_CERTIFICATES);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<typeof AVAILABLE_COURSES[0] | null>(null);

  const handleDownload = (cert: Certificate) => {
    // Simulate PDF download
    alert(`📜 Gerando PDF do certificado:\n\n${cert.name}\n\nNota: ${cert.score}%\nData: ${new Date(cert.issuedAt).toLocaleDateString('pt-BR')}\n\n(Em produção, isso gerará um PDF real com QR Code de verificação)`);
  };

  const requestCertificate = (course: typeof AVAILABLE_COURSES[0]) => {
    if (course.progress < 100) return;
    setSelectedCourse(course);
    setShowModal(true);
  };

  const issueCertificate = () => {
    if (!selectedCourse) return;
    const newCert: Certificate = {
      id: `cert_${Date.now()}`,
      name: `Certificado — ${selectedCourse.name}`,
      course: 'EduTransit AR AI',
      issuedAt: new Date().toISOString().split('T')[0],
      score: Math.round(75 + Math.random() * 25),
    };
    setCertificates(prev => [newCert, ...prev]);
    setShowModal(false);
    setSelectedCourse(null);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Header */}
      <header className="bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📜</span>
            <div>
              <h1 className="font-bold text-sm">Certificados</h1>
              <p className="text-xs text-blue-400">{certificates.length} certificados conquistados</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-4">
        {/* Certificate Wall */}
        {certificates.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Award className="w-4 h-4" /> Certificados Conquistados
            </h3>
            <div className="space-y-3">
              {certificates.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-2xl p-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-yellow-500/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      🏆
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm leading-tight">{cert.name}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(cert.issuedAt).toLocaleDateString('pt-BR')}</span>
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400" /> {cert.score}%</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(cert)}
                      className="bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 text-yellow-300 font-semibold py-2 px-3 rounded-xl transition-all text-xs flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" /> PDF
                    </button>
                  </div>

                  {/* Certificate visual preview */}
                  <div className="mt-3 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/20 rounded-xl p-3 text-center">
                    <p className="text-xs text-slate-400 mb-1">Certificado de Conclusão</p>
                    <p className="font-black text-lg text-yellow-300">EDU<span className="text-blue-400">TRANSIT</span> AR AI</p>
                    <div className="flex items-center justify-center gap-4 mt-2 text-xs">
                      <span>✅ Verificado</span>
                      <span>📅 {new Date(cert.issuedAt).toLocaleDateString('pt-BR')}</span>
                      <span>⭐ {cert.score}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Available Courses */}
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" /> Cursos Disponíveis
        </h3>
        <div className="space-y-3">
          {AVAILABLE_COURSES.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-4"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: `${course.color}20` }}>
                  {course.badge}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{course.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{course.desc}</p>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-400">Progresso</span>
                  <span style={{ color: course.color }}>{course.progress}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${course.progress}%`, background: course.color }} />
                </div>
              </div>

              <button
                onClick={() => requestCertificate(course)}
                disabled={course.progress < 100}
                className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${course.progress >= 100 ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-white/5 text-slate-500 cursor-not-allowed'}`}
              >
                {course.progress >= 100 ? (
                  <><Award className="w-4 h-4" /> Gerar Certificado</>
                ) : (
                  <><Star className="w-4 h-4" /> Complete o curso para desbloquear</>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Issue Certificate Modal */}
      {showModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-[#1E293B] border border-white/10 rounded-3xl p-6 max-w-sm w-full text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-xl font-black mb-2">Parabéns!</h2>
            <p className="text-slate-400 text-sm mb-6">
              Você completou o curso <strong className="text-white">{selectedCourse.name}</strong> com sucesso!
            </p>

            {/* Certificate preview */}
            <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/30 rounded-xl p-4 mb-5">
              <p className="text-xs text-slate-400">Certificado de Conclusão</p>
              <p className="font-black text-lg text-yellow-300 my-1">EDU<span className="text-blue-400">TRANSIT</span></p>
              <p className="text-xs text-slate-400">EduTransit AR AI — 2026</p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setShowModal(false)} className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-all text-sm">
                Cancelar
              </button>
              <button onClick={issueCertificate} className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2">
                <Award className="w-4 h-4" /> Emitir!
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="h-24" />
    </div>
  );
}
