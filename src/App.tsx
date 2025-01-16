import { useState, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ParkingLot from "./components/ParkingLot";
import ParkingLotInfo from "./components/ParkingLotInfo";
import { useParkingLot } from "./hooks/useParking";
import { PARKING_LOT_ID } from "./mocks/data";
import { IParkingSpot } from "./types/parking";
import ParkingSpotSidebar from "./components/ParkingSpotSidebar";
import ErrorFallback from "./components/ErrorFallback";
import LoadingFallback from "./components/LoadingFallback";

function App() {
  const { data: parkingLot } = useParkingLot(PARKING_LOT_ID);

  const [selectedSpot, setSelectedSpot] = useState<IParkingSpot | null>(null);
  const renderContent = () => (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">주차장 현황</h1>

      <div className="space-y-6">
        <ParkingLotInfo parkingLot={parkingLot} />

        <ParkingLot
          spots={parkingLot?.parkingSpots}
          onSpotSelect={setSelectedSpot}
        />
      </div>
      {selectedSpot && (
        <ParkingSpotSidebar
          spot={selectedSpot}
          isOpen={!!selectedSpot}
          onClose={() => setSelectedSpot(null)}
        />
      )}
    </div>
  );

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>{renderContent()}</Suspense>
    </ErrorBoundary>
  );
}

export default App;
