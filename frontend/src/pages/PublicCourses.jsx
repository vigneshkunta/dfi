import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import coursesBgWebp from "../assets/DJING/coursesBgWebp.webp";
import { Link, useNavigate } from "react-router-dom";

const PublicCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/course/");
        console.log("API Response:", res.data);
        const courseArray = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];
        setCourses(courseArray);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <main className="bg-white text-gray-900 font-sans">
      {/* Banner */}
      <section
        className="relative w-full h-[360px] sm:h-[460px] md:h-[500px] bg-black overflow-hidden"
        aria-label="DJ Federation Banner"
      >
        <img
          src={coursesBgWebp}
          alt="Crowd enjoying DJ event"
          className="absolute inset-0 w-full h-full object-cover"
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

      {/* Heading */}
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

      {/* Course Grid */}
      <section
        className="mb-10 px-4 py-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
        aria-label="Our Courses List"
      >
        {loading ? (
          <p className="col-span-full text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="col-span-full text-center text-red-500">{error}</p>
        ) : Array.isArray(courses) && courses.length > 0 ? (
          courses.map((course) => (
            <Link to={`/course/${course._id || course.id}`} key={course._id || course.id} className="no-underline">
              <article
                key={course._id || course.id}
                className="group bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col p-3 transform transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-lg"
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
                      {course.logo_text || "DJing Federation of India"}
                    </span>
                  </div>
                </div>

                <div className="relative w-full h-44 sm:h-52 md:h-56 overflow-hidden rounded-md">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                </div>

                <div className="p-3 flex flex-col justify-between space-y-3 min-h-[220px]">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-1 self-start">
                    {course.category || "General"}
                  </span>

                  <h2 className="text-lg font-bold text-gray-900 mb-1 leading-tight flex-grow">
                    {course.title}
                  </h2>

                  <p className="text-sm text-gray-600 line-clamp-3">
                    {course.description}
                  </p>

                  <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
                    <div className="flex items-center">
                      <span className="text-yellow-500 text-lg mr-1">
                        ★★★★★
                      </span>
                      <span className="text-gray-500 text-sm">
                        {course.rating || "0/0"}
                      </span>
                    </div>
                    <span className="text-indigo-600 text-lg font-bold">
                      {course.price}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      navigate(`/course/${course._id || course.id}`);
                    }}
                    className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                  >
                    Preview This Course
                  </button>
                </div>
              </article>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No courses available right now.
          </p>
        )}
      </section>
    </main>
  );
};

export default PublicCourses;
