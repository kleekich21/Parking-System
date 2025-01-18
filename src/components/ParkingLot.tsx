import { ParkingSpot } from "./ParkingSpot";
import { useCurrentUserReservations } from "../hooks/useReservation";
import { useParkingLot } from "../hooks/useParking";
interface ParkingLotProps {
  parkingLotId: string;
}

export function ParkingLot({ parkingLotId }: ParkingLotProps) {
  const { data: parkingLot } = useParkingLot(parkingLotId);
  const { isReservedByCurrentUser } = useCurrentUserReservations();

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-4">
        {parkingLot?.parkingSpots.map((spot) => (
          <ParkingSpot
            key={spot.id}
            spot={spot}
            isReservedByCurrentUser={isReservedByCurrentUser(
              spot.parkingSpotNumber
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default ParkingLot;
