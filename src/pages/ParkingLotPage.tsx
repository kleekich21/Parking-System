import { useParams, useSearchParams } from "react-router-dom";
import { useParkingLot } from "../hooks/useParking";
import ParkingLotInfo from "../components/ParkingLotInfo";
import ParkingLot from "../components/ParkingLot";
import ParkingSpotSidebar from "../components/ParkingSpotSidebar";
import { Suspense } from "react";
import ParkingLotInfoSkeleton from "../components/Skeletons/ParkingLotInfoSkeleton";
import ParkingSpotsSkeleton from "../components/Skeletons/ParkingSpotsSkeleton";

export default function ParkingLotPage() {
  const { parkingLotId } = useParams<{ parkingLotId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSpotNumber = searchParams.get("spot");

  const { data: parkingLot } = useParkingLot(parkingLotId!);

  const handleSpotSelect = (spotNumber: number) => {
    setSearchParams((prev) => {
      prev.set("spot", spotNumber.toString());
      return prev;
    });
  };

  const handleSidebarClose = () => {
    setSearchParams((prev) => {
      prev.delete("spot");
      return prev;
    });
  };

  const selectedSpot = parkingLot?.parkingSpots.find(
    (spot) => spot.parkingSpotNumber === Number(selectedSpotNumber)
  );

  if (!parkingLot) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">주차장 현황</h1>
      <div className="space-y-6">
        <Suspense fallback={<ParkingLotInfoSkeleton />}>
          <ParkingLotInfo parkingLot={parkingLot} />
        </Suspense>

        <Suspense fallback={<ParkingSpotsSkeleton />}>
          <ParkingLot
            spots={parkingLot.parkingSpots}
            onSpotSelect={(spot) => handleSpotSelect(spot.parkingSpotNumber)}
          />
        </Suspense>
      </div>

      {selectedSpot && (
        <ParkingSpotSidebar
          spot={selectedSpot}
          isOpen={true}
          onClose={handleSidebarClose}
        />
      )}
    </div>
  );
}
