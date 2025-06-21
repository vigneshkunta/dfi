import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import contactbg from "../assets/DJING/Gemini_Generated_Image_rb4w9drb4w9drb4w.webp";
import formimg from "../assets/DJING/formimg.webp";

const Contact = () => {
  // State to manage contact form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // State to manage newsletter form data
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterName, setNewsletterName] = useState("");

  // Handle input changes for contact form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle contact form submission
  const handleSubmit = async (e) => {
    // Made async for potential API calls
    e.preventDefault();

    // Basic client-side validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      alert("Please fill in all required fields for the contact form.");
      return;
    }

    console.log("Contact form data submitted:", formData);
    // In a real application, you'd send this to your backend API.
    // Example:
    /*
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Thank you for your message! We will get back to you soon.");
        alert("Message sent successfully!"); // User feedback
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Contact form submission failed:", errorData.message);
        alert("Failed to send message. Please try again later."); // User feedback
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("An error occurred. Please try again later."); // User feedback
    }
    */
    alert("Thank you for your message! We will get back to you soon."); // Placeholder for success feedback
    setFormData({
      // Clear form after submission (even with placeholder API)
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  // Handle newsletter name input change
  const handleNewsletterNameChange = (e) => {
    setNewsletterName(e.target.value);
  };

  // Handle newsletter email input change
  const handleNewsletterEmailChange = (e) => {
    setNewsletterEmail(e.target.value);
  };

  // Handle newsletter form submission
  const handleNewsletterSubmit = async (e) => {
    // Made async for potential API calls
    e.preventDefault();

    // Basic client-side validation
    if (!newsletterName || !newsletterEmail) {
      alert("Please enter your name and email for the newsletter.");
      return;
    }

    console.log("Newsletter subscription data:", {
      name: newsletterName,
      email: newsletterEmail,
    });
    // In a real application, you'd send this to your newsletter service.
    // Example:
    /*
    try {
      const response = await fetch('/api/subscribe-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newsletterName, email: newsletterEmail }),
      });

      if (response.ok) {
        console.log("Thank you for subscribing to our newsletter!");
        alert("Successfully subscribed to the newsletter!"); // User feedback
        setNewsletterName("");
        setNewsletterEmail("");
      } else {
        const errorData = await response.json();
        console.error("Newsletter subscription failed:", errorData.message);
        alert("Failed to subscribe. Please try again later."); // User feedback
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      alert("An error occurred. Please try again later."); // User feedback
    }
    */
    alert("Thank you for subscribing to our newsletter!"); // Placeholder for success feedback
    setNewsletterName(""); // Clear name field
    setNewsletterEmail(""); // Clear email field
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Djing Federation of India (DFI)</title>
        <meta
          name="description"
          content="Reach out to Djing Federation of India (DFI) for inquiries, partnerships, and support. Fill out our contact form or find our contact details."
        />
        <meta
          name="keywords"
          content="contact DFI, Djing Federation of India contact, DFI inquiries, Djing organization contact, send message, newsletter signup"
        />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="YOUR_WEBSITE_URL/contact" />{" "}
        {/* Replace with your actual URL */}
        <meta
          property="og:title"
          content="Contact Us - Djing Federation of India (DFI)"
        />
        <meta
          property="og:description"
          content="Reach out to Djing Federation of India (DFI) for inquiries, partnerships, and support. Fill out our contact form or find our contact details."
        />
        <meta property="og:image" content={contactbg} />{" "}
        {/* Consider a dedicated OG image */}
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="YOUR_WEBSITE_URL/contact" />{" "}
        {/* Replace with your actual URL */}
        <meta
          property="twitter:title"
          content="Contact Us - Djing Federation of India (DFI)"
        />
        <meta
          property="twitter:description"
          content="Reach out to Djing Federation of India (DFI) for inquiries, partnerships, and support. Fill out our contact form or find our contact details."
        />
        <meta property="twitter:image" content={contactbg} />{" "}
        {/* Consider a dedicated Twitter image */}
      </Helmet>

      <main>
        {/* Hero Section */}
        <section
          className="relative w-full h-[400px] sm:h-[500px] md:h-[550px] bg-black"
          aria-label="Contact Us Banner"
        >
          <img
            src={contactbg}
            alt="Smiling man in a meeting"
            className="absolute inset-0 w-full h-full object-cover"
            // `loading="eager"` is good for LCP image
            // `fetchpriority="high"` helps the browser prioritize this image
            loading="eager"
            decoding="async"
            fetchpriority="high"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/1920x550/000000/FFFFFF?text=Image+Not+Found";
            }}
          />
          <div className="absolute inset-0 bg-black/50 z-0" />
          <div className="relative z-10 flex items-center h-full px-4 sm:px-6 md:px-20">
            <div data-aos="fade-right">
              <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-wide">
                Contact Us
              </h1>
              <div className="h-2 w-36 sm:w-48 bg-red-500 mt-3" />
              <p className="mt-4 text-white text-base sm:text-lg max-w-lg">
                We'd love to hear from you! Reach out to us for any inquiries,
                partnerships, or support.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="bg-[#f8f6ef] py-16 px-4 sm:px-6 lg:px-8 font-sans">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:space-x-12">
            {/* Image Section */}
            <div className="flex-shrink-0 w-full md:w-1/3 mb-8 md:mb-0">
              <img
                src={formimg}
                alt="Muscular man posing for contact form" // Improved alt text
                className="rounded-lg w-full h-auto object-cover"
                loading="lazy" // Defer loading for images not in the initial viewport
                decoding="async"
              />
            </div>

            {/* Contact Form Section */}
            <div className="flex-grow w-full md:w-2/3">
              <h2 className="text-3xl font-bold text-[#0D1B39] mb-2">
                Contact Form
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form, and our team will get back to you soon!
              </p>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Your Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4C63D2] focus:border-[#4C63D2] sm:text-sm"
                    placeholder="John Doe"
                    required
                    aria-label="Your Name" // Added for accessibility
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4C63D2] focus:border-[#4C63D2] sm:text-sm"
                    placeholder="john.doe@example.com"
                    required
                    aria-label="Email Address"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4C63D2] focus:border-[#4C63D2] sm:text-sm"
                    placeholder="123-456-7890"
                    aria-label="Phone Number (Optional)" // Clarify optional if it is
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4C63D2] focus:border-[#4C63D2] sm:text-sm"
                    placeholder="Inquiry about..."
                    required
                    aria-label="Subject of your message"
                  />
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4C63D2] focus:border-[#4C63D2] sm:text-sm"
                    placeholder="Type your message here..."
                    required
                    aria-label="Your message"
                  ></textarea>
                </div>

                {/* Button */}
                <div className="md:col-span-2 text-center">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-[#4C63D2] hover:bg-[#3b4cb1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4C63D2] transition-all duration-300"
                    aria-label="Send Contact Message"
                  >
                    Send message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Our Contact Details Section */}
        <section className="bg-[#F6F4EE] py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#0D1B39] mb-12">
              Our Contact Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Email Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-start text-left border border-gray-100 hover:shadow-md transition">
                <div className="bg-[#f4f4f4] rounded-lg p-3 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true" // Indicate to screen readers that this is decorative
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#0D1B39] mb-1">
                  Write to us
                </h3>
                <p className="text-sm text-gray-500">Email</p>
                <a
                  href="mailto:info@Djingfederation.in"
                  className="text-[#0D1B39] font-medium underline break-all mt-1 hover:text-[#4C63D2] transition-colors"
                >
                  info@Djingfederation.in
                </a>
              </div>

              {/* Phone Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-start text-left border border-gray-100 hover:shadow-md transition">
                <div className="bg-[#f4f4f4] rounded-lg p-3 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-1.18 2.19l-.73.37a19.43 19.43 0 0 0 6 6l.37-.73a2 2 0 0 1 2.19-1.18 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#0D1B39] mb-1">
                  Call Us
                </h3>
                <p className="text-sm text-gray-500">Phone</p>
                <a
                  href="tel:+918856042808"
                  className="text-[#0D1B39] font-medium underline mt-1 hover:text-[#4C63D2] transition-colors"
                >
                  +91 88560 42808
                </a>
              </div>

              {/* Location Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-start text-left border border-gray-100 hover:shadow-md transition">
                <div className="bg-[#F6F4EE] rounded-lg p-3 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path d="M12 21.7C17.3 17 22 13.8 22 10a7 7 0 1 0-14 0c0 3.8 4.7 7 10 11.7z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#0D1B39] mb-1">
                  Headquarters
                </h3>
                <p className="text-sm text-gray-500">
                  Djing Federation of India (DFI)
                </p>
                <address className="text-[#0D1B39] font-medium underline mt-1 not-italic">
                  Nagpur, Maharashtra, India
                </address>{" "}
                {/* Use <address> for semantic markup */}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Subscription Section */}
        <section className="bg-indigo-900 py-16 px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Stay Updated{" "}
              <span className="text-orange-400 border-b-2 border-orange-400">
                Join
              </span>{" "}
              Our Newsletter!
            </h2>
            <p className="text-lg text-gray-300 mb-10">
              Want to stay informed about the latest Djing industry updates,
              events, and exclusive member benefits? Sign up for our newsletter!
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col items-center space-y-4 max-w-md mx-auto"
            >
              <label htmlFor="newsletter-name" className="sr-only">
                Your Name
              </label>{" "}
              {/* Screen reader only label */}
              <input
                type="text"
                id="newsletter-name"
                placeholder="Enter your name"
                value={newsletterName}
                onChange={handleNewsletterNameChange}
                className="w-full px-5 py-3 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                aria-label="Enter your name for newsletter"
              />
              <label htmlFor="newsletter-email" className="sr-only">
                Your Email
              </label>{" "}
              {/* Screen reader only label */}
              <input
                type="email"
                id="newsletter-email"
                placeholder="Enter your email..."
                value={newsletterEmail}
                onChange={handleNewsletterEmailChange}
                className="w-full px-5 py-3 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                aria-label="Enter your email for newsletter"
              />
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-md shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                aria-label="Join Newsletter"
              >
                Join Newsletter
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
