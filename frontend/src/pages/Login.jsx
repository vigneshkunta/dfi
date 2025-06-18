import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  loginUser,
} from "../redux/user/userSlice";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", variant: "" });

  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showToast = (message, variant = "danger") => {
    setToast({ show: true, message, variant });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      showToast("Please fill all fields", "danger");
      return;
    }

    try {
      dispatch(signInStart());

      const resultAction = await dispatch(
        loginUser({
          usernameOrEmail: form.email.trim(),
          password: form.password.trim(),
        })
      );

      if (loginUser.rejected.match(resultAction)) {
        showToast(resultAction.payload || resultAction.error.message, "danger");
        dispatch(signInFailure(resultAction.payload));
      } else {
        showToast("Login successful", "success");
        dispatch(signInSuccess(resultAction.payload));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      showToast(error.message, "danger");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      {toast.show && (
        <div
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-md text-white ${
            toast.variant === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Hi, Welcome!
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Don’t have an account?{" "}
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
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Username or Email Address"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Password"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 cursor-pointer text-gray-400 hover:text-gray-700 select-none"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
