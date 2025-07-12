import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

// Lazy loaded pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Events = lazy(() => import("./pages/Events"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const PublicCourses = lazy(() => import("./pages/PublicCourses"));
const PublicLicenses = lazy(() => import("./pages/PublicLicenses"));
const PublicBlog = lazy(() => import("./pages/PublicBlog"));

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const EnrolledCourses = lazy(() => import("./pages/EnrolledCourses"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Reviews = lazy(() => import("./pages/Reviews"));
const PurchaseHistory = lazy(() => import("./pages/PurchaseHistory"));

const Licenses = lazy(() => import("./pages/admin/Licenses"));
const Courses = lazy(() => import("./pages/admin/Courses"));
const Event = lazy(() => import("./pages/admin/Events"));
const Blog = lazy(() => import("./pages/admin/Blog"));

const LicensePage = lazy(() => import("./pages/LicensePage"));
const CoursePage = lazy(() => import("./pages/CoursePage"));
const EventPage = lazy(() => import("./pages/EventPage"));

export default function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses" element={<PublicCourses />} />
          <Route path="/licenses" element={<PublicLicenses />} />
          <Route path="/blog" element={<PublicBlog />} />
          <Route path="/license/:id" element={<LicensePage />} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/event/:id" element={<EventPage />} />
          

          {/* Private Routes - General User */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="profile" replace />} />
            <Route
              path="profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="enrolled"
              element={
                <PrivateRoute>
                  <EnrolledCourses />
                </PrivateRoute>
              }
            />
            <Route
              path="wishlist"
              element={
                <PrivateRoute>
                  <Wishlist />
                </PrivateRoute>
              }
            />
            <Route
              path="purchases"
              element={
                <PrivateRoute>
                  <PurchaseHistory />
                </PrivateRoute>
              }
            />

            {/* Admin-only Routes */}
            <Route
              path="admin/licenses"
              element={
                <PrivateRoute adminOnly={true}>
                  <Licenses />
                </PrivateRoute>
              }
            />
            <Route
              path="admin/events"
              element={
                <PrivateRoute adminOnly={true}>
                  <Event />
                </PrivateRoute>
              }
            />
            <Route
              path="admin/courses"
              element={
                <PrivateRoute adminOnly={true}>
                  <Courses />
                </PrivateRoute>
              }
            />
            <Route
              path="admin/blog"
              element={
                <PrivateRoute adminOnly={true}>
                  <Blog />
                </PrivateRoute>
              }
            />
          </Route>

          {/* Catch-All */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}
