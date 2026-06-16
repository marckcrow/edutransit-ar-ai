# 🚦 EduTransit AR AI

> **Educação para o Trânsito com Inteligência Artificial e Realidade Aumentada**

Um aplicativo PWA moderno para aprender trânsito de forma interativa, usando AR para identificar placas em tempo real e IA para tirar dúvidas sobre legislação e segurança no trânsito.

---

## ✨ Funcionalidades

| Módulo | Descrição |
|--------|-----------|
| 📷 **AR na Rua** | Identificação de placas com câmera + overlay educativo |
| 🤖 **Tutor IA** | Chat educativo com IA sobre trânsito e CTB |
| 📚 **Biblioteca** | Todas as placas catalogadas + Código de Trânsito |
| 🎮 **Missões** | Gamificação com XP, medalhas e desafios |
| 🗺️ **Mapa Educativo** | Pontos de interesse no trânsito |
| 🎥 **Simulador** | Cenários animados para testar decisões |
| 🏆 **Ranking** | Competição entre escolas e cidades |
| 📜 **Certificados** | Geração automática de certificados PDF |

---

## 🛠️ Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Estilização**: Tailwind CSS, Framer Motion
- **UI**: shadcn/ui, Lucide React, Radix UI
- **AR**: AR.js, TensorFlow.js
- **Backend**: Supabase (futuro)
- **Deploy**: Vercel
- **PWA**: next-pwa, Service Worker

---

## 🚀 Getting Started

```bash
# Clone o repositório
cd edutransit-ar-ai

# Instale as dependências
npm install

# Copie as variáveis de ambiente
cp .env.local.example .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) para ver o app.

---

## 📁 Estrutura do Projeto

```
edutransit-ar-ai/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── ar/           # AR camera + sign recognition
│   │   ├── tutor/        # AI chat interface
│   │   ├── library/       # Sign library + CTB
│   │   ├── missions/     # Gamification missions
│   │   ├── map/          # Educational map
│   │   ├── simulator/    # Situation simulator
│   │   ├── ranking/      # Leaderboard
│   │   ├── certificates/ # Certificate generator
│   │   ├── profile/      # User profile
│   │   └── admin/        # Admin dashboard
│   ├── components/       # Reusable UI components
│   ├── data/             # Static data (signs, quizzes, missions)
│   ├── lib/              # Utilities
│   ├── hooks/            # Custom React hooks
│   └── types/            # TypeScript types
├── public/               # Static assets + PWA
├── package.json
└── README.md
```

---

## 🎯 Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Home + dashboard principal |
| `/ar` | Modo AR (câmera real ou simulação) |
| `/tutor` | Chat com Tutor IA |
| `/library` | Biblioteca de placas + CTB |
| `/missions` | Sistema de missões e badges |
| `/map` | Mapa educativo interativo |
| `/simulator` | Simulador de situações |
| `/ranking` | Ranking de usuários |
| `/certificates` | Certificados PDF |
| `/profile` | Perfil do usuário |
| `/admin` | Painel administrativo |

---

## 🔜 Próximos Passos

1. **TensorFlow.js**: Integrar modelo de detecção de placas treinado
2. **Supabase**: Backend com autenticação, rankings e progresso
3. **AR.js**: Marcadores reais para AR marker-based
4. **PDFs**: Geração de certificados reais com jsPDF
5. **OpenAI**: Tutor IA com contexto do CTB brasileiro
6. **i18n**: Suporte a múltiplos idiomas
7. **Apple/Google Maps API**: Mapa educativo com localizações reais

---

## 📄 Licença

MIT — Webstreet © 2026
