import React from "react";
import { BookingInformation } from "./bookingInformation";
import { SeatsArrangement } from "./seatsArrangement";

export interface Seat {
  seatNumber: number;
  status: "RESERVED" | "UNRESERVED";
}

export interface SeatsProps {
  seats: Seat[];
  reservedCount: number;
}

export const Seats = React.memo(({ seats, reservedCount }: SeatsProps) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <div className="text-xl font-bold">Ticket Booking</div>
      <SeatsArrangement seats={seats} />
      <BookingInformation reservedCount={reservedCount} />
    </div>
  );
});
