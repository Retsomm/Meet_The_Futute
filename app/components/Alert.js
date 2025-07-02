'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FiAlertCircle } from 'react-icons/fi';
import { createContext, useContext } from 'react';

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const [confirmDialog, setConfirmDialog] = useState(null);

  const showAlert = (message, type = 'info', duration = 5000) => {
    switch (type) {
      case 'success':
        return toast.success(message, { duration });
      case 'error':
        return toast.error(message, { duration });
      case 'warning':
        return toast(message, {
          duration,
          icon: '⚠️',
          style: {
            background: '#fbbf24',
            color: '#92400e',
          },
        });
      default:
        return toast(message, { duration });
    }
  };

  const showConfirm = (message, title = "確認") => {
    return new Promise((resolve) => {
      setConfirmDialog({
        message,
        title,
        onConfirm: () => {
          setConfirmDialog(null);
          resolve(true);
        },
        onCancel: () => {
          setConfirmDialog(null);
          resolve(false);
        }
      });
    });
  };

  const removeAlert = (id) => {
    toast.dismiss(id);
  };

  return (
    <AlertContext.Provider value={{ showAlert, showConfirm, removeAlert }}>
      {children}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
          success: {
            style: {
              background: '#10b981',
              color: '#ffffff',
            },
            iconTheme: {
              primary: '#ffffff',
              secondary: '#10b981',
            },
          },
          error: {
            style: {
              background: '#ef4444',
              color: '#ffffff',
            },
            iconTheme: {
              primary: '#ffffff',
              secondary: '#ef4444',
            },
          },
        }}
      />
      {confirmDialog && (
        <ConfirmDialog
          isOpen={true}
          message={confirmDialog.message}
          title={confirmDialog.title}
          onConfirm={confirmDialog.onConfirm}
          onCancel={confirmDialog.onCancel}
        />
      )}
    </AlertContext.Provider>
  );
};

// Confirm Dialog Component (保留自定義對話框)
const ConfirmDialog = ({ isOpen, message, onConfirm, onCancel, title = "確認" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      
      {/* Dialog */}
      <div className="relative bg-white rounded-lg shadow-xl border border-gray-200 p-6 w-full max-w-md mx-4 transform transition-all">
        <div className="flex items-center mb-4">
          <FiAlertCircle className="h-6 w-6 text-orange-500 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        
        <p className="text-gray-700 mb-6">{message}</p>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  );
};

// 便利函數，用於替換原生 alert
export const createAlert = () => {
  return {
    show: (message, type = 'info') => {
      return toast(message);
    },
    success: (message) => {
      return toast.success(message);
    },
    error: (message) => {
      return toast.error(message);
    },
    warning: (message) => {
      return toast(message, {
        icon: '⚠️',
        style: {
          background: '#fbbf24',
          color: '#92400e',
        },
      });
    },
    info: (message) => {
      return toast(message);
    },
    // React Hot Toast 特有的方法
    dismiss: (toastId) => {
      return toast.dismiss(toastId);
    },
    promise: (promise, msgs, options) => {
      return toast.promise(promise, msgs, options);
    },
    loading: (message) => {
      return toast.loading(message);
    }
  };
};

// 全局alert實例
export const customAlert = createAlert();
