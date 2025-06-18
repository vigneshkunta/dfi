import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", variant: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const showToast = (message, variant = "info") => {
    setToast({ show: true, message, variant });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, username, email, password, confirmPassword } =
      formData;

    const trimmed = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      confirmPassword: formData.confirmPassword.trim(),
    };

    if (
      !trimmed.firstName ||
      !trimmed.lastName ||
      !trimmed.username ||
      !trimmed.email ||
      !trimmed.password ||
      !trimmed.confirmPassword
    ) {
      return showToast("Please fill in all fields", "danger");
    }

    if (!validateEmail(trimmed.email)) {
      return showToast("Please enter a valid email address", "danger");
    }

    if (trimmed.password !== trimmed.confirmPassword) {
      return showToast("Passwords do not match", "danger");
    }

    try {
      setLoading(true);

      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: trimmed.firstName,
          lastName: trimmed.lastName,
          username: trimmed.username,
          email: trimmed.email,
          password: trimmed.password,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok || data.success === false) {
        return showToast(data.message || "Something went wrong", "danger");
      }

      showToast("Signup successful!", "success");
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setLoading(false);
      showToast(err.message || "Server error", "danger");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4 relative">
      {toast.show && (
        <div
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-md text-white ${
            toast.variant === "success"
              ? "bg-green-600"
              : toast.variant === "danger"
              ? "bg-red-600"
              : "bg-gray-800"
          }`}
        >
          {toast.message}
        </div>
      )}

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
              htmlFor="username"
              className="block font-semibold text-gray-800 mb-1"
            >
              User Name
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="User Name"
              value={formData.username}
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
            Password Confirmation
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
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
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </main>
  );
};

export default Signup;
