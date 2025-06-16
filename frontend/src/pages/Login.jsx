// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulated login logic
    if (form.email === "admin@example.com" && form.password === "admin") {
      localStorage.setItem("token", "your_token_here");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Hi, Welcome!
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-600 font-medium">
            Register Now
          </a>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Username or Email Address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Username or Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 cursor-pointer text-gray-400 hover:text-gray-700"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-sm text-gray-600">Save account</span>
            </label>
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
