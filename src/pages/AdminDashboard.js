// src/pages/AdminDashboard.js

import React, { useEffect, useState } from "react"; // React hooks
import { useNavigate } from "react-router-dom"; // Navigation hook from React Router
import { checkAdminAuthState, logout } from "../firebase/authService"; // ✅ Auth functions (logout reused)

// Main Admin Dashboard component
function AdminDashboard() {
    const [admin, setAdmin] = useState(null); // Holds the currently logged-in admin user object
    const [loading, setLoading] = useState(true); // Controls the loading screen
    const navigate = useNavigate(); // Hook to programmatically redirect

    useEffect(() => {
        // ✅ Check if admin is authenticated when component loads
        checkAdminAuthState((adminUser) => {
            if (!adminUser) {
                // 🚫 If no admin is logged in, redirect to admin login
                navigate("/admin-login");
            } else {
                // ✅ If logged in, store the admin user in state
                setAdmin(adminUser);
            }
            // ⏳ Hide loading screen either way
            setLoading(false);
        });
    }, [navigate]); // Only re-run if `navigate` changes (rare)

    // ⏳ Show loading message while checking auth
    if (loading) return <h2>Checking admin access...</h2>;

    return (
        <div className="mt-4">
            <h2>👋 Welcome, Admin</h2>
            <p>You are now in the admin dashboard.</p>

            {/* ✅ Placeholder Section: Replace or expand with real admin features later */}
            <div className="card p-4 mt-3">
                <h4>Admin Controls</h4>
                <ul>
                    <li>📋 View / Manage Users</li>
                    <li>🎓 Add or Edit Programs</li>
                    <li>💬 Manage Announcements</li>
                    <li>📅 View Session Bookings</li>
                </ul>
            </div>

            {/* 🔴 Logout button for admin */}
            <button className="btn btn-danger mt-4" onClick={logout}>
                Logout
            </button>
        </div>
    );
}

export default AdminDashboard;
