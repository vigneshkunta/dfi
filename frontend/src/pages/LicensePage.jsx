import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { fetchCurrentUser } from "../redux/user/userSlice";

export default function LicensePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [license, setLicense] = useState(null);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchLicense = async () => {
      try {
        const res = await fetch(`/api/license/${id}`);
        const data = await res.json();
        setLicense(data.data);
      } catch (err) {
        console.error("Error fetching license:", err);
      }
    };
    fetchLicense();
  }, [id]);

  const handlePayment = async () => {
    const amount = license.price || 999;
    const receipt = `receipt_license_${id.slice(-5)}_${Date.now().toString().slice(-10)}`;

    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please try again.");
      console.error("Razorpay SDK not loaded.");
      return;
    }

    try {
      const { data } = await axios.post("/api/payment/create-order", {
        amount,
        currency: "INR",
        receipt,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "DFI_OFFICIAL",
        description: license.license_name,
        order_id: data.order.id,
        handler: async (response) => {
          try {
            const verifyRes = await axios.post(
              "/api/payment/verify",
              {
                ...response,
                type: "license",
                itemId: id,
                amount,
              },
              {
                headers: {
                  Authorization: `Bearer ${currentUser?.data?.token}`,
                },
                withCredentials: true,
              }
            );

            if (verifyRes.data.success) {
              await dispatch(fetchCurrentUser());
              navigate(verifyRes.data.redirectTo);
            } else {
              alert("Payment verification failed.");
              console.error("Payment verification failed:", verifyRes.data);
            }
          } catch (verifyErr) {
            console.error("Payment verification error:", verifyErr);
            alert("Payment verification failed due to an error.");
          }
        },
        prefill: {
          name: `${currentUser?.data?.firstName || ""} ${
            currentUser?.data?.lastName || ""
          }`,
          email: currentUser?.data?.email || "",
        },
        theme: { color: "#3A57D8" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Please try again.");
    }
  };

  if (!license)
    return <p className="text-center mt-10">Loading License details...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-2">{license.license_name}</h2>
      <p className="text-gray-600 mb-2">Duration: {license.duration}</p>
      <p className="text-gray-700 mb-4">{license.description}</p>

      <p className="text-lg font-semibold text-green-600 mb-4">
        Price: ₹{license.price}
      </p>

      <button
        onClick={handlePayment}
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow mt-4"
      >
        Enroll Now
      </button>

      <div className="text-sm text-gray-500 mt-6">
        <p>Created At: {new Date(license.createdAt).toLocaleDateString()}</p>
        <p>Last Updated: {new Date(license.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}