import React from 'react';
import { Shield, ExternalLink, Cpu } from 'lucide-react';

export function Footer({ isBackendOnline }) {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm py-4 px-4 sm:px-6 transition-colors">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        {/* Left Status & Brand info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span className="font-medium text-slate-700 dark:text-slate-300">
              Nexus Engine v3.8.4
            </span>
          </div>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
          <span className="hidden sm:inline font-mono text-[11px]">
            Region: us-east-1 (Primary Cluster)
          </span>
        </div>

        {/* Middle Status Badge */}
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Status:
          </span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${' '}
            ${isBackendOnline 
              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' 
              : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
            }`}
          >
            {isBackendOnline ? 'Operational [100%]' : 'Backend Network Disconnected'}
          </span>
        </div>

        {/* Right Links */}
        <div className="flex items-center space-x-4 text-xs font-medium">
          <a
            href="#docs"
            onClick={(e) => e.preventDefault()}
            className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors inline-flex items-center space-x-1"
          >
            <span>API Documentation</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="#security"
            onClick={(e) => e.preventDefault()}
            className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors inline-flex items-center space-x-1"
          >
            <Shield className="w-3 h-3" />
            <span>Compliance</span>
          </a>
        </div>
      </div>
    </footer>
  );
}