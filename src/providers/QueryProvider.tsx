import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // 항상 최신 주차장 현황 반영이 가능하도록 0으로 설정
      gcTime: 1000 * 60 * 5, // 5분
      retry: 1,
      refetchOnWindowFocus: true, // 윈도우 포커스시 리페치
      refetchOnMount: true, // 컴포넌트 마운트시 리페치
      refetchOnReconnect: true, // 네트워크 재연결시 리페치
    },
  },
});

export function QueryProvider({
  children,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
