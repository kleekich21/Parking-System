function ParkingSpotsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 9 }).map((_, index) => (
        <div className="animate-pulse" key={index}>
          <div className="min-h-[150px] min-w-[150px] bg-gray-200 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export default ParkingSpotsSkeleton;
