import React, { useState, useMemo } from 'react';
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Trash2,
  ExternalLink,
  CheckSquare,
  Square,
  ChevronLeft,
  ChevronRight,
  Activity
} from 'lucide-react';

export function DataTable({
  projects,
  onViewDetails,
  onDeleteProject,
  onBulkDelete
}) {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Handle Sort Toggle
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sorted projects
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [projects, sortField, sortDirection]);

  // Pagination logic
  const totalPages = Math.ceil(sortedProjects.length / pageSize) || 1;
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedProjects.slice(start, start + pageSize);
  }, [sortedProjects, currentPage, pageSize]);

  // Checkbox selection logic
  const handleSelectAll = () => {
    if (selectedIds.length === paginatedProjects.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedProjects.map(p => p.id));
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const statusColors = {
    Active: 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800',
    Degraded: 'bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800',
    Maintenance: 'bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-800',
    Inactive: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col transition-colors">
      {/* Table Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="px-6 py-3 bg-brand-50 dark:bg-brand-950/50 border-b border-brand-200 dark:border-brand-900 flex items-center justify-between transition-colors">
          <span className="text-xs font-semibold text-brand-900 dark:text-brand-200">
            {selectedIds.length} item(s) selected
          </span>
          <button
            onClick={() => {
              onBulkDelete(selectedIds);
              setSelectedIds([]);
            }}
            className="inline-flex items-center space-x-1.5 px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs rounded-lg shadow transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Selected</span>
          </button>
        </div>
      )}

      {/* Responsive Horizontal Scroll Container for Table */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <th className="p-4 w-10 text-center">
                <button
                  onClick={handleSelectAll}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none"
                  aria-label="Select all visible rows"
                >
                  {selectedIds.length > 0 && selectedIds.length === paginatedProjects.length ? (
                    <CheckSquare className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th className="p-4 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100 transition-colors" onClick={() => handleSort('name')}>
                <div className="flex items-center space-x-1">
                  <span>Project / Resource</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="p-4 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100 transition-colors" onClick={() => handleSort('category')}>
                <div className="flex items-center space-x-1">
                  <span>Category</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="p-4 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100 transition-colors" onClick={() => handleSort('status')}>
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="p-4 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100 transition-colors" onClick={() => handleSort('nodes')}>
                <div className="flex items-center space-x-1">
                  <span>Nodes</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="p-4 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100 transition-colors" onClick={() => handleSort('healthScore')}>
                <div className="flex items-center space-x-1">
                  <span>Health</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="p-4 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100 transition-colors" onClick={() => handleSort('monthlySpend')}>
                <div className="flex items-center space-x-1">
                  <span>Monthly Spend</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
            {paginatedProjects.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-slate-500 dark:text-slate-400">
                  No workspaces found matching your filter options.
                </td>
              </tr>
            ) : (
              paginatedProjects.map((project) => {
                const isSelected = selectedIds.includes(project.id);
                return (
                  <tr
                    key={project.id}
                    className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${' '}
                      ${isSelected ? 'bg-brand-50/40 dark:bg-brand-950/20' : ''}`}
                  >
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleSelectRow(project.id)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none"
                        aria-label={`Select row ${project.name}`}
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                    <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">
                      <div className="flex flex-col">
                        <span>{project.name}</span>
                        <span className="text-[10px] font-mono text-slate-400 font-normal">
                          {project.id} &bull; Owner: {project.owner}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-300 font-medium">
                      {project.category}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${statusColors[project.status] || statusColors.Inactive}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-medium text-slate-700 dark:text-slate-300">
                      {project.nodes} units
                    </td>
                    <td className="p-4 font-mono font-medium">
                      <div className="flex items-center space-x-2">
                        <div className="w-12 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${project.healthScore > 90 ? 'bg-emerald-500' : project.healthScore > 75 ? 'bg-amber-500' : 'bg-rose-500'}`}
                            style={{ width: `${project.healthScore}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-slate-700 dark:text-slate-300">{project.healthScore}%</span>
                      </div>
                    </td>
                    <td className="p-4 font-mono font-medium text-slate-900 dark:text-slate-100">
                      {project.monthlySpend}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => onViewDetails(project)}
                        className="p-1.5 text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none"
                        title="View details in action drawer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteProject(project.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none"
                        title="Delete workspace"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Pagination Footer */}
      <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <div>
          Showing page <span className="font-semibold text-slate-800 dark:text-slate-200">{currentPage}</span> of{' '}
          <span className="font-semibold text-slate-800 dark:text-slate-200">{totalPages}</span> ({sortedProjects.length} items total)
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-2 font-mono text-xs">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}