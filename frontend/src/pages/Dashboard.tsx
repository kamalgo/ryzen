import React from "react";
import { useNavigate } from "react-router-dom";

interface Application {
  id: number;
  status: string;
  submittedAt: string;
}

export default function Dashboard() {
  const navigate = useNavigate();

  // dummy applications (replace with API later)
  const dummyApplications: Application[] = [
    { id: 1, status: "Pending", submittedAt: "2025-09-05" },
    { id: 2, status: "Approved", submittedAt: "2025-08-28" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🎓 Scholarship Dashboard</h1>

      {/* Actions */}
      <div className="space-x-4 mb-8">
        <button
          onClick={() => navigate("/application-form")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Apply for Scholarship
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </div>

      {/* Applications List */}
      <h2 className="text-xl font-semibold mb-3">My Applications</h2>
      <table className="w-full border rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Submitted On</th>
          </tr>
        </thead>
        <tbody>
          {dummyApplications.map((app) => (
            <tr key={app.id}>
              <td className="border px-4 py-2">{app.id}</td>
              <td className="border px-4 py-2">{app.status}</td>
              <td className="border px-4 py-2">{app.submittedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
