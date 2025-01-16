import { useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { fetchParkingLot } from "../api/parking";

export function useParkingLot(id: string) {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.PARKING.PARKING_LOT(id),
    queryFn: () => fetchParkingLot(id),
  });
}
