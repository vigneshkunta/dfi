import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { fetchCurrentUser } from "../redux/user/userSlice";

export default function CoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/course/${id}`);
        const data = await res.json();
        setCourse(data.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [id]);

  const handlePayment = async () => {
    const amount = course?.price || 499;
    const receipt = `receipt_course_${id.slice(-5)}_${Date.now().toString().slice(-10)}`;

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
        amount: data?.order?.amount,
        currency: "INR",
        name: "DFI_OFFICIAL",
        description: course?.title || "Course Purchase",
        order_id: data?.order?.id,
        handler: async (response) => {
          try {
            const verify = await axios.post(
              "/api/payment/verify",
              {
                ...response,
                type: "course",
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

            if (verify.data.success) {
              await dispatch(fetchCurrentUser());
              navigate(verify.data.redirectTo);
            } else {
              alert("Verification failed. Please contact support.");
            }
          } catch (err) {
            console.error("Verification failed:", err);
            alert("Something went wrong while verifying payment.");
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

      const razor = new window.Razorpay(options);
      razor.on("payment.failed", function (response) {
        alert("Payment failed. Reason: " + response.error.description);
      });

      razor.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Please try again.");
    }
  };

  if (!course)
    return <p className="text-center mt-10">Loading course details...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={course.image}
        alt={course.title}
        className="rounded mb-4 w-full h-64 object-cover"
      />
      <h2 className="text-3xl font-bold mb-2">{course.title}</h2>
      <p className="text-gray-600 mb-2">📂 Category: {course.category}</p>
      <p className="text-gray-700 mb-4">{course.about}</p>
      <p className="text-sm mb-4">
        <strong>🎯 Objective:</strong> {course.objective}
      </p>
      <p className="text-lg font-semibold mb-4">
        Price: ₹{course.price || 499}
      </p>

      <button
        onClick={handlePayment}
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow"
      >
        Enroll Now
      </button>
    </div>
  );
}