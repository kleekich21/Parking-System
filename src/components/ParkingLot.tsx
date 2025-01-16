import { IParkingSpot } from "../types/parking";
import { ParkingSpot } from "./ParkingSpot";
import { useReservations } from "../hooks/useReservation";
import { currentUser } from "../mocks/data";
interface ParkingLotProps {
  spots?: IParkingSpot[];
  onSpotSelect?: (spot: IParkingSpot) => void;
}

export function ParkingLot({ spots, onSpotSelect }: ParkingLotProps) {
  const { data: reservations } = useReservations();
  if (!spots) return null;
  const currentUserReservations = reservations?.filter(
    (reservation) => reservation.reservedBy === currentUser.id
  );
  const parkingSpotNumbers = currentUserReservations?.map(
    (reservation) => reservation.parkingSpotNumber
  );
  const isReservedByCurrentUser = (parkingSpotNumber: number) => {
    return parkingSpotNumbers?.includes(parkingSpotNumber);
  };

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
