import React, { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css";

import eventBgWebp from "../assets/DJING/event-bg.webp";
import djgroup from "../assets/DJING/dj-group.webp";
import { FaUsers, FaGraduationCap, FaChartLine } from "react-icons/fa";

const EventsCard = lazy(() => import("../components/EventsCard"));

const eventsList = [
  {
    image: "",
    location: "Mumbai, Maharashtra",
    title: "DJ Licensing Bootcamp",
    description:
      "Get oDFIcially certified as a DJ in just one electric day. Includes workshops, mentor sessions, and government-recognized licenses.",
    date: "July 15, 2025",
    button: "GET LICENSED",
  },
  {
    image: "",
    location: "Goa Beach, India",
    title: "Sunset Bass Festival 2025",
    description:
      "A three-day DJ festival with India's top EDM artists. Non-stop music, beach vibes, and high-energy performances!",
    date: "August 23–25, 2025",
    button: "BOOK NOW",
  },
  {
    image: "",
    location: "Delhi NCR",
    title: "Underground Beats Night",
    description:
      "An exclusive underground DJ party for pro members. Networking, new talent showcase, and epic sound drops.",
    date: "September 14, 2025",
    button: "INVITE ONLY",
  },
];

const Events = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Upcoming DJ Events | DJing Federation of India</title>
        <meta
          name="description"
          content="Get licensed, network, and experience India's top DJ events. Bootcamps, festivals, and pro parties hosted by the DJing Federation."
        />
      </Helmet>

      <main className="text-gray-800" role="main">
        {/* Hero Banner */}
        <section
          className="relative w-full h-[400px] sm:h-[500px] md:h-[550px] bg-black"
          aria-label="DJ Federation Banner"
        >
          <img
            src={eventBgWebp}
            alt="Crowd enjoying DJ event"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-black/50 z-0" />
          <div className="relative z-10 flex items-center h-full px-4 sm:px-6 md:px-20">
            <div data-aos="fade-right">
              <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-wide">
                Upcoming DJ Events
              </h1>
              <div className="h-2 w-32 sm:w-40 bg-pink-500 mt-3" />
              <p className="mt-4 text-white text-base sm:text-lg max-w-lg">
                ODFIcial DJ licenses, underground parties, and electrifying
                festivals — all in one federation.
              </p>
            </div>
          </div>
        </section>

        {/* Events List */}
        <section className="px-4 sm:px-6 md:px-20 py-16 bg-[#F6F4EE] text-gray-900">
          <header className="mb-10 text-center md:text-left" data-aos="fade-up">
            <h3 className="text-orange-600 uppercase font-semibold text-sm mb-1">
              Events
            </h3>
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Upcoming <span className="text-orange-500">Events</span>
            </h2>
            <div className="w-20 sm:w-[100px] h-1 bg-black mt-2 mx-auto md:mx-0" />
          </header>

          <Suspense
            fallback={
              <div className="text-center text-gray-500">Loading events...</div>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {eventsList.map((event, index) => (
                <div
                  key={index}
                  data-aos="zoom-in"
                  className="transform transition-transform duration-300 hover:scale-105"
                >
                  <EventsCard {...event} />
                </div>
              ))}
            </div>
          </Suspense>
        </section>

        {/* Promotional Section */}
        <section className="px-4 sm:px-6 md:px-20 py-20 bg-[#F6F4EE] font-['Inter'] ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div
              className="relative flex justify-center md:justify-start"
              data-aos="fade-right"
            >
              <div className="hidden sm:block bg-[#2D2A7B] w-[300px] sm:w-[350px] md:w-[400px] h-[350px] sm:h-[400px] md:h-[450px] rounded-2xl absolute top-0 left-0 z-0" />
              <img
                src={djgroup}
                alt="Group of Djing Federation team members"
                className="relative z-10 rounded-xl object-cover w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] h-auto shadow-lg translate-y-10 sm:translate-y-12 md:translate-y-16"
                loading="lazy"
              />
            </div>

            <div data-aos="fade-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-snug">
                Join Us for the Most Anticipated <br />
                <span className="text-[#2A2B76]">
                  Djing Industry Events of the Year!
                </span>
              </h2>
              <p className="mt-6 text-base sm:text-lg text-gray-700 leading-relaxed">
                The Djing Federation of India (DFI) is proud to host three
                exclusive events designed to bring together trainers, gym
                owners, and licensees for networking, learning, and business
                growth. Held in Goa, these events feature industry leaders,
                expert speakers, and groundbreaking discussions.
              </p>
              <div className="inline-block mt-6 bg-[#2A2B76] text-white px-5 py-3 rounded-full text-sm font-semibold tracking-wide shadow-md animate-bounce">
                20th – 21st December 2025 @Goa, India
              </div>
            </div>
          </div>
        </section>

        {/* Why Attend */}
        <section className="bg-[#F6F4EE] py-20 px-4 sm:px-6 md:px-20 text-center">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
            data-aos="fade-up"
          >
            Why{" "}
            <span className="text-orange-500 relative">
              Attend?
              <span className="absolute left-0 bottom-0 w-full h-1 bg-orange-400 -mb-1 rounded-full animate-pulse" />
            </span>
          </h2>
          <p
            className="text-gray-600 text-base sm:text-lg mb-12"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Don’t miss out on the opportunity to be part of India’s biggest DJ
            industry gathering!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              {
                icon: <FaUsers className="text-red-600 text-3xl" />,
                title: "Unmatched Industry Networking",
                description:
                  "Meet top DJs, producers, event organizers, and music labels.",
              },
              {
                icon: <FaGraduationCap className="text-red-600 text-3xl" />,
                title: "Expert Knowledge & Training",
                description:
                  "Gain insights from renowned DJs, mentors, and sound engineers.",
              },
              {
                icon: <FaChartLine className="text-red-600 text-3xl" />,
                title: "Exclusive Growth Opportunities",
                description:
                  "Level up your DJ career and business through certifications and gigs.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                data-aos="zoom-in-up"
                data-aos-delay={idx * 100}
                className="bg-white rounded-xl shadow-sm p-8 hover:shadow-xl transition-all transform hover:scale-105"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-[#F8F6F2] rounded-full p-4">
                    {item.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Events;
