export const calculateTotalMinutes = (startTime: string, endTime: string) => {
  if (!startTime || !endTime) return 0;
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  return Math.ceil((end - start) / (1000 * 60)); // 분 단위
};

export const calculateTotalTime = (startTime: string, endTime: string) => {
  if (!startTime || !endTime) return "0분";

  const totalMinutes = calculateTotalMinutes(startTime, endTime);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}분`;
  if (minutes === 0) return `${hours}시간`;
  return `${hours}시간 ${minutes}분`;
};

export const calculatePrice = (
  startTime: string,
  endTime: string,
  pricePerTenMinutes: number
) => {
  const totalMinutes = calculateTotalMinutes(startTime, endTime);
  return Math.ceil(totalMinutes / 60) * pricePerTenMinutes;
};
