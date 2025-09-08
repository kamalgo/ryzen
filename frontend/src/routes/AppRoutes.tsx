// // AppRoutes.tsx
// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "../App"; // your layout (with header/footer + <Outlet />)
// import Login from "../pages/Login";
// import Dashboard from "../pages/Dashboard";
// import ApplicationForm from "../pages/ApplicationForm";
// import ProtectedRoute from "./ProtectedRoute";

// export default function AppRoutes() {
//   return (
// //     <BrowserRouter>
// //       <Routes>
// //         {/* App is the layout */}
// //         <Route path="/" element={<App />}>
// //           <Route path="login" element={<Login />} />

// //           <Route
// //             path="dashboard"
// //             element={
// //               <ProtectedRoute>
// //                 <Dashboard />
// //               </ProtectedRoute>
// //             }
// //           />

// //           <Route
// //             path="application-form"
// //             element={
// //               <ProtectedRoute>
// //                 <ApplicationForm />
// //               </ProtectedRoute>
// //             }
// //           />
// //         </Route>
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }
// <BrowserRouter>
//   <Routes>
//     <Route path="/" element={<App />}>
//       <Route path="login" element={<Login />} />
//       <Route
//         path="dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="application-form"
//         element={
//           <ProtectedRoute>
//             <ApplicationForm />
//           </ProtectedRoute>
//         }
//       />
//     </Route>
//   </Routes>
// </BrowserRouter>
// );
// }


import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App"; // layout with <Outlet />
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ApplicationForm from "../pages/ApplicationForm";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wrapper */}
        <Route path="/" element={<App />}>
          <Route path="login" element={<Login />} />

          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="application-form"
            element={
              <ProtectedRoute>
                <ApplicationForm />
              </ProtectedRoute>
            }
          />

          {/* Redirect unknown paths to login */}
          <Route path="*" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
