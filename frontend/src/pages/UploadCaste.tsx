// // // // // frontend/src/pages/UploadCaste.tsx
// // // // import React, { useState, ChangeEvent } from "react";
// // // // import { useToken } from "../context/TokenContext";

// // // // export default function UploadCaste() {
// // // //   const [file, setFile] = useState<File | null>(null);
// // // //   const [loading, setLoading] = useState(false);

// // // //   // read token from query string (Gallabox will send it in URL)
// // // //   const params = new URLSearchParams(window.location.search);
// // // //   const token = params.get("token");

// // // //   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
// // // //     if (e.target.files && e.target.files.length > 0) {
// // // //       setFile(e.target.files[0]);
// // // //     }
// // // //   };

// // // //   const handleUpload = async () => {
// // // //     if (!file) return alert("Please select a file first");
// // // //     if (!token) return alert("No token found in URL");

// // // //     setLoading(true);
// // // //     const data = new FormData();
// // // //     data.append("file", file);

// // // //     try {
// // // //       const res = await fetch("http://localhost:4004/student/upload-caste", {
// // // //         method: "POST",
// // // //         headers: {
// // // //           Authorization: `Bearer ${token}`,
// // // //         },
// // // //         body: data,
// // // //       });

// // // //       const result = await res.json();
// // // //       if (result.success) {
// // // //         alert("Caste certificate uploaded successfully!");
// // // //         // redirect back to WA
// // // //         window.location.href = result.redirect;
// // // //       } else {
// // // //         alert(result.error || "Upload failed");
// // // //       }
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       alert("Upload failed");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
// // // //       <h2 className="text-xl font-bold mb-4">Upload Caste Certificate</h2>
// // // //       <input
// // // //         type="file"
// // // //         accept="image/*,application/pdf"
// // // //         onChange={handleFileChange}
// // // //         className="mb-4"
// // // //       />
// // // //       <button
// // // //         onClick={handleUpload}
// // // //         disabled={!file || loading}
// // // //         className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
// // // //       >
// // // //         {loading ? "Uploading..." : "Upload"}
// // // //       </button>
// // // //     </div>
// // // //   );
// // // // }


// // // import React, { useState, ChangeEvent, FormEvent } from "react";
// // // // ✅ API Base URL is read from .env file
// // // const API_BASE = (import.meta as any).env.VITE_BACKEND_ENDPOINT;

// // // export default function UploadCaste() {
// // //   const [file, setFile] = useState<File | null>(null);

// // //   // 🔑 Directly treat sessionID from URL as JWT
// // //   const pathParts = window.location.pathname.split("/");
// // //   const token = pathParts[pathParts.length - 1];

// // //   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
// // //     if (e.target.files && e.target.files.length > 0) {
// // //       setFile(e.target.files[0]);
// // //     }
// // //   };

// // //   const handleSubmit = async (e: FormEvent) => {
// // //     e.preventDefault();
// // //     if (!file) return alert("Please select a file first");
// // //     if (!token) return alert("No token found in URL");

// // //     const formData = new FormData();
// // //     formData.append("casteCertificate", file);

// // //     try {
// // //       // const res = await fetch("http://localhost:4004/student/upload-caste", {
// // //           const res = await fetch(`${API_BASE}/student/upload-caste`, {

// // //         method: "POST",
// // //         headers: {
// // //           Authorization: `Bearer ${token}`, // ✅ use disguised JWT directly
// // //         },
// // //         body: formData,
// // //       });

// // //       const result = await res.json();
// // //       if (result.success) {
// // //         alert("Caste certificate uploaded successfully ✅");
// // //         window.location.href =
// // //           "https://wa.me/<YOUR_NUMBER>?text=Caste%20Certificate%20Uploaded%20✅";
// // //       } else {
// // //         alert(result.error || "Upload failed");
// // //       }
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("Upload failed");
// // //     }
// // //   };

// // //   return (
// // //     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
// // //       <h2 className="text-xl font-bold mb-4">Upload Caste Certificate</h2>
// // //       <form onSubmit={handleSubmit} className="space-y-4">
// // //         <input
// // //           type="file"
// // //           accept="image/*,application/pdf"
// // //           onChange={handleFileChange}
// // //           required
// // //         />
// // //         <button
// // //           type="submit"
// // //           className="px-4 py-2 bg-green-600 text-white rounded"
// // //         >
// // //           Upload
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // }


// // import React, { useState, ChangeEvent, FormEvent } from "react";

// // // ✅ API Base URL from .env
// // const API_BASE = (import.meta as any).env.VITE_BACKEND_ENDPOINT;

// // export default function UploadCaste() {
// //   const [file, setFile] = useState<File | null>(null);

// //   // 🔑 Extract session token (JWT) from URL
// //   const pathParts = window.location.pathname.split("/");
// //   const token = pathParts[pathParts.length - 1];

// //   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
// //     if (e.target.files && e.target.files.length > 0) {
// //       setFile(e.target.files[0]);
// //       console.log("Selected file:", e.target.files[0]); // 🔹 debug
// //     }
// //   };

