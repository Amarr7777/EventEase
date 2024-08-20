import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errTextStyle, setErrTextStyle] = useState("");
  const [errInputStyle, setErrInputStyle] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (email.length <= 0) {
      setError("Please enter your email address");
      setErrTextStyle("text-red-500");
      setErrInputStyle("border border-red-500");
      return;
    }

    if (!email.match(emailRegex)) {
      setError("Invalid email address");
      setErrTextStyle("text-red-500");
      setErrInputStyle("border border-red-500");
      return;
    }

    if (password.length <= 0) {
      setError("Please enter your password");
      setErrTextStyle("text-red-500");
      setErrInputStyle("border border-red-500");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/users/auth/login", {
        email,
        password,
      });

      if (response.data.status === "success") {
        localStorage.setItem("authToken", response.data.token);
        alert("Login successful!");
        navigate('/dashboard');
      }
    } catch (err) {
      console.log(err)
      setError("Login failed. Please check your credentials.");
      setErrTextStyle("text-red-500");
      setErrInputStyle("border border-red-500");
    }
  };

  useEffect(
    () => {
      if (localStorage.getItem("authToken")) {
        navigate("/dashboard");
      }
    },[]
  )

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form
        className="flex flex-col gap-5 p-16 shadow-xl rounded-lg bg-slate-100 max-h-full max-w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label className={`${errTextStyle}`}>Email</label>
          <input
            type="email"
            placeholder="email"
            className={`px-2 py-2 rounded-md ${errInputStyle}`}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrTextStyle("");
              setErrInputStyle("");
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className={`${errTextStyle}`}>Password</label>
          <input
            type="password"
            placeholder="password"
            className={`px-2 py-2 rounded-md ${errInputStyle}`}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrTextStyle("");
              setErrInputStyle("");
            }}
          />
        </div>
        <div className="h-6 w-96">
          {error && <p className={`text-red-500`}>{error}</p>}
        </div>
        <p>
          Don't have an account?{" "}
          <span
            onClick={() => setLogin(false)}
            className="text-blue-400 cursor-pointer"
          >
            Register
          </span>
        </p>
        <button type="submit" className="bg-white rounded-full py-2 mx-5">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
