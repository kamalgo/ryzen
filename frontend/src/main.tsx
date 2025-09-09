// import React from "react";
// import ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./index.css";
// import App from "./App";
// import Login from "./pages/Login";
// import ApplicationForm from "../src/pages/ApplicationForm";
// import Dashboard from "./pages/Dashboard";

// const router = createBrowserRouter([
//   { path: "/", element: <App />,
//     children: [
//       { index: true, element: <Login /> },
//       { path: "login", element: <Login /> },
//       { path: "dashboard", element: <Dashboard /> },
//       { path: "application-form", element: <ApplicationForm /> },
//     ]
//   }
// ]);

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );
// frontend/src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Login from "./pages/Login";
import UploadCaste from "./pages/UploadCaste";
import UploadIncome from "./pages/UploadIncome";
import StudentDetails from "./pages/StudentDetails";
import { TokenProvider } from "./context/TokenContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      { path: "upload-caste", element: <UploadCaste /> },
      { path: "upload-income", element: <UploadIncome /> },
      { path: "student-details", element: <StudentDetails /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TokenProvider>
      <RouterProvider router={router} />
    </TokenProvider>
  </React.StrictMode>
);
