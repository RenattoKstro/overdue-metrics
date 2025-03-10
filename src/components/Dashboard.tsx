import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import MetaFiado from '@/components/MetaFiado';
import MetaDesafio from '@/components/MetaDesafio';
import MetaValeAlimentacao from '@/components/MetaValeAlimentacao';
import AjustesDeMetas from '@/components/AjustesDeMetas';
import MeuPremios from '@/components/MeuPremios';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('meta-fiado');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard de Metas</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="meta-fiado">Meta Fiado</TabsTrigger>
          <TabsTrigger value="meta-desafio">Meta Desafio</TabsTrigger>
          <TabsTrigger value="meta-vale-alimentacao">Meta Vale Alimentação</TabsTrigger>
          <TabsTrigger value="ajustes-de-metas">Ajustes de Metas</TabsTrigger>
          <TabsTrigger value="meu-premios">Meu Prêmios</TabsTrigger>
        </TabsList>

        <TabsContent value="meta-fiado">
          <MetaFiado />
        </TabsContent>

        <TabsContent value="meta-desafio">
          <MetaDesafio />
        </TabsContent>

        <TabsContent value="meta-vale-alimentacao">
          <MetaValeAlimentacao />
        </TabsContent>

        <TabsContent value="ajustes-de-metas">
          <AjustesDeMetas />
        </TabsContent>

        <TabsContent value="meu-premios">
          <MeuPremios />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
