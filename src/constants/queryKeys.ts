export const QUERY_KEYS = {
  PARKING: {
    ALL: ["parking"] as const,
    PARKING_LOT: (id: string) => ["parking", id] as const,
  },
  RESERVATION: {
    ALL: ["reservations"] as const,
    LIST: ["reservations", "list"] as const,
    DETAIL: (parkingSpotNumber: number) =>
      ["reservations", parkingSpotNumber] as const,
  },
} as const;
