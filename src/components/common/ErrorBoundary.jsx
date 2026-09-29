import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 my-6 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-center max-w-2xl mx-auto shadow-sm">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-red-900 dark:text-red-200 mb-2">
            Something went wrong in this component
          </h2>
          <p className="text-sm text-red-700 dark:text-red-300 font-mono mb-4 break-all bg-red-100/50 dark:bg-red-900/30 p-3 rounded text-left text-xs">
            {this.state.error?.toString() || 'Unknown application runtime error'}
          </p>
          <button
            onClick={this.handleReset}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-lg shadow transition-colors focus:ring-2 focus:ring-red-500 focus:outline-none"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again / Recover Component</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}