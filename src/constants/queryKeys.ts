export const QUERY_KEYS = {
  PARKING: {
    ALL: ["parking"] as const,
    PARKING_LOT: (id: string) => ["parking", id] as const,
  },
} as const;
