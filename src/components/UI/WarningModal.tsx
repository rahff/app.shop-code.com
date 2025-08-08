import React, { useEffect, useRef } from 'react';
import { AlertTriangle, X, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface WarningModalProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isProcessing?: boolean;
  danger?: boolean;
}

const WarningModal: React.FC<WarningModalProps> = ({
  open,
  title,
  description,
  confirmLabel = 'Remove',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isProcessing = false,
  danger = false
}) => {
  const { t } = useTranslation('global');
  const modalRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Focus management and keyboard handling
  useEffect(() => {
    if (open) {
      // Store the previously focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Prevent background scroll
      document.body.style.overflow = 'hidden';
      
      // Focus the modal after a brief delay to ensure it's rendered
      setTimeout(() => {
        confirmButtonRef.current?.focus();
      }, 100);

      // Handle Escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onCancel();
        }
      };

      // Handle Tab key for focus trap
      const handleTab = (e: KeyboardEvent) => {
        if (e.key === 'Tab' && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll(
            'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleTab);

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('keydown', handleTab);
      };
    } else {
      // Restore scroll and focus when modal closes
      document.body.style.overflow = '';
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
  }, [open, onCancel]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  // Handle Enter key on confirm button
  const handleConfirmKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onConfirm();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby={description ? "modal-description" : undefined}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl transform transition-all duration-200 ease-out animate-in zoom-in-95 fade-in-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onCancel}
          disabled={isProcessing}
          className="absolute top-4 right-4 p-2 text-[#A0A0A8] hover:text-[#2B2C34] hover:bg-gray-100 rounded-lg transition-colors duration-200 disabled:opacity-50"
          aria-label={t('common.close')}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal content */}
        <div className="p-6">
          {/* Header with icon and title */}
          <div className="flex items-start space-x-3 mb-4">
            {danger && (
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h2
                id="modal-title"
                className="text-xl font-bold text-[#2B2C34] font-['Inter'] leading-tight"
              >
                {title}
              </h2>
            </div>
          </div>

          {/* Description */}
          {description && (
            <div className="mb-6">
              <p
                id="modal-description"
                className="text-[#A0A0A8] leading-relaxed"
              >
                {description}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
            {/* Cancel button */}
            <button
              onClick={onCancel}
              disabled={isProcessing}
              className="flex-1 px-4 py-3 border-2 border-gray-200 text-[#2B2C34] rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cancelLabel}
            </button>

            {/* Confirm button */}
            <button
              ref={confirmButtonRef}
              onClick={onConfirm}
              onKeyDown={handleConfirmKeyDown}
              disabled={isProcessing}
              className={`flex-1 px-4 py-3 rounded-xl font-medium focus:outline-none focus:ring-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${
                danger
                  ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-200 shadow-lg hover:shadow-xl'
                  : 'bg-[#6C63FF] text-white hover:bg-[#5845E9] focus:ring-[#6C63FF]/20 shadow-lg hover:shadow-xl'
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>{confirmLabel}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;