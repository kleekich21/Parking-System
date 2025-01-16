import { IParkingSpot, ParkingSpotStatus } from "../types/parking";
import {
  FaCar,
  FaWheelchair,
  FaChargingStation,
  FaFemale,
  FaUserAlt,
} from "react-icons/fa";

interface ParkingSpotProps {
  spot: IParkingSpot;
  onSelect?: (spot: IParkingSpot) => void;
  isReservedByCurrentUser: boolean;
}

const getStatusColor = (
  status: ParkingSpotStatus,
  isReservedByCurrentUser: boolean
) => {
  if (isReservedByCurrentUser) {
    return "bg-blue-100 border-blue-500";
  }

  switch (status) {
    case "EMPTY":
      return "bg-green-100 border-green-500";
    case "OCCUPIED":
    case "RESERVED":
      return "bg-red-100 border-red-500";
    default:
      return "bg-gray-100 border-gray-500";
  }
};

const getStatusText = (
  status: ParkingSpotStatus,
  isReservedByCurrentUser: boolean
) => {
  if (isReservedByCurrentUser) {
    return "예약 완료";
  }

  switch (status) {
    case "EMPTY":
      return "예약 가능";
    case "OCCUPIED":
    case "RESERVED":
      return "예약 불가";
    default:
      return "상태 없음";
  }
};

const getTypeIcon = (type: IParkingSpot["parkingSpotType"]) => {
  switch (type) {
    case "DISABLED":
      return <FaWheelchair className="text-blue-600" />;
    case "EV":
      return <FaChargingStation className="text-green-600" />;
    case "WOMEN":
      return <FaFemale className="text-pink-600" />;
    case "ELDERLY":
      return <FaUserAlt className="text-purple-600" />;
    default:
      return <FaCar className="text-gray-600" />;
  }
};

export function ParkingSpot({
  spot,
  onSelect,
  isReservedByCurrentUser,
}: ParkingSpotProps) {
  const { parkingSpotNumber, status, parkingSpotType, evCharger } = spot;
  return (
    <div
      className={`
        relative p-4 border-2 rounded-lg
        ${getStatusColor(status, isReservedByCurrentUser)}
        transition-all duration-200
        hover:shadow-md
        cursor-pointer
      `}
      onClick={() => onSelect?.(spot)}
    >
      <div className="absolute top-2 right-2">
        {getTypeIcon(parkingSpotType)}
      </div>
      <div className="text-2xl font-bold mb-2">#{parkingSpotNumber}</div>
      <div className="text-sm">
        {getStatusText(status, isReservedByCurrentUser)}
      </div>
      {evCharger && (
        <div className="mt-2 text-xs text-gray-600">
          <div>충전 타입: {evCharger.chargingType}</div>
          <div>
            충전 속도: {evCharger.chargingSpeed === "FAST" ? "급속" : "완속"}
          </div>
        </div>
      )}
    </div>
  );
}

export default ParkingSpot;
