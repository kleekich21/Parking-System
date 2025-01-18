import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";
import { Toaster } from "react-hot-toast";

export function Layout() {
  return (
    <div className="min-h-screen bg-black">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Outlet />
      </ErrorBoundary>
      <Toaster position="top-center" />
    </div>
  );
}
