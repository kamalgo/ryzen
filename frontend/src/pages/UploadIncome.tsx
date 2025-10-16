// frontend/src/pages/UploadIncome.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";

// ✅ Base API URL from .env
const API_BASE = (import.meta as any).env.VITE_BACKEND_ENDPOINT;

export default function UploadIncome() {
  const [file, setFile] = useState<File | null>(null);

  // 🔑 Extract JWT from URL
  const pathParts = window.location.pathname.split("/");
  const token = pathParts[pathParts.length - 1];

  // 🔹 Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      console.log("Selected file:", e.target.files[0]);
    }
  };

  // 🔹 Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) return alert("Please select a file first");
    if (!token) return alert("No token found in URL");

    const formData = new FormData();
    formData.append("incomeCertificate", file); // 🔹 field name matches backend

    try {
      console.log("Sending income cert request with token:", token);

      const res = await fetch(`${API_BASE}/student/upload-income`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.status === 401) {
        alert("Unauthorized: Invalid or expired token. Please login again.");
        return;
      }

      const result = await res.json();
      console.log("Upload response:", result);

      if (result.success) {
        alert("Income certificate uploaded successfully ✅");

        // 🔹 Redirect like login flow
        const redirectUrl =
          result.redirectWa ||
          result.redirect ||
          "https://wa.me/918888888888?text=Income%20Certificate%20Uploaded%20✅";

        window.location.href = redirectUrl; // 🔹 redirect to WA
      } else {
        alert(result.error || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed due to network or server error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Upload Income Certificate</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* File Upload Input */}
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
