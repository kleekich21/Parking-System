import { Link } from "react-router-dom";
import { FaCar, FaChargingStation, FaWheelchair } from "react-icons/fa";
import { MdDirectionsCar } from "react-icons/md";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            주차장 예약 시스템
          </h1>
          <p className="mt-2 text-gray-600">
            실시간으로 주차면을 확인하고 예약하세요
          </p>
        </div>
      </header>

      <section className="container mx-auto px-4">
        <h2 className="text-black text-2xl font-semibold mb-6">
          데모 체험하기
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            to="/parking-lots/1"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-black text-xl font-semibold mb-3">주차장 A</h3>
            <div className="space-y-2 text-gray-600">
              <p>• 총 20개의 주차면</p>
              <p>• 전기차 충전소 6개</p>
              <p className="text-blue-600 mt-4">지금 예약하기 →</p>
            </div>
          </Link>
          <Link
            to="/parking-lots/2"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-black text-xl font-semibold mb-3">주차장 B</h3>
            <div className="space-y-2 text-gray-600">
              <p>• 총 6개의 주차면</p>
              <p>• 전기차 충전소 2개</p>
              <p className="text-blue-600 mt-4">지금 예약하기 →</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">주요 기능</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <MdDirectionsCar className="text-4xl text-blue-600 mb-4" />
            <h3 className="font-semibold mb-2">실시간 현황</h3>
            <p className="text-gray-600">주차면 상태를 실시간으로 확인</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <FaCar className="text-4xl text-blue-600 mb-4" />
            <h3 className="font-semibold mb-2">간편 예약</h3>
            <p className="text-gray-600">원하는 시간에 주차면 예약</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <FaChargingStation className="text-4xl text-blue-600 mb-4" />
            <h3 className="font-semibold mb-2">충전소 정보</h3>
            <p className="text-gray-600">전기차 충전소 위치 및 상태 확인</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <FaWheelchair className="text-4xl text-blue-600 mb-4" />
            <h3 className="font-semibold mb-2">전용 구역</h3>
            <p className="text-gray-600">장애인/여성 전용 주차 구역 구분</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">데모 사용 가이드</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div>
            <h3 className="text-black font-semibold mb-2">1. 주차장 선택</h3>
            <p className="text-gray-600">
              위의 데모 주차장 중 하나를 선택하여 클릭하세요.
            </p>
          </div>
          <div>
            <h3 className="text-black font-semibold mb-2">2. 주차면 예약</h3>
            <p className="text-gray-600">
              빈 주차면을 클릭하고 원하는 시간을 선택하여 예약하세요.
            </p>
          </div>
          <div>
            <h3 className="text-black font-semibold mb-2">3. 예약 관리</h3>
            <p className="text-gray-600">
              예약된 주차면을 클릭하여 예약을 확인하거나 취소할 수 있습니다.
            </p>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>참고:</strong> 데모 환경에서는 주차장
              A(parking-lot/1)에서만 예약 및 취소가 가능합니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
