import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import {
  reserveSpot,
  fetchReservation,
  fetchReservations,
  cancelReservation,
} from "../api/reservation";
import { QUERY_KEYS } from "../constants/queryKeys";
import { currentUser } from "../mocks/data";
import { useMemo } from "react";

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

export function useCancelReservation() {
  return useMutation({
    mutationFn: (parkingSpotNumber: number) =>
      cancelReservation(parkingSpotNumber),
  });
}

export function useCurrentUserReservations() {
  const { data: reservations } = useSuspenseQuery({
    queryKey: QUERY_KEYS.RESERVATION.LIST,
    queryFn: fetchReservations,
  });

  const reservationMap = useMemo(() => {
    const map = new Map();
    reservations?.forEach((reservation) => {
      if (reservation.reservedBy === currentUser.id) {
        map.set(reservation.parkingSpotNumber, reservation);
      }
    });
    return map;
  }, [reservations]);

  return {
    isReservedByCurrentUser: (spotNumber: number) =>
      reservationMap.has(spotNumber),
    getReservation: (spotNumber: number) => reservationMap.get(spotNumber),
  };
}
