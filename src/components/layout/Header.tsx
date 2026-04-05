"use client";

import React from "react";
import { Bell, Search, UserCircle } from "lucide-react";

export function Header() {
  return (
    <header className="h-20 glass border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30 hidden md:flex">
      <div className="flex items-center bg-surface-container rounded-full px-4 py-2 w-96 border border-white/5 focus-within:border-primary/50 transition-colors">
        <Search size={18} className="text-white/40 mr-3" />
        <input 
          type="text" 
          placeholder="Buscar cliente, serviço ou agendamento..." 
          className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-white/40"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-white/60 hover:text-white transition-colors">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-error rounded-full border-2 border-[#121212]"></span>
        </button>

        <div className="h-8 w-[1px] bg-white/10"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right">
            <div className="text-sm font-bold text-white group-hover:text-primary transition-colors">Barbearia Elite</div>
            <div className="text-[10px] text-white/50 uppercase tracking-widest">Plano Profissional</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
            <UserCircle size={24} className="text-white/70" />
          </div>
        </div>
      </div>
    </header>
  );
}
