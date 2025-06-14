import React from "react";
import { NavLink } from "react-router-dom";
import { Phone, Mail, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-orange-500 rounded-lg p-2 mr-3 flex items-center justify-center min-w-[40px] h-10">
                <span className="text-white font-bold text-lg">ffi</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Fitness Federation</h3>
                <p className="text-lg text-gray-200">of India</p>
              </div>
            </div>
            <p className="text-gray-100 leading-relaxed max-w-md">
              The Fitness Federation of India (FFI) was established with a
              mission to revolutionize the fitness industry by providing
              support, recognition, and professional development to trainers,
              gym owners, educators, and businesses.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Explore</h4>
            <nav>
              <ul className="space-y-3">
                <li>
                  <NavLink
                    to="/about"
                    className="text-gray-100 hover:text-white hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent rounded px-1 py-1"
                    aria-label="Learn more about us"
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/courses"
                    className="text-gray-100 hover:text-white hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent rounded px-1 py-1"
                    aria-label="View our courses"
                  >
                    Courses
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/licenses"
                    className="text-gray-100 hover:text-white hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent rounded px-1 py-1"
                    aria-label="Information about licenses"
                  >
                    Licenses
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/events"
                    className="text-gray-100 hover:text-white hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent rounded px-1 py-1"
                    aria-label="Upcoming events"
                  >
                    Events
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className="text-gray-100 hover:text-white hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent rounded px-1 py-1"
                    aria-label="Contact us"
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-semibold mb-6">
              Got Questions? Contact us
            </h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0" />
                <a
                  href="tel:+918856042808"
                  className="text-gray-100 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent rounded px-1 py-1"
                >
                  +91 88560 42808
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0" />
                <a
                  href="mailto:info@fitnessfederation.in"
                  className="text-gray-100 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent rounded px-1 py-1 break-all"
                >
                  info@Djingfederation.in
                </a>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="mt-6">
              <h5 className="text-lg font-medium mb-3">Follow Us</h5>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/fitnessfederationindia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white bg-opacity-10 hover:bg-opacity-20 p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/company/fitness-federation-india"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white bg-opacity-10 hover:bg-opacity-20 p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com/@fitnessfederationindia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white bg-opacity-10 hover:bg-opacity-20 p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white border-opacity-20 mt-8 pt-6 text-center">
          <p className="text-gray-200 text-sm">
            © 2025 Djing Federation of India. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
