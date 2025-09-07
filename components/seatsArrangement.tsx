export interface Seat {
  seatNumber: number;
  status: "RESERVED" | "UNRESERVED";
}

interface SeatsProps {
  seats: Seat[];
}

export const SeatsArrangement = ({ seats }: SeatsProps) => {
  return (
    <div className="shadow p-3 rounded-md bg-white min-w-[400px]">
      <div className="grid grid-cols-7 gap-x-2 gap-y-5 ">
        {(seats || []).map((seat) => (
          <div
            key={seat.seatNumber}
            className={`flex w-12 h-8 justify-center items-center rounded cursor-pointer font-semibold text-md ${
              seat.status == "RESERVED" ? "bg-yellow-400" : "bg-green-500"
            }`}
          >
            {seat.seatNumber}
          </div>
        ))}
      </div>
    </div>
  );
};
