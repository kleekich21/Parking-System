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
      return <FaWheelchair className="text-blue-400 text-xl" />;
    case "EV":
      return <FaChargingStation className="text-green-400 text-xl" />;
    case "WOMEN":
      return <FaFemale className="text-pink-400 text-xl" />;
    case "ELDERLY":
      return <FaUserAlt className="text-purple-400 text-xl" />;
    default:
      return <FaCar className="text-gray-400 text-xl" />;
  }
};
