import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Target, Trophy, ShoppingBag, Settings, Award } from 'lucide-react';
import MetaFiado from '@/components/MetaFiado';
import MetaDesafio from '@/components/MetaDesafio';
import MetaValeAlimentacao from '@/components/MetaValeAlimentacao';
import AjustesDeMetas from '@/components/AjustesDeMetas';
import MeusPremios from '@/components/MeusPremios';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('ajustes-de-metas');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard de Metas</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="ajustes-de-metas" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Ajustes de Metas</span>
          </TabsTrigger>
          <TabsTrigger value="meta-fiado" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Meta Fiado</span>
          </TabsTrigger>
          <TabsTrigger value="meta-desafio" className="flex items-center space-x-2">
            <Trophy className="h-4 w-4" />
            <span>Meta Desafio</span>
          </TabsTrigger>
          <TabsTrigger value="meta-vale-alimentacao" className="flex items-center space-x-2">
            <ShoppingBag className="h-4 w-4" />
            <span>Meta Vale Alimentação</span>
          </TabsTrigger>
          <TabsTrigger value="meu-premios" className="flex items-center space-x-2">
            <Award className="h-4 w-4" />
            <span>Meu Prêmios</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ajustes-de-metas">
          <AjustesDeMetas />
        </TabsContent>

        <TabsContent value="meta-fiado">
          <MetaFiado />
        </TabsContent>

        <TabsContent value="meta-desafio">
          <MetaDesafio />
        </TabsContent>

        <TabsContent value="meta-vale-alimentacao">
          <MetaValeAlimentacao />
        </TabsContent>

        <TabsContent value="meu-premios">
          <MeusPremios />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
