import React from "react";
import { motion } from "framer-motion";
import coursesBgWebp from "../assets/DJING/coursesBgWebp.webp";

const courses = [
  {
    id: "djf001",
    title: "Beginner DJ Fundamentals",
    description:
      "Learn the basics of DJing, including equipment setup, beatmatching, and mixing. This course provides a solid foundation for aspiring DJs.",
    image: "https://placehold.co/400x250/333/fff?text=DJ+Setup",
    logo_text: "DJing Federation of India",
    category: "DJing",
    students: 15,
    price: "₹1,500.00",
    rating: "0/0",
  },
  {
    id: "djf002",
    title: "Advanced Turntablism & Scratching",
    description:
      "Master advanced scratching techniques and turntablism skills for dynamic and creative sets. Dive deep into complex routines.",
    image: "https://placehold.co/400x250/444/fff?text=Turntables",
    logo_text: "DJing Federation of India",
    category: "DJing",
    students: 8,
    price: "₹2,750.00",
    rating: "0/0",
  },
  {
    id: "djf003",
    title: "Music Production for DJs",
    description:
      "Create your own original tracks and unique remixes to enhance your DJ sets and career. Learn about sound design and arrangement.",
    image: "https://placehold.co/400x250/555/fff?text=Music+Production",
    logo_text: "DJing Federation of India",
    category: "Production",
    students: 12,
    price: "₹3,200.00",
    rating: "0/0",
  },
  {
    id: "djf004",
    title: "Live Performance & Crowd Engagement",
    description:
      "Develop charismatic stage presence and learn strategies to energize and connect with any crowd. Master the art of crowd control.",
    image: "https://placehold.co/400x250/666/fff?text=Live+DJ",
    logo_text: "DJing Federation of India",
    category: "Performance",
    students: 10,
    price: "₹1,900.00",
    rating: "0/0",
  },
  {
    id: "djf005",
    title: "Digital DJing with Software",
    description:
      "Explore and master popular DJ software (Serato, Rekordbox, Traktor) and advanced controllers for seamless digital mixing.",
    image: "https://placehold.co/400x250/777/fff?text=Digital+DJ",
    logo_text: "DJing Federation of India",
    category: "DJing",
    students: 20,
    price: "₹1,800.00",
    rating: "0/0",
  },
  {
    id: "djf006",
    title: "Sound Engineering for DJs",
    description:
      "Gain a deep understanding of audio dynamics, acoustics, and professional sound system setup for optimal sound quality.",
    image: "https://placehold.co/400x250/888/fff?text=Sound+Eng",
    logo_text: "DJing Federation of India",
    category: "Engineering",
    students: 7,
    price: "₹2,500.00",
    rating: "0/0",
  },
];

const PublicCourses = () => {
  return (
    <main className="bg-white text-gray-900 font-sans">
      <section
        className="relative w-full h-[360px] sm:h-[460px] md:h-[500px] bg-black overflow-hidden"
        aria-label="DJ Federation Banner"
      >
        <img
          src={coursesBgWebp}
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
              Explore Our DJ Courses
            </h1>
            <div className="h-2 w-32 sm:w-40 bg-pink-500 mt-3 rounded-full" />
            <p className="mt-4 text-white text-base sm:text-lg max-w-lg leading-relaxed drop-shadow-md">
              From beginner fundamentals to advanced techniques, our expert-led
              programs will elevate your DJ skills.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 px-4 max-w-7xl mx-auto text-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold text-gray-900 mb-2"
        >
          Our <span className="text-blue-700">Courses</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="h-1 w-28 bg-yellow-400 mt-2"
        />
      </section>

      <section
        className="mb-10 px-4 py-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
        aria-label="Our Courses List"
      >
        {courses.map((course) => (
          <article
            key={course.id}
            className="group bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col p-3
                       transform transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-lg"
            role="group"
            aria-label={course.title}
          >
            <div className="flex justify-between items-center px-0 pt-0 pb-2">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700 text-sm font-medium">
                  {course.logo_text}
                </span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 hover:text-indigo-600 transition duration-150 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>

            <div
              className="relative w-full h-44 sm:h-52 md:h-56 overflow-hidden flex-shrink-0
                        transition-all duration-300 ease-in-out group-hover:h-40 group-hover:rounded-md"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover rounded-md transform transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>

            <div className="p-3 flex flex-col justify-between space-y-3 min-h-[220px]">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-1 self-start">
                {course.category}
              </span>

              <div className="flex items-center text-gray-600 text-sm mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h2v-2a3 3 0 00-3-3H8a3 3 0 00-3 3v2H3m14 0c0-1.554-.932-2.917-2.315-3.649m-2.22 0A.999.999 0 0112 15a.999.999 0 01-.465-.125m-2.22 0A3.001 3.001 0 005 18v2m-.293 0c-.628.796-1.579 1.139-2.707 1.139a1.001 1.001 0 01-1-1v-2a3.001 3.001 0 00-3-3H3"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 12a4 4 0 100-8 4 4 0 000 8z"
                  />
                </svg>
                <span className="font-semibold text-gray-700">
                  {course.students}
                </span>{" "}
                Students
              </div>

              <h2 className="text-lg font-bold text-gray-900 mb-1 leading-tight flex-grow">
                {course.title}
              </h2>

              <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
                <div className="flex items-center">
                  <span className="text-yellow-500 text-lg mr-1">
                    &#9733;&#9733;&#9733;&#9733;&#9733;
                  </span>
                  <span className="text-gray-500 text-sm">{course.rating}</span>
                </div>
                <span className="text-indigo-600 text-lg font-bold">
                  {course.price}
                </span>
              </div>

              <button
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 shadow-md
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
              >
                Preview This Course
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default PublicCourses;
