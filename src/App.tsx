import { useState, Suspense, useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ParkingLot from "./components/ParkingLot";
import ParkingLotInfo from "./components/ParkingLotInfo";
import { useParkingLot } from "./hooks/useParking";
import { PARKING_LOT_ID } from "./mocks/data";
import { IParkingSpot } from "./types/parking";
import ParkingSpotSidebar from "./components/ParkingSpotSidebar";
import ErrorFallback from "./components/ErrorFallback";
import ParkingLotInfoSkeleton from "./components/Skeletons/ParkingLotInfoSkeleton";
import ParkingSpotsSkeleton from "./components/Skeletons/ParkingSpotsSkeleton";
import SidebarSkeleton from "./components/Skeletons/SidebarSkeleton";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "./constants/queryKeys";
import { Toaster } from "react-hot-toast";

function App() {
  const queryClient = useQueryClient();
  const { data: parkingLot } = useParkingLot(PARKING_LOT_ID);
  const [selectedSpot, setSelectedSpot] = useState<IParkingSpot | null>(null);

  const handleSelectSpot = useCallback(
    async (spot: IParkingSpot) => {
      setSelectedSpot(spot);
      // 주차면 선택 시 관련 데이터 리페치
      await Promise.all([
        // 주차장 전체 정보 리페치
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.PARKING.PARKING_LOT(PARKING_LOT_ID),
          refetchType: "active",
        }),
        // 선택한 주차면의 예약 정보 리페치
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.RESERVATION.DETAIL(spot.parkingSpotNumber),
          refetchType: "active",
        }),
        // 전체 예약 목록 리페치
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.RESERVATION.LIST,
          refetchType: "active",
        }),
      ]);
    },
    [queryClient]
  );
  const renderContent = () => (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">주차장 현황</h1>

      <div className="space-y-6">
        <Suspense fallback={<ParkingLotInfoSkeleton />}>
          <ParkingLotInfo parkingLot={parkingLot} />
        </Suspense>
        <Suspense fallback={<ParkingSpotsSkeleton />}>
          <ParkingLot
            spots={parkingLot?.parkingSpots}
            onSpotSelect={handleSelectSpot}
          />
        </Suspense>
      </div>
      {selectedSpot && (
        <Suspense fallback={<SidebarSkeleton />}>
          <ParkingSpotSidebar
            spot={selectedSpot}
            isOpen={!!selectedSpot}
            onClose={() => setSelectedSpot(null)}
          />
        </Suspense>
      )}
    </div>
  );

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {renderContent()}
      </ErrorBoundary>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            style: {
              background: "#22c55e",
            },
          },
          error: {
            duration: 3000,
            style: {
              background: "#ef4444",
            },
          },
        }}
      />
    </>
  );
}

export default App;
