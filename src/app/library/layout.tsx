import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Biblioteca — Placas e CTB',
  description: 'Consulte todas as placas de trânsito brasileiras: regulamentação, advertência, indicação e sinalização horizontal. Resumo completo do CTB.',
};

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
