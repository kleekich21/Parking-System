import { IParkingLot } from "../types/parking";

export async function fetchParkingLot(id: string): Promise<IParkingLot> {
  const response = await fetch(`/api/parking-lot/${id}`);
  if (!response.ok) {
    throw new Error("주차장 정보를 불러오는데 실패했습니다.");
  }
  return response.json();
}
