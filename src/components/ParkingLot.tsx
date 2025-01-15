import { IParkingSpot } from "../types/parking";
import { ParkingSpot } from "./ParkingSpot";

interface ParkingLotProps {
  spots: IParkingSpot[];
  onSpotSelect?: (spot: IParkingSpot) => void;
}

export function ParkingLot({ spots, onSpotSelect }: ParkingLotProps) {
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-4">
        {spots.map((spot) => (
          <ParkingSpot key={spot.id} spot={spot} onSelect={onSpotSelect} />
        ))}
      </div>
    </div>
  );
}

export default ParkingLot;
