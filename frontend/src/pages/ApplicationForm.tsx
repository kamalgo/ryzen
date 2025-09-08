import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  fullName: string;
  mobile: string;
  email: string;
  aadhaar: string;
  address: string;
}

export default function ApplicationForm() {
  const [step, setStep] = useState<number>(1);
  const [casteCert, setCasteCert] = useState<File | null>(null);
  const [incomeCert, setIncomeCert] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    mobile: "",
    email: "",
    aadhaar: "",
    address: "",
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: "caste" | "income") => {
    if (e.target.files && e.target.files.length > 0) {
      if (type === "caste") setCasteCert(e.target.files[0]);
      if (type === "income") setIncomeCert(e.target.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    if (casteCert) data.append("casteCertificate", casteCert);
    if (incomeCert) data.append("incomeCertificate", incomeCert);
    Object.keys(formData).forEach((key) => {
      data.append(key, (formData as any)[key]);
    });

    try {
      const res = await fetch("http://localhost:4004/api/applications", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      alert("Form submitted successfully!");
      console.log(result);
    } catch (err) {
      console.error(err);
      alert("Failed to submit application");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Scholarship Application</h2>

      {step === 1 && (
        <div>
          <label className="block mb-2 font-medium">Upload Caste Certificate</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => handleFileChange(e, "caste")}
            className="mb-4"
          />
          <button
            disabled={!casteCert}
            onClick={() => setStep(2)}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <label className="block mb-2 font-medium">Upload Income Certificate</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => handleFileChange(e, "income")}
            className="mb-4"
          />
          <button
            disabled={!incomeCert}
            onClick={() => setStep(3)}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Aadhaar</label>
            <input
              type="text"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
}
