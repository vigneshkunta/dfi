import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Courses = () => {
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    category: "",
    teacher: "",
    duration: 0,
    price: 0,
    instructors: [],
    about: "",
    objective: "",
    skillLevel: "",
    certificate: false,
    lessons: [],
  });

  const [users, setUsers] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);

  // Upload states
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);

  const filePickerRefImage = useRef();

  useEffect(() => {
    axios
      .get("/api/user/all")
      .then((res) => {
        const { data } = res;
        if (Array.isArray(data.data)) {
          setUsers(data.data);
        } else {
          console.error("Invalid users data", data);
        }
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  // Upload image when imageFile changes
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleInstructorsChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, instructors: options });
  };

  const handleLessonsChange = (e, index) => {
    const updatedLessons = [...formData.lessons];
    updatedLessons[index] = e.target.value;
    setFormData({ ...formData, lessons: updatedLessons });
  };

  const addLesson = () => {
    setFormData({ ...formData, lessons: [...formData.lessons, ""] });
  };

  const removeLesson = (index) => {
    const updatedLessons = formData.lessons.filter((_, i) => i !== index);
    setFormData({ ...formData, lessons: updatedLessons });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file)); // preview
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

      // Simulate progress
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
      await axios.post("/api/course", formData);
      alert("Course created!");
      // Optionally reset form here
    } catch (err) {
      alert(err.response?.data?.message || "Error creating course");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
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
          onClick={() => filePickerRefImage.current.click()}
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
            alt="Course"
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
          onChange={handleFileChange}
          ref={filePickerRefImage}
          style={{ display: "none" }}
        />
        {imageFileUploadError && (
          <div className="text-red-500 text-sm mb-2">{imageFileUploadError}</div>
        )}
        <p className="text-sm text-gray-500">Click to upload an image</p>

        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Course Category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2"
          required
        />

        <label className="text-gray-600 font-medium">Select Teacher</label>
        <select
          name="teacher"
          value={formData.teacher}
          onChange={handleChange}
          className="border p-2"
          required
        >
          <option value="">-- Select Teacher --</option>
          {Array.isArray(users) &&
            users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.fullname || user.username}
              </option>
            ))}
        </select>

        <input
          type="number"
          name="duration"
          placeholder="Duration (in days)"
          value={formData.duration}
          onChange={handleChange}
          className="border p-2"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2"
          required
        />

        <label className="text-gray-600 font-medium">Select Instructors</label>
        <select
          multiple
          name="instructors"
          value={formData.instructors}
          onChange={handleInstructorsChange}
          className="border p-2"
        >
          {Array.isArray(users) &&
            users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.fullname || user.username}
              </option>
            ))}
        </select>

        <textarea
          name="about"
          placeholder="About the Course"
          value={formData.about}
          onChange={handleChange}
          className="border p-2"
          required
        />

        <textarea
          name="objective"
          placeholder="Course Objective"
          value={formData.objective}
          onChange={handleChange}
          className="border p-2"
          required
        />

        <input
          type="text"
          name="skillLevel"
          placeholder="Skill Level (e.g., Beginner, Intermediate)"
          value={formData.skillLevel}
          onChange={handleChange}
          className="border p-2"
          required
        />

        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            name="certificate"
            checked={formData.certificate}
            onChange={handleChange}
          />
          Certificate Available
        </label>

        <div className="lessons-section">
          <h3 className="font-semibold text-lg">Lessons</h3>
          {formData.lessons.map((lesson, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={lesson}
                onChange={(e) => handleLessonsChange(e, index)}
                placeholder={`Lesson ${index + 1}`}
                className="border p-2 flex-grow"
              />
              <button
                type="button"
                onClick={() => removeLesson(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addLesson}
            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 mt-2"
          >
            Add Lesson
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4"
          disabled={imageFileUploading} 
        >
          Submit Course
        </button>
      </form>
    </div>
  );
};

export default Courses;
