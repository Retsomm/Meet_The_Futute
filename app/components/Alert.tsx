'use client';

import { useState, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FiAlertCircle } from 'react-icons/fi';

type AlertType = 'info' | 'success' | 'error' | 'warning';

interface ConfirmDialogState {
  message: string;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

interface AlertContextValue {
  showAlert: (message: string, type?: AlertType, duration?: number) => void;
  showConfirm: (message: string, title?: string) => Promise<boolean>;
  removeAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextValue | null>(null);

export const useAlert = (): AlertContextValue => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [confirmDialog, setConfirmDialog] =
    useState<ConfirmDialogState | null>(null);

  const showAlert = (
    message: string,
    type: AlertType = 'info',
    duration: number = 5000
  ): void => {
    switch (type) {
      case 'success':
        toast.success(message, { duration });
        break;
      case 'error':
        toast.error(message, { duration });
        break;
      case 'warning':
        toast(message, {
          duration,
          icon: '⚠️',
          style: { background: '#fbbf24', color: '#92400e' },
        });
        break;
      default:
        toast(message, { duration });
    }
  };

  const showConfirm = (
    message: string,
    title: string = '確認'
  ): Promise<boolean> => {
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
        },
      });
    });
  };

  const removeAlert = (id: string): void => {
    toast.dismiss(id);
  };

  return (
    <AlertContext.Provider value={{ showAlert, showConfirm, removeAlert }}>
      {children}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow:
              '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
          success: {
            style: { background: '#10b981', color: '#ffffff' },
            iconTheme: { primary: '#ffffff', secondary: '#10b981' },
          },
          error: {
            style: { background: '#ef4444', color: '#ffffff' },
            iconTheme: { primary: '#ffffff', secondary: '#ef4444' },
          },
        }}
      />
      {confirmDialog && (
        <ConfirmDialog
          isOpen
          message={confirmDialog.message}
          title={confirmDialog.title}
          onConfirm={confirmDialog.onConfirm}
          onCancel={confirmDialog.onCancel}
        />
      )}
    </AlertContext.Provider>
  );
};

interface ConfirmDialogProps {
  isOpen: boolean;
  message: string;
  title?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
  title = '確認',
}: ConfirmDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
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

export const createAlert = () => ({
  show: (message: string) => toast(message),
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  warning: (message: string) =>
    toast(message, {
      icon: '⚠️',
      style: { background: '#fbbf24', color: '#92400e' },
    }),
  info: (message: string) => toast(message),
  dismiss: (toastId: string) => toast.dismiss(toastId),
  promise: <T,>(
    promise: Promise<T>,
    msgs: Parameters<typeof toast.promise>[1],
    options?: Parameters<typeof toast.promise>[2]
  ) => toast.promise(promise, msgs, options),
  loading: (message: string) => toast.loading(message),
});

export const customAlert = createAlert();
