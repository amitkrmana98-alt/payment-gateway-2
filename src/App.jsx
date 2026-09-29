import React, { useState, useMemo } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { AppLayout } from './components/layout/AppLayout';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { DashboardCards } from './components/dashboard/DashboardCards';
import { FilterBar } from './components/dashboard/FilterBar';
import { DataTable } from './components/dashboard/DataTable';
import { AnalyticsCharts } from './components/dashboard/AnalyticsCharts';
import { Modal } from './components/common/Modal';
import { ActionDrawer } from './components/common/ActionDrawer';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import {
  INITIAL_PROJECTS,
  INITIAL_ACTIVITY_LOGS,
  SYSTEM_METRICS,
  IS_DEMO_DATA
} from './data/mockData';
import {
  Layers,
  Plus,
  Server,
  Activity,
  Database,
  FileText,
  Settings,
  Sparkles,
  WifiOff,
  CheckCircle,
  ShieldAlert
} from 'lucide-react';

function DashboardContent() {
  const { addToast } = useToast();
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [activityLogs, setActivityLogs] = useState(INITIAL_ACTIVITY_LOGS);
  const [isBackendOnline, setIsBackendOnline] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);

  // Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Modal & Drawer State
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [selectedProjectForDrawer, setSelectedProjectForDrawer] = useState(null);
  const [newProjectForm, setNewProjectForm] = useState({
    name: '',
    category: 'Fintech',
    region: 'us-east-1',
    nodes: 4,
    monthlySpend: '$1,200.00'
  });

  // Unique Categories & Statuses
  const categories = useMemo(() => {
    return Array.from(new Set(projects.map(p => p.category)));
  }, [projects]);

  const statuses = useMemo(() => {
    return Array.from(new Set(projects.map(p => p.status)));
  }, [projects]);

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.region.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [projects, searchTerm, selectedCategory, selectedStatus]);

  // Handlers
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedStatus('All');
    addToast({
      title: 'Filters Cleared',
      message: 'All workspace table filters have been reset.',
      type: 'info'
    });
  };

  const handleDeleteProject = (id) => {
    const target = projects.find(p => p.id === id);
    setProjects(prev => prev.filter(p => p.id !== id));
    addToast({
      title: 'Workspace Deleted',
      message: `Successfully removed ${target ? target.name : id} [Demo Data]`,
      type: 'warning'
    });
  };

  const handleBulkDelete = (ids) => {
    setProjects(prev => prev.filter(p => !ids.includes(p.id)));
    addToast({
      title: 'Bulk Deletion Completed',
      message: `Removed ${ids.length} selected workspace environments.`,
      type: 'warning'
    });
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProjectForm.name.trim()) {
      addToast({
        title: 'Validation Error',
        message: 'Please provide a valid workspace project name.',
        type: 'error'
      });
      return;
    }

    const newId = `PRJ-${Math.floor(100 + Math.random() * 900)}`;
    const newEntry = {
      id: newId,
      name: newProjectForm.name,
      category: newProjectForm.category,
      status: 'Active',
      region: newProjectForm.region,
      nodes: parseInt(newProjectForm.nodes, 10) || 2,
      monthlySpend: newProjectForm.monthlySpend,
      healthScore: 100.0,
      lastDeployed: 'Just now',
      owner: 'Sarah Jenkins',
      tags: ['New', 'Production']
    };

    setProjects([newEntry, ...projects]);
    setIsNewModalOpen(false);
    setNewProjectForm({
      name: '',
      category: 'Fintech',
      region: 'us-east-1',
      nodes: 4,
      monthlySpend: '$1,200.00'
    });

    // Add log entry
    setActivityLogs([
      {
        id: `LOG-${Date.now().toString().slice(-3)}`,
        timestamp: 'Just now',
        actor: 'Sarah Jenkins',
        action: 'Provisioned new workspace',
        target: `${newId} (${newEntry.name})`,
        status: 'Success'
      },
      ...activityLogs
    ]);

    addToast({
      title: 'Workspace Created',
      message: `Created ${newEntry.name} in region ${newEntry.region}.`,
      type: 'success'
    });
  };

  const toggleBackendOnline = () => {
    setIsBackendOnline(prev => !prev);
    addToast({
      title: isBackendOnline ? 'Network Disconnected' : 'Network Reconnected',
      message: isBackendOnline 
        ? 'Simulating backend connectivity failure state.' 
        : 'API connection restored to us-east-1 cluster.',
      type: isBackendOnline ? 'error' : 'success'
    });
  };

  return (
    <AppLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onOpenNewResourceModal={() => setIsNewModalOpen(true)}
      isBackendOnline={isBackendOnline}
    >
      {/* Top Welcome Bar with Honesty Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Enterprise Workspace Overview
            </h1>
            {IS_DEMO_DATA && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                Demo Data
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Monitor active clusters, manage infrastructure scaling, and inspect telemetry.
          </p>
        </div>

        {/* Connectivity Simulation Toggle & Loading Spinner Test */}
        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={toggleBackendOnline}
            className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${' '}
              ${isBackendOnline 
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100' 
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800 hover:bg-rose-100'
              }`}
            title="Toggle simulated backend network state"
          >
            {isBackendOnline ? <CheckCircle className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            <span>Simulate API {isBackendOnline ? 'Offline' : 'Online'}</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation Content Routing */}
      {activeTab === 'dashboard' && (
        <ErrorBoundary>
          {/* Top Key Metrics Cards */}
          <DashboardCards metrics={SYSTEM_METRICS} projectsCount={projects.length} />

          {/* Telemetry Charts & Operations Feed */}
          <AnalyticsCharts activityLogs={activityLogs} />

          {/* Workspace Filter Bar */}
          <FilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            onResetFilters={handleResetFilters}
            categories={categories}
            statuses={statuses}
          />

          {/* Workspace Interactive Data Table */}
          <DataTable
            projects={filteredProjects}
            onViewDetails={(prj) => setSelectedProjectForDrawer(prj)}
            onDeleteProject={handleDeleteProject}
            onBulkDelete={handleBulkDelete}
          />
        </ErrorBoundary>
      )}

      {activeTab === 'projects' && (
        <ErrorBoundary>
          <div className="space-y-6">
            <FilterBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              onResetFilters={handleResetFilters}
              categories={categories}
              statuses={statuses}
            />
            <DataTable
              projects={filteredProjects}
              onViewDetails={(prj) => setSelectedProjectForDrawer(prj)}
              onDeleteProject={handleDeleteProject}
              onBulkDelete={handleBulkDelete}
            />
          </div>
        </ErrorBoundary>
      )}

      {activeTab === 'analytics' && (
        <ErrorBoundary>
          <div className="space-y-6">
            <AnalyticsCharts activityLogs={activityLogs} />
            <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">Advanced Analytics Summary</h3>
              <p className="leading-relaxed">
                Real-time stream telemetry connected to Prometheus cluster exporter on port 9090.
                Displaying demo sample data for health metrics and latency stats.
              </p>
            </div>
          </div>
        </ErrorBoundary>
      )}

      {(activeTab === 'data' || activeTab === 'logs' || activeTab === 'settings') && (
        <ErrorBoundary>
          <div className="p-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 mx-auto flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 capitalize">
              {activeTab} Module
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              This tab is ready for custom enterprise extensions. Current workspace contains {projects.length} configured clusters.
            </p>
          </div>
        </ErrorBoundary>
      )}

      {/* Modal Overlay for Creating New Workspace */}
      <Modal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        title="Provision New Cloud Workspace"
        footerButtons={
          <>
            <button
              onClick={() => setIsNewModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateProject}
              className="px-4 py-2 text-xs font-medium bg-brand-600 hover:bg-brand-700 text-white rounded-lg shadow transition-colors"
            >
              Provision Resource
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Workspace / Service Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Auth Gateway Service"
              value={newProjectForm.name}
              onChange={(e) => setNewProjectForm({ ...newProjectForm, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={newProjectForm.category}
                onChange={(e) => setNewProjectForm({ ...newProjectForm, category: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="Fintech">Fintech</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Messaging">Messaging</option>
                <option value="Networking">Networking</option>
                <option value="Web Services">Web Services</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Primary Region
              </label>
              <select
                value={newProjectForm.region}
                onChange={(e) => setNewProjectForm({ ...newProjectForm, region: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="us-east-1">us-east-1 (N. Virginia)</option>
                <option value="us-west-2">us-west-2 (Oregon)</option>
                <option value="eu-central-1">eu-central-1 (Frankfurt)</option>
                <option value="ap-southeast-1">ap-southeast-1 (Singapore)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Node Count
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={newProjectForm.nodes}
                onChange={(e) => setNewProjectForm({ ...newProjectForm, nodes: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Est. Monthly Cost
              </label>
              <input
                type="text"
                value={newProjectForm.monthlySpend}
                onChange={(e) => setNewProjectForm({ ...newProjectForm, monthlySpend: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* Action Slide-Over Drawer for Row Details */}
      <ActionDrawer
        isOpen={Boolean(selectedProjectForDrawer)}
        onClose={() => setSelectedProjectForDrawer(null)}
        title={selectedProjectForDrawer ? selectedProjectForDrawer.name : 'Workspace Inspector'}
        actions={
          <>
            <button
              onClick={() => setSelectedProjectForDrawer(null)}
              className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Close Inspector
            </button>
          </>
        }
      >
        {selectedProjectForDrawer && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Resource Identifier</span>
              <p className="font-mono text-sm font-bold text-brand-600 dark:text-brand-400">
                {selectedProjectForDrawer.id}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400 block mb-0.5">Category</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedProjectForDrawer.category}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Deployment Region</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{selectedProjectForDrawer.region}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Status</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedProjectForDrawer.status}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Active Nodes</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{selectedProjectForDrawer.nodes} units</span>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-3 space-y-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">Configuration Metadata</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedProjectForDrawer.tags?.map(t => (
                  <span key={t} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded text-[10px] font-mono">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </ActionDrawer>
    </AppLayout>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <DashboardContent />
      </ToastProvider>
    </ThemeProvider>
  );
}
