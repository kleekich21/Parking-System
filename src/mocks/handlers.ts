import { http, HttpResponse, delay } from "msw";
import { IParkingLot, IReservation } from "../types/parking";

const ARTIFICIAL_DELAY_MS = 1000;

const exampleParkingLot: IParkingLot = {
  name: "서울시청 주차장",
  id: "1",
  address: "서울특별시 중구 세종대로 110",
  totalParkingSpots: 200,
  availableParkingSpots: 50,
  evCharging: {
    isAvailable: true,
    slowCharging: {
      total: 10,
      available: 4,
    },
    fastCharging: {
      total: 5,
      available: 2,
    },
  },
  parkingSpots: [
    {
      id: "1",
      number: 1,
      status: "OCCUPIED",
      type: "NORMAL",
    },
    {
      id: "2",
      number: 2,
      status: "EMPTY",
      type: "DISABLED",
    },
    {
      id: "3",
      number: 3,
      status: "RESERVED",
      type: "WOMEN",
    },
    {
      id: "4",
      number: 4,
      status: "EMPTY",
      type: "ELDERLY",
    },
    {
      id: "5",
      number: 5,
      status: "OCCUPIED",
      type: "EV",
      evCharger: {
        operator: "VOLT_UP",
        status: "CHARGING",
        chargingSpeed: "SLOW",
        chargingType: "AC",
        chargingPower: 20,
        pricePerKWh: 150,
        lastUpdated: "2025-01-13T14:30:00+09:00",
      },
    },
    {
      id: "6",
      number: 6,
      status: "EMPTY",
      type: "EV",
      evCharger: {
        operator: "VOLT_UP",
        status: "AVAILABLE",
        chargingSpeed: "FAST",
        chargingType: "DC_COMBO",
        chargingPower: 100,
        pricePerKWh: 450,
        lastUpdated: "2025-01-13T14:30:00+09:00",
      },
    },
    {
      id: "7",
      number: 7,
      status: "EMPTY",
      type: "NORMAL",
    },
    {
      id: "8",
      number: 8,
      status: "RESERVED",
      type: "DISABLED",
    },
    {
      id: "9",
      number: 9,
      status: "EMPTY",
      type: "WOMEN",
    },
    {
      id: "10",
      number: 10,
      status: "OCCUPIED",
      type: "ELDERLY",
    },
    {
      id: "11",
      number: 11,
      status: "EMPTY",
      type: "NORMAL",
    },
    {
      id: "12",
      number: 12,
      status: "OCCUPIED",
      type: "WOMEN",
    },
    {
      id: "13",
      number: 13,
      status: "EMPTY",
      type: "EV",
      evCharger: {
        operator: "VOLT_UP",
        status: "AVAILABLE",
        chargingSpeed: "SLOW",
        chargingType: "AC",
        chargingPower: 20,
        pricePerKWh: 150,
        lastUpdated: "2025-01-13T14:30:00+09:00",
      },
    },
    {
      id: "14",
      number: 14,
      status: "RESERVED",
      type: "ELDERLY",
    },
    {
      id: "15",
      number: 15,
      status: "EMPTY",
      type: "DISABLED",
    },
  ],
};

const reservations: IReservation[] = [
  {
    id: "r1",
    parkingSpotId: "5",
    parkingSpotNumber: 5,
    startTime: "2024-01-13T10:00:00+09:00",
    endTime: "2024-01-13T12:00:00+09:00",
    status: "COMPLETED",
  },
  {
    id: "r2",
    parkingSpotId: "3",
    parkingSpotNumber: 3,
    startTime: "2024-01-13T14:00:00+09:00",
    endTime: "2024-01-13T16:00:00+09:00",
    status: "ACTIVE",
  },
];

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
  http.get("/api/reservations/:id", async ({ params }) => {
    await delay(ARTIFICIAL_DELAY_MS);
    const { id } = params;
    const reservation = reservations.find((r) => r.id === id);

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
    const { parkingSpotNumber } = (await request.json()) as {
      parkingSpotNumber: number;
    };

    // 새로운 예약 생성
    const newReservation: IReservation = {
      id: `r${Date.now()}`,
      parkingSpotId: parkingSpotNumber.toString(),
      parkingSpotNumber,
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2시간 후
      status: "ACTIVE",
    };

    reservations.push(newReservation);

    return HttpResponse.json({
      success: true,
      reservation: newReservation,
    });
  }),
];
