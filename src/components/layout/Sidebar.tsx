"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  Wallet, 
  MessageCircle, 
  Scissors, 
  Package, 
  Menu,
  X,
  LogOut,
  Settings
} from "lucide-react";
import clsx from "clsx";

const navigation = [
  { name: "Painel", href: "/", icon: LayoutDashboard },
  { name: "Agenda", href: "/agenda", icon: CalendarDays },
  { name: "Clientes CRM", href: "/clientes", icon: Users },
  { name: "Financeiro", href: "/financeiro", icon: Wallet },
  { name: "Marketing", href: "/marketing", icon: MessageCircle },
  { name: "Equipe", href: "/equipe", icon: Scissors },
  { name: "Estoque", href: "/estoque", icon: Package },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Header -> Hamburger Menu */}
      <div className="md:hidden flex items-center justify-between p-4 glass border-b border-white/5 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-white">
            <Scissors size={18} />
          </div>
          <span className="font-bold text-lg text-white">AgendaWeb</span>
        </div>
        <button onClick={toggleSidebar} className="text-white p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Content */}
      <div
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-72 glass border-r border-white/5 flex flex-col transition-transform duration-300 md:translate-x-0 md:static",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center gap-3 h-20 px-6 border-b border-white/5 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20">
            <Scissors size={20} />
          </div>
          <span className="font-bold text-xl uppercase tracking-widest text-primary">AgendaWeb</span>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          <div className="text-xs font-bold text-white/30 uppercase tracking-widest px-2 mb-2">Gestão</div>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                  isActive
                    ? "bg-primary/20 text-primary border border-primary/20"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon size={20} className={isActive ? "text-primary" : "opacity-70"} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/5 mt-auto">
          <Link href="/configuracoes" className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-white/60 hover:bg-white/5 hover:text-white mb-2">
            <Settings size={20} className="opacity-70" />
            Configurações
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-error hover:bg-error/10">
            <LogOut size={20} />
            Sair da Conta
          </button>
        </div>
      </div>
    </>
  );
}
