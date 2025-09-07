"use client";
import { useCallback, useState } from "react";
import { InputSection } from "./inputSection";
import { useRouter } from "next/navigation";

export const SignIn = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    []
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    []
  );

  async function sendRequest() {
    try {
      const response = await fetch("api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      if (data.success) {
        console.log(data);
        console.log(data.token);
        localStorage.setItem("token", data.token);
        router.push("/bookings");
      } else {
        alert("Signin failed: " + data.message);
      }
    } catch (error) {
      console.error("Signin error:", error);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg flex flex-col items-center p-6 shadow">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
          Sign In
        </div>

        <div className="text-sm sm:text-base text-slate-600 flex mt-2 flex-wrap justify-center">
          <span className="mr-1">Don&apos;t have an account?</span>
          <a href="/signup" className="underline underline-offset-2">
            Signup
          </a>
        </div>

        <InputSection
          title="Email"
          placeholder="m@example.com"
          type="email"
          onChange={handleEmailChange}
        />

        <InputSection
          title="Password"
          placeholder="Enter your Password"
          type="password"
          onChange={handlePasswordChange}
        />

        <button
          className="w-full bg-black text-white p-2 rounded-md mt-5 hover:bg-gray-800 transition"
          onClick={sendRequest}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};
