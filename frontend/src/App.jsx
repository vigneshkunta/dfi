import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

// Lazy loaded public pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Events = lazy(() => import("./pages/Events"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const PublicCourses = lazy(() => import("./pages/PublicCourses")); // Public version of courses
const PublicLicenses = lazy(() => import("./pages/PublicLicenses")); // Optional
const PublicBlog = lazy(() => import("./pages/PublicBlog")); // Optional

// Lazy loaded user dashboard pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const EnrolledCourses = lazy(() => import("./pages/EnrolledCourses"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Reviews = lazy(() => import("./pages/Reviews"));
const OrderHistory = lazy(() => import("./pages/OrderHistory"));

// Lazy loaded admin dashboard pages
const Licenses = lazy(() => import("./pages/admin/Licenses"));
const Courses = lazy(() => import("./pages/admin/Courses"));
const Event = lazy(() => import("./pages/admin/Events"));
const Blog = lazy(() => import("./pages/admin/Blog"));

export default function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
        <Routes>
          {/* ===================== Public Routes ===================== */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses" element={<PublicCourses />} />
          <Route path="/licenses" element={<PublicLicenses />} />{" "}
          {/* Optional */}
          <Route path="/blog" element={<PublicBlog />} /> {/* Optional */}
          {/* ===================== Private Dashboard Routes ===================== */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="profile" />} />
            <Route path="profile" element={<Profile />} />
            <Route path="enrolled" element={<EnrolledCourses />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="orders" element={<OrderHistory />} />

            {/* ============ Admin Routes (Nested inside Dashboard) ============ */}
            <Route path="admin" element={<AdminRoute />}>
              <Route path="licenses" element={<Licenses />} />
              <Route path="events" element={<Event />} />
              <Route path="courses" element={<Courses />} />
              <Route path="blog" element={<Blog />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}
