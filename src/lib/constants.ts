export const XP_PER_LEVEL = [
  { level: 1, minXP: 0, title: 'Aprendiz do Trânsito' },
  { level: 2, minXP: 100, title: 'Ciclista Iniciante' },
  { level: 3, minXP: 300, title: 'Pedestre Consciente' },
  { level: 4, minXP: 600, title: 'Motorista Estagiário' },
  { level: 5, minXP: 1000, title: 'Motorista habilitado' },
  { level: 6, minXP: 1500, title: 'Defensor da Via' },
  { level: 7, minXP: 2200, title: 'Mestre da Sinalização' },
  { level: 8, minXP: 3000, title: 'Expert em CTB' },
  { level: 9, minXP: 4000, title: 'Guardião da Vida' },
  { level: 10, minXP: 5500, title: 'Lenda do Trânsito' },
];

export const COLOR_PALETTE = {
  primary: '#2563EB',
  secondary: '#FACC15',
  success: '#22C55E',
  danger: '#EF4444',
  purple: '#8B5CF6',
  orange: '#F97316',
  cyan: '#06B6D4',
  pink: '#EC4899',
};

export const AR_CONFIDENCE_THRESHOLD = 0.7;

export const CATEGORY_COLORS: Record<string, string> = {
  regulamentacao: '#EF4444',
  advertencia: '#FACC15',
  indicacao: '#2563EB',
  horizontal: '#FFFFFF',
  seguranca: '#22C55E',
};

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';
