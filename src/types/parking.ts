// src/types/parking.ts
export interface ChargingInfo {
  total: number;
  available: number;
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
