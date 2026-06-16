import type { Metadata, Viewport } from 'next';
import './globals.css';
import BottomNav from '@/components/BottomNav';

export const metadata: Metadata = {
  title: {
    default: 'EduTransit AR AI — Educação para o Trânsito',
    template: '%s | EduTransit AR AI',
  },
  description: 'Aprenda trânsito de forma interativa com Realidade Aumentada e IA. Placas, sinalização, segurança e CTB. Aplicativo PWA gratuito.',
  keywords: ['educação trânsito', 'placas trânsito', 'CTB', 'realidade aumentada', 'aprendizado trânsito', 'autoescola', 'DETRAN'],
  authors: [{ name: 'Webstreet', url: 'https://www.webstreet.com.br' }],
  creator: 'Webstreet',
  publisher: 'Webstreet',
  metadataBase: new URL('https://edutransit-ar-ai.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://edutransit-ar-ai.vercel.app',
    siteName: 'EduTransit AR AI',
    title: 'EduTransit AR AI — Educação para o Trânsito com IA e AR',
    description: 'Aprenda trânsito com Realidade Aumentada e IA. Placas, sinalização, segurança e CTB.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EduTransit AR AI — Educação para o Trânsito',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EduTransit AR AI',
    description: 'Aprenda trânsito com Realidade Aumentada e IA.',
    images: ['/og-image.png'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'EduTransit',
  },
  icons: {
    icon: '/favicon-32.png',
    apple: '/apple-touch-icon.png',
    other: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0F172A',
  colorScheme: 'dark light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased pb-20">
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
