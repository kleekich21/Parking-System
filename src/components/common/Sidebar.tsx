import { createPortal } from "react-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  position?: "left" | "right"; // 왼쪽, 오른쪽 허용
  width?: string;
  title?: string;
  children: React.ReactNode;
}

export function Sidebar({
  isOpen,
  onClose,
  position = "right",
  width = "400px",
  title,
  children,
}: SidebarProps) {
  const content = (
    <>
      {/* 어두운 배경 */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity z-40
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 bottom-0 bg-white shadow-xl z-50 transition-transform duration-300
          ${position === "right" ? "right-0" : "left-0"}
          ${
            isOpen
              ? "translate-x-0"
              : `${
                  position === "right"
                    ? "translate-x-full"
                    : "-translate-x-full"
                }`
          }
        `}
        style={{ width }}
      >
        {/* Header */}
        <div className="h-16 px-6 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            ✕
          </button>
        </div>

        {/* 컨텐츠 */}
        <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );

  return createPortal(content, document.body);
}
