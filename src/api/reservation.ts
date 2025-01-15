import { IReservation } from "../types/parking";

export async function reserveSpot(
  parkingSpotNumber: number,
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

export async function fetchReservations(): Promise<IReservation[]> {
  const response = await fetch(`/api/reservations`);
  if (!response.ok) {
    throw new Error("예약 정보를 불러오는데 실패했습니다.");
  }
  return response.json();
}

export async function fetchReservation(
  parkingSpotNumber: number
): Promise<IReservation> {
  const response = await fetch(`/api/reservations/${parkingSpotNumber}`);
  if (!response.ok) {
    throw new Error("예약 정보를 불러오는데 실패했습니다.");
  }
  return response.json();
}
