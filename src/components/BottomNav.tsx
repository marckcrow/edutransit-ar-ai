'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Camera, BookOpen, Gamepad2, Trophy } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', icon: Home, label: 'Início' },
  { href: '/ar', icon: Camera, label: 'AR' },
  { href: '/library', icon: BookOpen, label: 'Placas' },
  { href: '/missions', icon: Gamepad2, label: 'Missões' },
  { href: '/ranking', icon: Trophy, label: 'Ranking' },
];

export default function BottomNav() {
  const pathname = usePathname() ?? '/';

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0F172A]/95 backdrop-blur-xl border-t border-white/10 safe-area-bottom"
      aria-label="Navegação principal"
    >
      <div className="max-w-xl mx-auto flex items-center justify-around py-2 px-1">
        {NAV_ITEMS.map(item => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all min-w-[52px] ${
                isActive
                  ? 'text-blue-400 bg-blue-500/10'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {Icon && <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} aria-hidden="true" />}
              <span className="text-[10px] font-semibold leading-none">{item.label}</span>
            </Link>
          );
        })}

        <Link
          href="/profile"
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all min-w-[52px] ${
            pathname === '/profile'
              ? 'text-blue-400 bg-blue-500/10'
              : 'text-slate-500 hover:text-slate-300'
          }`}
          aria-current={pathname === '/profile' ? 'page' : undefined}
        >
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold border-2 ${
              pathname === '/profile' ? 'border-blue-400' : 'border-slate-500'
            }`}
          >
            M
          </div>
          <span className="text-[10px] font-semibold leading-none">Perfil</span>
        </Link>
      </div>
    </nav>
  );
}
