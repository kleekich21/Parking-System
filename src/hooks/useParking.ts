import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { fetchParkingLot } from "../api/parking";

export function useParkingLot(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.PARKING.PARKING_LOT(id),
    queryFn: () => fetchParkingLot(id),
  });
}
