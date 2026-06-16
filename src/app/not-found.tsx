import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl mb-6">🚦</div>
      <h1 className="text-4xl font-black mb-3">404</h1>
      <h2 className="text-xl font-bold text-slate-400 mb-2">Página não encontrada</h2>
      <p className="text-slate-500 mb-8 max-w-sm">
        Oops! Estavia circulando na vía e se deparou com um beco sem saída. Vamos voltar para casa!
      </p>
      <Link
        href="/"
        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl transition-all text-sm"
      >
        Voltar ao Início
      </Link>
      <div className="mt-12 text-xs text-slate-600">
        Dica: use o menu abaixo para navegar pelas páginas do app.
      </div>
    </div>
  );
}
