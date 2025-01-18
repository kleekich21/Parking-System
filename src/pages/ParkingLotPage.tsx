import { useParams, useSearchParams } from "react-router-dom";
import { useParkingLot } from "../hooks/useParking";
import ParkingLotInfo from "../components/ParkingLotInfo";
import ParkingLot from "../components/ParkingLot";
import ParkingSpotSidebar from "../components/ParkingSpotSidebar";
import { Suspense } from "react";
import ParkingLotInfoSkeleton from "../components/Skeletons/ParkingLotInfoSkeleton";
import ParkingSpotsSkeleton from "../components/Skeletons/ParkingSpotsSkeleton";
import ParkingLotSkeleton from "../components/Skeletons/ParkingLotSkeleton";
import SidebarSkeleton from "../components/Skeletons/SidebarSkeleton";

export default function ParkingLotPage() {
  const { parkingLotId } = useParams<{ parkingLotId: string }>();
  const { data: parkingLot } = useParkingLot(parkingLotId!);
  const [searchParams] = useSearchParams();
  const selectedSpotNumber = searchParams.get("spot");

  const selectedSpot = parkingLot?.parkingSpots.find(
    (spot) => spot.parkingSpotNumber === Number(selectedSpotNumber)
  );

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">주차장 현황</h1>
      <div className="space-y-6">
        <Suspense fallback={<ParkingLotSkeleton />}>
          {/* 주차장 정보 */}
          <Suspense fallback={<ParkingLotInfoSkeleton />}>
            <ParkingLotInfo parkingLotId={parkingLotId!} />
          </Suspense>

          {/* 주차면 목록 */}
          <Suspense fallback={<ParkingSpotsSkeleton />}>
            <ParkingLot parkingLotId={parkingLotId!} />
          </Suspense>

          {/* 사이드바 */}
          {selectedSpotNumber && (
            <Suspense fallback={<SidebarSkeleton />}>
              <ParkingSpotSidebar
                spot={selectedSpot!}
                isOpen={!!selectedSpotNumber}
              />
            </Suspense>
          )}
        </Suspense>
      </div>
    </div>
  );
}
