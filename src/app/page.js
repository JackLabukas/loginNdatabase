"use client";
import React, { useState } from "react";
export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      alert("Passwords do not match");
      return;
    }
    // Perform login logic here
    const user = {
      username: username,
      password: password,
    };

    // Send a POST request to your API
    fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response here
        console.log(data);
        if (data.message === "User registered successfully") {
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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

        <label className="p-2">
          <div>Confirm password:</div>
          <input
            className="rounded-xl p-2"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </label>

        <button
          className="p-2 rounded-xl   text-red-700 bg-slate-200 hover:bg-orange-500 hover:text-white"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}
