import { useState } from 'react';
import axios from 'axios';

const Licenses = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    duration: 'Year',
    userType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/plans', formData); // Your backend POST route
      alert('Plan added successfully!');
      setFormData({
        title: '',
        price: '',
        duration: 'Year',
        userType: '',
      });
    } catch (err) {
      alert('Failed to add plan');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen  py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Add New License Plan</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow grid gap-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Plan Title (e.g., Independent DJs)"
          value={formData.title}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price (e.g., 99)"
          value={formData.price}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <select
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Year">Year</option>
          <option value="Month">Month</option>
        </select>
        <select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">Select User Type</option>
          <option value="DJ">Independent DJ</option>
          <option value="Venue">Event Venue</option>
          <option value="Supplier">Equipment Supplier</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-orange-600 text-white font-bold py-2 rounded"
        >
          Submit Plan
        </button>
      </form>
    </div>
  );
};

export default Licenses;
