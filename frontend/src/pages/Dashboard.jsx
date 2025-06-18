import React from "react";
import {
  User,
  GraduationCap,
  BookOpen,
  ShoppingBag,
  LogOut,
  FileText,
  CalendarDays,
  Layers,
  Newspaper,
  Trophy,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Link, useLocation, Outlet } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", icon: <User />, path: "/dashboard" },
    { label: "My Profile", icon: <User />, path: "/dashboard/profile" },
    {
      label: "Enrolled Courses",
      icon: <GraduationCap />,
      path: "/dashboard/enrolled",
    },
    { label: "Wishlist", icon: <BookOpen />, path: "/dashboard/wishlist" },
    {
      label: "Order History",
      icon: <ShoppingBag />,
      path: "/dashboard/orders",
    },
    { label: "Logout", icon: <LogOut />, path: "/logout" },
  ];

  const adminItems = [
    {
      label: "Licenses",
      icon: <FileText />,
      path: "/dashboard/admin/licenses",
    },
    {
      label: "Events",
      icon: <CalendarDays />,
      path: "/dashboard/admin/events",
    },
    { label: "Courses", icon: <Layers />, path: "/dashboard/admin/courses" },
    { label: "Blog", icon: <Newspaper />, path: "/dashboard/admin/blog" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-indigo-50">
      {/* Cover Section */}
      {/* Cover Section */}
      <section className="relative h-72 sm:h-80 lg:h-96 rounded-b-[3rem] shadow-xl overflow-hidden flex items-center justify-center bg-[#3A57D8]">
        {/* Background Image with dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/path-to-your-background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />
        <div className="absolute inset-0 bg-black/40 z-0" />{" "}
        {/* Overlay layer */}
        {/* Content */}
        <div className="z-10 text-center text-white px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2">
            Madhav
          </h1>
          <p className="text-base sm:text-lg opacity-90">
            Personalized dashboard
          </p>
        </div>
      </section>

      {/* User Icon Bubble */}
      <div className="relative z-30 -mt-16 flex justify-center">
        <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
          <User className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-indigo-500" />
        </div>
      </div>

      {/* Layout Section */}
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 sm:px-6 py-24">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 bg-white rounded-3xl shadow p-6 space-y-8">
          <div>
            <h2 className="text-xs uppercase tracking-wide text-gray-400 font-bold mb-4">
              Welcome
            </h2>
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <SidebarLink
                  key={index}
                  {...item}
                  activePath={location.pathname}
                />
              ))}
            </div>
          </div>

          {user?.role === "admin" && (
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xs uppercase tracking-wide text-gray-400 font-bold mb-4">
                Admin
              </h2>
              <div className="space-y-2">
                {adminItems.map((item, index) => (
                  <SidebarLink
                    key={index}
                    {...item}
                    activePath={location.pathname}
                  />
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main Outlet or Dashboard Summary */}
        <main className="flex-1 w-full">
          {location.pathname === "/dashboard" ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCard
                label="Active Courses"
                count={0}
                icon={<GraduationCap />}
                color="bg-violet-100"
              />
              <StatCard
                label="Enrolled Courses"
                count={0}
                icon={<BookOpen />}
                color="bg-orange-100"
              />
              <StatCard
                label="Completed Courses"
                count={0}
                icon={<Trophy />}
                color="bg-blue-100"
              />
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ label, icon, path, activePath }) {
  const isActive = activePath === path;
  return (
    <Link
      to={path}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition duration-200 text-sm sm:text-base ${
        isActive
          ? "bg-indigo-600 text-white shadow"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <span className="w-5 h-5 text-indigo-600">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

function StatCard({ label, count, icon, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow flex items-center justify-between">
      <div>
        <p className="text-2xl font-semibold">{count}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}
      >
        {icon}
      </div>
    </div>
  );
}
