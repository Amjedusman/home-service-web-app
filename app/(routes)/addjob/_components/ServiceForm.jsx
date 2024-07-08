"use client";
import { uploadFile } from "@/lib/uploadFile";
import React, { useRef, useState } from "react";
import api from "@/app/_services/GlobalApi";
import { useRouter } from "next/navigation";

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

const ServiceForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    address: "",
    about: "",
    email: "",
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageId = await uploadFileSubmit();
    console.log({
      ...formData,
      imageId,
    });

    const data = await api.createBusinessList(formData, imageId);

    console.log("success");
    console.log(data);
    router.push("/");

  };

  return (
    <form
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="serviceName"
        >
          Name of Job
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="contactPerson"
        >
          Name of Contact Person
        </label>
        <input
          type="text"
          id="contactPerson"
          name="contactPerson"
          value={formData.conatctPerson}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="address"
        >
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
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="about"
        >
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
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
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
        <span className="block text-gray-700 text-sm font-bold mb-2">
          Category
        </span>
        {categories.map((category) => (
          <label key={category.id} className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="categoryId"
              value={category.id}
              checked={formData.categoryId === category.id}
              onChange={handleChange}
              className="form-radio"
              required
            />
            <span className="ml-2">{category.name}</span>
          </label>
        ))}
      </div>
      <div>
        <input ref={inputFileRef} type="file" />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-primary hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;
