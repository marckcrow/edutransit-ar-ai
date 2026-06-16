import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AR na Rua — Realidade Aumentada',
  description: 'Identifique placas de trânsito com a câmera do celular usando Realidade Aumentada e IA. Detecção em tempo real com overlay educativo.',
};

export default function ARLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
