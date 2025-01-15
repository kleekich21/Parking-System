import { IEVCharger } from "../../types/parking";

interface EVChargerInfoProps {
  evCharger: IEVCharger;
}

function EVChargerInfo({ evCharger }: EVChargerInfoProps) {
  const { operator, pricePerKWh, chargingSpeed, chargingType, chargingPower } =
    evCharger;
  return (
    <div className="border-t pt-4">
      <h3 className="font-semibold mb-2">전기차 충전 정보</h3>
      <div className="space-y-1 text-sm">
        <p>운영기관: {operator}</p>
        <p>충전 요금: {pricePerKWh}원/kWh</p>
        <p>충전 속도: {chargingSpeed === "FAST" ? "급속" : "완속"}</p>
        <p>충전 타입: {chargingType}</p>
        <p>충전 출력: {chargingPower}kW</p>
      </div>
    </div>
  );
}

export default EVChargerInfo;
