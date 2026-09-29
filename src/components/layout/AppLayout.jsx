import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { ToastNotification } from '../common/ToastNotification';

export function AppLayout({
  children,
  activeTab,
  setActiveTab,
  onOpenNewResourceModal,
  isBackendOnline
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Header & Sidebar Container */}
      <div className="flex flex-1 relative">
        {/* Collapsible / Mobile Responsive Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          isMobileOpen={isMobileSidebarOpen}
          setIsMobileOpen={setIsMobileSidebarOpen}
        />

        {/* Main Application Area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          <Header
            onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            onOpenNewResourceModal={onOpenNewResourceModal}
            isBackendOnline={isBackendOnline}
          />

          {/* Main Content Body */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto transition-all">
            {children}
          </main>

          {/* Footer */}
          <Footer isBackendOnline={isBackendOnline} />
        </div>
      </div>

      {/* Floating Toast Notification Container */}
      <ToastNotification />
    </div>
  );
}