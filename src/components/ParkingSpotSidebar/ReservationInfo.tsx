import { IReservation } from "../../types/parking";
import Button from "../common/Button";

interface ReservationInfoProps {
  reservation: IReservation;
  onCancelClick: () => void;
}

function ReservationInfo({ reservation, onCancelClick }: ReservationInfoProps) {
  const { id, startTime, endTime, status } = reservation;
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">예약 정보</h3>
        <div className="space-y-2 text-sm">
          <p>예약 번호: {id}</p>
          <p>시작 시간: {new Date(startTime).toLocaleString()}</p>
          <p>종료 시간: {new Date(endTime).toLocaleString()}</p>
          <p>상태: {status}</p>
        </div>
      </div>

      <Button type="danger" className="w-full" onClick={onCancelClick}>
        예약 취소
      </Button>
    </div>
  );
}

export default ReservationInfo;
