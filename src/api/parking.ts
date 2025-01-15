import { IParkingLot } from "../types/parking";

export async function fetchParkingLot(id: string): Promise<IParkingLot> {
  const response = await fetch(`/api/parking-lot/${id}`);
  if (!response.ok) {
    throw new Error("주차장 정보를 불러오는데 실패했습니다.");
  }
  return response.json();
}

export async function reserveSpot(
  parkingSpotNumber: string,
  startTime: string,
  endTime: string
): Promise<void> {
  const response = await fetch(`/api/reserve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ parkingSpotNumber, startTime, endTime }),
  });

  if (!response.ok) {
    throw new Error("주차 예약에 실패했습니다.");
  }
}
