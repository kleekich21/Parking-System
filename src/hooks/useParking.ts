import { useQuery, useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { fetchParkingLot, reserveSpot } from "../api/parking";

export function useParkingLot(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.PARKING.PARKING_LOT(id),
    queryFn: () => fetchParkingLot(id),
  });
}

export function useReserveSpot() {
  return useMutation({
    mutationFn: (data: {
      parkingSpotNumber: number;
      startTime: string;
      endTime: string;
    }) => reserveSpot(data.parkingSpotNumber, data.startTime, data.endTime),
  });
}
