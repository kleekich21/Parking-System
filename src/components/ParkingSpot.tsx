import { useSearchParams } from "react-router-dom";
import { memo, useCallback } from "react";
import { IParkingSpot, ParkingSpotStatus } from "../types/parking";
import { getTypeIcon } from "../components/common/ParkingIcons";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";

const getStatusColor = (
  status: ParkingSpotStatus,
  isReservedByCurrentUser: boolean
) => {
  if (isReservedByCurrentUser) {
    return "bg-blue-900 border-blue-500";
  }

  switch (status) {
    case "EMPTY":
      return "bg-green-900 border-green-500";
    case "OCCUPIED":
    case "RESERVED":
      return "bg-red-900 border-red-500";
    default:
      return "bg-gray-900 border-gray-500";
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

interface ParkingSpotProps {
  spot: IParkingSpot;
  isReservedByCurrentUser: boolean;
}

export function ParkingSpot({
  spot,
  isReservedByCurrentUser,
}: ParkingSpotProps) {
  // 주차면 선택 시 주차면 번호를 파라미터로 전달
  const [, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { parkingSpotNumber, status, parkingSpotType, evCharger } = spot;

  const handleClick = useCallback(async () => {
    // 먼저 쿼리 무효화를 통해 예약 정보 업데이트 후 주차장 현황 리페치
    await Promise.all([
      // 간단하게 navigate 해주는 것으로 대체 가능하지만, mocking 서버로 인한 한계로 쿼리 무효화를 통해 처리
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PARKING.ALL,
      }),
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.RESERVATION.DETAIL(Number(parkingSpotNumber)),
      }),
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.RESERVATION.LIST,
      }),
    ]);

    // 예약 완료 후 예약 페이지로 이동
    setSearchParams((prev) => {
      prev.set("spot", parkingSpotNumber.toString());
      return prev;
    });
  }, [parkingSpotNumber, setSearchParams, queryClient]);

  const statusText = getStatusText(status, isReservedByCurrentUser);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        relative p-4 border-2 rounded-lg w-full text-left
        ${getStatusColor(status, isReservedByCurrentUser)}
        transition-all duration-200
        hover:shadow-md
        min-h-[150px]
        min-w-[100px]
      `}
      aria-label={`주차면 ${parkingSpotNumber}번, ${statusText}`}
    >
      <div className="absolute top-2 right-2">
        {getTypeIcon(parkingSpotType)}
      </div>
      <div className="text-2xl font-bold mb-2">#{parkingSpotNumber}</div>
      <div className="text-sm">{statusText}</div>
      {evCharger && (
        <div className="mt-2 text-xs text-white">
          <div>충전 타입: {evCharger.chargingType}</div>
          <div>
            충전 속도: {evCharger.chargingSpeed === "FAST" ? "급속" : "완속"}
          </div>
        </div>
      )}
    </button>
  );
}

export default memo(ParkingSpot);
