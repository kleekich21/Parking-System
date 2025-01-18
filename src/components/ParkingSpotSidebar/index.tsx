import { IParkingSpot } from "../../types/parking";
import Sidebar from "../common/Sidebar";
import { useReservationDetail } from "../../hooks/useReservation";
import ReservationForm from "./ReservationForm";
import ReservationInfo from "./ReservationInfo";
import EVChargerInfo from "./EVChargerInfo";
import { getTypeIcon } from "../../components/common/ParkingIcons";
import { useCurrentUserReservations } from "../../hooks/useReservation";

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
  const { isReservedByCurrentUser } = useCurrentUserReservations();
  const { data: reservation } = useReservationDetail({
    parkingSpotNumber,
  });

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title={`주차면 #${parkingSpotNumber}`}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-6xl font-bold">#{parkingSpotNumber}</h2>
          {status !== "EMPTY" &&
            !isReservedByCurrentUser(parkingSpotNumber) && (
              <div className="p-4">
                <p className="text-red-700 text-lg font-semibold">
                  예약 불가능
                </p>
                <p className="text-sm text-red-600 mt-1">
                  사유: {status === "OCCUPIED" ? "주차중" : "예약됨"}
                </p>
              </div>
            )}
          {status === "EMPTY" && (
            <div className="p-4">
              <p className="text-green-400 text-lg font-semibold">예약 가능</p>
            </div>
          )}
          {status === "RESERVED" &&
            isReservedByCurrentUser(parkingSpotNumber) && (
              <div className="p-4">
                <p className="text-blue-400 text-lg font-semibold">예약 완료</p>
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
