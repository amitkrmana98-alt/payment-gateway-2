import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  Menu, 
  Sun, 
  Moon, 
  Bell, 
  Plus, 
  Search, 
  ShieldCheck, 
  ChevronDown,
  Globe,
  Activity
} from 'lucide-react';

export function Header({ onToggleSidebar, onOpenNewResourceModal, isBackendOnline }) {
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between transition-colors">
      {/* Left section: Hamburger & Search */}
      <div className="flex items-center space-x-3 sm:space-x-4 flex-1 max-w-xl">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
          aria-label="Toggle Menu Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <div className="relative w-full max-w-xs sm:max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search infrastructure, deployments, resources..."
            className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
          />
        </div>
      </div>

      {/* Right section: System Status, New Action, Notifications, Theme, User */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Real Dynamic System Health Indicator ( computed from props ) */}
        <div 
          className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
          title="Real-time backend API connectivity state"
        >
          <span className={`w-2 h-2 rounded-full ${isBackendOnline ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
          <span className="text-slate-700 dark:text-slate-300">
            {isBackendOnline ? 'API Connected' : 'API Unavailable'}
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={onOpenNewResourceModal}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-medium text-xs sm:text-sm rounded-lg shadow-sm transition-all focus:ring-2 focus:ring-brand-500 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Resource</span>
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
          aria-label="Toggle light/dark theme"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5 text-slate-600" />
          )}
        </button>

        {/* Notifications Dropdown Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative transition-colors focus:outline-none"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  System Alerts
                </h4>
                <span className="text-[10px] bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 px-2 py-0.5 rounded-full font-bold">
                  2 Unread
                </span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-700/50 max-h-64 overflow-y-auto custom-scrollbar">
                <div className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/40 text-xs transition-colors cursor-pointer">
                  <p className="font-medium text-slate-800 dark:text-slate-200">Autoscaling Triggered</p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">PRJ-102 added 4 extra GPU instances.</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">10m ago</span>
                </div>
                <div className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/40 text-xs transition-colors cursor-pointer">
                  <p className="font-medium text-amber-600 dark:text-amber-400">Health Check Warning</p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">PRJ-103 latency spiked above 450ms.</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">42m ago</span>
                </div>
              </div>
              <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-700 text-center">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-brand-600 dark:text-brand-400 font-medium hover:underline"
                >
                  Dismiss panel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Button */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              SJ
            </div>
            <span className="hidden lg:block text-xs font-semibold text-slate-700 dark:text-slate-200">
              Sarah J.
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Sarah Jenkins</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Principal DevOps Eng</p>
              </div>
              <a
                href="#profile"
                onClick={(e) => { e.preventDefault(); setShowUserMenu(false); }}
                className="block px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50"
              >
                Account Settings
              </a>
              <a
                href="#keys"
                onClick={(e) => { e.preventDefault(); setShowUserMenu(false); }}
                className="block px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50"
              >
                API Security Keys
              </a>
              <div className="border-t border-slate-100 dark:border-slate-700 my-1" />
              <button
                onClick={() => setShowUserMenu(false)}
                className="w-full text-left px-4 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-medium"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}