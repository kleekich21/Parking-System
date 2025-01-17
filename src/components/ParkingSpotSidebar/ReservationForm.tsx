import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../common/Button";
import toast from "react-hot-toast";
import { useReserveSpot } from "../../hooks/useReservation";
import { useParkingLot } from "../../hooks/useParking";
import { IParkingSpot } from "../../types/parking";
import { calculateTotalTime, calculateFee } from "../../utils";
import { useQueryClient } from "@tanstack/react-query";
import { PARKING_LOT_ID } from "../../mocks/data";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { isAfter } from "date-fns";
import ReservationConfirmModal from "./ReservationConfirmModal";

interface ReservationFormProps {
  spot: IParkingSpot;
  onSuccess: () => void;
}

const reservationSchema = z
  .object({
    startTime: z
      .string()
      .min(1, "시작 시간을 선택해주세요")
      .refine((time) => new Date(time) > new Date(), {
        message: "현재 시간 이후로 선택해주세요",
      }),
    endTime: z
      .string()
      .min(1, "종료 시간을 선택해주세요")
      .refine((time) => new Date(time) > new Date(), {
        message: "현재 시간 이후로 선택해주세요",
      }),
  })
  .refine((schema) => new Date(schema.endTime) > new Date(schema.startTime), {
    message: "종료 시간은 시작 시간 이후여야 합니다",
    path: ["endTime"],
  });

type FormValues = z.infer<typeof reservationSchema>;

function ReservationForm({ spot, onSuccess }: ReservationFormProps) {
  const { data: parkingLot } = useParkingLot(PARKING_LOT_ID);
  const feePerTenMinutes = parkingLot?.feePerTenMinutes;
  const queryClient = useQueryClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(reservationSchema),
    mode: "onChange",
  });

  const reserveMutation = useReserveSpot();
  const { parkingSpotNumber } = spot;

  const startTime = watch("startTime");
  const endTime = watch("endTime");

  const handleFormSubmit = (data: FormValues) => {
    setFormData(data);
    setShowConfirmModal(true);
  };

  const handleClickReserve = () => {
    if (
      startTime &&
      endTime &&
      isAfter(new Date(endTime), new Date(startTime))
    ) {
      setShowConfirmModal(true);
    }
    return;
  };

  const handleConfirm = async () => {
    if (!formData) return;

    const toastId = toast.loading("예약 처리 중...");

    try {
      await reserveMutation.mutateAsync({
        parkingSpotNumber,
        startTime: formData.startTime,
        endTime: formData.endTime,
      });
      toast.success("예약이 완료되었습니다.", { id: toastId });
      setShowConfirmModal(false);
      onSuccess();
      // 예약 내역 업데이트 후 주차장 현황 리페치
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PARKING.PARKING_LOT(PARKING_LOT_ID),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.RESERVATION.ALL,
      });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "예약 처리 중 오류가 발생했습니다.",
        { id: toastId }
      );
    }
  };
  const totalTime = calculateTotalTime(startTime, endTime);
  const totalFee = calculateFee(startTime, endTime, feePerTenMinutes);

  return (
    <>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-6 border-t pt-4"
      >
        <div>
          <h3 className="font-semibold mb-2">예약 시간 선택</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white mb-1">시작 시간</label>
              <input
                type="datetime-local"
                className={`w-full border rounded-md px-3 py-2 ${
                  errors.startTime ? "border-red-500" : "border-gray-300"
                }`}
                min={new Date().toISOString().slice(0, 16)}
                {...register("startTime")}
              />
              {errors.startTime && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.startTime.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm text-white mb-1">종료 시간</label>
              <input
                type="datetime-local"
                className={`w-full border rounded-md px-3 py-2 ${
                  errors.endTime ? "border-red-500" : "border-gray-300"
                }`}
                min={startTime}
                {...register("endTime")}
              />
              {errors.endTime && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.endTime.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <span>총 예약 시간</span>
            <span>{totalTime}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>결제 금액</span>
            <span>{totalFee}원</span>
          </div>
        </div>

        <Button
          type="primary"
          className="w-full"
          disabled={isSubmitting || Object.keys(errors).length > 0}
          isLoading={isSubmitting}
          onClick={handleClickReserve}
        >
          예약하기
        </Button>
      </form>
      <ReservationConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirm}
        isLoading={reserveMutation.isPending}
        startTime={startTime}
        endTime={endTime}
        totalTime={totalTime}
        totalFee={totalFee}
      />
    </>
  );
}

export default ReservationForm;
