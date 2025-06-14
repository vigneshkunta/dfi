import React from "react";
import licensebg from "../assets/DJING/licensebg.webp";

const Licenses = () => {
  return (
    <section
      className="relative w-full h-screen bg-black overflow-hidden"
      aria-label="DJ Federation License Banner"
    >
      <img
        src={licensebg}
        alt="Official DJ License Background"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        decoding="async"
        fetchpriority="high"
      />
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="relative z-10 flex items-center justify-start h-full px-4 sm:px-6 md:px-20">
        <div data-aos="fade-right" className="max-w-2xl">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg">
            Official DJ License
          </h1>
          <div className="h-2 w-32 sm:w-40 bg-pink-500 mt-3 rounded-full" />
          <p className="mt-6 text-white text-base sm:text-lg leading-relaxed drop-shadow-md">
            The <strong>DJing Federation of India (DJFI)</strong> offers
            nationally recognized DJ licenses for aspiring and professional DJs
            across the country. Whether you're spinning at clubs, weddings,
            festivals, or private events—this license ensures you are
            performance-ready and legally compliant.
            <br />
            <br />
            Becoming licensed enhances your industry credibility, opens up
            exclusive gig opportunities, and connects you with the elite DJ
            community shaping the future of Indian nightlife and entertainment.
          </p>
          <button className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-700 transition">
            Apply for License
          </button>
        </div>
      </div>
    </section>
  );
};

export default Licenses;
