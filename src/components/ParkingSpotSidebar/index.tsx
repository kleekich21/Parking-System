import { IParkingSpot } from "../../types/parking";
import Sidebar from "../common/Sidebar";
import { useReservationDetail } from "../../hooks/useReservation";
import ReservationForm from "./ReservationForm";
import ReservationInfo from "./ReservationInfo";
import EVChargerInfo from "./EVChargerInfo";

import { currentUser } from "../../mocks/data";

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
        {status !== "EMPTY" && !isReservedByCurrentUser && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-700">현재 예약이 불가능한 주차면입니다.</p>
            <p className="text-sm text-red-600 mt-1">
              사유: {status === "OCCUPIED" ? "주차중" : "예약됨"}
            </p>
          </div>
        )}
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
