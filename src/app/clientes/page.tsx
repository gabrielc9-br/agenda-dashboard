"use client";

import React, { useState } from "react";
import { 
  Users, 
  Search, 
  Plus, 
  MoreHorizontal, 
  Star, 
  AlertTriangle, 
  MessageCircle, 
  CalendarClock, 
  ArrowRight,
  Filter
} from "lucide-react";
import clsx from "clsx";

type Segment = "VIP" | "Ativo" | "Inativo" | "Novo";

interface Client {
  id: string;
  name: string;
  phone: string;
  visits: number;
  totalSpent: number;
  lastVisit: string;
  segment: Segment;
}

const mockClients: Client[] = [
  { id: "1", name: "Ricardo Silva", phone: "(11) 98765-4321", visits: 45, totalSpent: 2850.00, lastVisit: "Hoje", segment: "VIP" },
  { id: "2", name: "Marcelo Torres", phone: "(11) 91234-5678", visits: 12, totalSpent: 650.00, lastVisit: "Há 12 dias", segment: "Ativo" },
  { id: "3", name: "Felipe Costa", phone: "(11) 99999-8888", visits: 3, totalSpent: 120.00, lastVisit: "Há 45 dias", segment: "Inativo" },
  { id: "4", name: "João Pedro", phone: "(11) 97777-6666", visits: 1, totalSpent: 45.00, lastVisit: "Há 2 dias", segment: "Novo" },
  { id: "5", name: "André Santos", phone: "(11) 95555-4444", visits: 28, totalSpent: 1450.00, lastVisit: "Há 7 dias", segment: "VIP" },
];

const segmentColors = {
  VIP: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Ativo: "bg-primary/10 text-primary border-primary/20",
  Inativo: "bg-error/10 text-error/80 border-error/20",
  Novo: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

export default function CrmPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter mb-1 flex items-center gap-3">
            Clientes (CRM)
          </h1>
          <p className="text-on-surface-variant opacity-80">Gerencie o relacionamento e histórico dos clientes.</p>
        </div>

        <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-[#007A7A] transition-colors">
          <Plus size={18} />
          Novo Cliente
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-white/50 uppercase tracking-widest mb-1">Total Base</div>
            <div className="text-3xl font-black text-white">1.248</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Users size={24}/></div>
        </div>

        <div className="glass-card p-5 rounded-2xl flex items-center justify-between border-amber-500/20">
          <div>
            <div className="text-sm font-bold text-amber-500/70 uppercase tracking-widest mb-1">Clientes VIP</div>
            <div className="text-3xl font-black text-amber-500">142</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500"><Star size={24}/></div>
        </div>

        <div className="glass-card p-5 rounded-2xl flex items-center justify-between border-error/20">
          <div>
            <div className="text-sm font-bold text-error/70 uppercase tracking-widest mb-1">Inativos (+30d)</div>
            <div className="text-3xl font-black text-error">86</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center text-error"><AlertTriangle size={24}/></div>
        </div>

        <div className="glass-card p-5 rounded-2xl flex items-center justify-between border-blue-500/20">
          <div>
            <div className="text-sm font-bold text-blue-400/70 uppercase tracking-widest mb-1">Retenção Mensal</div>
            <div className="text-3xl font-black text-blue-400">74%</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400"><CalendarClock size={24}/></div>
        </div>
      </div>

      {/* Main CRM Area */}
      <div className="glass-card rounded-2xl flex-1 flex flex-col min-h-[500px]">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <Search size={18} className="absolute left-3 top-2.5 text-white/40" />
            <input 
              type="text" 
              placeholder="Buscar por nome ou telefone..." 
              className="w-full bg-surface-container rounded-lg py-2 pl-10 pr-4 text-sm border border-white/5 focus:border-primary/50 outline-none transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-sm font-bold text-white/70 hover:bg-white/5 transition-colors">
              <Filter size={16} /> Segmentos
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-sm font-bold text-primary hover:bg-primary/10 border-primary/30 transition-colors">
              <MessageCircle size={16} /> Disparo em Massa
            </button>
          </div>
        </div>

        {/* Clients Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 text-white/40 text-xs uppercase tracking-widest">
                <th className="px-6 py-4 font-bold">Cliente</th>
                <th className="px-6 py-4 font-bold">Segmento</th>
                <th className="px-6 py-4 font-bold">Última Visita</th>
                <th className="px-6 py-4 font-bold text-center">Visitas</th>
                <th className="px-6 py-4 font-bold text-right">Valor Gasto</th>
                <th className="px-6 py-4 font-bold text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {mockClients.map((client) => (
                <tr key={client.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-white/80 border border-white/5">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-bold text-white mb-0.5">{client.name}</div>
                        <div className="text-xs text-white/50">{client.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={clsx("text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border", segmentColors[client.segment])}>
                      {client.segment}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={clsx("text-sm font-medium", client.segment === "Inativo" ? "text-error" : "text-white/70")}>
                      {client.lastVisit}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-bold text-white">{client.visits}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-bold text-primary">R$ {client.totalSpent.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2 visibility-hidden group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/70 hover:text-white" title="Histórico Completo">
                        <ArrowRight size={16} />
                      </button>
                      <button className="p-2 bg-primary/10 hover:bg-primary/20 rounded-lg text-primary border border-primary/20" title="Chamar Whatsapp">
                        <MessageCircle size={16} />
                      </button>
                      <button className="p-2 hover:bg-white/5 rounded-lg text-white/40">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="p-4 border-t border-white/5 flex justify-center">
            <button className="text-sm font-bold px-6 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white">
              Carregar mais clientes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
