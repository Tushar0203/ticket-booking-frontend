"use client";
import { BookingForm } from "@/components/bookingForm";
import { Seats } from "@/components/seats";
import { useCallback, useEffect, useState } from "react";


interface Seat {
  seatNumber: number;
  status: "RESERVED" | "UNRESERVED";
}

export default function Bookings() {
  const [seats, setSeats] = useState<Seat[]>([]);

  const fetchSeats = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://ec2-16-171-6-49.eu-north-1.compute.amazonaws.com:8000/api/v1/seats/getAllSeats",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setSeats(data.seats);
      }
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  }, []);

  useEffect(() => {
    fetchSeats();
  }, [fetchSeats]);

  const reservedCount = seats.filter((s) => s.status === "RESERVED").length;

  return (
    <div className="flex flex-col md:flex-row items-center md:items-center min-h-screen justify-center items-center md:justify-between py-4 px-4 md:px-40 bg-gray-200 overflow-auto">
      <div className="mb-6 md:mb-0 w-full md:w-auto">
        <Seats seats={seats} reservedCount={reservedCount} />
      </div>
      <div className="w-full md:w-auto max-w-[450px] flex justify-center items-center">
        <BookingForm fetchSeats={fetchSeats} />
      </div>
    </div>
  );
}
