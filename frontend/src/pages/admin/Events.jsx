import React, { useState } from "react";
import axios from "axios";

const Events = () => {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    description: "",
    location: { city: "", country: "" },
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    price: "",
    ticketsPublished: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "city" || name === "country") {
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value,
        },
      }));
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/events", formData); // Update if your route is different
      alert("Event created successfully!");
      console.log(res.data);
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <textarea
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.location.city}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.location.country}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="border p-2"
          />
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            className="border p-2"
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="border p-2"
          />
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
            className="border p-2"
          />
        </div>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="ticketsPublished"
            checked={formData.ticketsPublished}
            onChange={handleChange}
          />
          Publish Tickets
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit Event
        </button>
      </form>
    </div>
  );
};

export default Events;
