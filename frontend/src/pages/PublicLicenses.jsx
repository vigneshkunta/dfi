import React from "react";
import licensebg from "../assets/DJING/licensebg.webp";
import Unlockimg from "../assets/DJING/Unlockimg.webp";
import whocanbecomemem from "../assets/DJING/whocanbecomemem.webp";
import { Helmet } from "react-helmet-async";
import {
  FileText,
  Lock,
  Users,
  Briefcase,
  Globe,
  User,
  Unlock,
} from "lucide-react";

const plans = [
  {
    title: "Independent DJs",
    price: "₹ 99",
    id: "independent-djs",
  },
  {
    title: "Event Venues",
    price: "₹ 999",
    id: "event-venues",
  },
  {
    title: "Equipment Suppliers",
    price: "₹ 4999",
    id: "equipment-suppliers",
  },
];

const benefits = [
  {
    icon: FileText,
    title: "Govt-Recognized DJ License",
    description:
      "Get oDFIcially certified to perform at clubs, weddings, and events with verified credentials.",
  },
  {
    icon: Lock,
    title: "Legal Assistance & Support",
    description:
      "Facing disputes or copyright claims? Get access to legal support for DJ-related concerns.",
  },
  {
    icon: Users,
    title: "National DJ Meetups & Collabs",
    description:
      "Join networking events and exclusive DJ meetups to collaborate and grow together.",
  },
  {
    icon: Briefcase,
    title: "Access to Premium Gigs",
    description:
      "Get listed in our national DJ directory and unlock high-paying performance opportunities.",
  },
  {
    icon: Globe,
    title: "International Exposure",
    description:
      "Participate in global DJ contests and access pathways to perform abroad legally.",
  },
  {
    icon: User,
    title: "Personal DJ Dashboard",
    description:
      "Track your license, renewals, gigs, collaborations, and performance metrics in one place.",
  },
];

