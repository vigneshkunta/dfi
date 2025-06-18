import React from 'react'
import { motion } from "framer-motion";
import aboutBgWebp from "../assets/DJING/aboutBgWebp.webp";
import misson from "../assets/DJING/misson.webp"
import djTrainer from "../assets/DJING/djTrainer.webp";
const roles = [
  {
    id: 1,
    title: "Setting Industry Standards",
    description:
      "DFI collaborates with government bodies and event regulators to set benchmark safety, ethics, and professional standards for DJs and event professionals across India.",
  },
  {
    id: 2,
    title: "Raising Public Awareness",
    description:
      "We actively promote awareness on the importance of certified DJs, ensuring public safety, legal compliance, and quality entertainment in every event.",
  },
  {
    id: 3,
    title: "Creating Career Growth Opportunities",
    description:
      "DFI enables DJs and artists to access global career opportunities through structured certifications, collaborations, and educational bootcamps.",
  },
  {
    id: 4,
    title: "Championing Inclusivity in Music",
    description:
      "DFI supports inclusivity by making DJing accessible to all backgrounds and communities, helping break stereotypes and empower creativity.",
  },
];

const About = () => {
  return (
    <>
      <main>
        <section
          className="relative w-full h-[360px] sm:h-[460px] md:h-[500px] bg-black overflow-hidden"
          aria-label="DJ Federation Banner"
        >
          <img
            src={aboutBgWebp}
            alt="Crowd enjoying DJ event"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-black/50 z-0" />
          <div className="relative z-10 flex items-center h-full px-4 sm:px-6 md:px-20">
            <div data-aos="fade-right">
              <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg">
                About us
              </h1>
              <div className="h-2 w-32 sm:w-40 bg-pink-500 mt-3 rounded-full" />
              <p className="mt-4 text-white text-base sm:text-lg max-w-lg leading-relaxed drop-shadow-md">
                The DJing Federation of India is a national platform uniting and
                empowering DJs through recognition, education, and professional
                opportunities.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-[#F6F4EE] min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl text-center">
            <p className="text-[#e86b34] text-base sm:text-lg font-semibold tracking-wide uppercase mb-4">
              Our Journey
            </p>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0b2545] mb-8 leading-tight">
              Uniting the DJ Community
              <br />
              for a Louder Tomorrow
            </h2>

            {/* Slim Line with Small Arrow */}
            <div className="flex justify-center mb-10">
              <div className="flex flex-col items-center space-y-1">
                <div className="w-[1px] h-20 bg-red-700" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="rgb(185, 28, 28)"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed px-4">
              The DJing Federation of India (DFI) supports and uplifts DJs,
              music producers, and event professionals through recognition,
              skill development, and national representation. Committed to
              creative excellence and career growth, DFI champions the voice of
              India's DJing industry—ensuring their passion is heard, valued,
              and celebrated across the nation.
            </p>
          </div>
        </section>
        <section className="bg-[#F6F4EE] py-24 px-4 sm:px-6 lg:px-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Image & Decorative Elements */}
            <div className="relative flex justify-center">
              {/* Decorative Dots */}
              <div className="absolute -left-6 bottom-6 hidden md:block">
                <div className="w-16 h-16 grid grid-cols-4 gap-1 opacity-20">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-1 h-1 bg-gray-400 rounded-full"
                    />
                  ))}
                </div>
              </div>

              {/* Image */}
              <img
                src={misson} // Replace with your actual image path
                alt="DFI Mission Vision"
                className="w-[300px] h-[420px] object-cover shadow-lg"
              />

              {/* Decorative Zigzag */}
              <div className="absolute -right-8 top-10 text-[#fbbf24] text-xl hidden lg:block">
                &#8767;
                <br />
                &#8767;
                <br />
                &#8767;
              </div>
            </div>

            {/* Right - Text */}
            <div className="text-left space-y-6">
              <p className="text-[#e86b34] font-semibold uppercase text-sm tracking-wide">
                Our Mission & Vision
              </p>

              <h2 className="text-4xl font-extrabold text-[#0b2545] leading-snug">
                Elevating the{" "}
                <span className="text-[#e86b34] underline decoration-[4px] underline-offset-4">
                  DJing
                </span>{" "}
                Industry
              </h2>

              <p className="border-l-4 border-red-700 pl-4 text-gray-700 text-[15px] leading-relaxed">
                We are committed to bringing DJs, music producers, and event
                professionals into the national spotlight by providing
                recognition, skill-building opportunities, and powerful
                representation across the entertainment industry.
              </p>

              <div className="space-y-4 text-sm text-[#0b2545]">
                <div>
                  <h3 className="font-semibold">Mission</h3>
                  <p>
                    To unify, support, and empower DJs and event professionals
                    across India by offering growth opportunities, certification
                    programs, and industry acknowledgment—helping elevate DJing
                    as a respected career.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Vision</h3>
                  <p>
                    To establish a vibrant and professional DJing community that
                    is recognized nationally and globally, while ensuring
                    creative freedom, fair practices, and sustainable careers
                    for every artist in the field.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
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

        <section className="bg-[#F6F4EE] py-20 px-4 sm:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            {/* Static DJ Image */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src={djTrainer}
                alt="DFI Certified DJ"
                className="max-h-[500px] object-contain"
              />
            </div>

            {/* Scroll-Up Cards */}
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-orange-600 font-semibold text-lg">
                Championing Change
              </h2>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Our Role in Advocacy & Representation
              </h1>
              {roles.map((role, index) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="bg-white shadow-md rounded-xl p-6 flex gap-4"
                >
                  <div className="text-green-700 font-bold text-xl">
                    {role.id}.
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                      {role.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {role.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default About