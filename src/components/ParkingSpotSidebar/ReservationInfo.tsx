import { useState } from "react";
import { useParams } from "react-router-dom";
import { IReservation } from "../../types/parking";
import Button from "../common/Button";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useCancelReservation } from "../../hooks/useReservation";
import CancelReservationModal from "./CancelReservationModal";
import { useCurrentUserReservations } from "../../hooks/useReservation";
import { useParkingLot } from "../../hooks/useParking";
import { calculateTotalTime, calculateFee } from "../../utils";
interface ReservationInfoProps {
  reservation: IReservation;
  onCancel?: () => void;
}

function ReservationInfo({ reservation, onCancel }: ReservationInfoProps) {
  const { parkingLotId } = useParams<{ parkingLotId: string }>();
  const queryClient = useQueryClient();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const cancelReservationMutation = useCancelReservation();
  const { id, startTime, endTime, parkingSpotNumber } = reservation;
  const { isReservedByCurrentUser } = useCurrentUserReservations();
  const { data: parkingLot } = useParkingLot(parkingLotId!);
  const totalTime = calculateTotalTime(startTime, endTime);
  const totalFee = calculateFee(
    startTime,
    endTime,
    parkingLot?.feePerTenMinutes ?? 0
  );

  const handleCancelClick = async () => {
    setShowCancelModal(false);
    const toastId = toast.loading("예약 취소 처리 중...");
    try {
      await cancelReservationMutation.mutateAsync(parkingSpotNumber);
      toast.success("예약이 취소되었습니다.", { id: toastId });
      onCancel?.();
      // 간단하게 navigate 해주는 것으로 대체 가능하지만, mocking 서버로 인한 한계로 쿼리 무효화를 통해 처리
      await Promise.all([
        // 예약 내역 업데이트 후 주차장 현황 리페치
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.PARKING.ALL,
        }),
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.RESERVATION.ALL,
        }),
      ]);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "예약 취소 중 오류가 발생했습니다.",
        { id: toastId }
      );
    }
  };

  return (
    <>
      <div className="space-y-6 border-tp-4">
        {isReservedByCurrentUser(parkingSpotNumber) ? (
          <div className="border border-blue-200 rounded-md p-4">
            <p className="text-center text-lg font-semibold">예약 정보</p>
            <h3 className="font-semibold mb-2"></h3>
            <div className="space-y-2 text-sm pb-4">
              <p>예약 번호: {id}</p>
              <p>시작 시간: {new Date(startTime).toLocaleString()}</p>
              <p>종료 시간: {new Date(endTime).toLocaleString()}</p>
              <p>총 예약 시간: {totalTime}</p>
              <p>총 결제 금액: {totalFee}원</p>
            </div>
            <Button
              type="danger"
              className="w-full"
              onClick={() => setShowCancelModal(true)}
            >
              예약 취소
            </Button>
          </div>
        ) : (
          <>
            <h3 className="font-semibold mb-2">예약 정보</h3>
            <p>예약 가능 시간: {new Date(endTime).toLocaleString()}</p>
          </>
        )}
      </div>
      <CancelReservationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelClick}
      />
    </>
  );
}

export default ReservationInfo;
