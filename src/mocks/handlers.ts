import { http, HttpResponse, delay } from "msw";
import { IReservation } from "../types/parking";
import { exampleParkingLot, reservations } from "./data";
const ARTIFICIAL_DELAY_MS = 1000;

export const handlers = [
  http.get("/api/parking-lot/:id", async ({ params }) => {
    await delay(ARTIFICIAL_DELAY_MS);
    const { id } = params;
    if (id === exampleParkingLot.id) {
      return HttpResponse.json(exampleParkingLot);
    }
    return HttpResponse.json(
      { error: "Parking lot not found" },
      { status: 404 }
    );
  }),

  // 예약 내역 조회 API
  http.get("/api/reservations", async () => {
    await delay(ARTIFICIAL_DELAY_MS);
    return HttpResponse.json(reservations);
  }),

  // 특정 예약 조회 API
  http.get("/api/reservations/:parkingSpotNumber", async ({ params }) => {
    await delay(ARTIFICIAL_DELAY_MS);
    const { parkingSpotNumber } = params;
    const reservation = reservations.find(
      (r) => r.parkingSpotNumber === Number(parkingSpotNumber)
    );

    if (reservation) {
      return HttpResponse.json(reservation);
    }

    return HttpResponse.json(
      { error: "Reservation not found" },
      { status: 404 }
    );
  }),

  // 특정 주차면의 현재 활성화된 예약 조회 API
  http.get("/api/reservations/spot/:spotNumber/active", async ({ params }) => {
    await delay(ARTIFICIAL_DELAY_MS);
    const spotNumber = Number(params.spotNumber);

    const activeReservation = reservations.find(
      (r) => r.parkingSpotNumber === spotNumber && r.status === "ACTIVE"
    );

    if (activeReservation) {
      return HttpResponse.json(activeReservation);
    }

    return HttpResponse.json(
      { error: "No active reservation found for this parking spot" },
      { status: 404 }
    );
  }),

  // 예약 취소 API
  http.patch("/api/reservations/:id/cancel", async ({ params }) => {
    await delay(ARTIFICIAL_DELAY_MS);
    const { id } = params;
    const reservation = reservations.find((r) => r.id === id);

    if (reservation && reservation.status === "ACTIVE") {
      reservation.status = "CANCELLED";
      return HttpResponse.json({ success: true, reservation });
    }

    return HttpResponse.json(
      {
        error: "Cannot cancel reservation",
        reason: reservation
          ? "Reservation is not active"
          : "Reservation not found",
      },
      { status: 400 }
    );
  }),

  // 새로운 예약 생성 API
  http.post("/api/reserve", async ({ request }) => {
    await delay(ARTIFICIAL_DELAY_MS);
    const { parkingSpotNumber, startTime, endTime } =
      (await request.json()) as {
        parkingSpotNumber: number;
        startTime: string;
        endTime: string;
      };

    // 새로운 예약 생성
    const newReservation: IReservation = {
      id: `r${Date.now()}`,
      reservedBy: "kevin1",
      parkingSpotId: parkingSpotNumber.toString(),
      parkingSpotNumber,
      startTime,
      endTime,
      status: "ACTIVE",
    };

    reservations.push(newReservation);

    return HttpResponse.json({
      success: true,
      reservation: newReservation,
    });
  }),
];
