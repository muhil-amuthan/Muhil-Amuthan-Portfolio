import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className={`glass-card px-5 py-4 flex items-center gap-3 min-w-[320px] ${
        type === 'success' ? 'border-l-4 border-l-[#D0FF71]' : 'border-l-4 border-l-red-500'
      }`}>
        {type === 'success' ? (
          <CheckCircle className="text-[#D0FF71] shrink-0" size={20} />
        ) : (
          <XCircle className="text-red-500 shrink-0" size={20} />
        )}
        <p className="text-white text-sm font-['Geist'] flex-1">{message}</p>
        <button onClick={onClose} className="text-[rgba(255,255,255,0.5)] hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
