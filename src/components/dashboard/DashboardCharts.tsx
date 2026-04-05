"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const data = [
  { name: 'Seg', faturamento: 850, agendamentos: 12 },
  { name: 'Ter', faturamento: 1200, agendamentos: 18 },
  { name: 'Qua', faturamento: 950, agendamentos: 14 },
  { name: 'Qui', faturamento: 1800, agendamentos: 24 },
  { name: 'Sex', faturamento: 2400, agendamentos: 32 },
  { name: 'Sáb', faturamento: 3100, agendamentos: 45 },
  { name: 'Dom', faturamento: 1500, agendamentos: 20 },
];

export function RevenueChart() {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorFaturamento" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#005F5F" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#005F5F" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a2a2a" />
          <XAxis dataKey="name" stroke="#c0ced6" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#c0ced6" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R$ ${value}`} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#2a2a2a', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#005F5F', fontWeight: 'bold' }}
            formatter={(value) => [`R$ ${value}`, 'Faturamento']}
          />
          <Area type="monotone" dataKey="faturamento" stroke="#005F5F" strokeWidth={3} fillOpacity={1} fill="url(#colorFaturamento)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AppointmentsChart() {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a2a2a" />
          <XAxis dataKey="name" stroke="#c0ced6" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#c0ced6" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#2a2a2a', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#00A8A8', fontWeight: 'bold' }}
            cursor={{ fill: '#2a2a2a', opacity: 0.4 }}
          />
          <Bar dataKey="agendamentos" name="Agendamentos" fill="#005F5F" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
