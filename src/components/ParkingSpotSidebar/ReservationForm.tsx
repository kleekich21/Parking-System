import { useState } from "react";
import Button from "../common/Button";
import { useReserveSpot } from "../../hooks/useReservation";
import { IParkingSpot } from "../../types/parking";
import { calculateTotalTime, calculatePrice } from "../../utils";
import { useQueryClient } from "@tanstack/react-query";
import { PARKING_LOT_ID } from "../../mocks/data";
import { QUERY_KEYS } from "../../constants/queryKeys";
interface ReservationFormProps {
  spot: IParkingSpot;
  onSuccess: () => void;
}

function ReservationForm({ spot, onSuccess }: ReservationFormProps) {
  const queryClient = useQueryClient();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const reserveMutation = useReserveSpot();

  const { parkingSpotNumber } = spot;

  const handleSubmit = async () => {
    if (!startTime || !endTime) {
      alert("시작 시간과 종료 시간을 선택해주세요.");
      return;
    }

    try {
      await reserveMutation.mutateAsync({
        parkingSpotNumber,
        startTime,
        endTime,
      });
      onSuccess();
      // 예약 내역 업데이트 후 주차장 현황 리페치
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PARKING.PARKING_LOT(PARKING_LOT_ID),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.RESERVATION.DETAIL(parkingSpotNumber),
      });
    } catch (error) {
      console.error("예약 실패:", error);
    }
  };

  return (
    <div className="space-y-6 border-t pt-4">
      <div>
        <h3 className="font-semibold mb-2">예약 시간 선택</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              시작 시간
            </label>
            <input
              type="datetime-local"
              className="w-full border rounded-md px-3 py-2"
              min={new Date().toISOString().slice(0, 16)}
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              종료 시간
            </label>
            <input
              type="datetime-local"
              className="w-full border rounded-md px-3 py-2"
              min={startTime}
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between mb-2">
          <span>총 예약 시간</span>
          <span>{calculateTotalTime(startTime, endTime)}분</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>결제 금액</span>
          <span>
            {calculatePrice(startTime, endTime, 500).toLocaleString()}원
          </span>
        </div>
      </div>

      <Button
        type="primary"
        onClick={handleSubmit}
        className="w-full"
        isLoading={reserveMutation.isPending}
        disabled={!startTime || !endTime}
      >
        예약하기
      </Button>
    </div>
  );
}

export default ReservationForm;
