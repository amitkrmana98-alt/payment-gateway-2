import React from 'react';
import {
  Layers,
  Server,
  DollarSign,
  TrendingUp,
  Activity,
  AlertCircle
} from 'lucide-react';

export function DashboardCards({ metrics, projectsCount }) {
  const cards = [
    {
      id: 'projects',
      title: 'Active Workspaces',
      value: projectsCount,
      change: '+2 this week',
      trend: 'up',
      icon: Layers,
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
    },
    {
      id: 'nodes',
      title: 'Provisioned Nodes',
      value: metrics.totalNodes,
      change: '+12% scale',
      trend: 'up',
      icon: Server,
      color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
    },
    {
      id: 'spend',
      title: 'Est. Monthly Spend',
      value: metrics.monthlyCloudSpend,
      change: '-4.2% optimized',
      trend: 'down',
      icon: DollarSign,
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
    },
    {
      id: 'uptime',
      title: 'Avg. Cluster Health',
      value: metrics.avgUptime,
      change: 'Normal range',
      trend: 'neutral',
      icon: Activity,
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`p-2.5 rounded-lg ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                {card.value}
              </span>
              <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${' '}
                ${card.trend === 'up' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' : ''}${' '}
                ${card.trend === 'down' ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400' : ''}${' '}
                ${card.trend === 'neutral' ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400' : ''}`}
              >
                {card.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}