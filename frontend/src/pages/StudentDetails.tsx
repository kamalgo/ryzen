// frontend/src/pages/StudentDetails.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useToken } from "../context/TokenContext";

export default function StudentDetails() {
  const [formData, setFormData] = useState({
    candidateName: "",
    parentMobileNumber: "",
    maritalStatus: "",
  });

  const params = new URLSearchParams(window.location.search);
//   const token = params.get("token");
    const { token } = useToken(); // ✅ get token here


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // if (!token) return alert("No token found in URL");
        if (!token) return alert("No active session found. Please login again.");


    try {
      const res = await fetch("http://localhost:4004/student/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        alert("Details saved successfully!");
        // next step could be WA or upload link
        window.location.href =
          "https://wa.me/<YOUR_NUMBER>?text=Details%20Saved%20✅";
      } else {
        alert(result.error || "Save failed");
      }
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Enter Student Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            name="candidateName"
            value={formData.candidateName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Parent Mobile</label>
          <input
            type="text"
            name="parentMobileNumber"
            value={formData.parentMobileNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Marital Status</label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Save Details
        </button>
      </form>
    </div>
  );
}
