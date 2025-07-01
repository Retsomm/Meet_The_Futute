'use client';

import { useState, useEffect } from 'react';
import { FiX, FiAlertCircle, FiCheckCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';

// Alert Provider Context
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
  const [alerts, setAlerts] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const showAlert = (message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random();
    const alert = { id, message, type, duration };
    
    setAlerts(prev => [...prev, alert]);

    // 自動移除警告
    if (duration > 0) {
      setTimeout(() => {
        removeAlert(id);
      }, duration);
    }

    return id;
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
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ showAlert, showConfirm, removeAlert }}>
      {children}
      <AlertContainer alerts={alerts} onRemove={removeAlert} />
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

// Alert Container Component
const AlertContainer = ({ alerts, onRemove }) => {
  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2 w-full max-w-md px-4">
      {alerts.map(alert => (
        <AlertItem
          key={alert.id}
          alert={alert}
          onRemove={() => onRemove(alert.id)}
        />
      ))}
    </div>
  );
};

// Individual Alert Item
const AlertItem = ({ alert, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 進入動畫
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleRemove = () => {
    setIsVisible(false);
    // 等待退出動畫完成後移除
    setTimeout(onRemove, 300);
  };

  const getAlertStyles = () => {
    switch (alert.type) {
      case 'success':
        return {
          bg: 'bg-green-600',
          icon: FiCheckCircle,
          iconColor: 'text-green-100'
        };
      case 'error':
        return {
          bg: 'bg-red-600',
          icon: FiAlertCircle,
          iconColor: 'text-red-100'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-600',
          icon: FiAlertTriangle,
          iconColor: 'text-yellow-100'
        };
      default:
        return {
          bg: 'bg-blue-600',
          icon: FiInfo,
          iconColor: 'text-blue-100'
        };
    }
  };

  const { bg, icon: Icon, iconColor } = getAlertStyles();

  return (
    <div
      className={`${bg} text-white rounded-lg shadow-lg backdrop-blur border border-white/20 transition-all duration-300 transform ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : '-translate-y-2 opacity-0 scale-95'
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Icon className={`h-5 w-5 mr-3 ${iconColor}`} />
          <p className="text-sm font-medium">{alert.message}</p>
        </div>
        <button
          onClick={handleRemove}
          className="ml-4 text-white/70 hover:text-white transition-colors"
        >
          <FiX className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// Confirm Dialog Component
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
  let alertContext = null;

  return {
    setContext: (context) => {
      alertContext = context;
    },
    show: (message, type = 'info') => {
      if (alertContext) {
        return alertContext.showAlert(message, type);
      } else {
        // 後備方案，如果Context不可用則使用原生alert
        window.alert(message);
      }
    },
    success: (message) => {
      if (alertContext) {
        return alertContext.showAlert(message, 'success');
      } else {
        window.alert(message);
      }
    },
    error: (message) => {
      if (alertContext) {
        return alertContext.showAlert(message, 'error');
      } else {
        window.alert(message);
      }
    },
    warning: (message) => {
      if (alertContext) {
        return alertContext.showAlert(message, 'warning');
      } else {
        window.alert(message);
      }
    },
    info: (message) => {
      if (alertContext) {
        return alertContext.showAlert(message, 'info');
      } else {
        window.alert(message);
      }
    }
  };
};

// 全局alert實例
export const customAlert = createAlert();
