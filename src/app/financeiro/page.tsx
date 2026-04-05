"use client";

import React, { useState } from "react";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  Plus, 
  LockOpen, 
  Lock, 
  CreditCard,
  Banknote,
  SmartphoneNfc,
  MoreVertical
} from "lucide-react";
import clsx from "clsx";

type TransactionType = "entrada" | "saida";

interface Transaction {
  id: string;
  description: string;
  date: string;
  amount: number;
  type: TransactionType;
  method: string;
  category: string;
}

const mockTransactions: Transaction[] = [
  { id: "1", description: "Corte + Barba (Ricardo Silva)", date: "Hoje, 14:30", amount: 70.00, type: "entrada", method: "Pix", category: "Serviço" },
  { id: "2", description: "Compra de Pomadas (Fornecedor X)", date: "Hoje, 11:00", amount: 450.00, type: "saida", method: "Transferência", category: "Estoque" },
  { id: "3", description: "Corte Degradê (Marcelo)", date: "Hoje, 10:00", amount: 40.00, type: "entrada", method: "Cartão de Crédito", category: "Serviço" },
  { id: "4", description: "Pagamento Conta de Luz", date: "Ontem", amount: 280.00, type: "saida", method: "Boleto", category: "Custos Fixos" },
  { id: "5", description: "Corte Clássico (Felipe)", date: "Ontem", amount: 35.00, type: "entrada", method: "Dinheiro", category: "Serviço" },
  { id: "6", description: "Sangria do Caixa", date: "Ontem", amount: 200.00, type: "saida", method: "Dinheiro", category: "Retirada" },
];

