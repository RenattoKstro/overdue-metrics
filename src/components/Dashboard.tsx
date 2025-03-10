
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Wallet, Trophy, Utensils, Gift } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Calendar from './Calendar';
import MetaFiado from './MetaFiado';
import MetaDesafio from './MetaDesafio';
import MetaValeAlimentacao from './MetaValeAlimentacao';
import MeusPremios from './MeusPremios';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('calendario');

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold text-center mb-2 text-slate-800">Controle de Inadimplência</h1>
      <p className="text-slate-600 text-center mb-8">Acompanhe suas metas e prêmios em um só lugar</p>
      
      <Tabs defaultValue="calendario" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="calendario" className="flex items-center gap-2 py-2">
            <CalendarIcon className="h-4 w-4" />
            <span>Calendário</span>
          </TabsTrigger>
          <TabsTrigger value="meta-fiado" className="flex items-center gap-2 py-2">
            <Wallet className="h-4 w-4" />
            <span>Meta Fiado</span>
          </TabsTrigger>
          <TabsTrigger value="meta-desafio" className="flex items-center gap-2 py-2">
            <Trophy className="h-4 w-4" />
            <span>Meta Desafio</span>
          </TabsTrigger>
          <TabsTrigger value="meta-vale" className="flex items-center gap-2 py-2">
            <Utensils className="h-4 w-4" />
            <span>Meta Vale</span>
          </TabsTrigger>
          <TabsTrigger value="premios" className="flex items-center gap-2 py-2">
            <Gift className="h-4 w-4" />
            <span>Meus Prêmios</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="tab-content">
          <TabsContent value="calendario" className={activeTab === "calendario" ? "animate-slide-up" : ""}>
            <Calendar />
          </TabsContent>
          
          <TabsContent value="meta-fiado" className={activeTab === "meta-fiado" ? "animate-slide-up" : ""}>
            <MetaFiado />
          </TabsContent>
          
          <TabsContent value="meta-desafio" className={activeTab === "meta-desafio" ? "animate-slide-up" : ""}>
            <MetaDesafio />
          </TabsContent>
          
          <TabsContent value="meta-vale" className={activeTab === "meta-vale" ? "animate-slide-up" : ""}>
            <MetaValeAlimentacao />
          </TabsContent>
          
          <TabsContent value="premios" className={activeTab === "premios" ? "animate-slide-up" : ""}>
            <MeusPremios />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Dashboard;
