import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ Add your backend logic here
    console.log("Form Data Submitted:", formData);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-8 rounded-3xl shadow-xl bg-white"
        aria-label="Register Form"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block font-semibold text-gray-800 mb-1"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block font-semibold text-gray-800 mb-1"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="userName"
              className="block font-semibold text-gray-800 mb-1"
            >
              User Name
            </label>
            <input
              id="userName"
              name="userName"
              type="text"
              placeholder="User Name"
              value={formData.userName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block font-semibold text-gray-800 mb-1"
            >
              E-Mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="E-Mail"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="password"
            className="block font-semibold text-gray-800 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="confirmPassword"
            className="block font-semibold text-gray-800 mb-1"
          >
            Password confirmation
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Password Confirmation"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <p className="mt-4 text-sm text-gray-600">
          By signing up, I agree with the website’s{" "}
          <a href="/terms" className="text-blue-600 underline">
            Terms and Conditions
          </a>
        </p>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </main>
  );
};

export default Signup;
