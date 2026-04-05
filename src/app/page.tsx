import React from "react";
import { RevenueChart, AppointmentsChart } from "@/components/dashboard/DashboardCharts";
import { TrendingUp, Users, CalendarPlus, Wallet, MoreHorizontal, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 pb-20">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter mb-1">Visão Geral</h1>
          <p className="text-on-surface-variant opacity-80">Acompanhe os resultados da sua barbearia em tempo real.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-surface-container-low rounded-lg p-1 border border-white/5">
          <button className="px-4 py-1.5 rounded-md bg-surface-variant text-sm font-bold text-white shadow">Hoje</button>
          <button className="px-4 py-1.5 rounded-md text-sm font-medium text-white/50 hover:text-white">7 dias</button>
          <button className="px-4 py-1.5 rounded-md text-sm font-medium text-white/50 hover:text-white">30 dias</button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-bold text-white/60 uppercase tracking-wider">Faturamento</div>
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <Wallet size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-white tracking-tight mb-1">R$ 1.240,00</div>
            <div className="flex items-center text-xs font-bold text-green-400">
              <ArrowUpRight size={14} className="mr-1" />
              <span>+12.5% vs ontem</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-bold text-white/60 uppercase tracking-wider">Agendamentos</div>
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <CalendarPlus size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-white tracking-tight mb-1">24</div>
            <div className="flex items-center text-xs font-bold text-green-400">
              <ArrowUpRight size={14} className="mr-1" />
              <span>+4 vs ontem</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-bold text-white/60 uppercase tracking-wider">Novos Clientes</div>
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <Users size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-white tracking-tight mb-1">8</div>
            <div className="flex items-center text-xs font-bold text-error">
              <ArrowDownRight size={14} className="mr-1" />
              <span>-2 vs ontem</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-bold text-white/60 uppercase tracking-wider">Ticket Médio</div>
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <TrendingUp size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-white tracking-tight mb-1">R$ 51,60</div>
            <div className="flex items-center text-xs font-bold text-white/50">
              <span>Manteve a média</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-xl">Faturamento da Semana</h3>
              <button className="text-white/50 hover:text-white"><MoreHorizontal size={20} /></button>
            </div>
            <RevenueChart />
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-xl">Volume de Agendamentos</h3>
              <button className="text-white/50 hover:text-white"><MoreHorizontal size={20} /></button>
            </div>
            <AppointmentsChart />
          </div>
        </div>

        {/* Sidebar content within Dashboard */}
        <div className="flex flex-col gap-6">
          <div className="glass-card rounded-2xl p-6 flex flex-col flex-1">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl">Próximos Horários</h3>
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">Hoje</span>
            </div>
            
            <div className="space-y-4 flex-1">
              {/* Agenda Item 1 */}
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center mt-1">
                  <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20"></div>
                  <div className="w-0.5 h-12 bg-white/10 my-1"></div>
                </div>
                <div className="flex-1 bg-surface-container-low p-3 rounded-xl border border-white/5 border-l-4 border-l-primary">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm">Ricardo Silva</span>
                    <span className="text-xs text-brand-teal font-bold bg-brand-teal/10 px-2 py-0.5 rounded">14:30</span>
                  </div>
                  <div className="text-xs text-white/50">Corte + Barba • Com André</div>
                </div>
              </div>

              {/* Agenda Item 2 */}
              <div className="flex items-start gap-4 opacity-50">
                <div className="flex flex-col items-center mt-1">
                  <div className="w-3 h-3 rounded-full bg-white/30"></div>
                  <div className="w-0.5 h-12 bg-white/10 my-1"></div>
                </div>
                <div className="flex-1 bg-surface-container-low p-3 rounded-xl border border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm">Marcelo Torres</span>
                    <span className="text-xs font-bold bg-white/10 px-2 py-0.5 rounded">15:00</span>
                  </div>
                  <div className="text-xs text-white/50">Corte Degradê • Com Felipe</div>
                </div>
              </div>

              {/* Free Time Item */}
              <div className="flex items-start gap-4 opacity-40">
                <div className="flex flex-col items-center mt-1">
                  <div className="w-3 h-3 rounded-full border-2 border-white/30 border-dashed"></div>
                </div>
                <div className="flex-1 border border-dashed border-white/20 p-3 rounded-xl flex items-center justify-center">
                  <span className="text-xs italic text-white/50">Horário Livre das 15:45 às 16:30</span>
                </div>
              </div>
            </div>

            <button className="w-full mt-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-bold">
              Ver agenda completa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