export default function FinanceiroPage() {
  const [isCaixaAberto, setIsCaixaAberto] = useState(true);

  return (
    <div className="flex flex-col h-full gap-6 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter mb-1 flex items-center gap-3">
            Controle de Caixa
            {isCaixaAberto ? (
              <span className="text-[10px] font-bold uppercase tracking-widest bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/20 flex items-center gap-1">
                <LockOpen size={12} /> Caixa Aberto
              </span>
            ) : (
              <span className="text-[10px] font-bold uppercase tracking-widest bg-error/20 text-error px-3 py-1 rounded-full border border-error/20 flex items-center gap-1">
                <Lock size={12} /> Caixa Fechado
              </span>
            )}
          </h1>
          <p className="text-on-surface-variant opacity-80">Gestão financeira completa sem complicação.</p>
        </div>

        <div className="flex gap-3 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none flex justify-center items-center gap-2 px-4 py-2 bg-surface-container hover:bg-surface-variant text-white font-bold rounded-lg border border-white/10 transition-colors">
            <Download size={18} /> Exportar
          </button>
          <button className="flex-1 lg:flex-none flex justify-center items-center gap-2 px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-[#007A7A] transition-colors shadow-lg shadow-primary/20">
            <Plus size={18} /> Nova Lançamento
          </button>
        </div>
      </div>

      {/* Main KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between border-t-2 border-primary">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-white/50 uppercase tracking-widest">Saldo Atual do Dia</span>
            <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary"><Wallet size={16}/></div>
          </div>
          <div className="text-4xl font-black text-white mb-2">R$ 1.840,50</div>
          <div className="text-xs text-white/50">Inclui saldo anterior de R$ 500,00</div>
        </div>

        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between border-t-2 border-green-500">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-white/50 uppercase tracking-widest">Total Entradas</span>
            <div className="w-8 h-8 rounded bg-green-500/10 flex items-center justify-center text-green-500"><ArrowUpRight size={16}/></div>
          </div>
          <div className="text-4xl font-black text-green-500 mb-2">R$ 2.450,00</div>
          <div className="flex items-center gap-4 text-xs font-bold text-white/50">
            <span className="flex items-center gap-1"><SmartphoneNfc size={12}/> Pix: R$ 1.200</span>
            <span className="flex items-center gap-1"><CreditCard size={12}/> Cartão: R$ 850</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between border-t-2 border-error">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-white/50 uppercase tracking-widest">Total Saídas</span>
            <div className="w-8 h-8 rounded bg-error/10 flex items-center justify-center text-error"><ArrowDownRight size={16}/></div>
          </div>
          <div className="text-4xl font-black text-error mb-2">R$ 1.109,50</div>
          <div className="text-xs text-white/50">Comissões, Produtos e Custos base</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Col: Actions and Payments Summary */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          {/* Caixa Actions */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="font-bold mb-4 uppercase tracking-widest text-xs text-white/50">Ações de Caixa</h3>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setIsCaixaAberto(!isCaixaAberto)}
                className={clsx(
                  "w-full py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-all",
                  isCaixaAberto 
                    ? "bg-error/10 text-error hover:bg-error/20 border border-error/30" 
                    : "bg-primary text-white hover:bg-primary border border-primary"
                )}
              >
                {isCaixaAberto ? <><Lock size={16}/> Fechar Caixa</> : <><LockOpen size={16}/> Abrir Caixa</>}
              </button>
              
              <button className="w-full py-3 rounded-xl bg-surface-container text-white/80 font-bold border border-white/5 hover:bg-white/5 transition-all text-sm">
                Sangria (Retirada)
              </button>
              <button className="w-full py-3 rounded-xl bg-surface-container text-white/80 font-bold border border-white/5 hover:bg-white/5 transition-all text-sm">
                Aporte (Entrada)
              </button>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="glass-card p-6 rounded-2xl">
             <h3 className="font-bold mb-4 uppercase tracking-widest text-xs text-white/50">Caixa por Forma de Pgto</h3>
             <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-primary"><SmartphoneNfc size={16}/></div>
                    <span className="text-sm font-bold opacity-80 group-hover:opacity-100 transition-opacity">Via Pix</span>
                  </div>
                  <span className="font-bold">R$ 840,00</span>
                </div>

                <div className="flex justify-between items-center group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-blue-400"><CreditCard size={16}/></div>
                    <span className="text-sm font-bold opacity-80 group-hover:opacity-100 transition-opacity">Via Cartão</span>
                  </div>
                  <span className="font-bold">R$ 650,50</span>
                </div>

                <div className="flex justify-between items-center group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-amber-500"><Banknote size={16}/></div>
                    <span className="text-sm font-bold opacity-80 group-hover:opacity-100 transition-opacity">Em Dinheiro</span>
                  </div>
                  <span className="font-bold">R$ 350,00</span>
                </div>
             </div>
          </div>
        </div>

        {/* Right Col: Transactions List */}
        <div className="lg:col-span-3 glass-card rounded-2xl flex flex-col">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="font-bold text-lg">Últimas Movimentações (Extrato)</h3>
            <button className="text-sm font-bold text-primary hover:underline">Ver Tabela Completa</button>
          </div>
          
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-white/30 text-[10px] uppercase tracking-widest">
                  <th className="px-6 py-4 font-bold">Data/Hora</th>
                  <th className="px-6 py-4 font-bold">Descrição</th>
                  <th className="px-6 py-4 font-bold">Categoria</th>
                  <th className="px-6 py-4 font-bold">Forma</th>
                  <th className="px-6 py-4 font-bold text-right">Valor</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group cursor-default">
                    <td className="px-6 py-4 text-xs text-white/50 whitespace-nowrap">{tx.date}</td>
                    <td className="px-6 py-4 font-bold text-sm">{tx.description}</td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded bg-white/5 text-white/50 border border-white/5">
                        {tx.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-white/70">{tx.method}</td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className={clsx("font-bold", tx.type === 'entrada' ? 'text-green-500' : 'text-error')}>
                        {tx.type === 'entrada' ? '+' : '-'} R$ {tx.amount.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:bg-white/10 rounded text-white/40"><MoreVertical size={16}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
