export const calculateTotalTime = (startTime: string, endTime: string) => {
  if (!startTime || !endTime) return 0;
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  return Math.ceil((end - start) / (1000 * 60)); // 분 단위
};

export const calculatePrice = (
  startTime: string,
  endTime: string,
  pricePerTenMinutes: number
) => {
  const totalMinutes = calculateTotalTime(startTime, endTime);
  return Math.ceil(totalMinutes / 60) * pricePerTenMinutes;
};
