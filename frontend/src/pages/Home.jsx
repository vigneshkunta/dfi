import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react"; 
import { GraduationCap, TrendingUp, Users } from "lucide-react";// Import the ArrowRight icon

// DJ Hero Images (carousel)
// Each object now includes the image source and the button text for that slide
const cards = [
  {
    title: "Certificate",
    heading: "Earn a",
    bg: "https://images.pexels.com/photos/8639778/pexels-photo-8639778.jpeg?auto=compress&cs=tinysrgb&w=1200", // Replace with the actual image from your screenshot
    color: "bg-green-600",
    btnText: "View Courses",
  },
  {
    title: "Member",
    heading: "Become a",
    bg: "https://images.pexels.com/photos/1309240/pexels-photo-1309240.jpeg?auto=compress&cs=tinysrgb&w=1200", // Replace with actual image from your screenshot
    color: "bg-orange-600",
    btnText: "View Plans",
  },
];
const djImages = [
  {
    src: "https://images.pexels.com/photos/167491/pexels-photo-167491.jpeg?auto=compress&cs=tinysrgb&w=1200",
    buttonText: "View Events",
    buttonLink: "#upcoming-events", // Anchor link for events section
  },
  {
    src: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1200",
    buttonText: "Become a Member",
    buttonLink: "#", // Placeholder for membership link
  },
  {
    src: "https://images.pexels.com/photos/154147/pexels-photo-154147.jpeg?auto=compress&cs=tinysrgb&w=1200",
    buttonText: "Explore Courses",
    buttonLink: "#featured-course", // Anchor link for featured course section
  },
];

// Data for the "Why Choose DFI" cards (now 5 cards as requested)
const whyChooseDFICards = [
  {
    title: "Exclusive Opportunities",
    desc: "Access job placements, global career options, and industry partnerships.",
    img: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Transform Together",
    desc: "Be part of a collective force advocating for positive change in the DJ sector.",
    img: "https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Networking Opportunities",
    desc: "Connect with industry leaders, peers, and brands through exclusive workshops and seminars.",
    img: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Member-only Events",
    desc: "Enjoy discounts, deals, and exclusive offers by being a member.",
    img: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Expert Support",
    desc: "Get professional guidance on career growth, business challenges, and industry regulations.",
    img: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

// Data for the "Upcoming Events" cards
const upcomingEvents = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/3862635/pexels-photo-3862635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: "LICENSEE HOLDER ANNUAL MEETING",
    ffii: false, // Changed to false for DJ events
    location: "Hyderabad, Telangana",
    title: "DFI Licensees Annual Meeting",
    description:
      "Building Stronger Partnerships for Growth. This meeting is designed for DFI licensees to discuss the latest developments, strategic initiatives, and industry trends.",
    date: "December 20, 2025",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/3863073/pexels-photo-3863073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: "DJ ANNUAL CONFERENCE",
    ffii: false, // Changed to false for DJ events
    location: "Hyderabad, Telangana",
    title: "DFI Annual DJ Conference",
    description:
      "Empowering DJ Professionals for Success. This event offers valuable insights on mixing methodologies, client retention, and business growth.",
    date: "December 21, 2025",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/1566412/pexels-photo-1566412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: "DJ CLUB OWNERS MEETUP HYDERABAD",
    ffii: false, // Changed to false for DJ events
    location: "Hyderabad, Telangana",
    title: "DFI Annual Club Owners Meetup",
    description:
      "Shaping the Future of the DJ Business. This exclusive meetup brings together club owners, event organizers, and DJ entrepreneurs.",
    date: "December 22, 2025",
  },
];

/**
 * WhyChooseDFISlider Component
 * Manages and displays a sliding carousel of "Why Choose DFI" cards.
 * Shows 4 cards at a time, allowing navigation through 5 total cards.
 */


const WhyChooseDFISlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerView = 4;
  const totalItems = whyChooseDFICards.length;
  const maxSlideIndex = totalItems - itemsPerView;

  const handlePrev = () => setCurrentSlide((prev) => Math.max(0, prev - 1));
  const handleNext = () =>
    setCurrentSlide((prev) => Math.min(maxSlideIndex, prev + 1));

  const slideTransform = `translateX(-${currentSlide * (100 / itemsPerView)}%)`;

  return (
    <section className="bg-[#F6F4EE] py-16">
      <div className="container mx-auto px-4">
        {/* Heading & Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          <div className="md:w-3/4">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Why Choose <span className="text-orange-500">FFI?</span>
            </h2>
            <p className="text-gray-600">
              The Fitness Federation of India (FFI) is your gateway to a
              stronger career or business in the fitness industry. By joining
              FFI, you gain access to a network of opportunities, resources, and
              support that will help you thrive!
            </p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <button
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className="w-10 h-10 rounded-full border border-red-200 text-red-400 flex items-center justify-center transition hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &#10094;
            </button>
            <button
              onClick={handleNext}
              disabled={currentSlide === maxSlideIndex}
              className="w-10 h-10 rounded-full border border-red-200 text-red-400 flex items-center justify-center transition hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &#10095;
            </button>
          </div>
        </div>

        {/* Cards Slider */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: slideTransform }}
          >
            {whyChooseDFICards.map((card, idx) => (
              <div key={idx} className="w-full md:w-1/4 flex-shrink-0 px-2">
                <div className="relative h-[300px] rounded-xl overflow-hidden shadow-md group">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
                  />
                  <div className="relative z-10 h-full flex flex-col justify-end p-4 text-white">
                    <h3 className="text-lg font-bold leading-tight mb-1">
                      {card.title}
                    </h3>
                    <p className="text-sm leading-snug">{card.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Custom DFI Logo Component
 * This component renders the DFI logo using SVG, matching the requested design.
 */
const DFILogo = ({ size = "20", className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background Circle */}
    <circle cx="50" cy="50" r="50" fill="#2A2879" />{" "}
    {/* Dark Blue background */}
    {/* D */}
    <path
      d="M30 25H45C55 25 60 35 60 50C60 65 55 75 45 75H30V25Z"
      fill="#E86E2C" /* Orange for 'D' */
    />
    {/* F */}
    <path
      d="M70 25H85V35H70V50H82V60H70V75H65V25H70Z"
      fill="#FCD41B" /* Yellow/Orange for 'F' */
    />
    {/* I */}
    <rect x="90" y="25" width="5" height="50" fill="#4CAF50" />{" "}
    {/* Green for 'I' */}
    {/* Text "DJ" */}
    <text
      x="50"
      y="80"
      textAnchor="middle"
      fontSize="15"
      fill="white"
      fontWeight="bold"
      fontFamily="Inter, sans-serif"
    >
      DJ
    </text>
    {/* Text "FEDERATION OF INDIA" */}
    <text
      x="50"
      y="95"
      textAnchor="middle"
      fontSize="8"
      fill="white"
      fontFamily="Inter, sans-serif"
    >
      FEDERATION OF INDIA
    </text>
  </svg>
);

/**
 * Inline Shield Icon SVG
 */
const IconShield = ({ className = "text-blue-600 text-3xl" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L3 6V12C3 18.01 7.21 21.57 12 22C16.79 21.57 21 18.01 21 12V6L12 2ZM12 20C8.5 19.46 5 16.03 5 12V7.12L12 4L19 7.12V12C19 16.03 15.5 19.46 12 20Z" />
  </svg>
);

/**
 * Inline Chart Line Icon SVG
 */
const IconChartLine = ({ className = "text-blue-600 text-3xl" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16 11V15H18V11H16ZM12 11V15H14V11H12ZM8 11V15H10V11H8ZM19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM19 19H5V5H19V19Z" />
  </svg>
);

/**
 * Inline Globe Icon SVG
 */
const IconGlobe = ({ className = "text-blue-600 text-3xl" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.3 4.12 10.63 4.34 10H8V14L10 16L11 18V19.93ZM10 4.07V6H14V4.07C13.34 4.02 12.67 4 12 4C11.33 4 10.66 4.02 10 4.07ZM12 6H8V10H4.34C4.12 9.37 4 8.7 4 8C4 7.23 4.16 6.5 4.43 5.86L8 5.86V6L12 6V6ZM19.66 10H16V6L12 6V4.07C15.95 4.56 19 7.92 19 12C19 12.7 18.88 13.37 18.66 14H15V10H19.66ZM12 20L13 18V16L15 14V10H19.66C19.88 10.63 20 11.3 20 12C20 12.77 19.84 13.5 19.57 14.14L16 14.14V15.86L12 19.93V20Z" />
  </svg>
);

/**
 * Home Component
 * This is the main component rendering the entire page structure.
 */
const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % djImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Carousel Section */}
      <div className="relative h-[90vh] overflow-hidden">
        <div className="relative w-full h-full">
          {djImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                idx === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={img.src}
                alt={`DJ Slide ${idx + 1}`}
                className="w-full h-full object-cover brightness-50"
                loading="lazy"
              />
              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center justify-start p-4">
                <div className="container mx-auto px-4 max-w-4xl text-left ml-10">
                  <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-2">
                    Connect, Learn, and Grow
                    <br></br>at Upcoming DJ Events
                  </h1>
                  {/* This is the single dynamic button that displays "View Events", "Become a Member", or "Explore Courses" */}
                  {/* The hover effect is applied directly to this <a> tag */}
                  <a
                    href={djImages[currentImageIndex].buttonLink}
                    className="mt-8 px-6 py-3 bg-orange-500 text-white font-semibold rounded-md shadow-lg
                               border border-transparent hover:bg-[#2A2879] hover:text-white hover:border-white transition-all duration-200 text-base inline-flex items-center"
                  >
                    {djImages[currentImageIndex].buttonText}{" "}
                    <ArrowRight className="inline-block ml-2 w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Purpose Section */}
      <section className="bg-[#F6F4EE] min-h-screen w-full py-32 px-6 sm:px-10 lg:px-24 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative">
          {/* Left - Main Image + Trainer */}
          <div className="relative w-full flex justify-center items-center">
            {/* Decorative Zigzag */}
            <div className="absolute -left-8 top-14 text-[#fbbf24] text-2xl hidden md:block leading-5">
              &#8767;
              <br />
              &#8767;
              <br />
              &#8767;
            </div>

            {/* Group Image */}
            <img
              src="data:image/jpeg;base64,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"
              alt="DFI Mission"
              className="w-[360px] h-[500px] object-cover rounded-xl shadow-2xl z-10"
            />

            {/* Trainer Image */}
            <img
              // src={trainerImg}
              alt="DFI Trainer"
              className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[260px] sm:w-[300px] object-contain drop-shadow-2xl"
            />
          </div>

          {/* Right - Text Content */}
          <div className="space-y-8">
            <p className="text-[#d4460c] font-semibold uppercase text-base tracking-widest">
              Our Purpose and Promise
            </p>

            <h2 className="text-5xl font-extrabold text-[#0b2545] leading-snug">
              Redefining DJing{" "}
              <span className="text-[#f97316] underline decoration-[3px] underline-offset-4">
                in India
              </span>
            </h2>

            <p className="border-l-4 border-orange-500 pl-5 text-gray-700 text-[16px] leading-relaxed">
              The DJing Federation of India (DFI) is committed to transforming
              the future of DJing. As the leading platform for DJ professionals,
              we’re dedicated to building trust, advancing careers, and
              fostering innovation across the entertainment industry.
            </p>

            {/* Icons and Goals */}
            <div className="space-y-6 text-[#0b2545] text-base">
              <div className="flex items-start gap-4">
                <GraduationCap className="text-red-700 mt-1 w-6 h-6" />
                <div>
                  <h3 className="font-semibold text-lg">Building Trust</h3>
                  <p>
                    A united platform to support and elevate DJs, producers, and
                    event artists.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <TrendingUp className="text-red-700 mt-1 w-6 h-6" />
                <div>
                  <h3 className="font-semibold text-lg">Driving Growth</h3>
                  <p>
                    Empowering creators with skills and structured opportunities
                    to succeed.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Users className="text-red-700 mt-1 w-6 h-6" />
                <div>
                  <h3 className="font-semibold text-lg">Creating Impact</h3>
                  <p>
                    Shaping a stronger, more sustainable future for India’s
                    music and entertainment culture.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Course Section */}
      <section id="featured-course" className="bg-[#F6F4EE] py-16">
        <div className="container mx-auto px-4">
          <p className="text-center text-[#e86b34] font-semibold mb-2">
            Live Courses
          </p>
          <h2 className="text-center font-bold text-4xl text-gray-800 mb-12">
            Featured <span className="text-[#e86b34]">Live</span> Course of the
            Week
          </h2>

          <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-3xl shadow-xl max-w-6xl mx-auto">
            {/* Left Image */}
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <img
                src="https://images.pexels.com/photos/1649380/pexels-photo-1649380.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="DJing Training"
                className="w-full h-auto rounded-xl shadow-md object-cover"
                loading="lazy"
              />
            </div>

            {/* Right Content */}
            <div className="md:w-1/2">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-3">
                DJing
              </span>

              <div className="flex items-center mt-2 mb-4">
                {/* Replace this with your logo */}
                <img
                  src="/path-to-your-logo.png"
                  alt="DFI Logo"
                  className="w-7 h-7 mr-2"
                />
                <span className="text-gray-600 font-medium">
                  DJing Federation of India
                </span>
              </div>

              <h4 className="font-bold text-2xl text-gray-900 mb-3">
                Live Performance & Crowd Control Masterclass
              </h4>

              <div className="flex items-center mt-3 mb-6">
                <span className="mr-3 bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm">
                  ● Learn with top DJs
                </span>
                <div className="flex items-center">
                  {["men/20.jpg", "women/47.jpg", "men/22.jpg"].map(
                    (img, idx) => (
                      <img
                        key={idx}
                        src={`https://randomuser.me/api/portraits/${img}`}
                        alt="learner"
                        width="32"
                        height="32"
                        className="rounded-full -ml-2 border-2 border-white shadow-sm"
                        loading="lazy"
                      />
                    )
                  )}
                  <span className="ml-4 px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-semibold text-sm">
                    3.5k+
                  </span>
                </div>
              </div>

              <button className="px-6 py-3 bg-[#2A2879] text-white font-bold rounded-full shadow-md hover:bg-[#1d1b5e] transition-colors duration-200">
                🎧 Enroll Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate & Membership */}
      <section className="bg-[#F6F4EE] py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {cards.map(({ title, heading, bg, color, btnText }, idx) => (
              <div
                key={idx}
                className="relative h-72 rounded-2xl shadow-xl overflow-hidden flex items-center justify-center text-white"
              >
                <img
                  src={bg}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.45]"
                  loading="lazy"
                />
                <div className="relative z-10 text-center">
                  <h5 className="text-lg mb-1 font-medium">{heading}</h5>
                  <h3 className="text-3xl font-bold mb-3">{title}</h3>
                  <div
                    className={`w-20 h-1 ${color} mx-auto mb-5 rounded-full`}
                  />
                  <button
                    className={`px-6 py-2 ${color} text-white font-semibold rounded-md shadow-md hover:brightness-110 transition duration-200`}
                  >
                    {btnText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose DFI Section - Uses the new slider component */}
      <WhyChooseDFISlider />

      {/* New Section for Fitness Trainer Certification - REDUCED SIZE */}
      <section className="bg-[#312E81] py-10 px-4 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
          {/* Left: Logo + Text */}
          <div className="flex items-center gap-5">
            {/* Logo */}
            <img
              // src="" // <-- Replace with your correct logo path
              alt="DFI Logo"
              className="w-14 h-14 bg-white rounded-md object-contain p-1"
            />

            {/* Text */}
            <div>
              <p className="text-white text-sm italic mb-1">
                Get certified as a DJ Trainer
              </p>
              <h3 className="text-white font-bold text-xl sm:text-2xl leading-snug max-w-md">
                Upskill with govt approved courses at{" "}
                <br className="hidden sm:block" />
                affordable prices designed for trainers
              </h3>
            </div>
          </div>

          {/* Right: Button with background lines */}
          <div className="relative flex items-center justify-center">
            {/* Decorative Lines */}
            <div className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 rotate-45 space-y-1 hidden md:block">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-[2px] bg-[#8880cf] opacity-30"
                  ></div>
                ))}
            </div>

            {/* Button */}
            <a
              href="/courses"
              className="bg-[#f36d2e] hover:bg-[#e55d1a] transition text-white text-sm font-semibold px-6 py-2 rounded-md z-10"
            >
              Explore →
            </a>
          </div>
        </div>
      </section>

      {/* Section for Upcoming Events */}

      <section id="upcoming-events" className="bg-[#F6F4EE] py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="flex flex-col items-start mb-6 md:mb-0">
              <p className="text-[#E86E2C] font-normal text-sm tracking-widest uppercase mb-1">
                EVENTS
              </p>
              <div className="relative inline-block">
                <h2 className="font-bold text-5xl text-gray-800 inline-block">
                  Upcoming <span className="text-[#E86E2C]">Events</span>
                </h2>
                <span className="absolute bottom-[-10px] left-3 w-40 h-1.5 bg-gray-800 rounded-md transform -rotate-2"></span>
              </div>
            </div>
            {/* This button retains its original hover state */}
            <button className="px-8 py-3 bg-[#2A2879] text-white rounded-lg font-semibold shadow-md hover:bg-indigo-900 transition-colors duration-200">
              See More Events
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover brightness-75"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-white bg-opacity-90 text-[#E86E2C] px-3 py-1 rounded-md font-semibold text-sm uppercase">
                    {event.type}
                  </div>
                  {event.ffii && (
                    <div className="absolute bottom-3 right-3 w-12 h-12 bg-white rounded-md flex items-center justify-center text-lg font-bold leading-none shadow-sm">
                      <span className="text-orange-500 text-base">ff</span>
                      <span className="text-[#2E2D6F] text-base">i</span>
                      <span className="text-green-600 text-base">i</span>
                    </div>
                  )}
                  {!event.ffii && ( // Render DFI logo if not ffii event
                    <div className="absolute bottom-3 right-3">
                      <DFILogo size="48" className="w-12 h-12" />
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">
                      <span className="mr-2">&#x1F4CD;</span>
                      {event.location}
                    </p>
                    <h3 className="font-bold text-xl text-gray-800 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-base mb-4">
                      {event.description}
                    </p>
                    <p className="text-[#E86E2C] font-semibold mb-4">
                      <span className="mr-2">&#x1F4C5;</span>
                      {event.date}
                    </p>
                  </div>
                  <div className="text-right">
                    {/* This button retains its original hover state */}
                    <button className="px-6 py-2 bg-[#E86E2C] text-white rounded-lg font-semibold shadow-md hover:bg-orange-700 transition-colors duration-200">
                      ATTEND
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
