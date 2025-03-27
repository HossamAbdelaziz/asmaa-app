import React from "react";
import { Routes, Route } from "react-router-dom"; // ✅ Used for defining routes in the app

// ✅ Bootstrap styling and icons
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap-icons/font/bootstrap-icons.css"; // Bootstrap Icons

// ✅ Shared Components
import Navbar from "./components/Navbar"; // Top navigation bar

// ✅ Pages
import Home from "./pages/Home"; // Home page
import About from "./pages/About"; // About page
import Programs from "./pages/Programs"; // Programs listing
import Login from "./pages/Login"; // User login page
import Signup from "./pages/Signup"; // User signup page
import Admin from "./pages/Admin"; // Protected admin area
import AdminLogin from "./pages/AdminLogin"; // Admin login page
import AdminDashboard from "./pages/AdminDashboard"; // ✅ This was missing before – added now!
import UserDashboard from "./pages/UserDashboard";
import ManagePrograms from "./pages/ManagePrograms";



function App() {
  return (
    <>
      {/* ✅ Shared navbar displayed across all pages */}
      <Navbar />

      {/* ✅ Main container where page content will be rendered */}
      <div className="container page-content">
        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<UserDashboard />} />


          {/* ✅ Admin Routes */}
          <Route path="/admin" element={<Admin />} /> {/* Admin entry page (check & redirect) */}
          <Route path="/admin-login" element={<AdminLogin />} /> {/* Admin login form */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Real admin dashboard */}
          <Route path="/admin/programs" element={<ManagePrograms />} />

        </Routes>
      </div>
    </>
  );
}

export default App;
