import React from 'react';
import { useToast, ToastType } from '../../../contexts/ToastContext';
import { FiCheck, FiX, FiInfo, FiAlertTriangle } from 'react-icons/fi';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <FiCheck className="w-5 h-5" />;
      case 'error':
        return <FiX className="w-5 h-5" />;
      case 'warning':
        return <FiAlertTriangle className="w-5 h-5" />;
      case 'info':
      default:
        return <FiInfo className="w-5 h-5" />;
    }
  };

  const getColorClass = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/90';
      case 'error':
        return 'bg-red-500/90';
      case 'warning':
        return 'bg-yellow-500/90';
      case 'info':
      default:
        return 'bg-blue-500/90';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg
            ${getColorClass(toast.type)} backdrop-blur-sm
            text-white animate-slide-in
          `}
        >
          {getIcon(toast.type)}
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="hover:bg-white/20 rounded p-1 transition-colors"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
