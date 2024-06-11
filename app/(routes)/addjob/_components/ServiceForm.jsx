"use client";
import React, { useRef, useState } from 'react';

const ServiceForm = () => {
  const [formData, setFormData] = useState({
    serviceName: '',
    contactPerson: '',
    address: '',
    about: '',
    email: '',
    category: '',
  });

  const inputFileRef = useRef(null)

  const uploadFile = () => {
    const file = inputFileRef.current.files[0];
    if (file) {
      console.log("File name:", file.name);
      console.log("File type:", file.type);
      console.log("File size:", file.size);
      // Implement further file handling logic here (e.g., upload to server)
    } else {
      console.log("No file selected");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadFile()
    console.log(formData);
  };

  return (
    <form className="max-w-lg mx-auto p-4 bg-white shadow-md rounded" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serviceName">
          Name of Service
        </label>
        <input
          type="text"
          id="serviceName"
          name="serviceName"
          value={formData.serviceName}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactPerson">
          Name of Contact Person
        </label>
        <input
          type="text"
          id="contactPerson"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="about">
          About
        </label>
        <textarea
          id="about"
          name="about"
          value={formData.about}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <span className="block text-gray-700 text-sm font-bold mb-2">Category</span>
        {['cleaning', 'delivery', 'plumbing', 'painting', 'repair'].map((category) => (
          <label key={category} className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="category"
              value={category}
              checked={formData.category === category}
              onChange={handleChange}
              className="form-radio"
              required
            />
            <span className="ml-2">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
          </label>
        ))}
      </div>
      <div>
        <input ref={inputFileRef} type="file"/>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;