const PublicLicenses = () => {
  return (
    <>
      <Helmet>
        <title>ODFIcial DJ License - DJ Federation of India</title>
        <meta
          name="description"
          content="Get your government-recognized DJ license, access legal support, premium gigs, and join India's elite DJ network with DJFI."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Hero Section */}
      <section
        className="relative w-full h-screen bg-black overflow-hidden font-inter"
        aria-label="DJ Federation License Banner"
      >
        <img
          src={licensebg}
          alt="Background representing DJ licensing"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchpriority="high"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/1920x1080/000000/FFFFFF?text=Image+Fallback";
          }}
        />
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="relative z-10 flex items-center justify-start h-full px-4 sm:px-6 md:px-20">
          <div data-aos="fade-right" className="max-w-2xl">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg">
              ODFIcial DJ License
            </h1>
            <div className="h-2 w-32 sm:w-40 bg-pink-500 mt-3 rounded-full" />
            <p className="mt-6 text-white text-base sm:text-lg leading-relaxed drop-shadow-md">
              The <strong>DJing Federation of India (DJFI)</strong> offers
              nationally recognized DJ licenses for aspiring and professional
              DJs across the country. Whether you're spinning at clubs,
              weddings, festivals, or private events—this license ensures you're
              performance-ready and legally compliant.
              <br />
              <br />
              Becoming licensed enhances your industry credibility, opens up
              exclusive gig opportunities, and connects you with the elite DJ
              community shaping the future of Indian nightlife.
            </p>
            <button
              className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Apply for DJ License"
            >
              Apply for License
            </button>
          </div>
        </div>
      </section>

      {/* License Plans */}
      <section className="bg-[#F6F4EE] text-center py-20 px-4 font-inter min-h-[70vh] flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-base uppercase tracking-widest text-[#5D5D5D] mb-3">
            LICENSE PLAN
          </h2>
          <h3 className="text-5xl md:text-6xl font-bold text-[#0D1B39] mb-5">
            Get Your License
          </h3>
          <p className="text-[#5D5D5D] text-lg mb-16">
            All offers valid until 15th June, 2025.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="rounded-2xl overflow-hidden border border-[#ececec] shadow-lg bg-white flex flex-col transform hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <div className="bg-[#EEF7DB] p-10 flex flex-col items-center rounded-t-2xl">
                  <h4 className="text-2xl font-medium text-[#0D1B39] mb-5">
                    {plan.title}
                  </h4>
                  <div className="flex items-baseline">
                    <span className="text-3xl mr-1">₹</span>
                    <span className="text-5xl font-bold">
                      {plan.price.replace("₹ ", "")}
                    </span>
                    <span className="ml-1 text-base">/Year</span>
                  </div>
                </div>
                <button className="mt-auto bg-[#F36A1D] text-white text-lg font-semibold py-5 w-full rounded-b-2xl hover:bg-[#d75710] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                  JOIN PLAN
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unlock Opportunities */}
      <section className="bg-[#F6F4EE] py-16 px-4 font-inter min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 w-full">
          <div className="relative w-full max-w-md md:w-1/2 lg:w-2/5">
            <div
              className="absolute top-0 left-0 w-full h-full bg-[#F36A1D] rounded-lg -rotate-3 transform origin-top-left -translate-x-4 -translate-y-4 shadow-lg"
              style={{
                width: "calc(100% + 32px)",
                height: "calc(100% + 32px)",
              }}
            ></div>
            <div className="relative z-10 w-full h-auto rounded-lg overflow-hidden shadow-xl">
              <img
                src={Unlockimg}
                alt="DJ Federation of India event"
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/000000/FFFFFF?text=Image+Fallback";
                }}
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-3/5 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0D1B39] mb-4">
              Elevate Your Beat <br /> Shape the Future of DJing
            </h2>
            <p className="text-[#5D5D5D] text-base leading-relaxed">
              Join the DJing Federation of India (DFI), the country’s leading
              platform for DJs and music professionals. Gain exclusive access to
              nationwide events, training, certification programs, and a dynamic
              community built to amplify your journey in the DJing industry.
            </p>
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="bg-indigo-900 text-white py-20 px-4 font-inter min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Membership Benefits <br className="md:hidden" /> at a Glance
          </h2>
          <p className="text-lg mb-12">By becoming a member, you’ll enjoy</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="rounded-xl p-8 bg-[#312E81] border border-[#3E4D89] shadow-md flex flex-col items-center text-center
                     hover:bg-white hover:text-black transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg group"
              >
                {benefit.icon && (
                  <benefit.icon
                    className="text-white group-hover:text-black mb-4 transition-colors duration-300"
                    size={48}
                  />
                )}
                <h4 className="text-xl font-semibold mb-2 group-hover:text-black transition-colors duration-300">
                  {benefit.title}
                </h4>
                <p className="text-base leading-relaxed group-hover:text-black transition-colors duration-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Become a Licensed Member */}
      <section className="bg-[#F6F4EE] py-16 px-4 font-inter flex items-center justify-center">
        <div className="relative bg-gradient-to-br from-[#F36A1D] to-[#D75710] rounded-[20px] p-[3px] max-w-7xl w-full">
          <div className="bg-[#F6F6F6] rounded-[18px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0D1B39] mb-6 leading-tight">
                Who Can Become a{" "}
                <span className="text-[#0D1B39]">Licensed </span>
                <span className="relative text-[#F36A1D]">
                  Member
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#F36A1D]"></span>
                </span>
              </h2>
              <ul className="text-[#0D1B39] text-left space-y-3 mb-6 mx-auto md:mx-0 max-w-sm">
                {[
                  "Independent DJs & Performers",
                  "Event Venues & Clubs",
                  "DJ Equipment Suppliers",
                  "Wedding & Festival Organizers",
                  "Music Producers & Remix Artists",
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-base">
                    <span className="w-2 h-2 bg-[#F36A1D] rounded-full mr-3 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-[#5D5D5D] text-base leading-relaxed">
                DFI membership is designed for everyone involved in the DJing
                ecosystem. Whether you're spinning the decks or organizing
                events, we’ve got you covered.
              </p>
            </div>
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <img
                src={whocanbecomemem}
                alt="Licensed DJ performing on stage"
                className="w-full max-w-xs md:max-w-sm lg:max-w-md object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PublicLicenses;
