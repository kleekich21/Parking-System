import { IParkingLot, IReservation } from "../types/parking";

export const PARKING_LOT_ID = "1";
export const PARKING_LOT_ID_2 = "2";

export const currentUser = {
  id: "kevin1",
  name: "이강식",
};

export const parkingLot1: IParkingLot = {
  name: "서울시청 주차장",
  id: "1",
  address: "서울특별시 중구 세종대로 110",
  totalParkingSpots: 20,
  availableParkingSpots: 13,
  feePerTenMinutes: 500,
  evCharging: {
    total: 6,
    available: 4,
    slowCharging: {
      total: 3,
      available: 2,
    },
    fastCharging: {
      total: 3,
      available: 2,
    },
  },
  parkingSpots: [
    {
      id: "1",
      parkingSpotNumber: 1,
      status: "EMPTY",
      parkingSpotType: "DISABLED",
    },
    {
      id: "2",
      parkingSpotNumber: 2,
      status: "EMPTY",
      parkingSpotType: "DISABLED",
    },
    {
      id: "3",
      parkingSpotNumber: 3,
      status: "EMPTY",
      parkingSpotType: "DISABLED",
    },
    {
      id: "4",
      parkingSpotNumber: 4,
      status: "EMPTY",
      parkingSpotType: "EV",
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
      id: "5",
      parkingSpotNumber: 5,
      status: "EMPTY",
      parkingSpotType: "EV",
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
      parkingSpotNumber: 6,
      status: "OCCUPIED",
      parkingSpotType: "EV",
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
      id: "7",
      parkingSpotNumber: 7,
      status: "EMPTY",
      parkingSpotType: "EV",
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
      id: "8",
      parkingSpotNumber: 8,
      status: "EMPTY",
      parkingSpotType: "EV",
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
      id: "9",
      parkingSpotNumber: 9,
      status: "RESERVED",
      parkingSpotType: "EV",
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
      id: "10",
      parkingSpotNumber: 10,
      status: "OCCUPIED",
      parkingSpotType: "WOMEN",
    },
    {
      id: "11",
      parkingSpotNumber: 11,
      status: "EMPTY",
      parkingSpotType: "WOMEN",
    },
    {
      id: "12",
      parkingSpotNumber: 12,
      status: "OCCUPIED",
      parkingSpotType: "WOMEN",
    },
    {
      id: "13",
      parkingSpotNumber: 13,
      status: "EMPTY",
      parkingSpotType: "ELDERLY",
    },
    {
      id: "14",
      parkingSpotNumber: 14,
      status: "RESERVED",
      parkingSpotType: "ELDERLY",
    },
    {
      id: "15",
      parkingSpotNumber: 15,
      status: "EMPTY",
      parkingSpotType: "NORMAL",
    },
    {
      id: "16",
      parkingSpotNumber: 16,
      status: "EMPTY",
      parkingSpotType: "NORMAL",
    },
    {
      id: "17",
      parkingSpotNumber: 17,
      status: "EMPTY",
      parkingSpotType: "NORMAL",
    },
    {
      id: "18",
      parkingSpotNumber: 18,
      status: "RESERVED",
      parkingSpotType: "NORMAL",
    },
    {
      id: "19",
      parkingSpotNumber: 19,
      status: "EMPTY",
      parkingSpotType: "NORMAL",
    },
    {
      id: "20",
      parkingSpotNumber: 20,
      status: "EMPTY",
      parkingSpotType: "NORMAL",
    },
  ],
};

export const parkingLot2: IParkingLot = {
  id: PARKING_LOT_ID_2,
  name: "테헤란로 주차장",
  address: "서울특별시 강남구 테헤란로 123",
  totalParkingSpots: 6,
  availableParkingSpots: 4,
  feePerTenMinutes: 1000,
  parkingSpots: [
    {
      id: "ps-2-1",
      parkingSpotNumber: 1,
      status: "EMPTY",
      parkingSpotType: "NORMAL",
    },
    {
      id: "ps-2-2",
      parkingSpotNumber: 2,
      status: "OCCUPIED",
      parkingSpotType: "NORMAL",
    },
    {
      id: "ps-2-3",
      parkingSpotNumber: 3,
      status: "EMPTY",
      parkingSpotType: "DISABLED",
    },
    {
      id: "ps-2-4",
      parkingSpotNumber: 4,
      status: "EMPTY",
      parkingSpotType: "NORMAL",
      evCharger: {
        chargingType: "AC",
        chargingSpeed: "SLOW",
        operator: "VOLT_UP",
        status: "AVAILABLE",
        chargingPower: 20,
        pricePerKWh: 150,
        lastUpdated: "2025-01-13T14:30:00+09:00",
      },
    },
    {
      id: "ps-2-5",
      parkingSpotNumber: 5,
      status: "EMPTY",
      parkingSpotType: "NORMAL",
      evCharger: {
        chargingType: "DC_COMBO",
        chargingSpeed: "FAST",
        operator: "VOLT_UP",
        status: "AVAILABLE",
        chargingPower: 100,
        pricePerKWh: 450,
        lastUpdated: "2025-01-13T14:30:00+09:00",
      },
    },
    {
      id: "ps-2-6",
      parkingSpotNumber: 6,
      status: "RESERVED",
      parkingSpotType: "NORMAL",
    },
  ],
  evCharging: {
    total: 2,
    available: 2,
    slowCharging: {
      total: 1,
      available: 1,
    },
    fastCharging: {
      total: 1,
      available: 1,
    },
  },
};

export const reservations: IReservation[] = [
  {
    id: "reservation-1",
    parkingSpotId: "ps-1-3",
    parkingSpotNumber: 3,
    startTime: "2024-03-20T10:00:00",
    endTime: "2024-03-20T12:00:00",
    reservedBy: currentUser.id,
    status: "ACTIVE",
  },
  {
    id: "reservation-2",
    parkingSpotId: "ps-1-6",
    parkingSpotNumber: 6,
    startTime: "2024-03-20T14:00:00",
    endTime: "2024-03-20T16:00:00",
    reservedBy: "user-2",
    status: "ACTIVE",
  },
];

export const parkingLots = new Map<string, IParkingLot>([
  [PARKING_LOT_ID, parkingLot1],
  [PARKING_LOT_ID_2, parkingLot2],
]);
