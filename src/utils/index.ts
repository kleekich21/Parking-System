import { differenceInMinutes } from "date-fns";

export const calculateTotalMinutes = (startTime: string, endTime: string) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  return Math.ceil(differenceInMinutes(end, start));
};

export const calculateTotalTime = (startTime: string, endTime: string) => {
  if (!startTime || !endTime) return "0분";
  if (new Date(endTime) < new Date(startTime)) return "0분";

  const totalMinutes = calculateTotalMinutes(startTime, endTime);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}분`;
  if (minutes === 0) return `${hours}시간`;
  return `${hours}시간 ${minutes}분`;
};

export const calculateFee = (
  startTime: string,
  endTime: string,
  feePerTenMinutes: number
) => {
  const totalMinutes = calculateTotalMinutes(startTime, endTime);
  return Math.ceil(totalMinutes / 60) * feePerTenMinutes || 0;
};
