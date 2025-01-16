import { IReservation } from "../../types/parking";
import Button from "../common/Button";
import { currentUser } from "../../mocks/data";

interface ReservationInfoProps {
  reservation: IReservation;
  onCancelClick: () => void;
}

function ReservationInfo({ reservation, onCancelClick }: ReservationInfoProps) {
  const { id, startTime, endTime, status, reservedBy } = reservation;
  const isReservedByCurrentUser = currentUser.id === reservedBy;

  return (
    <div className="space-y-6">
      {isReservedByCurrentUser ? (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <p className="text-blue-700">예약완료</p>
          <h3 className="font-semibold mb-2">예약 정보</h3>
          <div className="space-y-2 text-sm">
            <p>예약 번호: {id}</p>
            <p>시작 시간: {new Date(startTime).toLocaleString()}</p>
            <p>종료 시간: {new Date(endTime).toLocaleString()}</p>
            <p>상태: {status}</p>
          </div>
          <Button type="danger" className="w-full" onClick={onCancelClick}>
            예약 취소
          </Button>
        </div>
      ) : (
        <>
          <h3 className="font-semibold mb-2">예약 정보</h3>
          <p>종료 시간: {new Date(endTime).toLocaleString()}</p>
        </>
      )}
    </div>
  );
}

export default ReservationInfo;
