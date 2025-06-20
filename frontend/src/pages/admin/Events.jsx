import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar"; // for progress bar
import "react-circular-progressbar/dist/styles.css"; // for progress bar styles

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

  // Image upload states
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  // Handle form input changes (for other fields)
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

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file)); // Preview the image
    }
  };

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    setImageFileUploadProgress(0);

    const formDataForUpload = new FormData();
    formDataForUpload.append("file", imageFile);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataForUpload,
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Upload failed");
      }

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
          setImageFileUploadProgress(progress);
        } else {
          clearInterval(interval);
        }
      }, 100);

      const data = await res.json();
      setImageFileUrl(data.data.url);
      setFormData((prevData) => ({ ...prevData, image: data.data.url }));
    } catch (err) {
      setImageFileUploadError(err.message);
      setImageFile(null);
      setImageFileUrl("");
    } finally {
      setImageFileUploading(false);
      setImageFileUploadProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/event", formData, {
        withCredentials: true,
      });
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
        <div className="flex flex-col items-center mb-4">
          <div
            style={{
              width: "100px",
              height: "100px",
              position: "relative",
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              cursor: "pointer",
              marginBottom: "0.75rem",
            }}
            onClick={() => filePickerRef.current.click()}
          >
            {imageFileUploadProgress && (
              <CircularProgressbar
                value={imageFileUploadProgress}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 10,
                    background: "rgba(255,255,255,0.7)",
                    borderRadius: "50%",
                  },
                  path: {
                    stroke: `#007bff`,
                    transition: "stroke-dashoffset 0.5s ease 0s",
                  },
                  text: {
                    fill: "#343a40",
                    fontSize: "18px",
                    fontWeight: "600",
                  },
                }}
              />
            )}
            <img
              src={imageFileUrl || "/placeholder-image.jpg"}
              alt="Event"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity:
                  imageFileUploadProgress && imageFileUploadProgress < 100
                    ? 0.6
                    : 1,
                position: "relative",
                zIndex: 5,
              }}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            style={{ display: "none" }}
          />
          <p className="text-sm text-gray-500">
            Click the icon to upload an event image
          </p>
          {imageFileUploadError && (
            <div className="text-red-500 text-sm mt-2">
              {imageFileUploadError}
            </div>
          )}
        </div>

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
          className="bg-blue-600 text-white p-2 rounded mt-4"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default Events;
