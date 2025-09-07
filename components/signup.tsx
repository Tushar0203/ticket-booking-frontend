"use client";
import { useCallback, useState } from "react";
import { InputSection } from "./inputSection";
import { useRouter } from "next/navigation";

export const SignUp = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    []
  );

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
      const response = await fetch("api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log(data);
        console.log(data.token);
        localStorage.setItem("token", data.token);
        router.push("/bookings");
      } else {
        alert("Signup failed: " + data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-xl shadow p-6 flex flex-col items-center">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
          Create an account
        </div>

        <div className="text-sm sm:text-base text-slate-600 flex mt-2 flex-wrap justify-center">
          <span className="mr-1">Already have an account?</span>
          <a href="/signin" className="underline underline-offset-2">
            Login
          </a>
        </div>

        <InputSection
          title="Username"
          placeholder="Enter your Username"
          type="text"
          onChange={handleNameChange}
        />
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
          Sign Up
        </button>
      </div>
    </div>
  );
};
