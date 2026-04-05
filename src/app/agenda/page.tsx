"use client";

import React, { useState } from "react";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Search, 
  Clock, 
  User, 
  CheckCircle2, 
  XCircle, 
  History, 
  X,
  Scissors
} from "lucide-react";
import clsx from "clsx";

// Typings for our mock data
type Status = "confirmado" | "atendido" | "cancelado" | "pendente";

interface Appointment {
  id: string;
  time: string;
  hourInt: number;
  client: string;
  service: string;
  barber: string;
  status: Status;
  duration: number; // in mins, approx 45 or 30
}

const mockAppointments: Appointment[] = [
  { id: "1", time: "09:00", hourInt: 9, client: "Marcelo Silva", service: "Corte Degradê", barber: "Ricardo", status: "atendido", duration: 45 },
  { id: "2", time: "10:00", hourInt: 10, client: "João Pedro", service: "Barba Terapia", barber: "Ricardo", status: "atendido", duration: 30 },
  { id: "3", time: "11:30", hourInt: 11.5, client: "Carlos Eduardo", service: "Corte + Barba", barber: "Felipe", status: "cancelado", duration: 60 },
  { id: "4", time: "14:00", hourInt: 14, client: "Lucas Moura", service: "Corte Clássico", barber: "Ricardo", status: "confirmado", duration: 45 },
  { id: "5", time: "15:30", hourInt: 15.5, client: "Alexandre", service: "Platinado + Corte", barber: "André", status: "pendente", duration: 120 },
  { id: "6", time: "18:00", hourInt: 18, client: "Tiago", service: "Acabamento", barber: "Ricardo", status: "confirmado", duration: 15 },
];

const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 08:00 to 20:00

const statusColors = {
  confirmado: "bg-primary/20 border-primary text-white",
  atendido: "bg-surface-variant border-white/10 text-white/50 opacity-60",
  cancelado: "bg-error/10 border-error/50 text-error/80 line-through opacity-70",
  pendente: "bg-secondary-fixed/10 border-secondary-fixed/50 text-secondary-fixed",
};

const statusIcons = {
  confirmado: <CheckCircle2 size={14} className="text-primary" />,
  atendido: <History size={14} />,
  cancelado: <XCircle size={14} />,
  pendente: <Clock size={14} />,
};

