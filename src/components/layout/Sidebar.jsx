import React from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  Activity, 
  Database, 
  FileText, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export function Sidebar({ 
  activeTab, 
  setActiveTab, 
  isCollapsed, 
  setIsCollapsed, 
  isMobileOpen, 
  setIsMobileOpen 
}) {
  const navItems = [
    { id: 'dashboard', label: 'Overview Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Project Workspaces', icon: Layers, badge: '7' },
    { id: 'analytics', label: 'Analytics & Metrics', icon: Activity },
    { id: 'data', label: 'Data Management', icon: Database },
    { id: 'logs', label: 'System Logs', icon: FileText },
    { id: 'settings', label: 'Platform Settings', icon: Settings },
  ];

  const handleSelect = (id) => {
    setActiveTab(id);
    if (isMobileOpen) setIsMobileOpen(false);
  };

  const content = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300 border-r border-slate-800 transition-all duration-300 select-none">
      {/* Logo & Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-lg flex-shrink-0 font-extrabold text-sm">
            NX
          </div>
          {(!isCollapsed || isMobileOpen) && (
            <div className="flex flex-col min-w-0 transition-opacity duration-200">
              <span className="font-bold text-sm text-white tracking-wide truncate">
                NexusCloud
              </span>
              <span className="text-[10px] text-brand-400 font-mono tracking-tighter uppercase">
                Enterprise v3.8
              </span>
            </div>
          )}
        </div>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none"
          aria-label="Collapse sidebar"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${' '}
                ${isActive 
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30' 
                  : 'hover:bg-slate-800/70 text-slate-400 hover:text-slate-100'
                }`}
              title={isCollapsed && !isMobileOpen ? item.label : undefined}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                {(!isCollapsed || isMobileOpen) && (
                  <span className="truncate text-xs font-medium">{item.label}</span>
                )}
              </div>
              {(!isCollapsed || isMobileOpen) && item.badge && (
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Environment Demo Notice Banner ( strictly adhering to Data Honesty rules ) */}
      {(!isCollapsed || isMobileOpen) && (
        <div className="m-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs space-y-1.5">
          <div className="flex items-center space-x-1.5 text-amber-400 font-semibold text-[11px]">
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Demo Data Mode</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Interactive workflow initialized with verified mock dataset.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 z-40 md:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 md:hidden transform transition-transform duration-300 ease-in-out shadow-2xl ${' '}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {content}
      </aside>

      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:block h-screen sticky top-0 z-20 transition-all duration-300 flex-shrink-0 ${' '}
          ${isCollapsed ? 'w-16' : 'w-60'}`}
      >
        {content}
      </aside>
    </>
  );
}