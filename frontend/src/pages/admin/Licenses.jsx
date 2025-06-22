
import { useState, useRef } from 'react';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Licenses = () => {
  const [formData, setFormData] = useState({
    license_name: '',
    price: '',
    duration: 'Year',
    description: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);

  const filePickerRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    setImageFileUploadProgress(0); 

    const formDataForUpload = new FormData();
    formDataForUpload.append('image', imageFile);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataForUpload,
        credentials: 'include',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Upload failed');
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
      await axios.post('/api/license', formData, { withCredentials: true });
      alert('Plan added successfully!');
      setFormData({
        license_name: '',
        price: '',
        duration: 'Year',
        description: '',
      });
      setImageFile(null); 
      setImageFileUrl(null); 
    } catch (err) {
      alert('Failed to add plan');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Add New License Plan</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow grid gap-4"
      >
        <div className="flex flex-col items-center mb-4">
          <div
            style={{
              width: '100px',
              height: '100px',
              position: 'relative',
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              marginBottom: '0.75rem',
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
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 10,
                    background: 'rgba(255,255,255,0.7)',
                    borderRadius: '50%',
                  },
                  path: {
                    stroke: `#007bff`,
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                  },
                  text: {
                    fill: '#343a40',
                    fontSize: '18px',
                    fontWeight: '600',
                  },
                }}
              />
            )}
            <img
              src={imageFileUrl || '/placeholder-image.jpg'}
              alt="License"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: imageFileUploadProgress && imageFileUploadProgress < 100 ? 0.6 : 1,
                position: 'relative',
                zIndex: 5,
              }}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            style={{ display: 'none' }}
          />
          <p className="text-sm text-gray-500">Click to upload a license image</p>
          {imageFileUploadError && (
            <div className="text-red-500 text-sm mt-2">{imageFileUploadError}</div>
          )}
        </div>

        <input
          type="text"
          name="license_name"
          placeholder="License Name (e.g., Pro License)"
          value={formData.license_name}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
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
          <option value="year">Year</option>
          <option value="month">Month</option>
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
