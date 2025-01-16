import { IParkingSpot } from "../types/parking";
import { ParkingSpot } from "./ParkingSpot";
import { useCurrentUserReservations } from "../hooks/useReservation";

interface ParkingLotProps {
  spots?: IParkingSpot[];
  onSpotSelect?: (spot: IParkingSpot) => void;
}

export function ParkingLot({ spots, onSpotSelect }: ParkingLotProps) {
  const { isReservedByCurrentUser } = useCurrentUserReservations();

  if (!spots) {
    return null;
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-4">
        {spots.map((spot) => (
          <ParkingSpot
            key={spot.id}
            spot={spot}
            onSelect={onSpotSelect}
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
