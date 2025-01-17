import Button from "../common/Button";
import Modal from "../common/Modal";

interface ReservationConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  startTime: string;
  endTime: string;
  totalTime: string;
  totalFee: number;
}

function ReservationConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  startTime,
  endTime,
  totalTime,
  totalFee,
}: ReservationConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="예약 확인"
      footer={
        <>
          <Button type="secondary" onClick={onClose}>
            취소
          </Button>
          <Button type="primary" onClick={onConfirm} isLoading={isLoading}>
            확인
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <p>다음 내용으로 예약하시겠습니까?</p>
        <div className="bg-black p-4 rounded-lg space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white">시작 시간</span>
            <span>{new Date(startTime).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white">종료 시간</span>
            <span>{new Date(endTime).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white">총 예약 시간</span>
            <span>{totalTime}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span className="text-white">결제 금액</span>
            <span>{totalFee}원</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ReservationConfirmModal;
