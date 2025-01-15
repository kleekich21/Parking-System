import Modal from "../common/Modal";
import Button from "../common/Button";

interface CancelReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

function CancelReservationModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: CancelReservationModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="예약 취소"
      footer={
        <>
          <Button type="secondary" onClick={onClose}>
            취소
          </Button>
          <Button type="danger" onClick={onConfirm} isLoading={isLoading}>
            예약 취소하기
          </Button>
        </>
      }
    >
      예약을 취소하시겠습니까?
    </Modal>
  );
}

export default CancelReservationModal;
