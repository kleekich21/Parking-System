import { http, HttpResponse, delay } from "msw";
import { IReservation } from "../types/parking";
import { parkingLots, parkingLot1, reservations } from "./data";
const ARTIFICIAL_DELAY_MS = 1000;

export const handlers = [
  http.get("/api/parking-lot/:id", async ({ params }) => {
    await delay(ARTIFICIAL_DELAY_MS);
    const { id } = params as { id: string };

    if (parkingLots.has(id)) {
      return HttpResponse.json(parkingLots.get(id)!);
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

  // 예약 취소 API
  http.delete(
    "/api/reservations/:parkingSpotNumber/cancel",
    async ({ params }) => {
      await delay(ARTIFICIAL_DELAY_MS);
      const { parkingSpotNumber } = params;
      const reservation = reservations.find(
        (r) => r.parkingSpotNumber === Number(parkingSpotNumber)
      );

      if (reservation) {
        console.log("reservation", reservation);

        // 예약 내역 업데이트
        const reservationIndex = reservations.findIndex(
          (r) => r.parkingSpotId === parkingSpotNumber
        );
        reservations.splice(reservationIndex, 1);

        const selectedSpot = parkingLot1.parkingSpots.find(
          (spot) => spot.parkingSpotNumber === Number(parkingSpotNumber)
        );
        // 주차면 상태 업데이트
        selectedSpot!.status = "EMPTY";

        // 주차장 현황 업데이트
        parkingLot1.availableParkingSpots += 1;

        if (selectedSpot!.parkingSpotType === "EV") {
          parkingLot1.evCharging.available += 1;
        }

        if (selectedSpot?.evCharger?.chargingSpeed === "SLOW") {
          parkingLot1.evCharging.slowCharging.available += 1;
        }

        if (selectedSpot?.evCharger?.chargingSpeed === "FAST") {
          parkingLot1.evCharging.fastCharging.available += 1;
        }

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
    }
  ),

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

    // 예약 내역 업데이트
    reservations.push(newReservation);

    const selectedSpot = parkingLot1.parkingSpots.find(
      (spot) => spot.parkingSpotNumber === parkingSpotNumber
    );

    // 주차면 상태 업데이트
    selectedSpot!.status = "RESERVED";

    // 주차장 현황 업데이트
    parkingLot1.availableParkingSpots -= 1;

    if (selectedSpot!.parkingSpotType === "EV") {
      parkingLot1.evCharging.available -= 1;
    }

    if (selectedSpot?.evCharger?.chargingSpeed === "SLOW") {
      parkingLot1.evCharging.slowCharging.available -= 1;
    }

    if (selectedSpot?.evCharger?.chargingSpeed === "FAST") {
      parkingLot1.evCharging.fastCharging.available -= 1;
    }

    return HttpResponse.json({
      success: true,
      reservation: newReservation,
    });
  }),
];
