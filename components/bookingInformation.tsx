export const BookingInformation = ({
  reservedCount,
}: {
  reservedCount: number;
}) => {
  return (
    <div className="flex flex-row justify-between w-full gap-2 max-w-[400px]">
      <div className="flex justify-center items-center h-10 flex-1 bg-yellow-400 rounded-md">
        Booked Seats = {reservedCount}
      </div>
      <div className="flex justify-center items-center h-10 flex-1 bg-green-500 rounded-md">
        Available Seats = {80 - reservedCount}
      </div>
    </div>
  );
};
