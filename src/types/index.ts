// Traffic Sign Types
export interface TrafficSign {
  id: string;
  name: string;
  category: 'regulamentacao' | 'advertencia' | 'indicacao' | 'horizontal' | 'seguranca';
  description: string;
  meaning: string;
  usage: string;
  penalty?: string;
  tips: string[];
  imageUrl: string;
  arModel?: string;
  audio?: string;
  curiosities: string[];
  ctbArticle?: string;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  signId?: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'find' | 'identify' | 'quiz' | 'safety';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  badge?: string;
  steps: MissionStep[];
  requiredSigns?: string[];
}

export interface MissionStep {
  instruction: string;
  type: 'camera' | 'quiz' | 'text';
  targetSign?: string;
  quizId?: string;
}

export interface UserProgress {
  userId: string;
  totalXP: number;
  level: number;
  badges: Badge[];
  completedMissions: string[];
  quizScores: Record<string, number>;
  certificates: Certificate[];
  streak: number;
  lastActive: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
  category: 'learning' | 'safety' | 'master' | 'social';
}

export interface Certificate {
  id: string;
  name: string;
  course: string;
  issuedAt: string;
  score: number;
  pdfUrl?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  signReference?: string;
}

export interface MapPoint {
  id: string;
  name: string;
  type: 'escola' | 'area-escolar' | 'faixa-elevada' | 'ciclovia' | 'rotatoria';
  lat: number;
  lng: number;
  description: string;
  imageUrl: string;
  videoUrl?: string;
}

export interface SimulatorScenario {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  situation: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface AdminStats {
  totalUsers: number;
  activeToday: number;
  totalQuizzesTaken: number;
  avgScore: number;
  topBadges: Badge[];
}
