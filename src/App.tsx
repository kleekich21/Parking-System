import { useEffect, useState } from "react";
import { ParkingLot, ParkingSpot } from "./types/parking";

function App() {
  const [parkingLot, setParkingLot] = useState<ParkingLot | null>(null);
  const [reservationStatus, setReservationStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // 주차장 정보 조회
  useEffect(() => {
    setIsLoading(true);
    fetch("/api/parking-lot/1")
      .then((res) => res.json())
      .then((data) => setParkingLot(data))
      .catch((error) => console.error("주차장 정보 조회 실패:", error))
      .finally(() => setIsLoading(false));
  }, []);

  // 예약 테스트
  const handleReservation = async (spotNumber: number) => {
    try {
      const response = await fetch("/api/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ parkingSpotNumber: spotNumber }),
      });
      const data = await response.json();
      setReservationStatus(
        data.success ? `${spotNumber}번 자리 예약 성공!` : "예약 실패"
      );
    } catch (error) {
      setReservationStatus("예약 중 오류 발생");
      console.error("예약 실패:", error);
    }
  };

  const getSpotColor = (status: ParkingSpot["status"]) => {
    switch (status) {
      case "OCCUPIED":
        return "bg-red-200";
      case "EMPTY":
        return "bg-green-200";
      case "RESERVED":
        return "bg-yellow-200";
      default:
        return "bg-gray-200";
    }
  };

  if (isLoading) {
    return <div className="p-4">로딩 중...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">주차장 시스템 테스트</h1>

      {/* 주차장 정보 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">주차장 정보</h2>
        {parkingLot && (
          <div className="bg-gray-100 p-4 rounded">
            <p>이름: {parkingLot.name}</p>
            <p>주소: {parkingLot.address}</p>
            <p>전체 주차면: {parkingLot.totalParkingSpots}</p>
            <p>가용 주차면: {parkingLot.availableParkingSpots}</p>
          </div>
        )}
      </div>

      {/* 주차면 현황 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">주차면 현황</h2>
        <div className="grid grid-cols-3 gap-4">
          {parkingLot?.parkingSpots.map((spot) => (
            <div
              key={spot.id}
              className={`p-4 rounded ${getSpotColor(
                spot.status
              )} flex flex-col items-center`}
            >
              <p className="font-bold">#{spot.number}</p>
              <p>{spot.status}</p>
              {spot.status === "EMPTY" && (
                <button
                  onClick={() => handleReservation(spot.number)}
                  className="mt-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  예약하기
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 예약 상태 */}
      {reservationStatus && (
        <div className="mt-4">
          <p className="text-green-600 font-semibold">{reservationStatus}</p>
        </div>
      )}
    </div>
  );
}

export default App;
