import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { fetchCurrentUser } from "../redux/user/userSlice";

export default function EventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/event/${id}`);
        const data = await res.json();

        if (data.success) {
          setEvent(data.data);
        } else {
          throw new Error("Event not found");
        }
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to fetch event details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handlePayment = async () => {
    const amount = event.price || 499;
    const receipt = `receipt_event_${id.slice(-5)}_${Date.now().toString().slice(-10)}`;

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

      if (data.success) {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: data.order.amount,
          currency: "INR",
          name: "DFI_OFFICIAL",
          description: event.name,
          order_id: data.order.id,
          handler: async (response) => {
            try {
              const verifyRes = await axios.post(
                "/api/payment/verify",
                {
                  ...response,
                  type: "event",
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
                alert("Payment verification failed. Please try again.");
              }
            } catch (error) {
              console.error("Payment verification failed:", error);
              if (error.response) {
                alert(`Error: ${error.response.data.message}`);
              } else {
                alert(
                  "An unexpected error occurred during payment verification."
                );
              }
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
      } else {
        throw new Error("Failed to create payment order");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading event details...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  if (!event) {
    return <p className="text-center mt-10">Event not found.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={event.image}
        alt={event.name}
        className="rounded mb-4 w-full h-64 object-cover"
      />
      <h2 className="text-3xl font-bold mb-2">{event.name}</h2>
      <p className="text-gray-600 mb-2">{event.description}</p>

      {event.location && (
        <p className="text-gray-500 mb-2">
          📍 {event.location.city}, {event.location.country}
        </p>
      )}

      <p className="text-gray-500 mb-2">
        🗓 {new Date(event.startDate).toLocaleDateString()} -{" "}
        {new Date(event.endDate).toLocaleDateString()}
      </p>
      <p className="text-gray-500 mb-2">
        🕒 {event.startTime} - {event.endTime}
      </p>

      <p className="text-lg font-semibold mb-4">Price: ₹{event.price}</p>

      {currentUser ? (
        <button
          onClick={handlePayment}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow"
        >
          Buy Ticket
        </button>
      ) : (
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow"
        >
          Login in to buy
        </button>
      )}
    </div>
  );
}