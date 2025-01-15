export interface ChargingInfo {
  total: number;
  available: number;
}

export type ParkingSpotStatus = "OCCUPIED" | "EMPTY" | "RESERVED";
export type ChargingStatus = "AVAILABLE" | "UNAVAILABLE" | "CHARGING";
export type ChargingSpeed = "SLOW" | "FAST";
export type ChargingType = "DC_DEMO" | "AC" | "DC_COMBO" | "AC3";

export interface EVCharger {
  operator: string;
  status: ChargingStatus;
  chargingSpeed: ChargingSpeed;
  chargingType: ChargingType;
  chargingPower: number;
  pricePerKWh: number;
  lastUpdated: string;
}

export interface ParkingSpot {
  id: string;
  number: number;
  status: ParkingSpotStatus;
  evCharger?: EVCharger;
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

export interface Reservation {
  id: string;
  parkingSpotId: string;
  parkingSpotNumber: number;
  startTime: string;
  endTime: string;
  status: "ACTIVE" | "COMPLETED" | "CANCELLED";
}
