"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { name: 'Inicio', icon: 'home', path: '/portal' },
  { name: 'Mis Clases', icon: 'play_circle', path: '/clases-grabadas' },
  { name: 'Materiales', icon: 'folder', path: '/recursos' },
  { name: 'Certificados', icon: 'verified', path: '/verificar' },
];

export default function Sidebar({ studentName, onLogout }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#020617] border-r border-white/10 h-screen sticky top-0 hidden lg:flex flex-col p-6 z-40">
      <div className="mb-12">
        <h1 className="text-xl font-black text-white tracking-tighter uppercase">
          PCAI <span className="text-cyan-400">Portal</span>
        </h1>
        <p className="text-[10px] text-slate-500 font-bold tracking-[0.2em] mt-1">SISTEMA v6.0</p>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
              pathname === item.path 
                ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400' 
                : 'text-slate-400 hover:bg-white/5 border border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-sm">{item.icon}</span>
            <span className="text-xs font-bold uppercase tracking-widest">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 text-xs font-bold">
            {studentName?.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] font-bold text-white truncate uppercase">{studentName}</p>
            <p className="text-[9px] text-slate-500 font-medium">Alumno Activo</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all border border-transparent"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          <span className="text-xs font-bold uppercase tracking-widest">Salir</span>
        </button>
      </div>
    </aside>
  );
}
