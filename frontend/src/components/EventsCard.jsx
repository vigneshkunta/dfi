import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EventsCard = ({ image, location, title, description, date, button, id }) => {
  const navigate = useNavigate();
  return (
    <article className="bg-white shadow-md p-5 rounded-xl transition hover:shadow-lg flex flex-col justify-between h-full">
      {/* Image or Placeholder */}
      {image ? (
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="rounded-xl mb-4 object-cover w-full h-48"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-500 text-sm">
          No Image Available
        </div>
      )}

      {/* Event Info */}
      <div className="flex-1">
        <p className="text-green-600 font-medium flex items-center gap-1 mb-1">
          <FaMapMarkerAlt className="text-sm" />
          {location}
        </p>
        <h3 className="text-xl font-bold text-[#23224A] leading-snug mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
      </div>

      {/* Date + Button */}
      <div className="flex items-center justify-between text-sm font-medium mt-auto">
        <p className="flex items-center gap-1 text-green-700">
          <FaCalendarAlt className="text-sm" />
          {date}
        </p>
        {button && (
          <button
            onClick={() => {
              navigate(`/event/${id}`);
            }}
            className="bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition focus:outline-none"
            aria-label={`Action for ${title}`}
          >
            {button}
          </button>
        )}
      </div>
    </article>
  );
};

export default EventsCard;
