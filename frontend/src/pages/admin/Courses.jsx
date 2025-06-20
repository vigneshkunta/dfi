import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Courses = () => {
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    category: '',
    teacher: '',
    instructors: [],
    about: '',
    objective: '',
    skillLevel: '',
    certificate: false,
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users to select teacher and instructors
    axios.get('/api/users') // Update this route as per your backend
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleInstructorsChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, instructors: options });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/courses', formData);
      alert('Course created!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating course');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="image"
          placeholder="Course Image URL"
          value={formData.image}
          onChange={handleChange}
          className="border p-2"
          required
        />
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
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.fullname || user.username}
            </option>
          ))}
        </select>

        <label className="text-gray-600 font-medium">Select Instructors (Multi-select)</label>
        <select
          multiple
          name="instructors"
          value={formData.instructors}
          onChange={handleInstructorsChange}
          className="border p-2"
        >
          {users.map((user) => (
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

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit Course
        </button>
      </form>
    </div>
  );
};

export default Courses;
