import ClipLoader from "react-spinners/ClipLoader";
import { createPortal } from "react-dom";

function LoadingFallback() {
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm"
      style={{ zIndex: 9999 }}
    >
      <div className="bg-white/80 p-6 rounded-lg shadow-lg flex flex-col items-center">
        <ClipLoader size={40} color="#4B5563" />
        <p className="mt-4 text-gray-600">로딩 중...</p>
      </div>
    </div>,
    document.body
  );
}

export default LoadingFallback;
