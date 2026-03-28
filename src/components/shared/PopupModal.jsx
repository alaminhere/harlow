'use client';

import clsx from 'clsx';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

const PopupModal = ({ className, onClose, children, label }) => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 10);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setShown(false);
    setTimeout(onClose, 300);
  };

  return createPortal(
    <div
      className={clsx(
        'p-5 fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-1000 transition-opacity duration-300',
        shown ? 'opacity-100' : 'opacity-0',
      )}
      onClick={handleClose}
    >
      <div
        className={clsx(
          'bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden w-full max-w-3xl mx-auto max-h-[90vh] flex flex-col transition-all duration-300',
          shown
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-3 scale-95',
          className,
        )}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-border shrink-0 bg-background/50">
          <h4 className="text-xl capitalize">{label}</h4>
          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="flex size-8 items-center justify-center rounded-md text-text-muted hover:bg-secondary hover:text-text transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-border p-5">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default PopupModal;
