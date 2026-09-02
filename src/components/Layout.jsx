import React from 'react';
import { Outlet } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const Layout = () => {
  const { currentRole, toasts, removeToast } = useApp();

  const getToastIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-500" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getToastBorder = (type) => {
    switch (type) {
      case 'success':
        return 'border-emerald-200 bg-emerald-50/90';
      case 'warning':
        return 'border-amber-200 bg-amber-50/90';
      case 'error':
        return 'border-rose-200 bg-rose-50/90';
      case 'info':
      default:
        return 'border-blue-200 bg-blue-50/90';
    }
  };

  const hasSidebar = currentRole !== 'none';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navbar */}
      <Navbar />

      {/* Main View Container */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar (left panel) */}
        {hasSidebar && <Sidebar />}

        {/* Content area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full transition-all duration-300 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {/* Toast Notification Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-xs transition-all duration-300 animate-slide-in ${getToastBorder(
              toast.type
            )}`}
          >
            <div className="flex-shrink-0">{getToastIcon(toast.type)}</div>
            <div className="flex-1 text-sm font-medium text-slate-800">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-slate-400 hover:text-slate-600 rounded-lg p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layout;
