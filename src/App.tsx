import ParkingLot from "./components/ParkingLot";
import ParkingLotInfo from "./components/ParkingLotInfo";
import { useParkingLot } from "./hooks/useParking";
import { PARKING_LOT_ID } from "./constants/dummy";

function App() {
  const {
    data: parkingLot,
    isLoading: isLoadingParkingLot,
    error: parkingLotError,
  } = useParkingLot(PARKING_LOT_ID);

  if (isLoadingParkingLot) {
    return <div className="p-4">로딩 중...</div>;
  }

  if (parkingLotError) {
    return (
      <div className="p-4 text-red-600">
        에러가 발생했습니다: {parkingLotError.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">주차장 현황</h1>

      <div className="space-y-6">
        <ParkingLotInfo parkingLot={parkingLot} />

        <ParkingLot spots={parkingLot?.parkingSpots} />
      </div>
    </div>
  );
}

export default App;
