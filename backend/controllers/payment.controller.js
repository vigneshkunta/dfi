// controllers/payment.controller.js

import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";
import { Course } from "../models/course.model.js";
import { License } from "../models/license.model.js";
import { Event } from "../models/event.model.js";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;

    if (!amount || !currency || !receipt) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const options = {
      amount: amount * 100, // amount in paisa
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    type,
    itemId,
    amount,
  } = req.body;

  if (!req.user) {
    return res
      .status(400)
      .json({ success: false, message: "User not authenticated" });
  }

  const userId = req.user._id;

  try {
    // 1. Verify Signature
    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    // 2. Fetch user
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const now = new Date();
    let validUntil;
    let receiptId = razorpay_order_id;

    if (type === "course") {
      // Ensure we await the course lookup
      const course = await Course.findById(itemId);
      if (!course) return res.status(404).json({ message: "Course not found" });

      validUntil = new Date(now);
      validUntil.setDate(validUntil.getDate() + course.duration); // duration is in days

      if (!user.enrolledCourses.includes(itemId)) {
        user.enrolledCourses.push({ course: itemId, validUntil });
      }
    } else if (type === "license") {
      const license = await License.findById(itemId);
      if (!license)
        return res.status(404).json({ message: "License not found" });

      validUntil = new Date();
      if (license.duration === "month")
        validUntil.setMonth(validUntil.getMonth() + 1);
      else if (license.duration === "year")
        validUntil.setFullYear(validUntil.getFullYear() + 1);
      else if (license.duration === "half-year")
        validUntil.setMonth(validUntil.getMonth() + 6);
      else if (license.duration === "quarter")
        validUntil.setMonth(validUntil.getMonth() + 3);
      else if (license.duration === "lifetime") validUntil = null; // lifetime license

      user.purchasedLicenses.push({
        license: license._id,
        validUntil,
        purchasedAt: now,
      });
    } else if (type === "event") {
      const event = await Event.findById(itemId);
      if (!event) return res.status(404).json({ message: "Event not found" });

      validUntil = new Date(event.endDate);
      const ticketId = uuidv4();

      // Make sure event fields are valid
      const ticketHtml = `
        <div>
          <h2>🎟️ ${event.name}</h2>
          <p><strong>Location:</strong> ${event.location.city}, ${
        event.location.country
      }</p>
          <p><strong>Date:</strong> ${new Date(
            event.startDate
          ).toDateString()}</p>
          <p><strong>Time:</strong> ${event.startTime} - ${event.endTime}</p>
          <p><strong>Ticket ID:</strong> ${ticketId}</p>
          <p><strong>Issued To:</strong> ${user.firstName} ${user.lastName}</p>
        </div>
      `;

      user.eventTickets.push({
        event: event._id,
        ticketId,
        issuedAt: now,
        validUntil,
        ticketData: ticketHtml,
      });
    } else {
      return res.status(400).json({ message: "Invalid purchase type" });
    }

    // 3. Save to payment history
    user.paymentHistory.push({
      type,
      item: itemId,
      amount,
      validUntil,
      receiptId,
    });

    await user.save();
    res.status(200).json({
      success: true,
      message: "Payment verified and access granted",
      redirectTo: `/dashboard/purchases`,
    });
  } catch (err) {
    console.error("Payment verification error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
