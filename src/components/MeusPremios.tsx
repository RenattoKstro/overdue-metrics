import React from 'react';
import { Gift, Wallet, Trophy, Utensils } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboard } from '@/context/DashboardContext';

const MeusPremios = () => {
  const { data, formatCurrency, premiosMetaFiado, premiosMetaDesafio, premiosValeAlimentacao, totalPremios } = useDashboard();

  const calcularPercentualMetaFiado = () => data.metaMes > 0 ? (data.recebidoMes / data.metaMes) * 100 : 0;
  const calcularPercentualMetaDesafio = () => data.vencidoAtual > 0 ? (data.metaDesafio / data.vencidoAtual) * 100 : 0;

  const percentMetaFiado = calcularPercentualMetaFiado();
  const percentMetaDesafio = calcularPercentualMetaDesafio();
  const metaValeAlimentacaoAtingida = data.metaBatida === true;

  const renderPremioStatus = (threshold: number, currentValue: number, reward: number, icon: JSX.Element) => {
    const isAchieved = currentValue >= threshold;
    return (
      <div className={`flex justify-between items-center p-3 rounded-lg mb-2 transition-all duration-300 ${
        isAchieved ? 'bg-green-50 border border-green-200' : 'bg-slate-50 border border-slate-200'
      }`}>
        <div className="flex items-center">
          {icon}
          <span className={`ml-2 ${isAchieved ? 'text-green-700 font-medium' : 'text-slate-600'}`}>
            {threshold}%
          </span>
        </div>
        <div className="flex items-center">
          <span className={`mr-1 ${isAchieved ? 'text-green-700 font-medium' : 'text-slate-600'}`}>
            {formatCurrency(reward)}
          </span>
          {isAchieved && (
            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="animate-slide-up">
      <Card className="shadow-premium hover:shadow-card-hover transition-shadow duration-300 bg-gradient-to-br from-slate-50 to-slate-100">
        <CardHeader className="bg-gradient-to-r from-purple-400 to-purple-500 text-white">
          <div className="flex items-center space-x-2">
            <Gift className="h-6 w-6 text-purple-100 animate-float" />
            <CardTitle>Meus Prêmios</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 hover-lift border-none bg-white">
              <CardHeader className="bg-gradient-to-r from-blue-400/90 to-blue-500/90 text-white py-4">
                <div className="flex items-center space-x-2">
                  <Wallet className="h-5 w-5" />
                  <CardTitle className="text-base">Meta Fiado ({percentMetaFiado.toFixed(2)}%)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="mb-4">
                  {renderPremioStatus(94, percentMetaFiado, 52.50, <Wallet className="h-4 w-4 text-blue-500" />)}
                  {renderPremioStatus(96, percentMetaFiado, 63.00, <Wallet className="h-4 w-4 text-blue-500" />)}
                  {renderPremioStatus(98, percentMetaFiado, 84.00, <Wallet className="h-4 w-4 text-blue-500" />)}
                  {renderPremioStatus(99, percentMetaFiado, 94.50, <Wallet className="h-4 w-4 text-blue-500" />)}
                  {renderPremioStatus(100, percentMetaFiado, 241.50, <Wallet className="h-4 w-4 text-blue-500" />)}
                  {renderPremioStatus(101, percentMetaFiado, 84.00, <Wallet className="h-4 w-4 text-blue-500" />)}
                  {renderPremioStatus(103, percentMetaFiado, 84.00, <Wallet className="h-4 w-4 text-blue-500" />)}
                  {renderPremioStatus(105, percentMetaFiado, 84.00, <Wallet className="h-4 w-4 text-blue-500" />)}
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                  <span className="font-medium text-slate-700">Total</span>
                  <span className="font-semibold text-blue-600">{formatCurrency(premiosMetaFiado)}</span>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 hover-lift border-none bg-white">
              <CardHeader className="bg-gradient-to-r from-yellow-400/90 to-yellow-500/90 text-white py-4">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <CardTitle className="text-base">Meta Desafio ({percentMetaDesafio.toFixed(2)}%)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="mb-4">
                  {renderPremioStatus(96, percentMetaDesafio, 200.00, <Trophy className="h-4 w-4 text-yellow-500" />)}
                  {renderPremioStatus(98, percentMetaDesafio, 150.00, <Trophy className="h-4 w-4 text-yellow-500" />)}
                  {renderPremioStatus(100, percentMetaDesafio, 150.00, <Trophy className="h-4 w-4 text-yellow-500" />)}
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                  <span className="font-medium text-slate-700">Total</span>
                  <span className="font-semibold text-yellow-600">{formatCurrency(premiosMetaDesafio)}</span>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 hover-lift border-none bg-white">
              <CardHeader className="bg-gradient-to-r from-emerald-400/90 to-emerald-500/90 text-white py-4">
                <div className="flex items-center space-x-2">
                  <Utensils className="h-5 w-5" />
                  <CardTitle className="text-base">Meta Vale Alimentação</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="mb-4">
                  <div className={`flex justify-between items-center p-3 rounded-lg mb-2 transition-all duration-300 ${
                    metaValeAlimentacaoAtingida ? 'bg-green-50 border border-green-200' : 'bg-slate-50 border border-slate-200'
                  }`}>
                    <div className="flex items-center">
                      <Utensils className="h-4 w-4 text-emerald-500" />
                      <span className={`ml-2 ${metaValeAlimentacaoAtingida ? 'text-green-700 font-medium' : 'text-slate-600'}`}>
                        80% até dia 15
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className={`mr-1 ${metaValeAlimentacaoAtingida ? 'text-green-700 font-medium' : 'text-slate-600'}`}>
                        {formatCurrency(100.00)}
                      </span>
                      {metaValeAlimentacaoAtingida && (
                        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                  <span className="font-medium text-slate-700">Total</span>
                  <span className="font-semibold text-emerald-600">{formatCurrency(premiosValeAlimentacao)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Gift className="h-6 w-6 text-indigo-500 mr-2" />
                <span className="text-lg font-semibold text-indigo-700">Total Geral de Ganhos</span>
              </div>
              <span className="text-2xl font-bold text-indigo-600">{formatCurrency(totalPremios)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeusPremios;
