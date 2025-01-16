import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../common/Button";
import { useReserveSpot } from "../../hooks/useReservation";
import { IParkingSpot } from "../../types/parking";
import { calculateTotalTime, calculatePrice } from "../../utils";
import { useQueryClient } from "@tanstack/react-query";
import { PARKING_LOT_ID } from "../../mocks/data";
import { QUERY_KEYS } from "../../constants/queryKeys";

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
  const queryClient = useQueryClient();
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

  const onSubmit = async (data: FormValues) => {
    try {
      await reserveMutation.mutateAsync({
        parkingSpotNumber,
        startTime: data.startTime,
        endTime: data.endTime,
      });
      onSuccess();
      // 예약 내역 업데이트 후 주차장 현황 리페치
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PARKING.PARKING_LOT(PARKING_LOT_ID),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.RESERVATION.ALL,
      });
    } catch (error) {
      console.error("예약 실패:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 border-t pt-4">
      <div>
        <h3 className="font-semibold mb-2">예약 시간 선택</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              시작 시간
            </label>
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
            <label className="block text-sm text-gray-600 mb-1">
              종료 시간
            </label>
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
          <span>{calculateTotalTime(startTime, endTime)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>결제 금액</span>
          <span>{`${calculatePrice(startTime, endTime, 500)}`}원</span>
        </div>
      </div>

      <Button
        type="primary"
        className="w-full"
        disabled={isSubmitting || Object.keys(errors).length > 0}
        isLoading={isSubmitting}
      >
        예약하기
      </Button>
    </form>
  );
}

export default ReservationForm;
