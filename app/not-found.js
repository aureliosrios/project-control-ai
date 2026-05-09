import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest">
          Error 404 · Link Corrupto
        </div>
        <h1 className="text-6xl font-black text-white tracking-tighter">ACCESO <span className="text-red-500">DENEGADO</span></h1>
        <p className="text-slate-400 leading-relaxed">La ruta solicitada no existe en el servidor principal. Verifica el enlace o regresa a la base.</p>
        <Link href="/" className="inline-block w-full py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all">
          REGRESAR AL INICIO
        </Link>
      </div>
    </div>
  );
}
