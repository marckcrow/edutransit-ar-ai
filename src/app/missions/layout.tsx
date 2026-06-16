import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Missões — Ganhe XP e Medalhas',
  description: 'Complete missões educativas, ganhe XP, desbloqueie medalhas e conquiste certificados. Gamificação para aprender trânsito.',
};

export default function MissionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
