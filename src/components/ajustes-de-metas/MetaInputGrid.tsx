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
        value={data.aberturaVencidoMes}
        icon={DollarSign}
        onUpdate={(value) => handleUpdateValue('aberturaVencidoMes', value)}
        formatValue={formatCurrency}
      />
      <MetaInput
        id="aberturaVencidoDia"
        label="Abertura Vencido Dia"
        value={data.aberturaVencidoDia}
        icon={DollarSign}
        onUpdate={(value) => handleUpdateValue('aberturaVencidoDia', value)}
        formatValue={formatCurrency}
      />
      <MetaInput
        id="metaMes"
        label="Meta Mês"
        value={data.metaMes}
        icon={Target}
        onUpdate={(value) => handleUpdateValue('metaMes', value)}
        formatValue={formatCurrency}
      />
      <MetaInput
        id="vencidoAtual"
        label="Vencido Atual"
        value={data.vencidoAtual}
        icon={DollarSign}
        onUpdate={(value) => handleUpdateValue('vencidoAtual', value)}
        formatValue={formatCurrency}
      />
      <MetaInput
        id="diasRestantes"
        label="Dias Restantes"
        value={data.diasRestantes}
        icon={DollarSign}
        isNumeric={false}
        onUpdate={(value) => handleUpdateValue('diasRestantes', value)}
      />
      <MetaInput
        id="aReceberDesafio"
        label="A Receber Desafio"
        value={data.aReceberDesafio ?? 0}
        icon={DollarSign}
        onUpdate={(value) => handleUpdateValue('aReceberDesafio', value)}
        formatValue={formatCurrency}
      />
      <MetaInput
        id="metaDesafio"
        label="Meta Desafio"
        value={data.metaDesafio ?? 0}
        icon={Trophy}
        onUpdate={(value) => handleUpdateValue('metaDesafio', value)}
        formatValue={formatCurrency}
      />
    </div>
  );
};

export default MetaInputGrid;