// //   const handleSubmit = async (e: FormEvent) => {
// //     e.preventDefault();

// //     if (!file) return alert("Please select a file first");
// //     if (!token) return alert("No token found in URL");

// //     const formData = new FormData();
// //     formData.append("casteCertificate", file);

// //     try {
// //       console.log("Sending request with token:", token); // 🔹 debug

// //       const res = await fetch(`${API_BASE}/student/upload-caste`, {
// //         method: "POST",
// //         headers: {
// //           Authorization: `Bearer ${token}`, // ✅ required
// //         },
// //         body: formData,
// //       });

// //       const result = await res.json();

// //       console.log("Upload response:", result); // 🔹 debug

// //       if (result.success) {
// //         alert("Caste certificate uploaded successfully ✅");
// //         window.location.href =
// //           result.redirect || "https://wa.me/<YOUR_NUMBER>?text=Caste%20Certificate%20Uploaded%20✅";
// //       } else {
// //         alert(result.error || "Upload failed");
// //       }
// //     } catch (err) {
// //       console.error("Upload error:", err);
// //       alert("Upload failed");
// //     }
// //   };

// //   return (
// //     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
// //       <h2 className="text-xl font-bold mb-4">Upload Caste Certificate</h2>
// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         <input
// //           type="file"
// //           accept="image/*,application/pdf"
// //           onChange={handleFileChange}
// //           required
// //         />
// //         <button
// //           type="submit"
// //           className="px-4 py-2 bg-green-600 text-white rounded"
// //         >
// //           Upload
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }


// import React, { useState, ChangeEvent, FormEvent } from "react";

// // ✅ API Base URL from .env
// const API_BASE = (import.meta as any).env.VITE_BACKEND_ENDPOINT;

// export default function UploadCaste() {
//   const [file, setFile] = useState<File | null>(null);

//   // 🔑 Extract JWT from URL (assumes last part of path is token)
//   const pathParts = window.location.pathname.split("/");
//   const token = pathParts[pathParts.length - 1];

//   // 🔹 Handle file selection
//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setFile(e.target.files[0]);
//       console.log("Selected file:", e.target.files[0]);
//     }
//   };

//   // 🔹 Handle form submission
//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     if (!file) return alert("Please select a file first");
//     if (!token) return alert("No token found in URL");

//     const formData = new FormData();
//     formData.append("casteCertificate", file);

//     try {
//       console.log("Sending request with token:", token);

//       const res = await fetch(`${API_BASE}/student/upload-caste`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`, // ✅ send JWT in Authorization header
//         },
//         body: formData,
//       });

//       // Handle response
//       if (res.status === 401) {
//         alert("Unauthorized: Invalid or expired token. Please login again.");
//         return;
//       }

//       const result = await res.json();
//       console.log("Upload response:", result);

//       if (result.success) {
//         alert("Caste certificate uploaded successfully ✅");
//         window.location.href =
//           result.redirect ||
//           "https://wa.me/<YOUR_NUMBER>?text=Caste%20Certificate%20Uploaded%20✅";
//       } else {
//         alert(result.error || "Upload failed");
//       }
//     } catch (err) {
//       console.error("Upload error:", err);
//       alert("Upload failed due to network or server error");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Upload Caste Certificate</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="file"
//           accept="image/*,application/pdf"
//           onChange={handleFileChange}
//           required
//         />
//         <button
//           type="submit"
//           className="px-4 py-2 bg-green-600 text-white rounded"
//         >
//           Upload
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState, ChangeEvent, FormEvent } from "react";

// ✅ Base API URL from your .env file (e.g. VITE_BACKEND_ENDPOINT)
const API_BASE = (import.meta as any).env.VITE_BACKEND_ENDPOINT;

export default function UploadCaste() {
  const [file, setFile] = useState<File | null>(null);

  // 🔑 Extract JWT token from the URL (last segment of path)
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
    formData.append("casteCertificate", file);

    try {
      console.log("Sending request with token:", token);

      const res = await fetch(`${API_BASE}/student/upload-caste`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ include JWT in header
        },
        body: formData,
      });

      // Step 1: Handle invalid or expired tokens
      if (res.status === 401) {
        alert("Unauthorized: Invalid or expired token. Please login again.");
        return;
      }

      // Step 2: Parse response JSON
      const result = await res.json();
      console.log("Upload response:", result);

      // Step 3: If successful, show alert and redirect
      if (result.success) {
        alert("Caste certificate uploaded successfully ✅");

        // Step 4: Redirect to WhatsApp (like login flow)
        const redirectUrl =
          result.redirectWa || // ✅ dynamic link from backend
          result.redirect || // ✅ alternate key
          "https://wa.me/918888888888?text=Caste%20Certificate%20Uploaded%20✅"; // fallback default

        // Step 5: Perform redirect
        window.location.href = redirectUrl;
      } else {
        alert(result.error || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed due to network or server error");
    }
  };

  // 🔹 UI
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Upload Caste Certificate</h2>
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
