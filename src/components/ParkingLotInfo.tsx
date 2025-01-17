import { IParkingLot } from "../types/parking";

interface ParkingLotInfoProps {
  parkingLot?: IParkingLot;
}

export function ParkingLotInfo({ parkingLot }: ParkingLotInfoProps) {
  if (!parkingLot) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow">
        <p className="text-gray-500">주차장 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className=" p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">{parkingLot.name}</h2>
      <p className="text-white">{parkingLot.address}</p>
      <p className="text-white">{parkingLot.feePerTenMinutes}원/10분</p>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-3 rounded">
          <p className="text-sm text-white">전체</p>
          <p className="text-lg font-semibold">
            {parkingLot.totalParkingSpots}면
          </p>
        </div>
        <div className="p-3 rounded">
          <p className="text-sm text-white">예약 가능</p>
          <p className="text-lg font-semibold text-green-600">
            {parkingLot.availableParkingSpots}면
          </p>
        </div>
      </div>

      {parkingLot.evCharging.total > 0 && (
        <div className="mt-4 border-t pt-4">
          <h3 className="text-sm font-semibold mb-2">전기차 충전소 현황</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded">
              <p className="text-sm text-white">완속 충전</p>
              <p className="text-lg font-semibold">
                {parkingLot.evCharging.slowCharging.available}/
                {parkingLot.evCharging.slowCharging.total}
              </p>
            </div>
            <div className="p-3 rounded">
              <p className="text-sm text-white">급속 충전</p>
              <p className="text-lg font-semibold">
                {parkingLot.evCharging.fastCharging.available}/
                {parkingLot.evCharging.fastCharging.total}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ParkingLotInfo;
