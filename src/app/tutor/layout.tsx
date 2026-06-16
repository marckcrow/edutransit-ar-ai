import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tutor IA — Tire suas dúvidas',
  description: 'Converse com o Tutor IA sobre trânsito, placas, CTB, segurança e legislação. Respostas instantâneas e educativas.',
};

export default function TutorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
