"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  History,
  X,
  Scissors
} from "lucide-react";
import clsx from "clsx";

type Status = "confirmado" | "atendido" | "cancelado" | "pendente";

interface Appointment {
  id: string;
  time: string;
  hour: number; // allows decimal like 11.5
  client: string;
  service: string;
  barber: string;
  status: Status;
  duration: number;
}

const mockAppointments: Appointment[] = [
  { id: "1", time: "09:00", hour: 9, client: "Marcelo Silva", service: "Corte Degradê", barber: "Ricardo", status: "atendido", duration: 45 },
  { id: "2", time: "10:00", hour: 10, client: "João Pedro", service: "Barba Terapia", barber: "Ricardo", status: "atendido", duration: 30 },
  { id: "3", time: "11:30", hour: 11.5, client: "Carlos Eduardo", service: "Corte + Barba", barber: "Felipe", status: "cancelado", duration: 60 },
  { id: "4", time: "14:00", hour: 14, client: "Lucas Moura", service: "Corte Clássico", barber: "Ricardo", status: "confirmado", duration: 45 },
  { id: "5", time: "15:30", hour: 15.5, client: "Alexandre", service: "Platinado + Corte", barber: "André", status: "pendente", duration: 120 },
  { id: "6", time: "18:00", hour: 18, client: "Tiago", service: "Acabamento", barber: "Ricardo", status: "confirmado", duration: 15 },
];

const hours = Array.from({ length: 13 }, (_, i) => i + 8);

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
  const [activeDate] = useState("Hoje");
  const [activeBarber, setActiveBarber] = useState("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredAppointments = mockAppointments.filter(
    (app) => activeBarber === "Todos" || app.barber === activeBarber
  );

  return (
    <div className="flex flex-col h-full gap-6 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Agenda</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg">
          <Plus size={16} /> Agendar
        </button>
      </div>

      <div className="flex gap-2">
        {["Todos", "Ricardo", "Felipe", "André"].map((barber) => (
          <button key={barber} onClick={() => setActiveBarber(barber)} className={clsx("px-3 py-1 rounded", activeBarber === barber && "bg-primary text-white")}>
            {barber}
          </button>
        ))}
      </div>

      <div className="flex flex-col">
        {hours.map((hour) => {
          const formattedHour = `${hour.toString().padStart(2, "0")}:00`;
          const eventsInHour = filteredAppointments.filter(app => Math.floor(app.hour) === hour);

          return (
            <div key={hour} className="flex border-b border-white/10 py-2">
              <div className="w-16 text-right pr-2 text-sm text-white/50">{formattedHour}</div>
              <div className="flex-1 flex flex-col gap-2">
                {eventsInHour.map(app => (
                  <div key={app.id} className={clsx("p-2 rounded border", statusColors[app.status])}>
                    <div className="flex justify-between text-sm">
                      <span>{app.time} - {app.client}</span>
                      <span>{app.barber}</span>
                    </div>
                    <div className="text-xs opacity-70 flex items-center gap-1">
                      <Scissors size={12}/> {app.service}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-end bg-black/50">
          <div className="w-80 bg-white text-black p-4">
            <button onClick={() => setIsModalOpen(false)}><X /></button>
            <h2>Novo Agendamento</h2>
          </div>
        </div>
      )}
    </div>
  );
}
