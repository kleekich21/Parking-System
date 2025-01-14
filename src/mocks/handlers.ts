import { http, HttpResponse, delay } from "msw";
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
  parkingSpots: [
    {
      id: "1",
      number: 1,
      status: "OCCUPIED",
    },
    {
      id: "2",
      number: 2,
      status: "EMPTY",
    },
    {
      id: "3",
      number: 3,
      status: "RESERVED",
    },
    {
      id: "4",
      number: 4,
      status: "EMPTY",
    },
    {
      id: "5",
      number: 5,
      status: "OCCUPIED",
    },
    {
      id: "6",
      number: 6,
      status: "EMPTY",
    },
  ],
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

// 지연 시간을 설정할 수 있는 상수
const ARTIFICIAL_DELAY_MS = 1000; // 1초

export const handlers = [
  /** 주차면 현황 조회 */
  http.get("/api/parking-lot/:id", async ({ params }) => {
    // 네트워크 상태에 따른 지연 시뮬레이션
    const networkCondition = Math.random();
    if (networkCondition < 0.1) {
      // 10% 확률로 3초 지연
      await delay(3000);
    } else {
      // 90% 확률로 1초 지연
      await delay(ARTIFICIAL_DELAY_MS);
    }

    const { id } = params;
    if (id === exampleParkingLot.id) {
      return HttpResponse.json(exampleParkingLot);
    }
    return HttpResponse.json(
      { error: "Parking lot not found" },
      { status: 404 }
    );
  }),

  /** 주차면 예약 */
  http.post("/api/reserve", async ({ request }) => {
    // 랜덤 지연 (0.5초 ~ 2초)
    await delay(Math.random() * 1500 + 500);
    const { parkingSpotNumber } = (await request.json()) as {
      parkingSpotNumber: number;
    };
    return HttpResponse.json({ success: true, parkingSpotNumber });
  }),

  /** 주차면 충전기 현황 조회 */
  http.get("/api/ev-charging/:id", async ({ params }) => {
    // 조건부 지연
    const { id } = params;
    if (id === exampleParkingLot.id) {
      await delay(ARTIFICIAL_DELAY_MS);
      return HttpResponse.json(EVchargingSpots);
    }
    // 에러 응답은 더 짧은 지연
    await delay(500);
    return HttpResponse.json(
      { error: "Charging spots not found" },
      { status: 404 }
    );
  }),
];
