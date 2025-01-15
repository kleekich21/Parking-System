import { useQuery, useMutation } from "@tanstack/react-query";
import { reserveSpot, fetchReservation } from "../api/reservation";
import { QUERY_KEYS } from "../constants/queryKeys";

export function useReserveSpot() {
  return useMutation({
    mutationFn: (data: {
      parkingSpotNumber: number;
      startTime: string;
      endTime: string;
    }) => reserveSpot(data.parkingSpotNumber, data.startTime, data.endTime),
  });
}

export function useReservationDetail({
  parkingSpotNumber,
}: {
  parkingSpotNumber: number;
}) {
  return useQuery({
    queryKey: QUERY_KEYS.RESERVATION.DETAIL(parkingSpotNumber),
    queryFn: () => fetchReservation(parkingSpotNumber),
  });
}
