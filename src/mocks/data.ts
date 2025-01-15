import { IParkingLot } from "../types/parking";
import { IReservation } from "../types/parking";

export const exampleParkingLot: IParkingLot = {
  name: "서울시청 주차장",
  id: "1",
  address: "서울특별시 중구 세종대로 110",
  totalParkingSpots: 20,
  availableParkingSpots: 10,
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
      number: 1,
      status: "EMPTY",
      type: "DISABLED",
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
      status: "OCCUPIED",
      type: "DISABLED",
    },
    {
      id: "4",
      number: 4,
      status: "EMPTY",
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
      id: "5",
      number: 5,
      status: "EMPTY",
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
      id: "7",
      number: 7,
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
      id: "8",
      number: 8,
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
      id: "9",
      number: 9,
      status: "RESERVED",
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
      id: "10",
      number: 10,
      status: "OCCUPIED",
      type: "WOMEN",
    },
    {
      id: "11",
      number: 11,
      status: "EMPTY",
      type: "WOMEN",
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
      type: "ELDERLY",
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
      type: "NORMAL",
    },
    {
      id: "16",
      number: 16,
      status: "EMPTY",
      type: "NORMAL",
    },
    {
      id: "17",
      number: 17,
      status: "EMPTY",
      type: "NORMAL",
    },
    {
      id: "18",
      number: 18,
      status: "RESERVED",
      type: "NORMAL",
    },
    {
      id: "19",
      number: 19,
      status: "EMPTY",
      type: "NORMAL",
    },
    {
      id: "20",
      number: 20,
      status: "EMPTY",
      type: "NORMAL",
    },
  ],
};

export const reservations: IReservation[] = [
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
