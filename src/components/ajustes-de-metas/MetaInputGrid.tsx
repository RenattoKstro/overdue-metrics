
import React from 'react';
import { DollarSign, Target, Trophy } from 'lucide-react';
import { useDashboard } from '@/context/DashboardContext';
import MetaInput from './MetaInput';

const MetaInputGrid: React.FC = () => {
  const { data, updateData, formatCurrency } = useDashboard();

  const handleUpdateValue = (field: keyof typeof data, value: number) => {
    updateData(field, value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MetaInput
        id="aberturaVencidoMes"
        label="Abertura Vencido Mês"
        value={formatCurrency(data.aberturaVencidoMes)}
        icon={DollarSign}
        onUpdate={(value) => handleUpdateValue('aberturaVencidoMes', value)}
      />

      <MetaInput
        id="aberturaVencidoDia"
        label="Abertura Vencido Dia"
        value={formatCurrency(data.aberturaVencidoDia)}
        icon={DollarSign}
        onUpdate={(value) => handleUpdateValue('aberturaVencidoDia', value)}
      />

      <MetaInput
        id="metaMes"
        label="Meta Mês"
        value={formatCurrency(data.metaMes)}
        icon={Target}
        onUpdate={(value) => handleUpdateValue('metaMes', value)}
      />

      <MetaInput
        id="vencidoAtual"
        label="Vencido Atual"
        value={formatCurrency(data.vencidoAtual)}
        icon={DollarSign}
        onUpdate={(value) => handleUpdateValue('vencidoAtual', value)}
      />

      <MetaInput
        id="diasRestantes"
        label="Dias Restantes"
        value={data.diasRestantes.toString()}
        icon={DollarSign}
        isNumeric={false}
        onUpdate={(value) => handleUpdateValue('diasRestantes', value)}
      />

      <MetaInput
        id="aReceberDesafio"
        label="A Receber Desafio"
        value={formatCurrency(data.aReceberDesafio || 0)}
        icon={DollarSign}
        onUpdate={(value) => handleUpdateValue('aReceberDesafio', value)}
      />

      <MetaInput
        id="metaDesafio"
        label="Meta Desafio"
        value={formatCurrency(data.metaDesafio || 0)}
        icon={Trophy}
        onUpdate={(value) => handleUpdateValue('metaDesafio', value)}
      />
    </div>
  );
};

export default MetaInputGrid;
