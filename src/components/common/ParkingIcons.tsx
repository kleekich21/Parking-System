import {
  FaWheelchair,
  FaChargingStation,
  FaFemale,
  FaUserAlt,
  FaCar,
} from "react-icons/fa";
import { IParkingSpot } from "../../types/parking";

export const getTypeIcon = (type: IParkingSpot["parkingSpotType"]) => {
  switch (type) {
    case "DISABLED":
      return <FaWheelchair className="text-blue-600 text-xl" />;
    case "EV":
      return <FaChargingStation className="text-green-600 text-xl" />;
    case "WOMEN":
      return <FaFemale className="text-pink-600 text-xl" />;
    case "ELDERLY":
      return <FaUserAlt className="text-purple-600 text-xl" />;
    default:
      return <FaCar className="text-gray-600 text-xl" />;
  }
};
