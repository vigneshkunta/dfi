import React, { useState, useCallback, useEffect } from "react";
import {
  NavLink as RouterNavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingBag, User, Menu, X, Dumbbell } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = useSelector((state) => state.user.currentUser);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleNavigation = useCallback(
    (e, path) => {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      navigate(path);
    },
    [navigate]
  );

  const handleProfileClick = useCallback(
    (e) => {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      currentUser ? navigate("/dashboard") : navigate("/login");
    },
    [currentUser, navigate]
  );

  // Detect scroll for glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Custom NavLink component with styling
  const NavLink = ({ to, children, onClick, className = "" }) => {
    const isActive = location.pathname === to;
    return (
      <RouterNavLink
        to={to}
        onClick={onClick}
        className={`transition-colors duration-200 font-semibold ${
          isActive ? "text-[#4E6EF2]" : "hover:text-[#4E6EF2] text-gray-800"
        } ${className}`}
      >
        {children}
      </RouterNavLink>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-md shadow-md"
          : "bg-white shadow-sm"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-10 py-4 border-b border-gray-200 font-medium">
        <div
          className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity duration-200"
          onClick={(e) => handleNavigation(e, "/")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleNavigation(e, "/")}
        >
          <Dumbbell className="w-8 h-8 text-gray-800" />
          <div className="text-sm leading-tight text-gray-800">
            <span className="block font-semibold">Djing Federation</span>
            <span className="block font-semibold">of India</span>
          </div>
        </div>

        <div className="md:hidden flex items-center space-x-4">
          <div className="relative text-xl text-[#1A1A66] cursor-pointer">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-[#1A1A66] text-white rounded-full w-5 h-5 text-[10px] flex items-center justify-center font-bold">
              0
            </span>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="text-gray-800 text-2xl focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <nav className="hidden md:block" role="navigation">
          <ul className="flex space-x-6 text-sm">
            {[
              "/",
              "/about",
              "/licenses",
              "/courses",
              "/events",
              "/contact",
            ].map((path, idx) => {
              const names = [
                "Home",
                "About",
                "Licenses",
                "Courses",
                "Events",
                "Contact",
              ];
              return (
                <li key={path}>
                  <NavLink to={path} onClick={(e) => handleNavigation(e, path)}>
                    {names[idx]}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <div className="relative text-xl text-[#1A1A66] cursor-pointer">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-[#1A1A66] text-white rounded-full w-5 h-5 text-[10px] flex items-center justify-center font-bold">
              0
            </span>
          </div>

          <button
            className="bg-[#4E6EF2] hover:bg-[#3A57D8] text-white text-sm px-5 py-2.5 rounded-lg shadow-md"
            onClick={(e) => handleNavigation(e, "/enroll")}
          >
            Enroll Now
          </button>

          <RouterNavLink
            to="/profile"
            onClick={handleProfileClick}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition"
          >
            <User className="w-5 h-5 text-gray-600" />
          </RouterNavLink>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-white z-40 flex flex-col items-center py-8 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full flex justify-end px-6">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-800 text-3xl"
              aria-label="Close menu"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          <nav className="flex flex-col items-center space-y-6 mt-8 text-lg">
            {[
              "/",
              "/about",
              "/licenses",
              "/courses",
              "/events",
              "/contact",
            ].map((path, idx) => {
              const names = [
                "Home",
                "About",
                "Licenses",
                "Courses",
                "Events",
                "Contact",
              ];
              return (
                <NavLink
                  key={path}
                  to={path}
                  onClick={(e) => handleNavigation(e, path)}
                >
                  {names[idx]}
                </NavLink>
              );
            })}

            <button
              className="bg-[#4E6EF2] hover:bg-[#5169F1] text-white text-base px-6 py-3 rounded-lg shadow-md mt-6 w-full max-w-xs"
              onClick={(e) => handleNavigation(e, "/enroll")}
            >
              Enroll Now
            </button>

            <RouterNavLink
              to="/profile"
              onClick={handleProfileClick}
              className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center mt-4"
            >
              <User className="w-6 h-6 text-gray-600" />
            </RouterNavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
