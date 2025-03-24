import React, { useState } from "react";
import { login } from "../firebase/authService";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css"; // ✅ Reuse the same CSS as Signup

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        try {
            const user = await login(email, password);

            // ✅ If we reached here, user is verified
            setSuccessMessage("✅ Login successful. Redirecting...");
            setTimeout(() => {
                navigate("/"); // ✅ Navigate after short delay
            }, 1500);
        } catch (error) {
            // ✅ Handle specific error if email is not verified
            if (error.message.includes("verify your email")) {
                setError("⚠️ Please verify your email before logging in. Check your inbox or spam folder.");
            } else {
                setError("❌ Invalid email or password.");
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="text-center">Welcome Back</h2>

                {/* ✅ Display messages */}
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary">Login</button>
                </form>

                <p className="text-center">
                    Don’t have an account? <a href="/signup">Sign up</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
