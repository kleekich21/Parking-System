import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode; // 버튼 영역
  closeOnClickOutside?: boolean;
}

function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  closeOnClickOutside = true,
}: ModalProps) {
  if (!isOpen) return null;

  const content = (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* 어두운 배경 */}
      <div
        className="fixed inset-0 bg-black/30 transition-opacity"
        onClick={closeOnClickOutside ? onClose : undefined}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`
            relative transform overflow-hidden rounded-lg bg-white
            shadow-xl transition-all w-full}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {title && (
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-4">{children}</div>

          {/* Footer(버튼 영역) */}
          {footer && (
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-2">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}

export default Modal;
