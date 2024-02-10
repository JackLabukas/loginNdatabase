"use client";

import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handled submit");
  };
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="p-2">
          <div>Username:</div>
          <input
            className="rounded-xl p-2"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>

        <label className="p-2">
          <div>Password:</div>
          <input
            className="rounded-xl p-2"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>

        <button
          className="p-2 rounded-xl   text-red-700 bg-slate-200 hover:bg-orange-500 hover:text-white"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
