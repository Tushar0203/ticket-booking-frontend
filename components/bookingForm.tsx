"use client";
import React, { useState } from "react";

const BookingFormComponent = ({ fetchSeats }: { fetchSeats: () => void }) => {
    const [bookSeats, setBookSeats] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<{
      text: string;
      type: "error" | "success";
    } | null>(null);

    const showMessage = (text: string, type: "error" | "success") => {
      setMessage({ text, type });
      setTimeout(() => setMessage(null), 2000);
    };

    const handleBook = async () => {
      if (bookSeats <= 0 || bookSeats >= 8) return;
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("api/v1/seats/bookUnreservedSeats",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ numberOfSeats: bookSeats }),
          }
        );
        const data = await response.json();
        if (data.success) {
          fetchSeats();
          showMessage("Booking successful!", "success");
        } else {
          showMessage(data.message || "Booking failed", "error");
        }
      } catch (error) {
        console.error(error);
        showMessage("Something went wrong. Try again.", "error");
      } finally {
        setLoading(false);
      }
    };

    const handleReset = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("api/v1/seats/resetBooking",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({}),
          }
        );
        const data = await response.json();
        if (data.success) {
          fetchSeats();
          showMessage("Reset successful!", "success");
        } else {
          showMessage(data.message || "Reset failed", "error");
        }
      } catch (error) {
        console.error(error);
        showMessage("Something went wrong. Try again.", "error");
      } finally {
        setLoading(false);
      }
    };

    return (
      <>
        <div className="flex flex-col gap-3 overflow-x-auto">
          <div className="font-semibold">Book Seats</div>

          <div className="flex flex-row items-center justify-center gap-2">
            <input
              onChange={(e) => setBookSeats(Number(e.target.value))}
              type="number"
              min={1}
              placeholder="Enter number of seats"
              className="text-left w-full h-11 bg-white px-2 border rounded-sm border-blue-600 focus:border-blue-300 rounded-md"
              disabled={loading}
            />
            <button
              onClick={handleBook}
              className={`flex items-center justify-center h-10 w-35 rounded-sm text-white font-medium ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
              }`}
              disabled={loading}
            >
              {loading ? "Booking..." : "Book"}
            </button>
          </div>

          <button
            className={`flex items-center justify-center h-10 w-30 rounded-sm text-white font-medium w-full ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
            }`}
            disabled={loading}
            onClick={handleReset}
          >
            {loading ? "Resetting..." : "Reset Booking"}
          </button>
        </div>

        {message && (
          <div
            className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md shadow-lg text-white font-medium ${
              message.type === "error" ? "bg-red-500" : "bg-green-600"
            }`}
          >
            {message.type === "error" && <span className="mr-2">!</span>}
            {message.text}
          </div>
        )}
      </>
    );
  }


export const BookingForm = React.memo(BookingFormComponent)
