// src/types/parking.ts
export interface ChargingInfo {
  total: number;
  available: number;
}

export type ParkingSpotStatus = "OCCUPIED" | "EMPTY" | "RESERVED";

export interface ParkingSpot {
  id: string;
  number: number;
  status: ParkingSpotStatus;
}

export interface ParkingLot {
  name: string;
  id: string;
  address: string;
  totalParkingSpots: number;
  availableParkingSpots: number;
  evCharging: {
    isAvailable: boolean;
    slowCharging: ChargingInfo;
    fastCharging: ChargingInfo;
  };
  parkingSpots: ParkingSpot[];
}

export type ChargingStatus = "AVAILABLE" | "UNAVAILABLE" | "CHARGING";
export type ChargingSpeed = "SLOW" | "FAST";
export type ChargingType = "DC_DEMO" | "AC" | "DC_COMBO" | "AC3";

export interface EVChargingSpot {
  parkingSpotNumber: number;
  operator: string;
  status: ChargingStatus;
  chargingSpeed: ChargingSpeed;
  chargingType: ChargingType;
  chargingPower: number;
  pricePerKWh: number;
  lastUpdated: string;
}
