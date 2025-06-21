import React, { useEffect, useState } from "react";
import axios from "axios";
import licensebg from "../assets/DJING/licensebg.webp";
import Unlockimg from "../assets/DJING/Unlockimg.webp";
import whocanbecomemem from "../assets/DJING/whocanbecomemem.webp";
import { Helmet } from "react-helmet-async";
import { FileText, Lock, Users, Briefcase, Globe, User } from "lucide-react";

const benefits = [
  {
    icon: FileText,
    title: "Govt-Recognized DJ License",
    description:
      "Get officially certified to perform at clubs, weddings, and events with verified credentials.",
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
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const res = await axios.get("/api/license/");
        const rawPlans = res.data.data || res.data.message || [];

        const formatted = rawPlans.map((item) => ({
          id: item._id,
          title: item.license_name,
          price: `₹ ${item.price}`,
          description: item.description,
          duration: item.duration,
        }));

        setPlans(formatted);
      } catch (error) {
        console.error("Error fetching licenses:", error);
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLicenses();
  }, []);

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
      <section className="relative w-full h-screen bg-black overflow-hidden font-inter">
        <img
          src={licensebg}
          alt="DJ licensing background"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/1920x1080";
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
              DJs. Get legally compliant and unlock exclusive gig opportunities
              through verified certification.
            </p>
            <button className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-700">
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

          {loading ? (
            <p className="text-lg text-gray-500">Loading plans...</p>
          ) : plans.length === 0 ? (
            <p className="text-lg text-red-500">No plans available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="rounded-2xl overflow-hidden border border-[#ececec] shadow-lg bg-white flex flex-col transform hover:scale-105 transition-transform duration-300"
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
                      <span className="ml-1 text-base">/{plan.duration}</span>
                    </div>
                  </div>
                  <button className="mt-auto bg-[#F36A1D] text-white text-lg font-semibold py-5 w-full rounded-b-2xl hover:bg-[#d75710] transition-all">
                    JOIN PLAN
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Unlock Opportunities */}
      <section className="bg-[#F6F4EE] py-16 px-4 font-inter min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 w-full">
          <div className="relative w-full max-w-md md:w-1/2 lg:w-2/5">
            <div className="absolute top-0 left-0 w-full h-full bg-[#F36A1D] rounded-lg -rotate-3 transform origin-top-left -translate-x-4 -translate-y-4 shadow-lg" />
            <div className="relative z-10 w-full rounded-lg overflow-hidden shadow-xl">
              <img
                src={Unlockimg}
                alt="DJ Event"
                className="w-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/600x400";
                }}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-3/5 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0D1B39] mb-4">
              Elevate Your Beat <br /> Shape the Future of DJing
            </h2>
            <p className="text-[#5D5D5D] text-base leading-relaxed">
              Join DJFI’s exclusive network. Get certified, attend national
              events, and grow your music career across borders.
            </p>
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="bg-indigo-900 text-white py-20 px-4 font-inter min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Membership Benefits
          </h2>
          <p className="text-lg mb-12">By becoming a member, you’ll enjoy</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="rounded-xl p-8 bg-[#312E81] border border-[#3E4D89] shadow-md flex flex-col items-center text-center
              hover:bg-white hover:text-black transform transition-all duration-300 hover:scale-105 group"
              >
                <benefit.icon
                  className="mb-4 text-white group-hover:text-black"
                  size={48}
                />
                <h4 className="text-xl font-semibold mb-2 group-hover:text-black">
                  {benefit.title}
                </h4>
                <p className="text-base group-hover:text-black">
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
              <h2 className="text-4xl font-bold text-[#0D1B39] mb-6">
                Who Can Become a{" "}
                <span className="text-[#F36A1D]">Licensed Member</span>
              </h2>
              <ul className="text-[#0D1B39] text-left space-y-3 mb-6">
                {[
                  "Independent DJs & Performers",
                  "Event Venues & Clubs",
                  "DJ Equipment Suppliers",
                  "Wedding & Festival Organizers",
                  "Music Producers & Remix Artists",
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-base">
                    <span className="w-2 h-2 bg-[#F36A1D] rounded-full mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-[#5D5D5D]">
                DFI membership is for all involved in the DJ ecosystem — from
                artists to organizers to suppliers.
              </p>
            </div>
            <div className="w-full md:w-1/2 flex justify-end">
              <img
                src={whocanbecomemem}
                alt="Licensed DJ"
                className="max-w-xs md:max-w-sm lg:max-w-md"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PublicLicenses;
