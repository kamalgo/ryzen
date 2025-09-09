// frontend/src/pages/UploadCaste.tsx
import React, { useState, ChangeEvent } from "react";
import { useToken } from "../context/TokenContext";

export default function UploadCaste() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // read token from query string (Gallabox will send it in URL)
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first");
    if (!token) return alert("No token found in URL");

    setLoading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("http://localhost:4004/student/upload-caste", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await res.json();
      if (result.success) {
        alert("Caste certificate uploaded successfully!");
        // redirect back to WA
        window.location.href = result.redirect;
      } else {
        alert(result.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Upload Caste Certificate</h2>
      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
