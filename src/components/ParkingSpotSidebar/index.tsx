import { IParkingSpot } from "../../types/parking";
import Sidebar from "../common/Sidebar";
import { useReservationDetail } from "../../hooks/useReservation";
import ReservationForm from "./ReservationForm";
import ReservationInfo from "./ReservationInfo";
import EVChargerInfo from "./EVChargerInfo";
import { currentUser } from "../../mocks/data";
import { getTypeIcon } from "../../components/common/ParkingIcons";
interface ParkingSpotSidebarProps {
  spot: IParkingSpot;
  isOpen: boolean;
  onClose: () => void;
}

export function ParkingSpotSidebar({
  spot,
  isOpen,
  onClose,
}: ParkingSpotSidebarProps) {
  const { parkingSpotNumber, status, evCharger } = spot;
  const { data: reservation } = useReservationDetail({
    parkingSpotNumber,
  });
  const isReservedByCurrentUser = currentUser.id === reservation?.reservedBy;

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title={`주차면 #${parkingSpotNumber}`}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-6xl font-bold">#{parkingSpotNumber}</h2>
          {status !== "EMPTY" && !isReservedByCurrentUser ? (
            <div className="p-4">
              <p className="text-red-700">예약 불가능</p>
              <p className="text-sm text-red-600 mt-1">
                사유: {status === "OCCUPIED" ? "주차중" : "예약됨"}
              </p>
            </div>
          ) : (
            <div className="p-4">
              <p className="text-green-700">예약 가능</p>
            </div>
          )}
          <div className="flex gap-2 items-center">
            {getTypeIcon(spot?.parkingSpotType)}
          </div>
        </div>

        {reservation && (
          <ReservationInfo reservation={reservation} onCancel={onClose} />
        )}
        {evCharger && <EVChargerInfo evCharger={evCharger} />}
        {status === "EMPTY" && (
          <ReservationForm spot={spot} onSuccess={onClose} />
        )}
      </div>
    </Sidebar>
  );
}

export default ParkingSpotSidebar;
