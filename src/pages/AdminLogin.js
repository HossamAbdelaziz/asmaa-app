import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../firebase/authService"; // ✅ Admin-only login function

function AdminLogin() {
    // ✅ State variables for email, password, and error message
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate(); // ✅ Used for redirecting after login

    /**
     * ✅ Handle the admin login form submission
     * @param {Event} e - Form submit event
     */
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page refresh
        setError(""); // Clear any previous errors

        try {
            await adminLogin(email, password); // ✅ Try logging in as admin
            navigate("/admin-dashboard"); // ✅ Redirect if successful
        } catch (err) {
            console.error("❌ Admin login error:", err.message); // Log for debugging
            setError("❌ Invalid admin credentials or not an authorized admin.");
        }
    };

    return (
        <div className="auth-container">
            <h2>🔐 Admin Login</h2>

            {/* ✅ Show error message if login fails */}
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Admin Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Admin Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="btn btn-primary mt-3">
                    Login as Admin
                </button>
            </form>
        </div>
    );
}

export default AdminLogin;
