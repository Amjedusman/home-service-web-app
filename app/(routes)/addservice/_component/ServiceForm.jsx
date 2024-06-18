"use client"
import React, { useRef } from "react";
import { useState } from "react";
import { uploadFile } from "@/lib/uploadFile";
import api from "@/app/_services/GlobalApi";
import { useRouter } from "next/navigation";

export default function ServiceForm() {
  const categories = [
    {
      name: "Cleaning",
      id: "cluxnqqc90ci007o4in0nfohf",
    },
    {
      name: "Delivery",
      id: "cluxo2i5s0d0807pn2pf5w6a6",
    },
    {
      name: "Plumbing",
      id: "cluxody3y0cu407o47y5ckdse",
    },
    {
      name: "Painting",
      id: "cluxo3tfe0cnz07o4a2fregf9",
    },
    {
      name: "Repair",
      id: "cluxo54dl0cp507o4g42nmjjx",
    },
    {
      name: "Electrician",
      id: "cluxofdez0d8u07pn1vmpkszh",
    },
  ];

  const router = useRouter();

  const [formData, setFormData] = useState({
    serviceName: "",
    contactName: "",
    phone: "",
    address: "",
    email: "",
    date: "",
    image: null,
    categoryId: "",
  });

  const inputFileRef = useRef(null);

  const uploadFileSubmit = async () => {
    const file = inputFileRef.current.files[0];
    if (file) {
      console.log("File name:", file.name);
      console.log("File type:", file.type);
      console.log("File size:", file.size);
      // Implement further file handling logic here (e.g., upload to server)
      const id = await uploadFile(file);

      return id;
    } else {
      console.log("No file selected");
      throw new Error("No file selected");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Name:", name);
    console.log("Value:", value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic
    try {
      const imageId = await uploadFileSubmit();
      console.log("Image ID:", imageId);
      const data = formData;
      console.log("Data:", data);
      const result = await api.createServiceList(data, imageId);
      console.log("Result:", result);
      router.push("/services");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className="max-w-lg mx-auto p-6 bg-white rounded-md shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-6">Add Service Details</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="serviceName">
          Service Name
        </label>
        <input
          type="text"
          id="serviceName"
          name="serviceName"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={formData.serviceName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="contactName">
          Contact Person Name
        </label>
        <input
          type="text"
          id="contactName"
          name="contactName"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={formData.contactName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="phone">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="address">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="date">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="image">
          Image of Service
        </label>
        <input
          ref={inputFileRef}
          type="file"
          id="image"
          name="image"
          className="w-full"
          onChange={handleFileChange}
        />
      </div>

      <div className="mb-4">
        <span className="block text-sm font-medium mb-1">Category</span>
        <div className="flex space-x-4">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center">
              <input
                type="radio"
                name="categoryId"
                value={category.id}
                checked={formData.categoryId === category.id}
                onChange={handleChange}
                className="mr-2"
              />
              {category.name}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-white font-bold rounded-md hover:bg-purple-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
