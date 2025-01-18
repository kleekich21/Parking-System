import { QueryProvider } from "./QueryProvider";
import { StrictMode } from "react";

interface AppProvidersProps {
  children: React.ReactNode;
}

function AppProviders({ children }: AppProvidersProps) {
  return (
    <StrictMode>
      <QueryProvider>{children}</QueryProvider>
    </StrictMode>
  );
}

export default AppProviders;
