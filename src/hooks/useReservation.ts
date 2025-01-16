import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import {
  reserveSpot,
  fetchReservation,
  fetchReservations,
} from "../api/reservation";
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
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.RESERVATION.DETAIL(parkingSpotNumber),
    queryFn: () => fetchReservation(parkingSpotNumber),
  });
}

export function useReservations() {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.RESERVATION.LIST,
    queryFn: () => fetchReservations(),
  });
}
