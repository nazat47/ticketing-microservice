"use client";
import { useRequest } from "@/hooks/use-request";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignupPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => router.push("/"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await doRequest();
  };

  return (
    <form className="space-y-3 p-4" onSubmit={handleSubmit}>
      <h1 className="font-semibold text-3xl">Sign up</h1>
      <div className="text-sm">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-200 rounded"
        />
      </div>
      <div className="">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="w-full p-2 border border-gray-200 rounded"
        />
      </div>
      {errors}
      <button className="text-white py-2 px-4 bg-blue-600 rounded">
        Sign up
      </button>
    </form>
  );
};

export default SignupPage;
