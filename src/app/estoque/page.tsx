"use client";

import React, { useState } from "react";
import { 
  Package, 
  Search, 
  Plus, 
  AlertOctagon, 
  ArrowUpCircle,
  ArrowDownCircle,
  TrendingUp,
  MoreVertical,
  Filter
} from "lucide-react";
import clsx from "clsx";

interface Product {
  id: string;
  name: string;
  brand: string;
  sku: string;
  costPrice: number;
  sellPrice: number;
  stock: number;
  minStock: number;
  status: "Normal" | "Baixo" | "Esgotado";
}

const mockProducts: Product[] = [
  { id: "1", name: "Pomada Matte", brand: "Babo", sku: "PMM-01", costPrice: 20.00, sellPrice: 45.00, stock: 45, minStock: 10, status: "Normal" },
  { id: "2", name: "Balm para Barba", brand: "Macholândia", sku: "BLM-02", costPrice: 25.00, sellPrice: 55.00, stock: 8, minStock: 10, status: "Baixo" },
  { id: "3", name: "Shampoo Anticaspa", brand: "Babo", sku: "SHM-01", costPrice: 15.00, sellPrice: 35.00, stock: 2, minStock: 5, status: "Baixo" },
  { id: "4", name: "Óleo Hidratante", brand: "Viking", sku: "OIL-05", costPrice: 30.00, sellPrice: 70.00, stock: 0, minStock: 5, status: "Esgotado" },
  { id: "5", name: "Gel Fixador", brand: "Bozzano", sku: "GEL-01", costPrice: 8.00, sellPrice: 20.00, stock: 65, minStock: 20, status: "Normal" },
];

export default function EstoquePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const totalValueSell = mockProducts.reduce((acc, p) => acc + (p.stock * p.sellPrice), 0);
  const totalValueCost = mockProducts.reduce((acc, p) => acc + (p.stock * p.costPrice), 0);
  const potentialProfit = totalValueSell - totalValueCost;
  const lowStockCount = mockProducts.filter(p => p.status === "Baixo" || p.status === "Esgotado").length;

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter mb-1 flex items-center gap-3">
            Estoque
            {lowStockCount > 0 && (
              <span className="text-[10px] font-bold uppercase tracking-widest bg-error/20 text-error px-3 py-1 rounded-full border border-error/20 flex items-center gap-1">
                <AlertOctagon size={12} /> {lowStockCount} Itens em Falta
              </span>
            )}
          </h1>
          <p className="text-on-surface-variant opacity-80">Gestão de produtos, vendas e prateleiras.</p>
        </div>

        <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-[#007A7A] transition-colors">
          <Plus size={18} />
          Cadastrar Produto
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* KPI 1: Capital em Estoque */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between border-t-2 border-primary">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-white/50 uppercase tracking-widest">Capital Empatado (Custo)</span>
            <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary"><Package size={16}/></div>
          </div>
          <div className="text-3xl font-black text-white mb-1">R$ {totalValueCost.toFixed(2)}</div>
          <div className="text-xs text-white/40">Soma do preço de custo de todos os itens em estoque</div>
        </div>

        {/* KPI 2: Lucro Potencial */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between border-t-2 border-green-500">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-white/50 uppercase tracking-widest">Lucro Potencial (Margem)</span>
            <div className="w-8 h-8 rounded bg-green-500/10 flex items-center justify-center text-green-500"><TrendingUp size={16}/></div>
          </div>
          <div className="text-3xl font-black text-green-500 mb-1">R$ {potentialProfit.toFixed(2)}</div>
          <div className="text-xs text-white/40">Lucro estimado nas vendas do inventário atual</div>
        </div>

        {/* KPI 3: Alertas */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between bg-error/5 border-t-2 border-error">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-error/60 uppercase tracking-widest">Alerta de Reposição</span>
            <div className="w-8 h-8 rounded bg-error/10 flex items-center justify-center text-error"><AlertOctagon size={16}/></div>
          </div>
          <div className="text-3xl font-black text-error mb-1">{lowStockCount}</div>
          <div className="text-xs text-error/60 font-bold">Itens acabando ou esgotados. Cuidado para não perder venda!</div>
        </div>
      </div>

      {/* Main CRM Area */}
      <div className="glass-card rounded-2xl flex-1 flex flex-col min-h-[400px]">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <Search size={18} className="absolute left-3 top-2.5 text-white/40" />
            <input 
              type="text" 
              placeholder="Buscar por nome, marca ou SKU..." 
              className="w-full bg-surface-container rounded-lg py-2 pl-10 pr-4 text-sm border border-white/5 focus:border-primary/50 outline-none transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-sm font-bold text-white/70 hover:bg-white/5 transition-colors">
              <Filter size={16} /> Filtros
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-green-500/20 text-green-500 hover:bg-green-500/10 rounded-lg text-sm font-bold transition-colors">
              <ArrowDownCircle size={16} /> Dar Entrada
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-error/20 text-error hover:bg-error/10 rounded-lg text-sm font-bold transition-colors">
              <ArrowUpCircle size={16} /> Registrar Saída
            </button>
          </div>
        </div>

        {/* Clients Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-white/5 text-white/40 text-xs uppercase tracking-widest">
                <th className="px-6 py-4 font-bold">Produto</th>
                <th className="px-6 py-4 font-bold text-center">Status</th>
                <th className="px-6 py-4 font-bold text-right">P. Custo</th>
                <th className="px-6 py-4 font-bold text-right">P. Venda</th>
                <th className="px-6 py-4 font-bold text-center">Margem</th>
                <th className="px-6 py-4 font-bold text-center">Qtd Atual</th>
                <th className="px-6 py-4 font-bold text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((product) => {
                const margin = ((product.sellPrice - product.costPrice) / product.costPrice) * 100;

                return (
                  <tr key={product.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-bold text-white mb-0.5">{product.name}</div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40">{product.brand} • SKU: {product.sku}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={clsx(
                        "text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border",
                        product.status === "Normal" && "bg-white/5 border-white/10 text-white/50",
                        product.status === "Baixo" && "bg-amber-500/10 text-amber-500 border-amber-500/20",
                        product.status === "Esgotado" && "bg-error/10 text-error border-error/20",
                      )}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-medium text-white/60">R$ {product.costPrice.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-bold text-white">R$ {product.sellPrice.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-bold text-primary">{margin.toFixed(0)}%</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={clsx("text-lg font-black", product.stock <= product.minStock ? 'text-error' : 'text-white')}>
                        {product.stock}
                      </span>
                      <div className="text-[10px] text-white/30">Mín: {product.minStock}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-white/5 rounded-lg text-white/40">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
