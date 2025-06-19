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
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/user/userSlice";

export default function Dashboard() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user.currentUser);

  const fullName = `${currentUser?.data?.firstName || ""} ${
    currentUser?.data?.lastName || ""
  }`;
  const profilePic = currentUser?.data?.profilePic;

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
    { label: "Logout", icon: <LogOut /> },
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

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleNavClick = (e, item) => {
    if (item.label === "Logout") {
      e.preventDefault();
      handleLogout();
    }
  };

  const activeCourses = currentUser?.data?.activeCourses?.length || 0;
  const enrolledCourses = currentUser?.data?.enrolledCourses?.length || 0;
  const completedCourses = currentUser?.data?.completedCourses?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-indigo-50">
      <section className="relative h-72 sm:h-80 lg:h-96 rounded-b-[3rem] shadow-xl overflow-hidden flex items-center justify-center bg-[#3A57D8]">
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="z-10 text-center text-white px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2">
            {fullName || "Welcome"}
          </h1>
          <p className="text-base sm:text-lg opacity-90">
            Personalized dashboard
          </p>
        </div>
      </section>

      <div className="relative z-30 -mt-16 flex justify-center">
        <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <User className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-indigo-500" />
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 sm:px-6 py-24">
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
                  onClick={(e) => handleNavClick(e, item)}
                />
              ))}
            </div>
          </div>

          {currentUser?.data?.isAdmin && (
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

        <main className="flex-1 w-full">
          {location.pathname === "/dashboard" ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCard
                label="Active Courses"
                count={activeCourses}
                icon={<GraduationCap />}
                color="bg-violet-100"
              />
              <StatCard
                label="Enrolled Courses"
                count={enrolledCourses}
                icon={<BookOpen />}
                color="bg-orange-100"
              />
              <StatCard
                label="Completed Courses"
                count={completedCourses}
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

function SidebarLink({ label, icon, path, activePath, onClick }) {
  const isActive = activePath === path;
  return (
    <Link
      to={path}
      onClick={onClick}
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
