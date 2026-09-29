import React from 'react';
import { TrendingUp, PieChart, Activity, Clock } from 'lucide-react';

export function AnalyticsCharts({ activityLogs }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Main Bar / Line Visual Chart */}
      <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Cluster CPU & Memory Load Trend
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live metric telemetry aggregated across regions over 24 hrs
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-medium">
            <span className="flex items-center space-x-1 text-brand-600 dark:text-brand-400">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-500 inline-block" />
              <span>CPU</span>
            </span>
            <span className="flex items-center space-x-1 text-purple-600 dark:text-purple-400">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />
              <span>Memory</span>
            </span>
          </div>
        </div>

        {/* Custom Responsive SVG Chart Visual */}
        <div className="w-full h-48 my-2 relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
            {/* Grid Lines */}
            <line x1="0" y1="30" x2="500" y2="30" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeDasharray="4 4" />
            <line x1="0" y1="75" x2="500" y2="75" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeDasharray="4 4" />
            <line x1="0" y1="120" x2="500" y2="120" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeDasharray="4 4" />
            
            {/* Line 1 (CPU) */}
            <path
              d="M 0,110 Q 75,40 150,70 T 300,50 T 450,80 L 500,30"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Area under Line 1 */}
            <path
              d="M 0,110 Q 75,40 150,70 T 300,50 T 450,80 L 500,30 L 500,150 L 0,150 Z"
              fill="url(#brandGradient)"
              opacity="0.15"
            />
            
            {/* Line 2 (Memory) */}
            <path
              d="M 0,90 Q 75,100 150,60 T 300,90 T 450,40 L 500,70"
              fill="none"
              stroke="#a855f7"
              strokeWidth="2.5"
              strokeDasharray="6 3"
              strokeLinecap="round"
            />

            <defs>
              <linearGradient id="brandGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono border-t border-slate-100 dark:border-slate-800 pt-2">
          <span>00:00</span>
          <span>04:00</span>
          <span>08:00</span>
          <span>12:00</span>
          <span>16:00</span>
          <span>20:00</span>
          <span>Now</span>
        </div>
      </div>

      {/* Right Column: Recent Activity Feed */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-brand-500" />
            <span>Live Operations Log</span>
          </h3>
          <span className="text-[10px] text-slate-400 font-mono uppercase">Realtime</span>
        </div>

        <div className="space-y-3.5 flex-1 overflow-y-auto custom-scrollbar max-h-52">
          {activityLogs.map((log) => (
            <div key={log.id} className="flex items-start space-x-3 text-xs border-b border-slate-100 dark:border-slate-800/60 pb-2.5 last:border-0">
              <span className="w-2 h-2 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800 dark:text-slate-200 truncate">
                  {log.action}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate">
                  {log.target} &bull; {log.actor}
                </p>
              </div>
              <span className="text-[10px] text-slate-400 whitespace-nowrap font-mono">
                {log.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}