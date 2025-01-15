export interface IChargingInfo {
  total: number;
  available: number;
}

export type ParkingSpotStatus = "OCCUPIED" | "EMPTY" | "RESERVED";
export type ParkingSpotType =
  | "NORMAL"
  | "DISABLED"
  | "EV"
  | "WOMEN"
  | "ELDERLY";
export type ChargingStatus = "AVAILABLE" | "UNAVAILABLE" | "CHARGING";
export type ChargingSpeed = "SLOW" | "FAST";
export type ChargingType = "DC_DEMO" | "AC" | "DC_COMBO" | "AC3";

export interface IEVCharger {
  operator: string;
  status: ChargingStatus;
  chargingSpeed: ChargingSpeed;
  chargingType: ChargingType;
  chargingPower: number;
  pricePerKWh: number;
  lastUpdated: string;
}

export interface IParkingSpot {
  id: string;
  parkingSpotNumber: number;
  status: ParkingSpotStatus;
  parkingSpotType: ParkingSpotType;
  evCharger?: IEVCharger;
}

export interface IParkingLot {
  name: string;
  id: string;
  address: string;
  totalParkingSpots: number;
  availableParkingSpots: number;
  evCharging: {
    total: number;
    available: number;
    slowCharging: IChargingInfo;
    fastCharging: IChargingInfo;
  };
  parkingSpots: IParkingSpot[];
}

export interface IReservation {
  id: string;
  reservedBy: string; // 예약자 ID
  parkingSpotId: string;
  parkingSpotNumber: number;
  startTime: string;
  endTime: string;
  status: "ACTIVE" | "COMPLETED" | "CANCELLED";
}
