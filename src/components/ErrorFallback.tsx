import { FallbackProps } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="p-4">
      <div className="bg-red-300 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p>에러가 발생했습니다: {error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="mt-2 text-sm text-red-600 hover:text-red-500"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;