export default function AgendaPage() {
  const [activeDate, setActiveDate] = useState("Hoje, 24 Out");
  const [activeView, setActiveView] = useState<"diario" | "semanal">("diario");
  const [activeBarber, setActiveBarber] = useState("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filters
  const filteredAppointments = mockAppointments.filter(
    (app) => activeBarber === "Todos" || app.barber === activeBarber
  );

  return (
    <div className="flex flex-col h-full gap-6 relative">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter mb-1 flex items-center gap-3">
            Agenda
            <span className="text-xs font-bold uppercase tracking-widest bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/20">
              {filteredAppointments.filter(a => a.status === 'confirmado' || a.status === 'pendente').length} Hoje
            </span>
          </h1>
          <p className="text-on-surface-variant opacity-80">Gerencie horários, clientes e serviços.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Barber Filter */}
          <div className="flex bg-surface-container-low rounded-lg p-1 border border-white/5">
            {["Todos", "Ricardo", "Felipe", "André"].map((barber) => (
              <button
                key={barber}
                onClick={() => setActiveBarber(barber)}
                className={clsx(
                  "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                  activeBarber === barber ? "bg-surface-variant text-white shadow" : "text-white/50 hover:text-white"
                )}
              >
                {barber}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-[#007A7A] transition-colors ml-auto lg:ml-0"
          >
            <Plus size={18} />
            Agendar
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-[600px]">
        {/* Left Side: Miniature Calendar & Filters typically */}
        <div className="w-full lg:w-64 flex flex-col gap-6">
          <div className="glass-card p-4 rounded-2xl flex items-center justify-between">
            <button className="p-2 hover:bg-white/5 rounded-full text-white/50 hover:text-white"><ChevronLeft size={20}/></button>
            <div className="flex items-center gap-2 font-bold">
              <CalendarIcon size={16} className="text-primary" />
              {activeDate}
            </div>
            <button className="p-2 hover:bg-white/5 rounded-full text-white/50 hover:text-white"><ChevronRight size={20}/></button>
          </div>

          {/* Mini Status legend */}
          <div className="glass-card p-4 rounded-2xl flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">Status</h3>
            <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full border-2 border-primary bg-primary/20"></div> Confirmado</div>
            <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full border-2 border-secondary-fixed bg-secondary-fixed/20"></div> Aguardando</div>
            <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full border-2 border-white/20 bg-white/10"></div> Atendido</div>
            <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full border-2 border-error/50 bg-error/20"></div> Cancelado</div>
          </div>
        </div>

        {/* Right Side: Main Timeline */}
        <div className="flex-1 glass-card rounded-2xl p-6 overflow-y-auto relative hidden-scrollbar" style={{ minHeight: '600px' }}>
          <div className="absolute top-0 left-16 bottom-0 w-[1px] bg-white/5 z-0"></div>
          
          <div className="relative z-10 flex flex-col pt-4">
            {hours.map((hour) => {
              const formattedHour = \`\${hour.toString().padStart(2, '0')}:00\`;
              const eventsInHour = filteredAppointments.filter(app => Math.floor(app.hourInt) === hour);
              
              return (
                <div key={hour} className="flex min-h-[100px] group border-b border-white/5 border-dashed relative">
                  {/* Time Label */}
                  <div className="w-16 flex-shrink-0 text-right pr-4 pt-1">
                    <span className="text-xs font-bold text-white/40">{formattedHour}</span>
                  </div>

                  {/* Hourly Events Canvas */}
                  <div className="flex-1 relative pb-2 pt-1 pl-4">
                    {/* Ghost Hover Slot for easy creation */}
                    <div className="absolute inset-x-0 inset-y-0 ml-4 hidden group-hover:block bg-white/[0.02] cursor-pointer rounded border border-dashed border-white/10" onClick={() => setIsModalOpen(true)}>
                      <div className="pl-2 pt-2 text-primary font-bold text-xs flex items-center gap-1 opacity-60">
                        <Plus size={14} /> Novo agendamento
                      </div>
                    </div>

                    {eventsInHour.length === 0 ? null : (
                      <div className="flex flex-col gap-2 relative z-10 w-full lg:w-4/5 pt-1 pl-4">
                        {eventsInHour.map(app => (
                          <div 
                            key={app.id} 
                            className={clsx(
                              "p-3 rounded-xl border flex flex-col gap-2 cursor-pointer shadow-lg hover:brightness-110 transition-all",
                              statusColors[app.status]
                            )}
                            style={{ 
                              // Visual height representation (just an aesthetic tweak, 45m ~ 100px)
                              minHeight: app.duration > 30 ? '80px' : '60px' 
                            }}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2">
                                {statusIcons[app.status]}
                                <span className={clsx("font-bold text-sm", app.status === 'cancelado' && 'line-through')}>{app.time} - {app.client}</span>
                              </div>
                              <span className="text-xs font-bold py-0.5 px-2 bg-black/20 rounded uppercase tracking-widest">{app.barber}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs opacity-80">
                              <Scissors size={12} />
                              {app.service} ({app.duration} min)
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Create Appointment Modal/Slide-over */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          {/* Slide panel */}
          <div className="relative w-full md:w-[450px] bg-surface h-full shadow-2xl border-l border-white/10 flex flex-col animate-fade-in" style={{ animationName: 'slideInRight' }}>
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-xl font-bold font-headline flex items-center gap-2">
                <CalendarIcon size={20} className="text-primary"/> Novo Agendamento
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"><X size={20}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {/* Client Selection (CRM integration preview) */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-white/50 uppercase tracking-widest">1. Buscar Cliente</label>
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-3 text-white/40" />
                  <input type="text" placeholder="Nome ou WhatsApp (ex: 119999999)" className="w-full bg-surface-container rounded-xl py-3 pl-10 pr-4 text-sm border border-white/5 focus:border-primary/50 outline-none transition-colors" />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-white/30">Cliente não existe?</span>
                  <button className="text-xs text-primary font-bold hover:underline">Cadastrar novo</button>
                </div>
              </div>

              {/* Service Selection */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-white/50 uppercase tracking-widest">2. Serviço</label>
                <select className="w-full bg-surface-container rounded-xl py-3 px-4 text-sm border border-white/5 focus:border-primary/50 outline-none transition-colors appearance-none">
                  <option value="">Selecione o serviço...</option>
                  <option value="corte">Corte Clássico - R$ 40 (45m)</option>
                  <option value="barba">Barba Terapia - R$ 35 (30m)</option>
                  <option value="completo">Corte + Barba - R$ 70 (1h15)</option>
                </select>
              </div>

              {/* Professional */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-white/50 uppercase tracking-widest">3. Profissional</label>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-lg bg-primary text-white font-bold border border-primary text-sm">Ricardo</button>
                  <button className="flex-1 py-2 rounded-lg bg-surface-container text-white/60 hover:bg-white/5 transition-colors text-sm">Felipe</button>
                  <button className="flex-1 py-2 rounded-lg bg-surface-container text-white/60 hover:bg-white/5 transition-colors text-sm">André</button>
                </div>
              </div>

              {/* Date and Time */}
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Data</label>
                  <input type="date" defaultValue="2024-10-24" className="w-full bg-surface-container rounded-xl py-3 px-4 text-sm border border-white/5 focus:border-primary/50 outline-none transition-colors color-scheme-dark" style={{ colorScheme: 'dark' }} />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Horário</label>
                  <input type="time" defaultValue="14:00" className="w-full bg-surface-container rounded-xl py-3 px-4 text-sm border border-white/5 focus:border-primary/50 outline-none transition-colors color-scheme-dark" style={{ colorScheme: 'dark' }} />
                </div>
              </div>

              {/* Notes */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Observações (Opcional)</label>
                <textarea rows={2} placeholder="Ex: Cliente prefere a máquina 1 do lado..." className="w-full bg-surface-container rounded-xl py-3 px-4 text-sm border border-white/5 focus:border-primary/50 outline-none transition-colors resize-none"></textarea>
              </div>
            </div>

            <div className="p-6 border-t border-white/5 bg-surface-container-low flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm font-bold opacity-70">
                <span>Total Estimado:</span>
                <span className="text-brand-teal text-lg">R$ 0,00</span>
              </div>
              <button className="w-full py-4 rounded-xl bg-primary text-white font-extrabold uppercase tracking-widest text-sm hover:bg-[#007A7A] transition-colors shadow-lg shadow-primary/20" onClick={() => setIsModalOpen(false)}>
                Confirmar Agendamento
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Basic Keyframe for slide from right */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}} />
    </div>
  );
}
