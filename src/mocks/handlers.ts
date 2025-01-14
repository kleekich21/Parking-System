import { http, HttpResponse } from "msw";
import { ParkingLot, EVChargingSpot } from "../types/parking";

const exampleParkingLot: ParkingLot = {
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
};

const EVchargingSpots: EVChargingSpot[] = [
  {
    parkingSpotNumber: 5,
    operator: "VOLT_UP",
    status: "AVAILABLE",
    chargingSpeed: "SLOW",
    chargingType: "AC",
    chargingPower: 20,
    pricePerKWh: 150,
    lastUpdated: "2025-01-13T14:30:00+09:00",
  },
  {
    parkingSpotNumber: 6,
    operator: "VOLT_UP",
    status: "UNAVAILABLE",
    chargingSpeed: "FAST",
    chargingType: "DC_COMBO",
    chargingPower: 100,
    pricePerKWh: 450,
    lastUpdated: "2025-01-13T14:30:00+09:00",
  },
];

export const handlers = [
  http.get("/api/parking-spots", () => {
    return HttpResponse.json([exampleParkingLot]);
  }),

  http.post("/api/reserve", async ({ request }) => {
    const { parkingSpotNumber } = (await request.json()) as {
      parkingSpotNumber: number;
    };
    return HttpResponse.json({ success: true, parkingSpotNumber });
  }),

  http.get("/api/parking-lot/:id", ({ params }) => {
    const { id } = params;
    if (id === exampleParkingLot.id) {
      return HttpResponse.json(exampleParkingLot);
    }
    return HttpResponse.json(
      { error: "Parking lot not found" },
      { status: 404 }
    );
  }),

  http.get("/api/ev-charging/:id", ({ params }) => {
    const { id } = params;
    if (id === exampleParkingLot.id) {
      return HttpResponse.json(EVchargingSpots);
    }
    return HttpResponse.json(
      { error: "Charging spots not found" },
      { status: 404 }
    );
  }),
];
