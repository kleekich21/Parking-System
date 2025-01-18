import { QueryProvider } from "./QueryProvider";
import { Toaster } from "react-hot-toast";
import { StrictMode } from "react";

interface AppProvidersProps {
  children: React.ReactNode;
}

function AppProviders({ children }: AppProvidersProps) {
  return (
    <StrictMode>
      <QueryProvider>
        {children}
        <Toaster position="top-center" />
      </QueryProvider>
    </StrictMode>
  );
}

export default AppProviders;
