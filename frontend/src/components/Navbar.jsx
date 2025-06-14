import React, { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingBag, User, Menu, X, Dumbbell } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Memoized toggle function to prevent unnecessary re-renders
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  // Handle navigation - using React Router's navigate for instant navigation
  const handleNavigation = useCallback(
    (e, path) => {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      navigate(path); // Instant navigation without page reload
    },
    [navigate]
  );

  // NavLink component for better performance
  const NavLink = ({ href, children, onClick, className = "" }) => {
    const isActive = location.pathname === href;
    return (
      <a
        href={href}
        onClick={onClick}
        className={`transition-colors duration-200 focus:outline-none ${
          isActive
            ? "text-[#4E6EF2] font-semibold"
            : "hover:text-[#4E6EF2] text-gray-800"
        } ${className}`}
      >
        {children}
      </a>
    );
  };

  return (
    <header className="flex justify-between items-center px-6 md:px-10 py-4 border-b border-gray-200 bg-white font-medium shadow-sm relative z-50">
      {/* Left Section: Logo + Brand Text */}
      <div
        className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity duration-200"
        onClick={(e) => handleNavigation(e, "/")}
        role="button"
        tabIndex={0}
        aria-label="Go to home page"
        onKeyDown={(e) => e.key === "Enter" && handleNavigation(e, "/")}
      >
        <Dumbbell className="w-8 h-8 text-gray-800" aria-hidden="true" />
        <div className="text-sm leading-tight text-gray-800">
          <span className="block">Fitness Federation</span>
          <span className="block">of India</span>
        </div>
      </div>

      {/* Hamburger Menu Icon (visible on small screens) */}
      <div className="md:hidden flex items-center space-x-4">
        {/* Shopping Bag Icon (visible on small screens alongside hamburger) */}
        <div
          className="relative text-xl text-[#1A1A66] cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label="Shopping Bag with 0 items"
          onKeyDown={(e) => e.key === "Enter" && e.currentTarget.click()}
        >
          <ShoppingBag className="w-6 h-6" />
          <span
            className="absolute -top-2 -right-2 bg-[#1A1A66] text-white rounded-full flex items-center justify-center font-bold"
            style={{
              width: "20px",
              height: "20px",
              fontSize: "10px",
              lineHeight: "1",
            }}
            aria-hidden="true"
          >
            0
          </span>
        </div>
        <button
          onClick={toggleMobileMenu}
          className="text-gray-800 text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Center Section: Desktop Nav Links (hidden on small screens) */}
      <nav
        className="hidden md:block"
        role="navigation"
        aria-label="Main navigation"
      >
        <ul className="flex space-x-6 text-sm">
          <li>
            <NavLink href="/" onClick={(e) => handleNavigation(e, "/")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/about"
              onClick={(e) => handleNavigation(e, "/about")}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/licenses"
              onClick={(e) => handleNavigation(e, "/licenses")}
            >
              Licenses
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/courses"
              onClick={(e) => handleNavigation(e, "/courses")}
            >
              Courses
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/events"
              onClick={(e) => handleNavigation(e, "/events")}
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/contact"
              onClick={(e) => handleNavigation(e, "/contact")}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Right Section: Desktop Icons & Button (hidden on small screens) */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Shopping Bag Icon (desktop) */}
        <div
          className="relative text-xl text-[#1A1A66] cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label="Shopping Bag with 0 items"
          onKeyDown={(e) => e.key === "Enter" && e.currentTarget.click()}
        >
          <ShoppingBag className="w-6 h-6" />
          <span
            className="absolute -top-2 -right-2 bg-[#1A1A66] text-white rounded-full flex items-center justify-center font-bold"
            style={{
              width: "20px",
              height: "20px",
              fontSize: "10px",
              lineHeight: "1",
            }}
            aria-hidden="true"
          >
            0
          </span>
        </div>

        {/* Enroll Now Button (desktop) */}
        <button
          className="
            bg-[#4E6EF2] hover:bg-[#3A57D8]
            text-white text-sm
            px-5 py-2.5 rounded-lg
            shadow-md
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[#4E6EF2] focus:ring-opacity-50
            whitespace-nowrap
          "
          onClick={(e) => handleNavigation(e, "/enroll")}
        >
          Enroll Now
        </button>

        {/* User Profile Icon (desktop) */}
        <NavLink
          href="/profile"
          onClick={(e) => handleNavigation(e, "/profile")}
          className="
            w-10 h-10 
            bg-gray-100 hover:bg-gray-200 
            rounded-full 
            flex items-center justify-center
            focus:outline-none
            transition-all duration-200
            no-underline
          "
          aria-label="User Profile"
        >
          <User className="w-5 h-5 text-gray-600" />
        </NavLink>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Mobile Menu Overlay */}
          <div
            className="fixed inset-0 bg-white z-40 flex flex-col items-center py-8 md:hidden"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            {/* Close button for mobile menu */}
            <div className="w-full flex justify-end px-6">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-800 text-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded"
                aria-label="Close menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Mobile navigation links */}
            <nav
              className="flex flex-col items-center space-y-6 mt-8 text-lg"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <NavLink href="/" onClick={(e) => handleNavigation(e, "/")}>
                Home
              </NavLink>
              <NavLink
                href="/about"
                onClick={(e) => handleNavigation(e, "/about")}
              >
                About
              </NavLink>
              <NavLink
                href="/licenses"
                onClick={(e) => handleNavigation(e, "/licenses")}
              >
                Licenses
              </NavLink>
              <NavLink
                href="/courses"
                onClick={(e) => handleNavigation(e, "/courses")}
              >
                Courses
              </NavLink>
              <NavLink
                href="/events"
                onClick={(e) => handleNavigation(e, "/events")}
              >
                Events
              </NavLink>
              <NavLink
                href="/contact"
                onClick={(e) => handleNavigation(e, "/contact")}
              >
                Contact
              </NavLink>

              {/* Mobile-specific Enroll Now button */}
              <button
                className="
                  bg-[#4E6EF2] hover:bg-[#5169F1]
                  text-white text-base
                  px-6 py-3 rounded-lg
                  shadow-md mt-6
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-[#4E6EF2] focus:ring-opacity-50
                  w-full max-w-xs
                "
                onClick={(e) => handleNavigation(e, "/enroll")}
              >
                Enroll Now
              </button>

              {/* Mobile-specific User Icon */}
              <NavLink
                href="/profile"
                onClick={(e) => handleNavigation(e, "/profile")}
                className="
                  w-12 h-12 
                  bg-gray-100 hover:bg-gray-200 
                  rounded-full 
                  flex items-center justify-center
                  mt-4 
                  focus:outline-none
                  transition-all duration-200
                  no-underline
                "
                aria-label="User Profile"
              >
                <User className="w-6 h-6 text-gray-600" />
              </NavLink>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
