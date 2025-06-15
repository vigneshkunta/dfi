import React, { useState, useEffect } from "react";
import { ArrowRight } from 'lucide-react'; // Import the ArrowRight icon

// DJ Hero Images (carousel)
// Each object now includes the image source and the button text for that slide
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

  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(maxSlideIndex, prev + 1));
  };

  const slideTransform = `translateX(-${currentSlide * (100 / itemsPerView)}%)`;

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="md:w-3/4 mb-4 md:mb-0">
            <h2 className="font-bold text-4xl text-gray-800 mb-2">
              Why Choose <span className="text-orange-500">DFI</span>?
            </h2>
            <p className="text-gray-600">
              The DJ Federation of India (DFI) is your gateway to a stronger
              career or business in the DJ industry. By joining DFI, you gain
              access to a network of opportunities, resources, and support that
              will help you thrive!
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 text-gray-600 bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 hover:bg-gray-100"
              onClick={handlePrev}
              disabled={currentSlide === 0}
            >
              &#10094;
            </button>
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 text-gray-600 bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 hover:bg-gray-100"
              onClick={handleNext}
              disabled={currentSlide === maxSlideIndex}
            >
              &#10095;
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex flex-nowrap transition-transform duration-500 ease-in-out"
            style={{ transform: slideTransform }}
          >
            {whyChooseDFICards.map((card, idx) => (
              <div
                key={idx}
                className="w-full md:w-1/4 flex-shrink-0 px-2" // Equivalent to col-md-3 with px-2 for gutter
              >
                <div className="bg-white rounded-lg shadow-md h-full overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                    <p className="text-gray-600 text-sm">{card.desc}</p>
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
const DFILogo = ({ size = '20', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background Circle */}
    <circle cx="50" cy="50" r="50" fill="#2A2879" /> {/* Dark Blue background */}

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
    <rect x="90" y="25" width="5" height="50" fill="#4CAF50" /> {/* Green for 'I' */}

    {/* Text "DJ" */}
    <text x="50" y="80" textAnchor="middle" fontSize="15" fill="white" fontWeight="bold" fontFamily="Inter, sans-serif">
      DJ
    </text>
    {/* Text "FEDERATION OF INDIA" */}
    <text x="50" y="95" textAnchor="middle" fontSize="8" fill="white" fontFamily="Inter, sans-serif">
      FEDERATION OF INDIA
    </text>
  </svg>
);

/**
 * Inline Shield Icon SVG
 */
const IconShield = ({ className = "text-blue-600 text-3xl" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L3 6V12C3 18.01 7.21 21.57 12 22C16.79 21.57 21 18.01 21 12V6L12 2ZM12 20C8.5 19.46 5 16.03 5 12V7.12L12 4L19 7.12V12C19 16.03 15.5 19.46 12 20Z"/>
  </svg>
);

/**
 * Inline Chart Line Icon SVG
 */
const IconChartLine = ({ className = "text-blue-600 text-3xl" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 11V15H18V11H16ZM12 11V15H14V11H12ZM8 11V15H10V11H8ZM19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM19 19H5V5H19V19Z"/>
  </svg>
);

/**
 * Inline Globe Icon SVG
 */
const IconGlobe = ({ className = "text-blue-600 text-3xl" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.3 4.12 10.63 4.34 10H8V14L10 16L11 18V19.93ZM10 4.07V6H14V4.07C13.34 4.02 12.67 4 12 4C11.33 4 10.66 4.02 10 4.07ZM12 6H8V10H4.34C4.12 9.37 4 8.7 4 8C4 7.23 4.16 6.5 4.43 5.86L8 5.86V6L12 6V6ZM19.66 10H16V6L12 6V4.07C15.95 4.56 19 7.92 19 12C19 12.7 18.88 13.37 18.66 14H15V10H19.66ZM12 20L13 18V16L15 14V10H19.66C19.88 10.63 20 11.3 20 12C20 12.77 19.84 13.5 19.57 14.14L16 14.14V15.86L12 19.93V20Z"/>
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
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % djImages.length
      );
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
                idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
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
                    {djImages[currentImageIndex].buttonText} <ArrowRight className="inline-block ml-2 w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Purpose Section */}
      <section className="bg-[#fdfaf6] py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <img
                src="https://images.pexels.com/photos/3587493/pexels-photo-3587493.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="DJ community gathering"
                className="w-full h-auto rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <p className="text-orange-500 font-bold uppercase tracking-wide mb-2">
                OUR PURPOSE AND PROMISE
              </p>
              <h2 className="font-bold text-4xl text-gray-800 leading-tight mb-4">
                Redefining DJ Culture in
                <br />
                <span className="text-orange-500">India</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The DJ Federation of India (DFI) is committed to transforming
                the future of DJing. As the leading platform for DJs and music
                professionals, we’re dedicated to building trust, advancing
                careers, and fostering creativity.
              </p>

              {[
                {
                  title: "Building Trust",
                  desc: "A united platform to support and elevate DJs across the country.",
                  icon: <IconShield className="text-blue-600 text-3xl" />, // Inline SVG
                },
                {
                  title: "Driving Growth",
                  desc: "Empowering DJs with skills, licenses, and opportunities to shine.",
                  icon: <IconChartLine className="text-blue-600 text-3xl" />, // Inline SVG
                },
                {
                  title: "Creating Impact",
                  desc: "Shaping a stronger, more sustainable DJ ecosystem together.",
                  icon: <IconGlobe className="text-blue-600 text-3xl" />, // Inline SVG
                },
              ].map(({ title, desc, icon }, idx) => (
                <div className="flex items-start mb-4" key={idx}>
                  <div className="text-2xl mr-4">{icon}</div>
                  <div>
                    <h5 className="font-semibold text-lg mb-1">{title}</h5>
                    <p className="text-gray-600 text-sm">{desc}</p>
                  </div>
                </div>
              ))}

              {/* This button retains its original hover state */}
              <button
                className="mt-6 px-6 py-3 bg-[#2A2879] text-white font-bold rounded-lg shadow-md hover:bg-indigo-900 transition-colors duration-200"
              >
                Learn More <ArrowRight className="inline-block ml-1 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Course Section */}
      <section id="featured-course" className="bg-[#fdfaf6] py-16">
        <div className="container mx-auto px-4">
          <p className="text-center text-purple-600 font-semibold mb-2">
            Live Courses
          </p>
          <h2 className="text-center font-bold text-4xl text-gray-800 mb-12">
            Featured <span className="text-purple-600">live</span> Course of
            the Week
          </h2>
          <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-lg shadow-xl">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <img
                src="https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Live Mixing Course"
                className="w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
            </div>
            <div className="md:w-1/2">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-3">
                DJ
              </div>
              <div className="flex items-center mt-2 mb-4">
                <DFILogo size="28" className="mr-2" /> {/* Use the DFI Logo component */}
                <span className="text-gray-600">DJ Federation of India</span>
              </div>
              <h4 className="font-bold text-2xl text-gray-900 mb-3">
                Live Mixing & Stage Readiness for DJs
              </h4>
              <div className="flex items-center mt-3 mb-6">
                <span className="mr-3 bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm">
                  Learn with others
                </span>
                <div className="flex items-center">
                  {[
                    "men/32.jpg",
                    "women/44.jpg",
                    "men/12.jpg",
                  ].map((img, idx) => (
                    <img
                      key={idx}
                      src={`https://randomuser.me/api/portraits/${img}`}
                      alt="learner"
                      width="32"
                      height="32"
                      className="rounded-full -mr-2 border-2 border-white" // Overlap for avatars
                      loading="lazy"
                    />
                  ))}
                  <span className="ml-4 px-3 py-1 bg-gray-100 rounded-full font-bold text-gray-800">
                    2k+
                  </span>
                </div>
              </div>
              {/* This button retains its original hover state */}
              <button
                className="px-6 py-3 bg-[#2A2879] text-white font-bold rounded-full shadow-lg hover:bg-indigo-900 transition-colors duration-200"
              >
                🎧 Join Now <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate & Membership */}
      <section className="bg-[#fdfaf6] py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
            {[
              {
                title: "Certificate",
                heading: "Earn a",
                bg: "https://images.pexels.com/photos/248515/pexels-photo-248515.jpeg?auto=compress&cs=tinysrgb&w=800",
                color: "bg-green-700",
                btnText: "View Courses",
              },
              {
                title: "Member",
                heading: "Become a",
                bg: "https://images.pexels.com/photos/1309240/pexels-photo-1309240.jpeg?auto=compress&cs=tinysrgb&w=800",
                color: "bg-orange-600",
                btnText: "View Plans",
              },
            ].map(({ title, heading, bg, color, btnText }, idx) => (
              <div key={idx} className="relative rounded-2xl shadow-xl overflow-hidden h-72 flex items-center justify-center p-8 text-white">
                <img
                  src={bg}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover brightness-50"
                  loading="lazy"
                />
                <div className="relative z-10 text-center">
                  <h5 className="text-xl mb-2">{heading}</h5>
                  <h3 className="font-bold text-3xl mb-4">{title}</h3>
                  <hr className={`w-20 h-1 border-0 ${color} mx-auto mb-6`} />
                  <button className={`px-6 py-2 ${color} text-white font-semibold rounded-md shadow-md hover:brightness-110 transition-all duration-200`}>
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
      <section className="bg-[#2E2D6F] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex justify-center md:justify-start mb-6 md:mb-0">
              {/* DFI Logo Component for this section */}
              <DFILogo size="80" className="w-20 h-20" />
            </div>
            <div className="flex-1 text-center mb-6 md:mb-0 md:px-8">
              <p className="text-gray-300 text-sm mb-2">
                Get certified as a Fitness Trainer
              </p>
              <h2 className="font-bold text-white text-3xl leading-tight">
                Upskill with govt approved courses at affordable prices designed
                for trainers
              </h2>
            </div>
            <div className="flex justify-center md:justify-end">
              {/* This button retains its original hover state */}
              <button className="px-6 py-3 bg-white text-[#2E2D6F] font-semibold rounded-full shadow-lg text-base transition-colors duration-200
                                 hover:bg-[#2A2879] hover:text-white hover:border hover:border-white">
                Explore <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section for Upcoming Events */}
      <section id="upcoming-events" className="bg-[#fdfaf6] py-16">
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
                <span
                  className="absolute bottom-[-10px] left-3 w-40 h-1.5 bg-gray-800 rounded-md transform -rotate-2"
                ></span>
              </div>
            </div>
            {/* This button retains its original hover state */}
            <button
              className="px-8 py-3 bg-[#2A2879] text-white rounded-lg font-semibold shadow-md hover:bg-indigo-900 transition-colors duration-200"
            >
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
                    <button
                      className="px-6 py-2 bg-[#E86E2C] text-white rounded-lg font-semibold shadow-md hover:bg-orange-700 transition-colors duration-200"
                    >
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
