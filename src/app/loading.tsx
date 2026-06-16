'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col gap-3 bg-slate-800/60 rounded-2xl p-4 border border-white/10">
          <div className="w-12 h-12 rounded-full bg-red-500 animate-tl-red" />
          <div className="w-12 h-12 rounded-full bg-yellow-500 animate-tl-yellow" />
          <div className="w-12 h-12 rounded-full bg-green-500 animate-tl-green" />
        </div>
        <p className="text-slate-400 text-sm font-medium animate-pulse">Carregando EduTransit...</p>
      </div>
    </div>
  );
}
