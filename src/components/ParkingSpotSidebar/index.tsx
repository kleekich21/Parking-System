import { useState } from "react";
import { IParkingSpot } from "../../types/parking";
import Sidebar from "../common/Sidebar";
import { useReservationDetail } from "../../hooks/useReservation";
import ReservationForm from "./ReservationForm";
import ReservationInfo from "./ReservationInfo";
import EVChargerInfo from "./EVChargerInfo";
import CancelReservationModal from "./CancelReservationModal";

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
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { parkingSpotNumber, status, evCharger } = spot;
  const { data: reservation } = useReservationDetail({
    parkingSpotNumber,
  });

  const renderContent = () => {
    return (
      <>
        {status !== "EMPTY" && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-700">현재 예약이 불가능한 주차면입니다.</p>
            <p className="text-sm text-red-600 mt-1">
              사유: {status === "OCCUPIED" ? "주차중" : "예약됨"}
            </p>
          </div>
        )}
        {evCharger && <EVChargerInfo evCharger={evCharger} />}
        {status === "EMPTY" && (
          <ReservationForm spot={spot} onSuccess={onClose} />
        )}
        {reservation && (
          <ReservationInfo
            reservation={reservation}
            onCancelClick={() => setShowCancelModal(true)}
          />
        )}
      </>
    );
  };

  return (
    <>
      <Sidebar
        isOpen={isOpen}
        onClose={onClose}
        title={`주차면 #${parkingSpotNumber}`}
      >
        <div className="space-y-6">{renderContent()}</div>
      </Sidebar>

      <CancelReservationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={() => {
          // TODO: 예약 취소 로직 구현
          setShowCancelModal(false);
          onClose();
        }}
      />
    </>
  );
}

export default ParkingSpotSidebar;
